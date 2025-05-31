'use server';

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { PlatformType } from "@/lib/generated/prisma";
import { validateGitHubProfile } from "@/lib/utils/github";
import { validateLeetCodeProfile } from "@/lib/utils/leetcode";

export async function checkPlatformData(platformType: PlatformType): Promise<boolean> {
    try {
        const { userId } = auth();
        if (!userId) throw new Error("Unauthorized");

        const existingData = await db.platformData.findFirst({
            where: {
                userId,
                platformType
            }
        });

        return !!existingData;
    } catch (error) {
        console.error("Error checking platform data:", error);
        return false;
    }
}

export async function savePlatformData(platformType: PlatformType, profileUrl: string): Promise<boolean> {
    try {
        const { userId } = auth();
        if (!userId) throw new Error("Unauthorized");

        // Check if data already exists
        const existingData = await db.platformData.findFirst({
            where: {
                userId,
                platformType
            }
        });

        if (existingData) {
            return true; // Data already exists
        }

        let username: string | null = null;

        // Validate profile URL based on platform type
        switch (platformType) {
            case PlatformType.GITHUB:
                username = await validateGitHubProfile(profileUrl);
                break;
            case PlatformType.LEETCODE:
                username = await validateLeetCodeProfile(profileUrl);
                break;
            default:
                throw new Error("Unsupported platform type");
        }

        if (!username) {
            throw new Error("Invalid profile URL");
        }

        // Save platform data
        await db.platformData.create({
            data: {
                userId,
                platformType,
                username,
                profileUrl
            }
        });

        return true;
    } catch (error) {
        console.error("Error saving platform data:", error);
        throw error;
    }
} 