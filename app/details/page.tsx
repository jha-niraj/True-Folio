"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
	Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
	Code, Users, PenTool, Mail, Github, Code2, Linkedin, Twitter, FileText, Hash, Plus,
	CheckCircle, ArrowRight, Sparkles, Instagram, Youtube, Globe, Briefcase, MessageSquare
} from "lucide-react"
import { savePlatformData, getUserPlatforms } from "@/actions/platform.action"
import { PlatformType } from "@/lib/generated/prisma"

interface UserData {
	code: { platform: string; link: string }[]
	socials: { platform: string; link: string }[]
	blogs: { platform: string; link: string }[]
	contact: { platform: string; link: string }[]
}

export default function InputPage() {
	const router = useRouter()
	const { user } = useUser()
	const [userData, setUserData] = useState<UserData>({
		code: [],
		socials: [],
		blogs: [],
		contact: [],
	})
	const [dialogOpen, setDialogOpen] = useState(false)
	const [customDialogOpen, setCustomDialogOpen] = useState(false)
	const [currentCategory, setCurrentCategory] = useState<keyof UserData>("code")
	const [selectedPlatform, setSelectedPlatform] = useState("")
	const [inputLink, setInputLink] = useState("")
	const [customPlatform, setCustomPlatform] = useState("")
	const [customLink, setCustomLink] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	// Fetch existing platform data on mount
	useEffect(() => {
		const fetchPlatforms = async () => {
			try {
				const platforms = await getUserPlatforms();
				if (platforms.length > 0) {
					// Update userData with existing platforms
					setUserData(prev => ({
						...prev,
						code: platforms.map(p => ({
							platform: p.platform,
							link: p.link
						}))
					}));
				}
			} catch (error) {
				console.error('Error fetching platforms:', error);
				toast.error('Failed to load existing platforms');
			}
		};

		if (user?.id) {
			fetchPlatforms();
		}
	}, [user?.id]);

	const categories = [
		{
			key: "code" as keyof UserData,
			title: "Coding Platforms",
			description: "Connect your development profiles",
			icon: Code,
			color: "from-blue-500 to-purple-500",
			options: [
				{ value: "github", label: "GitHub", icon: Github },
				{ value: "leetcode", label: "LeetCode", icon: Code2 },
				{ value: "codechef", label: "CodeChef", icon: Code },
				{ value: "codeforces", label: "Codeforces", icon: Code },
				{ value: "hackerrank", label: "HackerRank", icon: Code },
				{ value: "kaggle", label: "Kaggle", icon: Code },
				{ value: "gitlab", label: "GitLab", icon: Github },
				{ value: "bitbucket", label: "Bitbucket", icon: Github },
			],
		},
		{
			key: "socials" as keyof UserData,
			title: "Social Networks",
			description: "Link your social presence",
			icon: Users,
			color: "from-green-500 to-emerald-500",
			options: [
				{ value: "linkedin", label: "LinkedIn", icon: Linkedin },
				{ value: "twitter", label: "Twitter", icon: Twitter },
				{ value: "instagram", label: "Instagram", icon: Instagram },
				{ value: "youtube", label: "YouTube", icon: Youtube },
				{ value: "discord", label: "Discord", icon: MessageSquare },
				{ value: "telegram", label: "Telegram", icon: MessageSquare },
			],
		},
		{
			key: "blogs" as keyof UserData,
			title: "Content Platforms",
			description: "Showcase your writing",
			icon: PenTool,
			color: "from-orange-500 to-red-500",
			options: [
				{ value: "medium", label: "Medium", icon: FileText },
				{ value: "hashnode", label: "Hashnode", icon: Hash },
				{ value: "devto", label: "Dev.to", icon: FileText },
				{ value: "substack", label: "Substack", icon: FileText },
				{ value: "personal-blog", label: "Personal Blog", icon: Globe },
				{ value: "notion", label: "Notion", icon: FileText },
			],
		},
		{
			key: "contact" as keyof UserData,
			title: "Contact Information",
			description: "How employers can reach you",
			icon: Mail,
			color: "from-pink-500 to-rose-500",
			options: [
				{ value: "email", label: "Email", icon: Mail },
				{ value: "phone", label: "Phone", icon: Mail },
				{ value: "website", label: "Personal Website", icon: Globe },
				{ value: "portfolio", label: "Portfolio Site", icon: Briefcase },
			],
		},
	]

	const handlePlatformSelect = (category: keyof UserData, platform: string) => {
		setCurrentCategory(category)
		setSelectedPlatform(platform)
		setDialogOpen(true)
	}

	const handleCustomPlatform = (category: keyof UserData) => {
		setCurrentCategory(category)
		setCustomDialogOpen(true)
	}

	const handleSubmit = async () => {
		if (!inputLink.trim() || !selectedPlatform) return;

		setIsLoading(true);
		try {
			// Only handle GitHub and LeetCode for now
			if (selectedPlatform === 'github' || selectedPlatform === 'leetcode') {
				const platformType = selectedPlatform === 'github' ? PlatformType.GITHUB : PlatformType.LEETCODE;
				await savePlatformData(platformType, inputLink.trim());

				setUserData((prev) => ({
					...prev,
					[currentCategory]: [...prev[currentCategory], {
						platform: selectedPlatform,
						link: inputLink.trim()
					}]
				}));
				toast.success(`${selectedPlatform} profile connected successfully!`);
			}

			setInputLink("");
			setSelectedPlatform("");
			setDialogOpen(false);
		} catch (error) {
			toast.error(`Failed to connect ${selectedPlatform} profile. Please try again.`);
		} finally {
			setIsLoading(false);
		}
	}

	const handleCustomSubmit = async () => {
		if (!customLink.trim() || !customPlatform.trim()) return;

		setUserData((prev) => ({
			...prev,
			[currentCategory]: [...prev[currentCategory], { platform: customPlatform.trim(), link: customLink.trim() }],
		}));
		setCustomLink("");
		setCustomPlatform("");
		setCustomDialogOpen(false);
	}

	const handleGeneratePortfolio = () => {
		router.push(`/result`);
	}

	const removePlatform = (category: keyof UserData, index: number) => {
		setUserData((prev) => ({
			...prev,
			[category]: prev[category].filter((_, i) => i !== index),
		}))
	}

	const totalConnections = Object.values(userData).flat().length
	const progressPercentage = Math.min((totalConnections / 8) * 100, 100)

	return (
		<div className="min-h-screen relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fillOpacity='0.1' fillRule='evenodd'%3E%3Ccircle cx='25' cy='25' r='1'/%3E%3Ccircle cx='75' cy='75' r='1'/%3E%3Ccircle cx='75' cy='25' r='1'/%3E%3Ccircle cx='25' cy='75' r='1'/%3E%3C/g%3E%3C/svg%3E')] opacity-40 dark:opacity-20" />
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 animate-pulse" />
			</div>

			<div className="relative max-w-7xl mx-auto px-6 py-32">
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 text-white px-6 py-2 mb-4 rounded-full text-sm font-medium shadow-lg dark:shadow-purple-500/20">
						<Sparkles className="h-4 w-4" />
						AI-Powered Portfolio Builder
					</div>
					<h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-300 via-teal-600 to-gray-300 dark:from-emerald-800 dark:via-white dark:to-teal-400 bg-clip-text text-transparent mb-3">
						Connect Your Digital Presence
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
						Link your platforms and let our AI create insights that showcase your true potential to employers
					</p>
					<div className="max-w-md mx-auto backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 p-4 rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-xl">
						<div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
							<span>Progress</span>
							<span>{totalConnections}/8 platforms connected</span>
						</div>
						<Progress
							value={progressPercentage}
							className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-purple-500 bg-gray-200/50 dark:bg-gray-700/50"
						/>
					</div>
				</motion.div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
					{
						categories.map((category, index) => (
							<motion.div
								key={category.key}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
							>
								<Card className="backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border-white/20 dark:border-gray-700/30 hover:border-purple-300/50 dark:hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group h-full">
									<CardHeader>
										<div className="flex items-center gap-4">
											<div className={`p-3 bg-gradient-to-r ${category.color} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
												<category.icon className="h-6 w-6 text-white" />
											</div>
											<div>
												<CardTitle className="text-xl text-gray-900 dark:text-white">{category.title}</CardTitle>
												<CardDescription className="text-gray-600 dark:text-gray-300">{category.description}</CardDescription>
											</div>
										</div>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="grid grid-cols-2 gap-2">
											{
												category.options.map((option) => {
													const isConnected = userData[category.key].some(item => item.platform === option.value)
													return (
														<button
															key={option.value}
															onClick={() => handlePlatformSelect(category.key, option.value)}
															className={`cursor-pointer flex items-center gap-2 p-3 rounded-lg border transition-all duration-300 ${isConnected
																? "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-300"
																: "bg-white/50 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/30 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-lg hover:shadow-purple-500/10"
																}`}
															disabled={isConnected}
														>
															<option.icon className="h-4 w-4" />
															<span className="text-sm font-medium">{option.label}</span>
															{
																isConnected && (
																	<CheckCircle className="h-4 w-4 ml-auto text-purple-500" />
																)
															}
														</button>
													)
												})
											}
										</div>
										<Button
											variant="outline"
											onClick={() => handleCustomPlatform(category.key)}
											className="w-full backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
										>
											<Plus className="h-4 w-4 mr-2" />
											Add Custom Platform
										</Button>
										<div className="space-y-3">
											{
												userData[category.key].map((item, itemIndex) => (
													<motion.div
														key={itemIndex}
														initial={{ opacity: 0, scale: 0.9 }}
														animate={{ opacity: 1, scale: 1 }}
														className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border border-purple-200/50 dark:border-purple-700/30 backdrop-blur-sm"
													>
														<div className="flex items-center gap-3">
															<CheckCircle className="h-5 w-5 text-purple-500 dark:text-purple-400" />
															<div>
																<div className="font-medium text-gray-900 dark:text-white capitalize">{item.platform}</div>
																<div className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[200px]">{item.link}</div>
															</div>
														</div>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => removePlatform(category.key, itemIndex)}
															className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30"
														>
															×
														</Button>
													</motion.div>
												))
											}
											{
												userData[category.key].length === 0 && (
													<div className="text-center py-8 text-gray-400 dark:text-gray-500">
														<Plus className="h-8 w-8 mx-auto mb-2" />
														<p className="text-sm">No platforms connected yet</p>
													</div>
												)
											}
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))
					}
				</div>

				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<Button
						onClick={handleGeneratePortfolio}
						disabled={totalConnections === 0}
						className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white text-lg px-6 py-3 h-auto rounded-xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{
							totalConnections === 0 ? (
								"Connect at least one platform"
							) : (
								<>
									Generate AI Portfolio ({totalConnections} connections)
									<ArrowRight className="ml-2 h-5 w-5" />
								</>
							)
						}
					</Button>
					{
						totalConnections > 0 && (
							<p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
								Our AI will analyze your data and create personalized insights
							</p>
						)
					}
				</motion.div>

				<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
					<DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-white/20 dark:border-gray-700/30">
						<DialogHeader>
							<DialogTitle className="text-xl text-gray-900 dark:text-white">Add {selectedPlatform} Profile</DialogTitle>
							<DialogDescription className="text-gray-600 dark:text-gray-300">
								Enter your {selectedPlatform} profile URL to connect your account
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div>
								<Label htmlFor="link" className="text-sm font-medium text-gray-900 dark:text-white">
									Profile URL
								</Label>
								<Input
									id="link"
									value={inputLink}
									onChange={(e) => setInputLink(e.target.value)}
									placeholder={`https://${selectedPlatform}.com/yourprofile`}
									className="mt-1 bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
								/>
							</div>
						</div>
						<DialogFooter className="gap-2">
							<Button variant="outline" onClick={() => setDialogOpen(false)} className="cursor-pointer border-gray-200 dark:border-gray-700">
								Cancel
							</Button>
							<Button
								onClick={handleSubmit}
								className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
								disabled={!inputLink.trim() || isLoading}
							>
								{isLoading ? "Connecting..." : "Connect Platform"}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				<Dialog open={customDialogOpen} onOpenChange={setCustomDialogOpen}>
					<DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-white/20 dark:border-gray-700/30">
						<DialogHeader>
							<DialogTitle className="text-xl text-gray-900 dark:text-white">Add Custom Platform</DialogTitle>
							<DialogDescription className="text-gray-600 dark:text-gray-300">
								Add a platform that's not in our list. Enter the platform name and your profile link.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div>
								<Label htmlFor="custom-platform" className="text-sm font-medium text-gray-900 dark:text-white">
									Platform Name
								</Label>
								<Input
									id="custom-platform"
									value={customPlatform}
									onChange={(e) => setCustomPlatform(e.target.value)}
									placeholder="e.g., Behance, Dribbble, etc."
									className="mt-1 bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
								/>
							</div>
							<div>
								<Label htmlFor="custom-link" className="text-sm font-medium text-gray-900 dark:text-white">
									Profile URL
								</Label>
								<Input
									id="custom-link"
									value={customLink}
									onChange={(e) => setCustomLink(e.target.value)}
									placeholder="https://platform.com/yourprofile"
									className="mt-1 bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
								/>
							</div>
						</div>
						<DialogFooter className="gap-2">
							<Button variant="outline" onClick={() => setCustomDialogOpen(false)} className="cursor-pointer border-gray-200 dark:border-gray-700">
								Cancel
							</Button>
							<Button
								onClick={handleCustomSubmit}
								className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
								disabled={!customPlatform.trim() || !customLink.trim()}
							>
								Add Platform
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}