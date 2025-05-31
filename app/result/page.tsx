"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	Brain, Star, TrendingUp, Sparkles, Target, CheckCircle,
	Github, Code2, ArrowRight, Rocket, Lightbulb, Award
} from "lucide-react"
import { generatePortfolioInsights } from "@/actions/platform.action"

interface PortfolioInsights {
	summary: {
		title: string
		description: string
	}
	skills: {
		languages: string[]
		frameworks: string[]
		tools: string[]
	}
	insights: {
		strengths: string[]
		improvements: string[]
		recommendations: string[]
	}
	metrics: {
		githubActivity: string
		codingProficiency: string
		overallScore: string
	}
}

export default function ResultPage() {
	const { user } = useUser()
	const [insights, setInsights] = useState<PortfolioInsights | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchInsights = async () => {
			try {
				const data = await generatePortfolioInsights(user?.id || "")
				setInsights(data)
			} catch (error) {
				console.error("Failed to fetch insights:", error)
			} finally {
				setIsLoading(false)
			}
		}

		if (user?.id) {
			fetchInsights()
		}
	}, [user?.id])

	if (isLoading) {
		return (
			<div className="min-h-screen bg-white dark:bg-black pt-28">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center">
						<motion.div
							animate={{ rotate: 360 }}
							transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
							className="inline-block"
						>
							<Brain className="h-12 w-12 text-teal-500" />
						</motion.div>
						<h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
							Analyzing your profiles...
						</h2>
						<p className="mt-2 text-gray-600 dark:text-gray-400">
							Our AI is gathering insights from your GitHub and LeetCode activity
						</p>
					</div>
				</div>
			</div>
		)
	}

	if (!insights) {
		return (
			<div className="min-h-screen bg-white dark:bg-black pt-28">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center">
						<div className="inline-block p-4 rounded-full bg-red-100 dark:bg-red-900">
							<Brain className="h-12 w-12 text-red-500" />
						</div>
						<h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
							No insights available
						</h2>
						<p className="mt-2 text-gray-600 dark:text-gray-400">
							Please make sure you have connected your GitHub and LeetCode profiles
						</p>
						<Button
							onClick={() => window.location.href = "/details"}
							className="mt-6 bg-gradient-to-r from-teal-500 to-emerald-500"
						>
							Connect Profiles
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-white dark:bg-black pt-28">
			<div className="max-w-7xl mx-auto px-6">
				{/* Header */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className="flex items-center justify-center gap-4 mb-6">
						<Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-1">
							<Brain className="h-4 w-4 mr-2" />
							AI Analysis Complete
						</Badge>
						<Badge variant="outline" className="px-4 py-1 border-teal-500/20">
							<Target className="h-4 w-4 mr-2" />
							Overall Score: {insights.metrics.overallScore}
						</Badge>
					</div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
						{insights.summary.title}
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
						{insights.summary.description}
					</p>
				</motion.div>

				{/* Skills Section */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Code2 className="h-5 w-5 text-teal-500" />
								Languages
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{insights.skills.languages.map((lang, i) => (
									<Badge key={i} variant="secondary">
										{lang}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Rocket className="h-5 w-5 text-teal-500" />
								Frameworks
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{insights.skills.frameworks.map((framework, i) => (
									<Badge key={i} variant="secondary">
										{framework}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>

					<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Sparkles className="h-5 w-5 text-teal-500" />
								Tools
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								{insights.skills.tools.map((tool, i) => (
									<Badge key={i} variant="secondary">
										{tool}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Insights Tabs */}
				<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mb-12">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Lightbulb className="h-5 w-5 text-teal-500" />
							AI Insights
						</CardTitle>
						<CardDescription>
							Detailed analysis of your coding profile and recommendations
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="strengths">
							<TabsList className="mb-6">
								<TabsTrigger value="strengths" className="flex items-center gap-2">
									<Star className="h-4 w-4" />
									Strengths
								</TabsTrigger>
								<TabsTrigger value="improvements" className="flex items-center gap-2">
									<TrendingUp className="h-4 w-4" />
									Areas for Growth
								</TabsTrigger>
								<TabsTrigger value="recommendations" className="flex items-center gap-2">
									<Award className="h-4 w-4" />
									Recommendations
								</TabsTrigger>
							</TabsList>

							<TabsContent value="strengths">
								<ul className="space-y-4">
									{insights.insights.strengths.map((strength, i) => (
										<li key={i} className="flex items-start gap-3">
											<CheckCircle className="h-5 w-5 text-teal-500 mt-1 flex-shrink-0" />
											<span className="text-gray-700 dark:text-gray-300">{strength}</span>
										</li>
									))}
								</ul>
							</TabsContent>

							<TabsContent value="improvements">
								<ul className="space-y-4">
									{insights.insights.improvements.map((improvement, i) => (
										<li key={i} className="flex items-start gap-3">
											<TrendingUp className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
											<span className="text-gray-700 dark:text-gray-300">{improvement}</span>
										</li>
									))}
								</ul>
							</TabsContent>

							<TabsContent value="recommendations">
								<ul className="space-y-4">
									{insights.insights.recommendations.map((recommendation, i) => (
										<li key={i} className="flex items-start gap-3">
											<Rocket className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
											<span className="text-gray-700 dark:text-gray-300">{recommendation}</span>
										</li>
									))}
								</ul>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>

				{/* Activity Metrics */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Github className="h-5 w-5 text-teal-500" />
								GitHub Activity
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-700 dark:text-gray-300">
								{insights.metrics.githubActivity}
							</p>
						</CardContent>
					</Card>

					<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Code2 className="h-5 w-5 text-teal-500" />
								LeetCode Proficiency
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-700 dark:text-gray-300">
								{insights.metrics.codingProficiency}
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
} 