"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

export default function TestimonialsSection() {
    const testimonials = [
        {
            text: "This platform transformed my job search. The AI insights helped me understand my strengths and landed me a senior role at a top tech company within 3 weeks!",
            author: "Sarah Chen",
            role: "Senior Software Engineer at Google",
            avatar: "SC",
            gradient: "from-sky-500 to-blue-600",
        },
        {
            text: "We've hired 50+ developers through this platform. The verified portfolios save us countless hours in technical screening. It's a game-changer for recruitment.",
            author: "Mike Rodriguez",
            role: "Head of Engineering at Stripe",
            avatar: "MR",
            gradient: "from-violet-500 to-purple-600",
        },
    ]

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-900/50 dark:to-gray-800/50" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23475569' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 dark:opacity-20" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                            Trusted by Industry Leaders
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        See how our platform is transforming careers and hiring across the tech industry
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {
                    testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <Card className="h-full border-gray-200/70 dark:border-gray-700/70 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                    <QuoteIcon className="h-16 w-16 text-gray-400 dark:text-gray-600" />
                                </div>
                                <CardContent className="pt-8 pb-6 px-8">
                                    <blockquote className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                                        "{testimonial.text}"
                                    </blockquote>
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">{testimonial.author}</div>
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
    )
}