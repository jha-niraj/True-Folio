"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Database, Brain, Shield, Bell,
	ArrowRight, CheckCircle, Users, TrendingUp, Briefcase, GraduationCap,
	Code, BookOpen, Star, Zap, Building2, Award, Rocket, Globe, ExternalLink
} from "lucide-react"
import SmoothScroll from "@/components/smoothscroll"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import { Spotlight } from "@/components/ui/spotlight-new"
import { SignInButton, SignUpButton } from "@clerk/nextjs"

function CustomSwitch({ value, onValueChange }: { value: boolean; onValueChange: (value: boolean) => void }) {
	return (
		<motion.div
			className="flex items-center justify-center"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5 }}
		>
			<div
				className="relative w-56 h-10 bg-white/5 rounded-full cursor-pointer hover:bg-white/10 transition-all duration-300 border border-teal-500/20"
				onClick={() => onValueChange(!value)}
			>
				<motion.div
					className="absolute top-1 w-[108px] h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
					animate={{ x: value ? 108 : 4 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
				/>
				<div className="absolute inset-0 flex items-center justify-between px-6 text-sm font-medium">
					<span className={`transition-colors duration-300 ${!value ? "text-white" : "text-gray-400"}`}>
						For Devs
					</span>
					<span className={`transition-colors duration-300 ${value ? "text-white" : "text-gray-400"}`}>
						For Hiring
					</span>
				</div>
			</div>
		</motion.div>
	)
}
const studentContent = {
	title: "Where Traditional Portfolios Go to Retire",
	description:
		"Tired of your portfolio looking like a 90's resume with a GitHub link? We use AI to transform your messy code history into a masterpiece that even your tech lead would approve. Because let's be honest, recruiters don't want to count your commit messages.",
	metrics: [
		{ label: "Portfolios Transformed", value: "15K+", icon: Users },
		{ label: "Interview Success Rate", value: "85%", icon: CheckCircle },
		{ label: "Time Saved/Dev", value: "12hrs", icon: TrendingUp },
	],
	features: ["AI Resume Whisperer", "Git History Beautifier", "Achievement Unlocked System", "Recruiter Magnet Mode"],
}

const employerContent = {
	title: "Find Exceptional Talent Fast",
	description:
		"Skip the guesswork in hiring. Access candidates with AI-verified skills, real-time portfolios, and proven track records.",
	metrics: [
		{ label: "Employers Trust Us", value: "3.5K+", icon: Users },
		{ label: "Successful Hires", value: "12K+", icon: CheckCircle },
		{ label: "Time Saved", value: "75%", icon: TrendingUp },
	],
	features: [
		"AI-verified candidates",
		"Real-time skill assessment",
		"Instant portfolio access",
		"Smart matching algorithm",
	],
}

const features = [
	{
		icon: Database,
		title: "Real-Time Data Sync",
		description:
			"Automatically sync your latest projects, commits, and achievements from GitHub, LeetCode, and other platforms.",
		color: "from-blue-500 to-blue-600",
	},
	{
		icon: Brain,
		title: "AI-Powered Insights",
		description:
			"Get intelligent analysis of your coding patterns, skill progression, and personalized recommendations.",
		color: "from-purple-500 to-purple-600",
	},
	{
		icon: Shield,
		title: "Verified Achievements",
		description:
			"Earn credible verification badges that employers trust, backed by real data from your coding platforms.",
		color: "from-green-500 to-green-600",
	},
	{
		icon: Bell,
		title: "Smart Job Matching",
		description:
			"Receive instant notifications when opportunities perfectly match your verified skills and experience level.",
		color: "from-orange-500 to-orange-600",
	},
]

const testimonials = [
	{
		text: "This platform transformed my job search. The AI insights helped me understand my strengths and landed me a senior role at a top tech company within 3 weeks!",
		author: "Sarah Chen",
		role: "Senior Software Engineer at Google",
		avatar: "SC",
	},
	{
		text: "We've hired 50+ developers through this platform. The verified portfolios save us countless hours in technical screening. It's a game-changer for recruitment.",
		author: "Mike Rodriguez",
		role: "Head of Engineering at Stripe",
		avatar: "MR",
	},
]

export default function LandingPage() {
	const [isEmployer, setIsEmployer] = useState(false)
	const currentContent = isEmployer ? employerContent : studentContent

	return (
		<SmoothScroll>
			<div className="w-full">
				<section className="relative min-h-screen bg-white dark:bg-black overflow-hidden flex items-center">
					<Spotlight />
					
					<div className="relative z-10 w-full pt-16">
						<div className="max-w-7xl mx-auto px-6">
							<div className="text-center space-y-2">
								<div className="flex items-center justify-center gap-4">
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2 }}
									>
										<Badge 
											className="px-4 py-2 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 backdrop-blur-sm border-teal-500/20"
										>
											<Star className="h-4 w-4 mr-2 text-teal-500" />
											<span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent font-medium">
												AI-Powered Portfolio Revolution
											</span>
										</Badge>
									</motion.div>
									<CustomSwitch value={isEmployer} onValueChange={setIsEmployer} />
								</div>

								<motion.div
									className="max-w-4xl mx-auto space-y-4"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 }}
								>
									<h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
										<span className="text-gray-900 dark:text-white">Build a </span>
										<span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-gray-900 dark:to-white bg-clip-text text-transparent">
											Portfolio
										</span>
										<span className="text-gray-900 dark:text-white"> that </span>
										<span className="bg-gradient-to-r from-gray-900 dark:from-white via-emerald-400 to-teal-400 bg-clip-text text-transparent">
											Actually Works
										</span>
									</h1>
									<p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
										{currentContent.description}
									</p>
								</motion.div>

								<motion.div
									className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
								>
									{currentContent.metrics.map((metric, index) => (
										<motion.div
											key={index}
											className="relative group"
											whileHover={{ scale: 1.02 }}
											transition={{ type: "spring", stiffness: 300 }}
										>
											<div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
											<div className="relative p-4 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-teal-500/20">
												<metric.icon className="h-8 w-8 text-teal-600 dark:text-teal-400 mx-auto mb-2" />
												<div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent mb-1">
													{metric.value}
												</div>
												<div className="text-gray-600 dark:text-gray-400 text-sm">
													{metric.label}
												</div>
											</div>
										</motion.div>
									))}
								</motion.div>

								<div className="space-y-6">
									<motion.div
										className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.5 }}
									>
										<SignUpButton mode="modal" forceRedirectUrl="/details">
											<Button className="relative group px-8 py-3 rounded-xl overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
												<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
												<span className="relative">
													Transform Your Portfolio
													<ArrowRight className="inline-block ml-2 h-5 w-5" />
												</span>
											</Button>
										</SignUpButton>
										<SignInButton mode="modal" forceRedirectUrl="/details">
											<Button
												variant="outline"
												className="px-8 py-3 rounded-xl border-2 border-teal-500/50 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-all duration-300"
											>
												Sign In
											</Button>
										</SignInButton>
									</motion.div>

									<motion.div
										className="flex flex-wrap gap-2 justify-center mt-8"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.6 }}
									>
										{currentContent.features.map((feature, index) => (
											<Badge
												key={index}
												variant="secondary"
												className="bg-white/80 dark:bg-white/5 backdrop-blur-sm text-gray-600 dark:text-gray-300 border-teal-500/20 px-3 py-1"
											>
												✨ {feature}
											</Badge>
										))}
									</motion.div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="py-20 bg-gradient-to-br from-teal-900 via-emerald-900 to-cyan-900 dark:bg-black dark:bg-none text-white relative overflow-hidden">
					<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
					<div className="max-w-7xl mx-auto px-6 relative z-10">
						<motion.div
							className="text-center mb-12"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black mb-4 px-4 py-2">
								<Rocket className="h-4 w-4 mr-2" />
								Coming Soon
							</Badge>
							<h2 className="text-3xl lg:text-4xl font-bold mb-4">
								Meet{" "}
								<span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
									The Coderz
								</span>
							</h2>
							<p className="text-lg text-gray-300 max-w-2xl mx-auto">
								Your ultimate learning companion for computer science. Master algorithms, ace interviews, and build the
								skills that matter.
							</p>
						</motion.div>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
							>
								<div className="space-y-6">
									<div className="flex items-start gap-4">
										<div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
											<Code className="h-6 w-6 text-black" />
										</div>
										<div>
											<h3 className="text-xl font-bold mb-2">Interactive Coding Challenges</h3>
											<p className="text-gray-300 text-sm leading-relaxed">
												Practice with 1000+ curated problems, get instant feedback, and track your progress across data
												structures and algorithms.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl">
											<BookOpen className="h-6 w-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-bold mb-2">Comprehensive Learning Paths</h3>
											<p className="text-gray-300 text-sm leading-relaxed">
												From beginner to expert, follow structured paths designed by industry professionals from FAANG
												companies.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="p-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl">
											<GraduationCap className="h-6 w-6 text-white" />
										</div>
										<div>
											<h3 className="text-xl font-bold mb-2">AI-Powered Mentorship</h3>
											<p className="text-gray-300 text-sm leading-relaxed">
												Get personalized guidance, code reviews, and career advice from our AI mentor.
											</p>
										</div>
									</div>
									<div className="flex gap-4">
										<WaitlistDialog />
									</div>
								</div>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
								className="relative"
							>
								<div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-2xl">
									<div className="flex items-center gap-2 mb-4">
										<div className="w-3 h-3 bg-red-500 rounded-full"></div>
										<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
										<div className="w-3 h-3 bg-green-500 rounded-full"></div>
									</div>
									<div className="space-y-3 font-mono text-sm">
										<div className="text-green-400">$ thecoderz --start-journey</div>
										<div className="text-blue-400">Initializing learning environment...</div>
										<div className="text-yellow-400">Loading 1000+ coding challenges ✓</div>
										<div className="text-purple-400">Setting up AI mentor ✓</div>
										<div className="text-green-400">Ready to code! 🚀</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{!isEmployer && (
					<>
						<section className="py-20 bg-white dark:bg-black">
							<div className="max-w-7xl mx-auto px-6">
								<motion.div
									className="text-center mb-12"
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8 }}
									viewport={{ once: true }}
								>
									<h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
										Apply to Jobs Directly
									</h2>
									<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
										Skip the endless job boards. Apply directly to companies through our platform with your verified
										portfolio
									</p>
								</motion.div>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<motion.div
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6 }}
										viewport={{ once: true }}
									>
										<Card className="text-center border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 group">
											<CardHeader>
												<div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
													<Briefcase className="h-8 w-8 text-white" />
												</div>
												<CardTitle className="text-lg dark:text-white">Curated Opportunities</CardTitle>
											</CardHeader>
											<CardContent>
												<CardDescription className="text-gray-600 dark:text-gray-300">
													Access exclusive job openings from top tech companies looking for verified talent
												</CardDescription>
											</CardContent>
										</Card>
									</motion.div>
									<motion.div
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.1 }}
										viewport={{ once: true }}
									>
										<Card className="text-center border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 group">
											<CardHeader>
												<div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
													<Shield className="h-8 w-8 text-white" />
												</div>
												<CardTitle className="text-lg dark:text-white">Verified Applications</CardTitle>
											</CardHeader>
											<CardContent>
												<CardDescription className="text-gray-600 dark:text-gray-300">
													Your applications come with AI-verified skills and achievements that employers trust
												</CardDescription>
											</CardContent>
										</Card>
									</motion.div>
									<motion.div
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: 0.2 }}
										viewport={{ once: true }}
									>
										<Card className="text-center border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 group">
											<CardHeader>
												<div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
													<TrendingUp className="h-8 w-8 text-white" />
												</div>
												<CardTitle className="text-lg dark:text-white">Higher Success Rate</CardTitle>
											</CardHeader>
											<CardContent>
												<CardDescription className="text-gray-600 dark:text-gray-300">
													3x higher interview rate compared to traditional job applications
												</CardDescription>
											</CardContent>
										</Card>
									</motion.div>
								</div>
							</div>
						</section>
						<section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:bg-black dark:bg-none">
							<div className="max-w-7xl mx-auto px-6">
								<motion.div
									className="text-center mb-12"
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8 }}
									viewport={{ once: true }}
								>
									<h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent mb-4">
										Student Success Stories
									</h2>
									<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
										See how students transformed their careers with our platform
									</p>
								</motion.div>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
									{
										[
											{ name: "Alex", role: "SDE at Google", salary: "$180k", time: "3 weeks" },
											{ name: "Priya", role: "Frontend at Meta", salary: "$165k", time: "2 months" },
											{ name: "David", role: "Backend at Netflix", salary: "$170k", time: "1 month" },
											{ name: "Sarah", role: "Full Stack at Stripe", salary: "$160k", time: "6 weeks" },
										].map((story, index) => (
											<motion.div
												key={index}
												initial={{ opacity: 0, y: 30 }}
												whileInView={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.6, delay: index * 0.1 }}
												viewport={{ once: true }}
											>
												<Card className="text-center border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-shadow">
													<CardContent className="pt-6">
														<div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
															{story.name[0]}
														</div>
														<h3 className="font-bold mb-1">{story.name}</h3>
														<p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">{story.role}</p>
														<p className="text-green-600 dark:text-green-400 font-bold mb-1">{story.salary}</p>
														<p className="text-xs text-gray-500">Hired in {story.time}</p>
													</CardContent>
												</Card>
											</motion.div>
										))
									}
								</div>
							</div>
						</section>
					</>
				)}

				{isEmployer && (
					<section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:bg-black dark:bg-none">
						<div className="max-w-7xl mx-auto px-6">
							<motion.div
								className="text-center mb-12"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
							>
								<h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
									Why Top Companies Choose Us
								</h2>
								<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
									Join industry leaders who trust our platform for their hiring needs
								</p>
							</motion.div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<motion.div
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6 }}
									viewport={{ once: true }}
								>
									<Card className="text-center border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 group">
										<CardHeader>
											<div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
												<Building2 className="h-8 w-8 text-white" />
											</div>
											<CardTitle className="text-lg dark:text-white">Pre-Screened Talent</CardTitle>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-gray-600 dark:text-gray-300">
												All candidates come with AI-verified skills and real project portfolios
											</CardDescription>
										</CardContent>
									</Card>
								</motion.div>
								<motion.div
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.1 }}
									viewport={{ once: true }}
								>
									<Card className="text-center border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 group">
										<CardHeader>
											<div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
												<Zap className="h-8 w-8 text-white" />
											</div>
											<CardTitle className="text-lg dark:text-white">Faster Hiring</CardTitle>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-gray-600 dark:text-gray-300">
												Reduce time-to-hire by 75% with our intelligent matching algorithm
											</CardDescription>
										</CardContent>
									</Card>
								</motion.div>
								<motion.div
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
									viewport={{ once: true }}
								>
									<Card className="text-center border-gray-200 dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 group">
										<CardHeader>
											<div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
												<Award className="h-8 w-8 text-white" />
											</div>
											<CardTitle className="text-lg dark:text-white">Quality Guarantee</CardTitle>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-gray-600 dark:text-gray-300">
												95% of our placements exceed performance expectations in their first year
											</CardDescription>
										</CardContent>
									</Card>
								</motion.div>
							</div>
						</div>
					</section>
				)}

				<section className="py-20 bg-white dark:bg-black">
					<div className="max-w-7xl mx-auto px-6">
						<motion.div
							className="text-center mb-16"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-4">
								Powerful Features for Modern Careers
							</h2>
							<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
								Everything you need to showcase your skills and connect with opportunities in the digital age
							</p>
						</motion.div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{
								features.map((feature, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										viewport={{ once: true }}
									>
										<Card className="border-gray-200 dark:border-gray-700 hover:border-gray-300 transition-all duration-300 hover:shadow-lg group">
											<CardHeader>
												<div className="flex items-center gap-4">
													<div
														className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}
													>
														<feature.icon className="h-6 w-6 text-white" />
													</div>
													<CardTitle className="text-lg text-gray-900 dark:text-gray-100">{feature.title}</CardTitle>
												</div>
											</CardHeader>
											<CardContent>
												<CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</CardDescription>
											</CardContent>
										</Card>
									</motion.div>
								))
							}
						</div>
					</div>
				</section>

				<section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-black dark:bg-none">
					<div className="max-w-7xl mx-auto px-6">
						<motion.div
							className="text-center mb-16"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-4">
								Trusted by Industry Leaders
							</h2>
							<p className="text-lg text-gray-600 dark:text-gray-300">See how our platform is transforming careers and hiring</p>
						</motion.div>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{
								testimonials.map((testimonial, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.2 }}
										viewport={{ once: true }}
									>
										<Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300">
											<CardContent className="pt-6">
												<blockquote className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">"{testimonial.text}"</blockquote>
												<div className="flex items-center gap-4">
													<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
														{testimonial.avatar}
													</div>
													<div>
														<div className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.author}</div>
														<div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
													</div>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								))
							}
						</div>
					</div>
				</section>

				<section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-900/50 dark:to-emerald-900/50">
					<div className="max-w-7xl mx-auto px-6 text-center">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
							<p className="text-lg text-teal-100 mb-8 max-w-2xl mx-auto">
								Join thousands of professionals who've accelerated their careers with AI-powered portfolios
							</p>
							<Link href="/input">
								<Button className="bg-white dark:bg-gray-900 text-teal-600 dark:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
									Start Building Now
									<ArrowRight className="ml-2 h-5 w-5" />
								</Button>
							</Link>
						</motion.div>
					</div>
				</section>
			</div>
		</SmoothScroll>
	)
}