"use server"

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { validateGithubProfile, fetchGithubData } from "@/lib/utils/github";
import { validateLeetCodeProfile, fetchLeetCodeData } from "@/lib/utils/leetcode";
import { PlatformType } from "@/lib/generated/prisma";

export async function validatePlatformUrl(type: PlatformType, url: string) {
	switch (type) {
		case PlatformType.GITHUB:
			return await validateGithubProfile(url);
		case PlatformType.LEETCODE:
			return await validateLeetCodeProfile(url);
		default:
			return null;
	}
}

export async function savePlatformData(type: PlatformType, url: string) {
	console.log("savePlatformData", type, url);

	try {
		const { userId } = await auth();
		if (!userId) throw new Error('Unauthorized');

		// Validate URL and extract username
		const username = await validatePlatformUrl(type, url);
		if (!username) throw new Error('Invalid platform URL');

		// Get user from database
		const user = await prisma.user.findFirst({
			where: { clerkId: userId }
		});
		if (!user) throw new Error('User not found');

		// Fetch platform data
		let platformData;
		switch (type) {
			case PlatformType.GITHUB:
				platformData = await fetchGithubData(username);
				break;
			case PlatformType.LEETCODE:
				platformData = await fetchLeetCodeData(username);
				break;
			default:
				throw new Error('Unsupported platform');
		}

		// Save or update platform data
		const platform = await prisma.platform.upsert({
			where: {
				userId_type: {
					userId: user.id,
					type,
				},
			},
			update: {
				username,
				profileUrl: url,
				data: platformData,
				lastSynced: new Date(),
			},
			create: {
				userId: user.id,
				type,
				username,
				profileUrl: url,
				data: platformData,
			},
		});

		return platform;
	} catch (error) {
		console.error('Error saving platform data:', error);
		throw error;
	}
}

export async function generatePortfolioInsights(userId: string) {
	try {
		// Fetch all platform data for the user
		const platforms = await prisma.platform.findMany({
			where: { userId }
		});

		// Prepare data for Sarvam AI
		const githubData = platforms.find(p => p.type === PlatformType.GITHUB)?.data;
		const leetcodeData = platforms.find(p => p.type === PlatformType.LEETCODE)?.data;

		const prompt = `
      You are an AI that analyzes developer profiles and generates insights.
      Please analyze the following data and provide insights in this format:
      {
        "summary": {
          "title": "Brief professional title",
          "description": "2-3 sentences about the developer"
        },
        "skills": {
          "languages": ["list", "of", "programming", "languages"],
          "frameworks": ["list", "of", "frameworks"],
          "tools": ["list", "of", "tools"]
        },
        "insights": {
          "strengths": ["3-4 key strengths"],
          "improvements": ["2-3 areas for improvement"],
          "recommendations": ["3-4 career recommendations"]
        },
        "metrics": {
          "githubActivity": "Analysis of GitHub activity",
          "codingProficiency": "Analysis of LeetCode performance",
          "overallScore": "Score out of 100"
        }
      }

      GitHub Data: ${JSON.stringify(githubData)}
      LeetCode Data: ${JSON.stringify(leetcodeData)}
    `;

		// Call Sarvam AI API
		const response = await fetch("https://api.sarvam.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${process.env.SARVAM_API_KEY}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				messages: [{ role: "user", content: prompt }],
				model: "sarvam-m",
				max_tokens: 1000
			}),
		});

		const aiResponse = await response.json();
		const insights = JSON.parse(aiResponse.choices[0].message.content);

		// Save insights to database
		await prisma.portfolioInsight.create({
			data: {
				userId,
				data: insights
			}
		});

		return insights;
	} catch (error) {
		console.error('Error generating portfolio insights:', error);
		throw error;
	}
}

export async function getUserPlatforms() {
	try {
		const { userId } = await auth();
		if (!userId) throw new Error('Unauthorized');

		// Get user from database
		const user = await prisma.user.findFirst({
			where: { clerkId: userId }
		});
		if (!user) throw new Error('User not found');

		// Get all platforms for the user
		const platforms = await prisma.platform.findMany({
			where: { userId: user.id }
		});

		// Format the response to match the UI structure
		return platforms.map(platform => ({
			platform: platform.type.toLowerCase(),
			link: platform.profileUrl,
			username: platform.username,
			data: platform.data
		}));
	} catch (error) {
		console.error('Error fetching user platforms:', error);
		return [];
	}
} 