import puppeteer from 'puppeteer';

interface LeetCodeStats {
	totalSolved: number;
	totalQuestions: number;
	easySolved: number;
	mediumSolved: number;
	hardSolved: number;
	acceptanceRate: string;
	ranking: number;
	contributionPoints: number;
	reputation: number;
}

interface LeetCodeSubmission {
	title: string;
	difficulty: string;
	status: string;
	language: string;
	timestamp: string;
}

export async function validateLeetCodeProfile(url: string): Promise<string | null> {
	try {
		// Handle different possible LeetCode URL formats
		const urlObj = new URL(url);
		if (!urlObj.hostname.includes('leetcode.com')) {
			return null;
		}

		// Extract username from different possible URL patterns
		let username: string | null = null;
		const pathParts = urlObj.pathname.split('/').filter(Boolean);

		if (pathParts.length > 0) {
			if (pathParts[0] === 'u') {
				// Handle /u/username format
				username = pathParts[1];
			} else {
				// Handle /username format
				username = pathParts[0];
			}
		}

		if (!username) {
			return null;
		}

		// Basic validation of username format
		if (username.length < 3 || /[^a-zA-Z0-9-_]/.test(username)) {
			return null;
		}

		return username;
	} catch (error) {
		console.error('Error validating LeetCode profile:', error);
		return null;
	}
}

export async function fetchLeetCodeData(username: string): Promise<Record<string, any>> {
	const browser = await puppeteer.launch({ 
		headless: true,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--disable-accelerated-2d-canvas',
			'--disable-gpu',
			'--no-first-run',
			'--no-zygote',
			'--single-process'
		]
	});
	
	try {
		const page = await browser.newPage();
		
		// Set a reasonable viewport
		await page.setViewport({ width: 1280, height: 800 });

		// Enable request interception for debugging
		await page.setRequestInterception(true);
		page.on('request', request => {
			console.log(`Request URL: ${request.url()}`);
			request.continue();
		});
		
		// Add error handling for navigation
		const response = await page.goto(`https://leetcode.com/${username}`, {
			waitUntil: 'networkidle0',
			timeout: 30000,
		});

		if (!response?.ok()) {
			throw new Error(`Failed to load LeetCode profile: ${response?.status()} ${response?.statusText()}`);
		}

		// Add a small delay to ensure content is loaded
		await new Promise(resolve => setTimeout(resolve, 3000));

		// Log the page content for debugging
		const pageContent = await page.content();
		console.log('Page Content Length:', pageContent.length);

		// Extract profile statistics with updated selectors and debugging
		const stats = await page.evaluate(() => {
			const getNumber = (selector: string): number => {
				try {
					const el = document.querySelector(selector);
					console.log(`Selector ${selector}:`, el?.textContent);
					if (!el) return 0;
					const text = el.textContent || '0';
					const number = parseInt(text.replace(/[^0-9]/g, ''), 10);
					return isNaN(number) ? 0 : number;
				} catch (error) {
					console.error(`Error getting number for ${selector}:`, error);
					return 0;
				}
			};

			// Updated selectors based on current LeetCode structure
			const stats = {
				totalSolved: getNumber('[data-cy="solved-count"]'),
				totalQuestions: getNumber('[data-cy="total-questions-count"]'),
				easySolved: getNumber('[data-difficulty="EASY"] span.text-base'),
				mediumSolved: getNumber('[data-difficulty="MEDIUM"] span.text-base'),
				hardSolved: getNumber('[data-difficulty="HARD"] span.text-base'),
				acceptanceRate: document.querySelector('[data-cy="acceptance-rate"]')?.textContent?.trim() || '0%',
				ranking: getNumber('[data-cy="ranking"]'),
				contributionPoints: getNumber('[data-cy="points"]'),
				reputation: getNumber('[data-cy="reputation"]')
			};

			console.log('Extracted stats:', stats);
			return stats;
		});

		// Extract recent submissions with updated selectors
		const submissions = await page.evaluate(() => {
			try {
				const submissionRows = document.querySelectorAll('[data-cy="recent-submission-row"]');
				console.log('Found submission rows:', submissionRows.length);
				
				return Array.from(submissionRows).map(row => {
					const submission = {
						title: row.querySelector('[data-cy="submission-title"]')?.textContent?.trim() || '',
						difficulty: row.querySelector('[data-cy="submission-difficulty"]')?.textContent?.trim() || '',
						status: row.querySelector('[data-cy="submission-status"]')?.textContent?.trim() || '',
						language: row.querySelector('[data-cy="submission-language"]')?.textContent?.trim() || '',
						timestamp: row.querySelector('[data-cy="submission-timestamp"]')?.textContent?.trim() || ''
					};
					console.log('Extracted submission:', submission);
					return submission;
				}).slice(0, 10);
			} catch (error) {
				console.error('Error extracting submissions:', error);
				return [];
			}
		});

		// Calculate additional metrics with safe math operations
		const metrics = {
			problemsSolvedPercentage: stats.totalQuestions > 0 
				? ((stats.totalSolved / stats.totalQuestions) * 100).toFixed(1) 
				: '0.0',
			difficultyDistribution: {
				easy: stats.totalSolved > 0 
					? ((stats.easySolved / stats.totalSolved) * 100).toFixed(1) 
					: '0.0',
				medium: stats.totalSolved > 0 
					? ((stats.mediumSolved / stats.totalSolved) * 100).toFixed(1) 
					: '0.0',
				hard: stats.totalSolved > 0 
					? ((stats.hardSolved / stats.totalSolved) * 100).toFixed(1) 
					: '0.0',
			},
		};

		const result = {
			username,
			stats: { ...stats },
			submissions: submissions.map(sub => ({ ...sub })),
			metrics: { ...metrics },
		};

		console.log('Final result:', result);
		return result;

	} catch (err) {
		const error = err as Error;
		console.error('LeetCode scraping error:', error);
		throw new Error(`Failed to fetch LeetCode data: ${error.message}`);
	} finally {
		try {
			await browser.close();
		} catch (error) {
			console.error('Error closing browser:', error);
		}
	}
} 