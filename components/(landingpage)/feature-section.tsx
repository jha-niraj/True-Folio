"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Brain, Shield, Bell, Sparkles, ArrowRight } from "lucide-react"

export default function FeaturesSection() {
    const features = [
        {
            icon: Database,
            title: "Real-Time Data Sync",
            description:
                "Automatically sync your latest projects, commits, and achievements from GitHub, LeetCode, and other platforms with lightning-fast updates.",
            color: "from-sky-500 to-blue-600",
            bgColor: "from-sky-500/10 to-blue-600/10",
            stats: "99.9% uptime",
            highlight: "Live Sync",
        },
        {
            icon: Brain,
            title: "AI-Powered Insights",
            description:
                "Get intelligent analysis of your coding patterns, skill progression, and personalized recommendations powered by advanced machine learning.",
            color: "from-violet-500 to-purple-600",
            bgColor: "from-violet-500/10 to-purple-600/10",
            stats: "10M+ analyzed",
            highlight: "Smart AI",
        },
        {
            icon: Shield,
            title: "Verified Achievements",
            description:
                "Earn credible verification badges that employers trust, backed by real data from your coding platforms and blockchain verification.",
            color: "from-emerald-500 to-green-600",
            bgColor: "from-emerald-500/10 to-green-600/10",
            stats: "100% verified",
            highlight: "Trusted",
        },
        {
            icon: Bell,
            title: "Smart Job Matching",
            description:
                "Receive instant notifications when opportunities perfectly match your verified skills and experience level using our proprietary algorithm.",
            color: "from-amber-500 to-orange-600",
            bgColor: "from-amber-500/10 to-orange-600/10",
            stats: "3x faster",
            highlight: "Instant Match",
        },
    ]

    return (
        <section className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800" />

            <div className="absolute inset-0 opacity-30 dark:opacity-20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%236366f1' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
            </div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-violet-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-500" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Badge className="px-6 py-3 mb-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full">
                        <Sparkles className="h-4 w-4 mr-2" />
                        AI-Powered Platform
                    </Badge>
                    <h2 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-slate-900 via-indigo-600 to-slate-900 dark:from-slate-100 dark:via-indigo-400 dark:to-slate-100 bg-clip-text text-transparent">
                            Powerful Features for
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                            Modern Careers
                        </span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
                        Everything you need to showcase your skills and connect with opportunities in the digital age, powered by
                        cutting-edge AI technology
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {
                        features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <Card className="relative h-full border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-[1.02]">
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}
                                        style={{ padding: "1px" }}
                                    >
                                        <div className="h-full w-full bg-white dark:bg-slate-800 rounded-lg" />
                                    </div>
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}
                                    />
                                    <div className="relative z-10">
                                        <CardHeader className="pb-4">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={`relative p-4 bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                                    >
                                                        <feature.icon className="h-7 w-7 text-white" />
                                                        <div
                                                            className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Badge
                                                            variant="secondary"
                                                            className="mb-2 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                                                        >
                                                            {feature.highlight}
                                                        </Badge>
                                                        <CardTitle
                                                            className="text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                                                            style={{
                                                                backgroundImage: `linear-gradient(to right, ${feature.color.split(" ")[1]}, ${feature.color.split(" ")[3]})`,
                                                            }}
                                                        >
                                                            {feature.title}
                                                        </CardTitle>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div
                                                        className={`text-sm font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                                                    >
                                                        {feature.stats}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            <CardDescription className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
                                                {feature.description}
                                            </CardDescription>
                                            {/* <div className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                                            <span>Learn more</span>
                                            <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                                        </div> */}
                                        </CardContent>
                                    </div>
                                    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                                </Card>
                            </motion.div>
                        ))
                    }
                </div>
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Ready to experience the future of portfolio building?
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex -space-x-1">
                            {
                                [1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 border-2 border-white dark:border-slate-800"
                                    />
                                ))
                            }
                        </div>
                        <span>Trusted by 15,000+ developers worldwide</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}