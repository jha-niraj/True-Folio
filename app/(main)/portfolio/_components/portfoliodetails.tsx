"use client"

import React, { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { toast } from "sonner"
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
    TrendingUp, Sparkles, Target, ArrowRight, Briefcase, Brain, CheckCircle2, Zap, CreditCard,
    User, Calendar, DollarSign, Activity, Users, Trophy, Lightbulb, Rocket, Star, Layers,
    BarChart3, GitBranch, Shield, Clock, Globe
} from "lucide-react"
import { generatePortfolioInsights, forceRefreshPortfolioInsights } from "@/actions/platform.action"

interface PortfolioInsights {
	summary: {
		title: string
		description: string
		yearOfExperience?: string
	}
	skills: {
		languages: string[]
		frameworks: string[]
		tools: string[]
		specializations?: string[]
	}
	insights: {
		strengths: string[]
		improvements: string[]
		recommendations: string[]
		projectHighlights?: string[]
	}
	metrics: {
		githubActivity: string
		codingProficiency: string
		overallScore: string
		activityLevel?: string
		collaborationScore?: string
	}
	careerPath?: {
		currentLevel: string
		nextSteps: string[]
		roleRecommendations: string[]
		salaryRange: string
	}
	// New properties for caching
	_cached?: boolean
	_cacheAge?: number
}

export default function PortfolioDetails({ username }: { username: string }) {
    const { user } = useUser()
    const [activeTab, setActiveTab] = useState("overview")
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [insights, setInsights] = useState<PortfolioInsights | null>(null)
    const [error, setError] = useState<string | null>(null)
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

    // Mock user data (this could come from Clerk user data)
    const mockUserData = {
        name: user?.fullName || "Developer",
        email: user?.primaryEmailAddress?.emailAddress || "developer@email.com",
        avatar: user?.imageUrl || "/placeholder.svg?height=120&width=120",
        verified: true,
        joinedDate: "March 2024",
        credits: 5,
    }

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                setError(null)
                setIsLoading(true)
                const data = await generatePortfolioInsights(user?.id || "")
                setInsights(data)
                
                // Show toast message based on cache status
                if (data._cached) {
                    const ageText = data._cacheAge === 0 ? 'today' : 
                                   data._cacheAge === 1 ? '1 day ago' : 
                                   `${data._cacheAge} days ago`
                    toast.info(`📊 Showing previously generated insights (from ${ageText})`, {
                        description: "Your insights are updated automatically every 10 days",
                        duration: 5000,
                    })
                } else {
                    toast.success(`✨ Fresh portfolio insights generated successfully!`)
                }
            } catch (error) {
                console.error("Failed to fetch insights:", error)
                setError(error instanceof Error ? error.message : "Failed to generate insights")
                toast.error("Failed to load portfolio insights")
            } finally {
                setIsLoading(false)
            }
        }

        if (user?.id) {
            fetchInsights()
        }
    }, [user?.id])

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Portfolio link copied to clipboard!")
    }

    const handleRefresh = () => {
        setRefreshDialogOpen(true)
    }

    const handleRefreshConfirm = async () => {
        setRefreshDialogOpen(false)
        setIsRefreshing(true)
        try {
            const freshInsights = await forceRefreshPortfolioInsights(user?.id || "")
            setInsights(freshInsights)
            setError(null)
            toast.success("🔄 Portfolio refreshed with latest data from your profiles!", {
                description: "Fresh insights generated based on your recent activity",
                duration: 4000,
            })
        } catch (error) {
            console.error("Failed to force refresh insights:", error)
            setError(error instanceof Error ? error.message : "Failed to refresh insights")
            toast.error("Failed to refresh portfolio insights")
        } finally {
            setIsRefreshing(false)
        }
    }

    const handleShare = (platform: string) => {
        const url = window.location.href
        const text = `Check out ${mockUserData.name}'s AI-verified portfolio!`

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

    // Loading component with dark theme support
    const LoadingSpinner = () => (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/5 flex items-center justify-center">
            <div className="text-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-block mb-4"
                >
                    <div className="relative">
                        <Brain className="h-12 w-12 text-primary" />
                        <div className="absolute inset-0 animate-ping">
                            <Brain className="h-12 w-12 text-primary/20" />
                        </div>
                    </div>
                </motion.div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                    Loading Portfolio Insights...
                </h2>
                <p className="text-muted-foreground">
                    Analyzing your connected profiles
                </p>
            </div>
        </div>
    )

    // Error component with dark theme support
    const ErrorComponent = () => (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/5 flex items-center justify-center">
            <div className="max-w-lg w-full mx-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="border-destructive/20 shadow-xl">
                        <CardHeader className="text-center pb-4">
                            <motion.div
                                className="mx-auto w-16 h-16 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-full flex items-center justify-center mb-4"
                                animate={{ 
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Brain className="h-8 w-8 text-destructive" />
                            </motion.div>
                            <CardTitle className="text-xl font-bold text-foreground mb-2">
                                Failed to Load Portfolio
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                {error}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center space-y-3">
                            <Button
                                onClick={() => window.location.reload()}
                                className="w-full"
                                variant="destructive"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Try Again
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = "/details"}
                                className="w-full"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                Check Connections
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )

    if (isLoading) return <LoadingSpinner />
    if (error) return <ErrorComponent />
    if (!insights) return <ErrorComponent />

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <Avatar className="h-20 w-20 border-4 border-primary/10 shadow-lg">
                                    <AvatarImage src={mockUserData.avatar} alt={mockUserData.name} />
                                    <AvatarFallback className="text-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                                        {mockUserData.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                {mockUserData.verified && (
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-background">
                                        <Shield className="h-3 w-3 text-white" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{mockUserData.name}</h1>
                                    {mockUserData.verified && (
                                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20">
                                            <Award className="h-3 w-3 mr-1" />
                                            AI Verified
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-lg sm:text-xl text-muted-foreground mb-3">{insights.summary.title}</p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>Joined {mockUserData.joinedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4 text-primary" />
                                        <span className="text-foreground font-semibold">{insights.metrics.overallScore}/100</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-yellow-500" />
                                        <span className="font-medium">{mockUserData.credits} Credits</span>
                                    </div>
                                    {insights.summary.yearOfExperience && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>{insights.summary.yearOfExperience} Experience</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCopyLink}
                                className="hover:bg-primary/5"
                            >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy Link
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                                className="hover:bg-primary/5"
                            >
                                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                                {isRefreshing ? 'Refreshing...' : 'Refresh'}
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Skills Preview */}
                <motion.div
                    className="flex flex-wrap gap-2 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {insights.skills.languages.slice(0, 5).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                            <Code2 className="h-3 w-3 mr-1" />
                            {skill}
                        </Badge>
                    ))}
                    {insights.skills.frameworks.slice(0, 3).map((framework, index) => (
                        <Badge key={`fw-${index}`} variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
                            <Rocket className="h-3 w-3 mr-1" />
                            {framework}
                        </Badge>
                    ))}
                </motion.div>

                {/* Metrics Cards - Compact Version */}
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Card className="border-border/40 hover:border-border transition-colors hover:shadow-md">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium">Overall Score</p>
                                    <p className="text-xl font-bold text-foreground">
                                        {insights.metrics.overallScore}
                                        <span className="text-sm text-muted-foreground">/100</span>
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Target className="h-4 w-4 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {insights.metrics.activityLevel && (
                        <Card className="border-border/40 hover:border-border transition-colors hover:shadow-md">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">Activity</p>
                                        <p className="text-xl font-bold text-foreground">
                                            {insights.metrics.activityLevel}
                                        </p>
                                    </div>
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                        <Activity className="h-4 w-4 text-emerald-500" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {insights.careerPath && (
                        <Card className="border-border/40 hover:border-border transition-colors hover:shadow-md">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">Level</p>
                                        <p className="text-xl font-bold text-foreground">
                                            {insights.careerPath.currentLevel}
                                        </p>
                                    </div>
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                        <Briefcase className="h-4 w-4 text-purple-500" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {insights.metrics.collaborationScore && (
                        <Card className="border-border/40 hover:border-border transition-colors hover:shadow-md">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium">Collab</p>
                                        <p className="text-xl font-bold text-foreground">
                                            {insights.metrics.collaborationScore}
                                        </p>
                                    </div>
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <Users className="h-4 w-4 text-blue-500" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </motion.div>

                {/* Main Content Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1 h-auto">
                            <TabsTrigger 
                                value="overview" 
                                className="data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5 text-sm font-medium"
                            >
                                <Globe className="h-4 w-4 mr-2" />
                                Overview
                            </TabsTrigger>
                            <TabsTrigger 
                                value="skills" 
                                className="data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5 text-sm font-medium"
                            >
                                <Layers className="h-4 w-4 mr-2" />
                                Skills
                            </TabsTrigger>
                            <TabsTrigger 
                                value="insights" 
                                className="data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5 text-sm font-medium"
                            >
                                <Lightbulb className="h-4 w-4 mr-2" />
                                Insights
                            </TabsTrigger>
                            <TabsTrigger 
                                value="career" 
                                className="data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5 text-sm font-medium"
                            >
                                <TrendingUp className="h-4 w-4 mr-2" />
                                Career
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="flex items-center gap-3 text-lg">
                                            <div className="w-10 h-10 rounded-lg bg-gray-500/10 flex items-center justify-center">
                                                <Github className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                            </div>
                                            GitHub Analysis
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {insights.metrics.githubActivity}
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="flex items-center gap-3 text-lg">
                                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                                <Code2 className="h-5 w-5 text-orange-500" />
                                            </div>
                                            LeetCode Analysis
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {insights.metrics.codingProficiency}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="skills" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                                <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="flex items-center gap-3 text-lg">
                                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                                <Code2 className="h-5 w-5 text-blue-500" />
                                            </div>
                                            Languages
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {insights.skills.languages.map((lang, i) => (
                                                <Badge key={i} variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20 transition-colors text-xs">
                                                    {lang}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="flex items-center gap-3 text-lg">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                                <Rocket className="h-5 w-5 text-emerald-500" />
                                            </div>
                                            Frameworks
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {insights.skills.frameworks.map((framework, i) => (
                                                <Badge key={i} variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 transition-colors text-xs">
                                                    {framework}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="flex items-center gap-3 text-lg">
                                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                                <Sparkles className="h-5 w-5 text-purple-500" />
                                            </div>
                                            Tools
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {insights.skills.tools.map((tool, i) => (
                                                <Badge key={i} variant="secondary" className="bg-purple-500/10 text-purple-600 border-purple-500/20 hover:bg-purple-500/20 transition-colors text-xs">
                                                    {tool}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {insights.skills.specializations && (
                                    <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                                        <CardHeader className="pb-4">
                                            <CardTitle className="flex items-center gap-3 text-lg">
                                                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                                    <Award className="h-5 w-5 text-amber-500" />
                                                </div>
                                                Specializations
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex flex-wrap gap-2">
                                                {insights.skills.specializations.map((spec, i) => (
                                                    <Badge key={i} variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20 transition-colors text-xs">
                                                        {spec}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="insights" className="space-y-6">
                            <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-3 text-lg">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Lightbulb className="h-5 w-5 text-primary" />
                                        </div>
                                        AI Insights & Analysis
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        Comprehensive analysis of your coding profile and growth opportunities
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="strengths" className="w-full">
                                        <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1 h-auto">
                                            <TabsTrigger value="strengths" className="text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm py-2">
                                                <Star className="h-3 w-3 mr-1" />
                                                Strengths
                                            </TabsTrigger>
                                            <TabsTrigger value="improvements" className="text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm py-2">
                                                <TrendingUp className="h-3 w-3 mr-1" />
                                                Growth
                                            </TabsTrigger>
                                            <TabsTrigger value="recommendations" className="text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm py-2">
                                                <Rocket className="h-3 w-3 mr-1" />
                                                Tips
                                            </TabsTrigger>
                                            {insights.insights.projectHighlights && (
                                                <TabsTrigger value="projects" className="text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm py-2">
                                                    <FileText className="h-3 w-3 mr-1" />
                                                    Projects
                                                </TabsTrigger>
                                            )}
                                        </TabsList>

                                        <TabsContent value="strengths" className="mt-6">
                                            <div className="space-y-3">
                                                {insights.insights.strengths.map((strength, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="flex items-start gap-3 p-4 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20"
                                                    >
                                                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                        </div>
                                                        <span className="text-foreground text-sm leading-relaxed">
                                                            {strength}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="improvements" className="mt-6">
                                            <div className="space-y-3">
                                                {insights.insights.improvements.map((improvement, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20"
                                                    >
                                                        <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <TrendingUp className="h-4 w-4 text-amber-500" />
                                                        </div>
                                                        <span className="text-foreground text-sm leading-relaxed">
                                                            {improvement}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="recommendations" className="mt-6">
                                            <div className="space-y-3">
                                                {insights.insights.recommendations.map((recommendation, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="flex items-start gap-3 p-4 rounded-lg bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20"
                                                    >
                                                        <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <Rocket className="h-4 w-4 text-purple-500" />
                                                        </div>
                                                        <span className="text-foreground text-sm leading-relaxed">
                                                            {recommendation}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </TabsContent>

                                        {insights.insights.projectHighlights && (
                                            <TabsContent value="projects" className="mt-6">
                                                <div className="space-y-3">
                                                    {insights.insights.projectHighlights.map((project, i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20"
                                                        >
                                                            <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                <FileText className="h-4 w-4 text-blue-500" />
                                                            </div>
                                                            <span className="text-foreground text-sm leading-relaxed">
                                                                {project}
                                                            </span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </TabsContent>
                                        )}
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="career" className="space-y-6">
                            {insights.careerPath && (
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2">
                                        <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                                            <CardHeader className="pb-4">
                                                <CardTitle className="flex items-center gap-3 text-lg">
                                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <Briefcase className="h-5 w-5 text-primary" />
                                                    </div>
                                                    Career Recommendations
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div>
                                                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                                                        <ArrowRight className="h-4 w-4 text-primary" />
                                                        Next Steps
                                                    </h4>
                                                    <div className="space-y-3">
                                                        {insights.careerPath.nextSteps.map((step, i) => (
                                                            <motion.div 
                                                                key={i} 
                                                                className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border/40 hover:border-border transition-colors"
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: i * 0.1 }}
                                                            >
                                                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                    <span className="text-primary-foreground text-xs font-bold">{i + 1}</span>
                                                                </div>
                                                                <span className="text-foreground text-sm leading-relaxed">{step}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                                                        <Trophy className="h-4 w-4 text-primary" />
                                                        Recommended Roles
                                                    </h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {insights.careerPath.roleRecommendations.map((role, i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, scale: 0.95 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: i * 0.1 }}
                                                            >
                                                                <Card className="p-4 bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer">
                                                                    <div className="flex items-center gap-2">
                                                                        <Briefcase className="h-4 w-4 text-primary" />
                                                                        <span className="text-sm font-medium text-foreground">{role}</span>
                                                                    </div>
                                                                </Card>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="space-y-6">
                                        <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                                            <CardHeader className="pb-4">
                                                <CardTitle className="flex items-center gap-3 text-lg">
                                                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                                        <DollarSign className="h-5 w-5 text-emerald-500" />
                                                    </div>
                                                    Salary Insights
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-center p-6 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                                                    <p className="text-2xl font-bold text-emerald-600 mb-2">
                                                        {insights.careerPath.salaryRange}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Expected salary range based on your skills and experience level
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                                            <CardHeader className="pb-4">
                                                <CardTitle className="flex items-center gap-3 text-lg">
                                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                                        <TrendingUp className="h-5 w-5 text-blue-500" />
                                                    </div>
                                                    Current Level
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-center p-6 bg-blue-500/5 rounded-lg border border-blue-500/20">
                                                    <p className="text-xl font-bold text-blue-600 mb-2">
                                                        {insights.careerPath.currentLevel}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Based on your coding activity and problem-solving skills
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </motion.div>
                <Dialog open={refreshDialogOpen} onOpenChange={setRefreshDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-xl flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <RefreshCw className="h-4 w-4 text-primary" />
                                </div>
                                Refresh Portfolio Data
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Generate fresh portfolio insights with the latest data from all connected platforms using 3 credits
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-foreground">Current Credits</span>
                                    <span className="text-lg font-bold text-primary">{mockUserData.credits}</span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-foreground">Refresh Cost</span>
                                    <span className="text-lg font-bold text-primary">3 Credits</span>
                                </div>
                                <hr className="border-border my-2" />
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-foreground">Remaining</span>
                                    <span className="text-lg font-bold text-primary">{mockUserData.credits - 3}</span>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/40">
                                <p className="font-medium mb-2 text-foreground">Fresh data analysis includes:</p>
                                <ul className="list-disc list-inside space-y-1 text-xs">
                                    <li>Latest GitHub commits and repositories</li>
                                    <li>Recent LeetCode problem solutions</li>
                                    <li>Updated AI insights and recommendations</li>
                                    <li>Fresh career path analysis</li>
                                    <li>New skills and project evaluations</li>
                                </ul>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setRefreshDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleRefreshConfirm}
                                disabled={mockUserData.credits < 3}
                                className="bg-primary hover:bg-primary/90"
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
                                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                    <CreditCard className="h-4 w-4 text-orange-500" />
                                </div>
                                Unlock Next Steps
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Get personalized next steps for {selectedPlatform} using 2 credits
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-foreground">Current Credits</span>
                                    <span className="text-lg font-bold text-orange-600">{mockUserData.credits}</span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-foreground">Cost</span>
                                    <span className="text-lg font-bold text-orange-600">2 Credits</span>
                                </div>
                                <hr className="border-border my-2" />
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-foreground">Remaining</span>
                                    <span className="text-lg font-bold text-orange-600">{mockUserData.credits - 2}</span>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setCreditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreditPayment}
                                disabled={mockUserData.credits < 2}
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                Unlock Now
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog open={jobDialogOpen} onOpenChange={setJobDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                        {!waitlistSubmitted ? (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-xl flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Briefcase className="h-4 w-4 text-primary" />
                                        </div>
                                        Join Job Waitlist
                                    </DialogTitle>
                                    <DialogDescription className="text-muted-foreground">
                                        Get early access to exclusive job opportunities matched to your verified skills.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name" className="text-foreground">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter your full name"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="text-foreground">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="Enter your email"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="experience" className="text-foreground">Years of Experience</Label>
                                        <Input
                                            id="experience"
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                            placeholder="e.g., 3 years"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="interest" className="text-foreground">Job Interest</Label>
                                        <Input
                                            id="interest"
                                            value={formData.interest}
                                            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                            placeholder="e.g., Full Stack Developer"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setJobDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleWaitlistSubmit}
                                        className="bg-primary hover:bg-primary/90"
                                    >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Join Waitlist
                                    </Button>
                                </DialogFooter>
                            </>
                        ) : (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-xl flex items-center gap-2 text-emerald-600">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        </div>
                                        Welcome to the Waitlist!
                                    </DialogTitle>
                                    <DialogDescription className="text-muted-foreground">
                                        You're all set! We'll notify you when job opportunities become available.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="py-6">
                                    <div className="text-center space-y-3">
                                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                                            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                                        </div>
                                        <p className="text-foreground font-medium">Thank you for joining!</p>
                                        <p className="text-sm text-muted-foreground">
                                            We'll keep you updated on the latest job opportunities that match your skills and experience.
                                        </p>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={() => setJobDialogOpen(false)} className="w-full">
                                        Close
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}