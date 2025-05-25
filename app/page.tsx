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

function CustomSwitch({ value, onValueChange }: { value: boolean; onValueChange: (value: boolean) => void }) {
	return (
		<motion.div
			className="flex items-center justify-center"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5 }}
		>
			<div
				className="relative w-80 h-14 bg-gray-100 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
				onClick={() => onValueChange(!value)}
			>
				<motion.div
					className="absolute top-1 w-[152px] h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow-lg"
					animate={{ x: value ? 152 : 4 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
				/>
				<div className="absolute inset-0 flex items-center justify-between px-8 text-sm font-semibold">
					<span className={`transition-colors duration-300 ${!value ? "text-white" : "text-gray-600"}`}>
						For Students
					</span>
					<span className={`transition-colors duration-300 ${value ? "text-white" : "text-gray-600"}`}>
						For Employers
					</span>
				</div>
			</div>
		</motion.div>
	)
}

export default function LandingPage() {
	const [isEmployer, setIsEmployer] = useState(false)

	const studentContent = {
		title: "Build Your AI-Powered Portfolio",
		description:
			"Transform your coding journey into a compelling story. Connect GitHub, LeetCode, and social platforms to create a portfolio that speaks to employers.",
		metrics: [
			{ label: "Students Empowered", value: "15K+", icon: Users },
			{ label: "Success Stories", value: "8.2K+", icon: CheckCircle },
			{ label: "Average Salary Boost", value: "40%", icon: TrendingUp },
		],
		features: ["Real-time GitHub sync", "LeetCode progress tracking", "AI skill analysis", "Direct job applications"],
	}

	const employerContent = {
		title: "Discover Verified Talent",
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

	const currentContent = isEmployer ? employerContent : studentContent

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

	return (
		<div className="bg-gradient-to-br from-gray-50 to-white">
			<section className="min-h-screen flex items-center py-20 relative overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
					<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
				</div>
				<div className="max-w-7xl mx-auto px-6 w-full relative z-10">
					<div className="text-center">
						<motion.div
							className="max-w-5xl mx-auto"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
								<Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 mb-8 px-4 py-2">
									<Star className="h-4 w-4 mr-2" />
									AI-Verified Platform
								</Badge>
							</motion.div>
							<motion.div
								className="space-y-6 mb-10"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
							>
								<h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
									{currentContent.title}
								</h1>
								<p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
									{currentContent.description}
								</p>
							</motion.div>
							<motion.div
								className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
							>
								{
									currentContent.metrics.map((metric, index) => (
										<motion.div
											key={index}
											className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100"
											whileHover={{ scale: 1.05, y: -5 }}
											transition={{ type: "spring", stiffness: 300 }}
										>
											<metric.icon className="h-10 w-10 text-teal-500 mx-auto mb-3" />
											<div className="text-3xl font-bold text-teal-600 mb-2">{metric.value}</div>
											<div className="text-gray-600 font-medium text-sm">{metric.label}</div>
										</motion.div>
									))
								}
							</motion.div>
							<CustomSwitch value={isEmployer} onValueChange={setIsEmployer} />
							<motion.div
								className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6 }}
							>
								<Link href="/input">
									<Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
										Get Started Free
										<ArrowRight className="ml-2 h-5 w-5" />
									</Button>
								</Link>
								<Button
									variant="outline"
									className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
								>
									Watch Demo
								</Button>
							</motion.div>
							<motion.div
								className="flex flex-wrap gap-3 justify-center mt-8"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7 }}
							>
								{
									currentContent.features.map((feature, index) => (
										<Badge
											key={index}
											variant="secondary"
											className="bg-white/80 text-gray-700 border-gray-200 px-3 py-1"
										>
											✓ {feature}
										</Badge>
									))
								}
							</motion.div>
						</motion.div>
					</div>
				</div>
			</section>
			<section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
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
									<Link href="https://thecoderz.in.net" target="_blank" rel="noopener noreferrer">
										<Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 py-3 rounded-xl">
											<Globe className="h-4 w-4 mr-2" />
											Visit The Coderz
											<ExternalLink className="h-4 w-4 ml-2" />
										</Button>
									</Link>
									<Button
										variant="outline"
										className="border-white text-black hover:bg-white hover:text-black px-6 py-3 rounded-xl"
									>
										Join Waitlist
									</Button>
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
			{
				!isEmployer && (
					<>
						<section className="py-20 bg-white">
							<div className="max-w-7xl mx-auto px-6">
								<motion.div
									className="text-center mb-12"
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8 }}
									viewport={{ once: true }}
								>
									<h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
										Apply to Jobs Directly
									</h2>
									<p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
										<Card className="text-center border-gray-200 hover:shadow-lg transition-all duration-300 group">
											<CardHeader>
												<div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
													<Briefcase className="h-8 w-8 text-white" />
												</div>
												<CardTitle className="text-lg">Curated Opportunities</CardTitle>
											</CardHeader>
											<CardContent>
												<CardDescription className="text-gray-600">
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
										<Card className="text-center border-gray-200 hover:shadow-lg transition-all duration-300 group">
											<CardHeader>
												<div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
													<Shield className="h-8 w-8 text-white" />
												</div>
												<CardTitle className="text-lg">Verified Applications</CardTitle>
											</CardHeader>
											<CardContent>
												<CardDescription className="text-gray-600">
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
										<Card className="text-center border-gray-200 hover:shadow-lg transition-all duration-300 group">
											<CardHeader>
												<div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
													<TrendingUp className="h-8 w-8 text-white" />
												</div>
												<CardTitle className="text-lg">Higher Success Rate</CardTitle>
											</CardHeader>
											<CardContent>
												<CardDescription className="text-gray-600">
													3x higher interview rate compared to traditional job applications
												</CardDescription>
											</CardContent>
										</Card>
									</motion.div>
								</div>
							</div>
						</section>
						<section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
							<div className="max-w-7xl mx-auto px-6">
								<motion.div
									className="text-center mb-12"
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8 }}
									viewport={{ once: true }}
								>
									<h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
										Student Success Stories
									</h2>
									<p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
												<Card className="text-center border-gray-200 hover:shadow-lg transition-shadow">
													<CardContent className="pt-6">
														<div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
															{story.name[0]}
														</div>
														<h3 className="font-bold mb-1">{story.name}</h3>
														<p className="text-gray-600 mb-2 text-sm">{story.role}</p>
														<p className="text-green-600 font-bold mb-1">{story.salary}</p>
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
				)
			}
			{
				isEmployer && (
					<section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
						<div className="max-w-7xl mx-auto px-6">
							<motion.div
								className="text-center mb-12"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
							>
								<h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
									Why Top Companies Choose Us
								</h2>
								<p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
									<Card className="text-center border-gray-200 hover:shadow-lg transition-all duration-300 group">
										<CardHeader>
											<div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
												<Building2 className="h-8 w-8 text-white" />
											</div>
											<CardTitle className="text-lg">Pre-Screened Talent</CardTitle>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-gray-600">
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
									<Card className="text-center border-gray-200 hover:shadow-lg transition-all duration-300 group">
										<CardHeader>
											<div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
												<Zap className="h-8 w-8 text-white" />
											</div>
											<CardTitle className="text-lg">Faster Hiring</CardTitle>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-gray-600">
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
									<Card className="text-center border-gray-200 hover:shadow-lg transition-all duration-300 group">
										<CardHeader>
											<div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
												<Award className="h-8 w-8 text-white" />
											</div>
											<CardTitle className="text-lg">Quality Guarantee</CardTitle>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-gray-600">
												95% of our placements exceed performance expectations in their first year
											</CardDescription>
										</CardContent>
									</Card>
								</motion.div>
							</div>
						</div>
					</section>
				)
			}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
							Powerful Features for Modern Careers
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
									<Card className="border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg group">
										<CardHeader>
											<div className="flex items-center gap-4">
												<div
													className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}
												>
													<feature.icon className="h-6 w-6 text-white" />
												</div>
												<CardTitle className="text-lg text-gray-900">{feature.title}</CardTitle>
											</div>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
										</CardContent>
									</Card>
								</motion.div>
							))
						}
					</div>
				</div>
			</section>
			<section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
				<div className="max-w-7xl mx-auto px-6">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
							Trusted by Industry Leaders
						</h2>
						<p className="text-lg text-gray-600">See how our platform is transforming careers and hiring</p>
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
									<Card className="border-gray-200 bg-white hover:shadow-lg transition-all duration-300">
										<CardContent className="pt-6">
											<blockquote className="text-gray-700 mb-4 leading-relaxed">"{testimonial.text}"</blockquote>
											<div className="flex items-center gap-4">
												<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
													{testimonial.avatar}
												</div>
												<div>
													<div className="font-semibold text-gray-900">{testimonial.author}</div>
													<div className="text-sm text-gray-600">{testimonial.role}</div>
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
			<section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-600">
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
							<Button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
								Start Building Now
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</Link>
					</motion.div>
				</div>
			</section>
		</div>
	)
}