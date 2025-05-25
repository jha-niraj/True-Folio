"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Copy, RefreshCw, Github, Code2, Linkedin, Twitter, FileText, Mail, ExternalLink, Award,
    TrendingUp, Sparkles, Target, ArrowRight, Briefcase, Brain, CheckCircle2, Zap, CreditCard
} from "lucide-react"

// Mock data
const mockPortfolioData = {
    name: "Alex Johnson",
    title: "Full Stack Developer",
    email: "alex.johnson@email.com",
    avatar: "/placeholder.svg?height=120&width=120",
    verified: true,
    skillScore: 85,
    joinedDate: "March 2024",
    credits: 5,
    code: {
        github: {
            repos: ["E-commerce Platform", "Task Management App", "Weather Dashboard", "Portfolio Website"],
            stats: { repos: 24, stars: 156, commits: 1240 },
            insights: [
                "Consistent daily coding activity with 1200+ commits this year",
                "Strong focus on full-stack JavaScript development",
                "Active contributor to open-source projects",
                "Well-documented code with comprehensive README files",
            ],
        },
        leetcode: {
            problemsSolved: 200,
            difficulty: { easy: 80, medium: 95, hard: 25 },
            ranking: "Top 15%",
            insights: [
                "Strong problem-solving skills across multiple difficulty levels",
                "Consistent practice with 200+ problems solved",
                "Excellent performance in medium-difficulty problems",
                "Top 15% ranking demonstrates competitive programming ability",
            ],
        },
    },
    socials: {
        linkedin: {
            bio: "Passionate Software Engineer with 3+ years of experience in React, Node.js, and cloud technologies.",
            connections: 500,
            insights: [
                "Professional network of 500+ connections in tech industry",
                "Active engagement with industry content and discussions",
                "Strong professional brand with detailed experience",
                "Regular sharing of technical insights and achievements",
            ],
        },
        twitter: {
            recentPost: "Just launched my new portfolio platform! Excited to share it with the community 🚀",
            followers: 1200,
            insights: [
                "Growing follower base of 1200+ in the tech community",
                "Active sharing of project updates and technical content",
                "Good engagement with developer community",
                "Consistent posting about technology trends",
            ],
        },
    },
    blogs: {
        medium: {
            articles: ["My Journey in Tech", "Building Scalable React Applications", "The Future of Web Development"],
            views: 15000,
            insights: [
                "Strong technical writing skills with 15K+ total views",
                "Covers diverse topics from personal journey to technical deep-dives",
                "Good engagement and readership growth",
                "Demonstrates thought leadership in web development",
            ],
        },
    },
    contact: {
        email: "alex.johnson@email.com",
    },
    badges: ["GitHub Contributor", "LeetCode 200+", "React Expert", "Node.js Developer", "Open Source"],
    overallInsights: [
        "Strong full-stack development capabilities with modern JavaScript ecosystem",
        "Excellent problem-solving skills demonstrated through consistent LeetCode practice",
        "Active community engagement across multiple platforms",
        "Growing personal brand with technical writing and social media presence",
        "Ready for senior-level positions at tech companies",
    ],
}

export default function PortfolioPage({ params }: { params: { username: string } }) {
    const [activeTab, setActiveTab] = useState("code")
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [jobDialogOpen, setJobDialogOpen] = useState(false)
    const [creditDialogOpen, setCreditDialogOpen] = useState(false)
    const [refreshDialogOpen, setRefreshDialogOpen] = useState(false)
    const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
    const [selectedPlatform, setSelectedPlatform] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        experience: "",
        interest: "",
    })

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
    }

    const handleRefresh = () => {
        setRefreshDialogOpen(true)
    }

    const handleRefreshConfirm = () => {
        setRefreshDialogOpen(false)
        setIsRefreshing(true)
        setTimeout(() => setIsRefreshing(false), 2000)
    }

    const handleShare = (platform: string) => {
        const url = window.location.href
        const text = `Check out ${mockPortfolioData.name}'s AI-verified portfolio!`

        if (platform === "linkedin") {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        } else if (platform === "twitter") {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        }
    }

    const handleWaitlistSubmit = () => {
        setWaitlistSubmitted(true)
    }

    const handleNextSteps = (platform: string) => {
        setSelectedPlatform(platform)
        setCreditDialogOpen(true)
    }

    const handleCreditPayment = () => {
        setCreditDialogOpen(false)
        window.location.href = `/next-steps?platform=${selectedPlatform}`
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <motion.div
                    className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                            <AvatarImage src={mockPortfolioData.avatar || "/placeholder.svg"} alt={mockPortfolioData.name} />
                            <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                {mockPortfolioData.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{mockPortfolioData.name}</h1>
                                {
                                    mockPortfolioData.verified && (
                                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                            <Award className="h-3 w-3 mr-1" />
                                            AI Verified
                                        </Badge>
                                    )
                                }
                            </div>
                            <p className="text-xl text-gray-600 mb-2">{mockPortfolioData.title}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>Joined {mockPortfolioData.joinedDate}</span>
                                <span>•</span>
                                <div className="flex items-center gap-2">
                                    <span>Skill Score:</span>
                                    <span className="text-lg font-bold text-blue-600">{mockPortfolioData.skillScore}/100</span>
                                    <TrendingUp className="h-4 w-4 text-blue-500" />
                                </div>
                                <span>•</span>
                                <div className="flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-yellow-500" />
                                    <span className="font-medium">{mockPortfolioData.credits} Credits</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="outline"
                            onClick={handleCopyLink}
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Link
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                            {isRefreshing ? "Refreshing..." : "Refresh Data"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleShare("linkedin")}
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                            <Linkedin className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                        <Button
                            onClick={() => setJobDialogOpen(true)}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                        >
                            <Briefcase className="h-4 w-4 mr-2" />
                            View Jobs
                        </Button>
                    </div>
                </motion.div>
                <motion.div
                    className="flex flex-wrap gap-3 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {
                        mockPortfolioData.badges.map((badge, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                {badge}
                            </Badge>
                        ))
                    }
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Card className="mb-8 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                                        <Target className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-green-800 mb-1">🎯 Perfect Job Matches Found!</h3>
                                        <p className="text-sm text-green-700">5 positions match your verified skills and experience</p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setJobDialogOpen(true)}
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                                >
                                    View Matches
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-4 mb-8">
                            <TabsTrigger value="code" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                                Code
                            </TabsTrigger>
                            <TabsTrigger value="socials" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                                Social
                            </TabsTrigger>
                            <TabsTrigger value="blogs" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                                Content
                            </TabsTrigger>
                            <TabsTrigger value="contact" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                                Contact
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="code" className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Github className="h-6 w-6 text-gray-900" />
                                                <CardTitle className="text-gray-900">GitHub</CardTitle>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => handleNextSteps("github")}
                                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                                            >
                                                <Target className="h-4 w-4 mr-1" />
                                                Next Steps
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {mockPortfolioData.code.github.stats.repos}
                                                </div>
                                                <div className="text-xs text-gray-500">Repositories</div>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {mockPortfolioData.code.github.stats.stars}
                                                </div>
                                                <div className="text-xs text-gray-500">Stars</div>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {mockPortfolioData.code.github.stats.commits}
                                                </div>
                                                <div className="text-xs text-gray-500">Commits</div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                <Brain className="h-4 w-4 text-purple-500" />
                                                AI Insights
                                            </h4>
                                            <div className="space-y-2">
                                                {
                                                    mockPortfolioData.code.github.insights.map((insight, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="flex items-start gap-2 text-sm text-gray-600 p-2 bg-purple-50 rounded-lg"
                                                        >
                                                            <Sparkles className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                                                            {insight}
                                                        </motion.div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Code2 className="h-6 w-6 text-orange-500" />
                                                <CardTitle className="text-gray-900">LeetCode</CardTitle>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => handleNextSteps("leetcode")}
                                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                                            >
                                                <Target className="h-4 w-4 mr-1" />
                                                Next Steps
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                                            <div className="text-3xl font-bold text-orange-600 mb-1">
                                                {mockPortfolioData.code.leetcode.problemsSolved}
                                            </div>
                                            <div className="text-sm text-gray-600 mb-2">Problems Solved</div>
                                            <Badge className="bg-orange-500 text-white">{mockPortfolioData.code.leetcode.ranking}</Badge>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                <Brain className="h-4 w-4 text-purple-500" />
                                                AI Insights
                                            </h4>
                                            <div className="space-y-2">
                                                {
                                                    mockPortfolioData.code.leetcode.insights.map((insight, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="flex items-start gap-2 text-sm text-gray-600 p-2 bg-purple-50 rounded-lg"
                                                        >
                                                            <Sparkles className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                                                            {insight}
                                                        </motion.div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="socials" className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Linkedin className="h-6 w-6 text-blue-600" />
                                                <CardTitle className="text-gray-900">LinkedIn</CardTitle>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => handleNextSteps("linkedin")}
                                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                                            >
                                                <Target className="h-4 w-4 mr-1" />
                                                Next Steps
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="p-4 bg-blue-50 rounded-lg">
                                            <p className="text-gray-700 mb-3">{mockPortfolioData.socials.linkedin.bio}</p>
                                            <div className="text-sm text-blue-600 font-medium">
                                                {mockPortfolioData.socials.linkedin.connections}+ connections
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                <Brain className="h-4 w-4 text-purple-500" />
                                                AI Insights
                                            </h4>
                                            <div className="space-y-2">
                                                {
                                                    mockPortfolioData.socials.linkedin.insights.map((insight, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="flex items-start gap-2 text-sm text-gray-600 p-2 bg-purple-50 rounded-lg"
                                                        >
                                                            <Sparkles className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                                                            {insight}
                                                        </motion.div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Twitter className="h-6 w-6 text-blue-400" />
                                                <CardTitle className="text-gray-900">Twitter</CardTitle>
                                            </div>
                                            <Button
                                                size="sm"
                                                onClick={() => handleNextSteps("twitter")}
                                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                                            >
                                                <Target className="h-4 w-4 mr-1" />
                                                Next Steps
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="p-4 bg-blue-50 rounded-lg">
                                            <p className="text-gray-700 mb-3 italic">"{mockPortfolioData.socials.twitter.recentPost}"</p>
                                            <div className="text-sm text-blue-600 font-medium">
                                                {mockPortfolioData.socials.twitter.followers} followers
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                <Brain className="h-4 w-4 text-purple-500" />
                                                AI Insights
                                            </h4>
                                            <div className="space-y-2">
                                                {
                                                    mockPortfolioData.socials.twitter.insights.map((insight, index) => (
                                                        <motion.div
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.1 }}
                                                            className="flex items-start gap-2 text-sm text-gray-600 p-2 bg-purple-50 rounded-lg"
                                                        >
                                                            <Sparkles className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                                                            {insight}
                                                        </motion.div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="blogs" className="space-y-8">
                            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-6 w-6 text-green-600" />
                                            <CardTitle className="text-gray-900">Medium</CardTitle>
                                        </div>
                                        <Button
                                            size="sm"
                                            onClick={() => handleNextSteps("medium")}
                                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                                        >
                                            <Target className="h-4 w-4 mr-1" />
                                            Next Steps
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600 mb-1">
                                            {mockPortfolioData.blogs.medium.views.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-600 mb-3">Total views across all articles</div>
                                        <div className="space-y-1">
                                            {
                                                mockPortfolioData.blogs.medium.articles.map((article, index) => (
                                                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                                        <ExternalLink className="h-3 w-3" />
                                                        {article}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                                            <Brain className="h-4 w-4 text-purple-500" />
                                            AI Insights
                                        </h4>
                                        <div className="space-y-2">
                                            {
                                                mockPortfolioData.blogs.medium.insights.map((insight, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="flex items-start gap-2 text-sm text-gray-600 p-2 bg-purple-50 rounded-lg"
                                                    >
                                                        <Sparkles className="h-3 w-3 text-purple-500 mt-0.5 flex-shrink-0" />
                                                        {insight}
                                                    </motion.div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="contact" className="space-y-8">
                            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-6 w-6 text-purple-600" />
                                        <CardTitle className="text-gray-900">Contact Information</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                                        <div>
                                            <p className="text-gray-900 font-medium">{mockPortfolioData.contact.email}</p>
                                            <p className="text-sm text-gray-600 mt-1">Available for opportunities and collaborations</p>
                                        </div>
                                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                                            <Mail className="h-4 w-4 mr-2" />
                                            Contact
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-12"
                >
                    <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
                        <CardHeader>
                            <CardTitle className="text-xl text-blue-800 flex items-center gap-3">
                                <Brain className="h-6 w-6" />
                                Overall AI Assessment
                            </CardTitle>
                            <CardDescription className="text-blue-700">
                                Comprehensive analysis of your professional profile and career readiness
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {
                                    mockPortfolioData.overallInsights.map((insight, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3 p-4 bg-white/60 rounded-lg border border-blue-200"
                                        >
                                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle2 className="h-3 w-3 text-white" />
                                            </div>
                                            <p className="text-gray-700 leading-relaxed">{insight}</p>
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                <Dialog open={refreshDialogOpen} onOpenChange={setRefreshDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-xl flex items-center gap-2">
                                <RefreshCw className="h-5 w-5 text-blue-500" />
                                Refresh Portfolio Data
                            </DialogTitle>
                            <DialogDescription>
                                Refresh your portfolio data with the latest information from all connected platforms using 1 credit
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-blue-800">Current Credits</span>
                                    <span className="text-lg font-bold text-blue-600">{mockPortfolioData.credits}</span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-blue-800">Refresh Cost</span>
                                    <span className="text-lg font-bold text-blue-600">1 Credit</span>
                                </div>
                                <hr className="border-blue-200 my-2" />
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-blue-800">Remaining</span>
                                    <span className="text-lg font-bold text-blue-600">{mockPortfolioData.credits - 1}</span>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium mb-1">What gets refreshed:</p>
                                <ul className="list-disc list-inside space-y-1 text-xs">
                                    <li>Latest GitHub commits and repositories</li>
                                    <li>Recent LeetCode problem solutions</li>
                                    <li>Updated LinkedIn and social media activity</li>
                                    <li>New blog posts and content</li>
                                    <li>Refreshed AI insights and recommendations</li>
                                </ul>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setRefreshDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleRefreshConfirm}
                                disabled={mockPortfolioData.credits < 1}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refresh Now
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={creditDialogOpen} onOpenChange={setCreditDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-xl flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-orange-500" />
                                Unlock Next Steps
                            </DialogTitle>
                            <DialogDescription>Get personalized next steps for {selectedPlatform} using 2 credits</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-orange-800">Current Credits</span>
                                    <span className="text-lg font-bold text-orange-600">{mockPortfolioData.credits}</span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-orange-800">Cost</span>
                                    <span className="text-lg font-bold text-orange-600">2 Credits</span>
                                </div>
                                <hr className="border-orange-200 my-2" />
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-orange-800">Remaining</span>
                                    <span className="text-lg font-bold text-orange-600">{mockPortfolioData.credits - 2}</span>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setCreditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreditPayment}
                                disabled={mockPortfolioData.credits < 2}
                                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                            >
                                Unlock Now
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={jobDialogOpen} onOpenChange={setJobDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                        {
                            !waitlistSubmitted ? (
                                <>
                                    <DialogHeader>
                                        <DialogTitle className="text-xl flex items-center gap-2">
                                            <Briefcase className="h-5 w-5 text-blue-500" />
                                            Join Job Waitlist
                                        </DialogTitle>
                                        <DialogDescription>
                                            Get early access to exclusive job opportunities matched to your verified skills.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="experience">Years of Experience</Label>
                                            <Input
                                                id="experience"
                                                value={formData.experience}
                                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                                placeholder="e.g., 3 years"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="interest">Job Interest</Label>
                                            <Input
                                                id="interest"
                                                value={formData.interest}
                                                onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                                placeholder="e.g., Full Stack Developer"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setJobDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleWaitlistSubmit}
                                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                                        >
                                            Join Waitlist
                                        </Button>
                                    </DialogFooter>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                                    >
                                        <CheckCircle2 className="h-8 w-8 text-white" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">You're on the list!</h3>
                                    <p className="text-gray-600 mb-4">
                                        We'll notify you when exclusive job opportunities become available.
                                    </p>
                                    <Button
                                        onClick={() => setJobDialogOpen(false)}
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                                    >
                                        Got it!
                                    </Button>
                                </div>
                            )
                        }
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}