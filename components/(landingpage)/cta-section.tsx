"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTASection({ SignUpButton }: { SignUpButton: any }) {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-900 dark:to-emerald-900" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
                    <p className="text-xl text-teal-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of professionals who've accelerated their careers with AI-powered portfolios
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <SignUpButton mode="modal" forceRedirectUrl="/details">
                            <Button className="bg-white dark:bg-gray-900 text-teal-600 dark:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-6 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                                Start Building Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </SignUpButton>

                        <Button
                            variant="outline"
                            className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg font-medium"
                        >
                            Watch Demo
                        </Button>
                    </div>
                    <div className="mt-10 flex items-center justify-center gap-2 text-teal-100/80">
                        <div className="flex -space-x-2">
                            {
                                [1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 border-2 border-white flex items-center justify-center text-xs font-medium text-white"
                                    >
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))
                            }
                        </div>
                        <span>+2,500 developers joined this month</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}