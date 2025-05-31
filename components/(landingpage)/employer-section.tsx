"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Zap, Award } from "lucide-react"

export default function EmployerSection({ isEmployer = false }) {
    if (!isEmployer) return null

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/70 to-violet-50/70 dark:from-indigo-950/30 dark:to-violet-950/30" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%238b5cf6' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 dark:opacity-20" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Why Top Companies Choose Us
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Join industry leaders who trust our platform for their hiring needs and discover exceptional talent faster
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {
                        [
                            {
                                icon: Building2,
                                title: "Pre-Screened Talent",
                                description:
                                    "All candidates come with AI-verified skills and real project portfolios that demonstrate their capabilities",
                                gradient: "from-indigo-500 to-violet-600",
                                delay: 0,
                            },
                            {
                                icon: Zap,
                                title: "Faster Hiring",
                                description:
                                    "Reduce time-to-hire by 75% with our intelligent matching algorithm that connects you with the right candidates",
                                gradient: "from-fuchsia-500 to-purple-600",
                                delay: 0.1,
                            },
                            {
                                icon: Award,
                                title: "Quality Guarantee",
                                description:
                                    "95% of our placements exceed performance expectations in their first year, backed by our satisfaction guarantee",
                                gradient: "from-emerald-500 to-teal-600",
                                delay: 0.2,
                            },
                        ].map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: card.delay }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <Card className="h-full border border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                                    <div className="absolute h-1 top-0 left-0 right-0 bg-gradient-to-r opacity-80 group-hover:opacity-100 transition-opacity duration-300 ${card.gradient}" />
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`p-3 bg-gradient-to-r ${card.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <card.icon className="h-6 w-6 text-white" />
                                            </div>
                                            <CardTitle className="text-xl dark:text-white">{card.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                            {card.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
