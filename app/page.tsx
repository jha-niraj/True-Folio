"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	ArrowRight, CheckCircle, Users, TrendingUp, GraduationCap,
	Code, BookOpen, Star, Rocket
} from "lucide-react"
import SmoothScroll from "@/components/smoothscroll"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import { Spotlight } from "@/components/ui/spotlight-new"
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs"
import CareerOpportunitiesSection from "@/components/(landingpage)/career-opportunities"
import EmployerSection from "@/components/(landingpage)/employer-section"
import FeaturesSection from "@/components/(landingpage)/feature-section"
import TestimonialsSection from "@/components/(landingpage)/testimonials-section"
import CTASection from "@/components/(landingpage)/cta-section"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

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
	title: "Let's do this.",
	description:
		"Turn your coding journey into a story. Our AI analyzes your platforms, builds personalized action plans, and highlights verified achievements — no more generic portfolios.",
	metrics: [
		{ label: "Success Rate", value: "85%", icon: CheckCircle },
		{ label: "Time Optimized", value: "12hrs", icon: TrendingUp },
		{ label: "Dev Community", value: "15K+", icon: Users },
	],
	features: [
		"AI-Powered Portfolio Analysis",
		"Real-time Skill Verification",
		"Personalized Growth Path",
		"Smart Achievement Tracking"
	],
}

const employerContent = {
	title: "Find Exceptional Talent Fast",
	description:
		"Skip the guesswork in hiring. Access candidates with AI-verified skills, real-time portfolios, and proven track records. Our platform helps you identify top developers who can make an immediate impact.",
	metrics: [
		{ label: "Hiring Success", value: "92%", icon: CheckCircle },
		{ label: "Time Saved", value: "75%", icon: TrendingUp },
		{ label: "Active Talents", value: "10K+", icon: Users },
	],
	features: [
		"AI-verified candidates",
		"Real-time skill assessment",
		"Instant portfolio access",
		"Smart matching algorithm",
	],
}

export default function LandingPage() {
	const [isEmployer, setIsEmployer] = useState(false)
	const { user, isLoaded } = useUser();
	const currentContent = isEmployer ? employerContent : studentContent

	return (
		<SmoothScroll>
			<Navbar />
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
												{isEmployer ? "AI-Powered Talent Platform" : "AI-Powered Portfolio Revolution"}
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
										{
											isEmployer ? (
												<>
													<span className="text-gray-900 dark:text-white">Find </span>
													<span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-gray-900 dark:to-white bg-clip-text text-transparent">
														Exceptional
													</span>
													<span className="text-gray-900 dark:text-white"> Talent </span>
													<span className="bg-gradient-to-r from-gray-900 dark:from-white via-emerald-400 to-teal-400 bg-clip-text text-transparent">
														Fast
													</span>
												</>) : (
												<>
													<span className="text-gray-900 dark:text-white">Build a </span>
													<span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-gray-900 dark:to-white bg-clip-text text-transparent">
														Portfolio
													</span>
													<span className="text-gray-900 dark:text-white"> that </span>
													<span className="bg-gradient-to-r from-gray-900 dark:from-white via-emerald-400 to-teal-400 bg-clip-text text-transparent">
														Actually Works
													</span>
												</>
											)
										}
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
									{
										currentContent.metrics.map((metric, index) => (
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
										))
									}
								</motion.div>
								<div className="space-y-6">
									<motion.div
										className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.5 }}
									>
										{
											!user ? (
												<>
													<SignUpButton mode="modal" forceRedirectUrl="/details">
														<Button className="cursor-pointer relative group px-8 py-3 rounded-xl overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
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
															className="cursor-pointer px-8 py-3 rounded-xl border-2 border-teal-500/50 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-all duration-300"
														>
															Sign In
														</Button>
													</SignInButton>
												</>
											) : (
												<Link href="/details">
													<Button className="cursor-pointer relative group px-8 py-3 rounded-xl overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
														<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
														<span className="relative">
															Continue Building Portfolio
															<ArrowRight className="inline-block ml-2 h-5 w-5" />
														</span>
													</Button>
												</Link>
											)
										}
									</motion.div>
									<motion.div
										className="flex flex-wrap gap-2 justify-center mt-8"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.6 }}
									>
										{
											currentContent.features.map((feature, index) => (
												<Badge
													key={index}
													variant="secondary"
													className="bg-white/80 dark:bg-white/5 backdrop-blur-sm text-gray-600 dark:text-gray-300 border-teal-500/20 px-3 py-1"
												>
													✨ {feature}
												</Badge>
											))
										}
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

				<CareerOpportunitiesSection isEmployer={isEmployer} />
				<EmployerSection isEmployer={isEmployer} />
				<FeaturesSection />
				<TestimonialsSection />
				<CTASection SignUpButton={SignUpButton} />
			</div>
			<Footer />
		</SmoothScroll>
	)
}