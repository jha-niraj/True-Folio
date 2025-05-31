"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Shield, TrendingUp, Star, Clock } from "lucide-react"

export default function CareerOpportunitiesSection({ isEmployer = false }) {
    if (isEmployer) return null

    return (
        <>
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 dark:from-violet-950/20 dark:to-indigo-950/20" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%236366f1' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 dark:opacity-20" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="px-4 py-2 mb-6 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full inline-flex items-center">
                            <Briefcase className="h-4 w-4 mr-2" />
                            Career Opportunities
                        </Badge>

                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 dark:from-violet-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                                Apply to Jobs Directly
                            </span>
                        </h2>

                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Skip the endless job boards. Apply directly to companies through our platform with your verified portfolio
                            and get noticed by top employers.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {
                            [
                                {
                                    icon: Briefcase,
                                    title: "Curated Opportunities",
                                    description:
                                        "Access exclusive job openings from top tech companies looking for verified talent. Get matched with positions that align with your skills and career goals.",
                                    gradient: "from-indigo-500 to-violet-600",
                                    bgGradient: "from-indigo-500/5 to-violet-600/5 dark:from-indigo-500/10 dark:to-violet-600/10",
                                },
                                {
                                    icon: Shield,
                                    title: "Verified Applications",
                                    description:
                                        "Stand out with AI-verified skills and achievements that employers trust. Your portfolio becomes your competitive advantage in the job market.",
                                    gradient: "from-emerald-500 to-teal-600",
                                    bgGradient: "from-emerald-500/5 to-teal-600/5 dark:from-emerald-500/10 dark:to-teal-600/10",
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Higher Success Rate",
                                    description:
                                        "Experience a 3x higher interview rate compared to traditional applications. Our platform helps you bypass the traditional hiring barriers.",
                                    gradient: "from-fuchsia-500 to-purple-600",
                                    bgGradient: "from-fuchsia-500/5 to-purple-600/5 dark:from-fuchsia-500/10 dark:to-purple-600/10",
                                },
                            ].map((card, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group"
                                >
                                    <div className="relative h-full">
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} rounded-2xl transform group-hover:scale-105 transition-transform duration-300`}
                                        />
                                        <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
                                            <CardHeader>
                                                <div
                                                    className={`p-4 bg-gradient-to-r ${card.gradient} rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                                                >
                                                    <card.icon className="h-8 w-8 text-white" />
                                                </div>
                                                <CardTitle className="text-xl text-center dark:text-white">{card.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <CardDescription className="text-gray-600 dark:text-gray-300 text-center text-base leading-relaxed">
                                                    {card.description}
                                                </CardDescription>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-emerald-50/50 dark:from-teal-950/20 dark:to-emerald-950/20" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 dark:opacity-20" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="px-4 py-2 mb-6 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full inline-flex items-center">
                            <Star className="h-4 w-4 mr-2" />
                            Success Stories
                        </Badge>

                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                                Developer Success Stories
                            </span>
                        </h2>

                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Join our community of successful developers who have transformed their careers through our platform
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {
                            [
                                {
                                    name: "Alex",
                                    role: "SDE at Google",
                                    salary: "$180k",
                                    time: "3 weeks",
                                    color: "from-cyan-500 to-blue-600",
                                },
                                {
                                    name: "Priya",
                                    role: "Frontend at Meta",
                                    salary: "$165k",
                                    time: "2 months",
                                    color: "from-fuchsia-500 to-purple-600",
                                },
                                {
                                    name: "David",
                                    role: "Backend at Netflix",
                                    salary: "$170k",
                                    time: "1 month",
                                    color: "from-amber-500 to-orange-600",
                                },
                                {
                                    name: "Sarah",
                                    role: "Full Stack at Stripe",
                                    salary: "$160k",
                                    time: "6 weeks",
                                    color: "from-emerald-500 to-teal-600",
                                },
                            ].map((story, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/80 to-gray-200/80 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                                        <Card className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
                                            <CardContent className="pt-6">
                                                <div
                                                    className={`w-20 h-20 bg-gradient-to-r ${story.color} rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                                >
                                                    {story.name[0]}
                                                </div>
                                                <h3 className="text-xl font-bold mb-2 text-center dark:text-white">{story.name}</h3>
                                                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">{story.role}</p>
                                                <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-full py-2 px-4 mb-4 mx-auto max-w-[120px]">
                                                    <p className="text-emerald-600 dark:text-emerald-400 font-bold text-lg text-center">
                                                        {story.salary}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <Clock className="h-4 w-4" />
                                                    <p>Hired in {story.time}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}