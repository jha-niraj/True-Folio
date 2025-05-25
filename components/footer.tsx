"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Code, Sparkles, Github, Twitter, Linkedin, Mail, ArrowRight, Heart,
    Globe, Shield, Zap, Users, BookOpen, HelpCircle, FileText, ExternalLink
} from "lucide-react"

const footerSections = [
    {
        title: "Platform",
        links: [
            { href: "/", label: "Home", icon: Globe },
            { href: "/input", label: "Build Portfolio", icon: Code },
            { href: "/portfolio/demo-user", label: "Demo Portfolio", icon: Users },
            { href: "/next-steps", label: "Next Steps", icon: BookOpen },
        ],
    },
    {
        title: "Resources",
        links: [
            { href: "https://thecoderz.in.net", label: "The Coderz", icon: ExternalLink, external: true },
            { href: "/docs", label: "Documentation", icon: FileText },
            { href: "/help", label: "Help Center", icon: HelpCircle },
            { href: "/api", label: "API Reference", icon: Code },
        ],
    },
    {
        title: "Company",
        links: [
            { href: "/about", label: "About Us", icon: Users },
            { href: "/privacy", label: "Privacy Policy", icon: Shield },
            { href: "/terms", label: "Terms of Service", icon: FileText },
            { href: "/contact", label: "Contact", icon: Mail },
        ],
    },
]

const socialLinks = [
    { href: "https://github.com", icon: Github, label: "GitHub", color: "hover:text-gray-900" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter", color: "hover:text-blue-400" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-600" },
    { href: "mailto:hello@portfolioai.com", icon: Mail, label: "Email", color: "hover:text-green-600" },
]

const features = [
    { icon: Zap, text: "AI-Powered Insights" },
    { icon: Shield, text: "Verified Achievements" },
    { icon: Users, text: "15K+ Students" },
    { icon: Globe, text: "Global Community" },
]

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Link href="/" className="flex items-center gap-3 mb-6 group">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Code className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                        <Sparkles className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        TrueFolio
                                    </h2>
                                    <p className="text-sm text-gray-400">Build. Verify. Succeed.</p>
                                </div>
                            </Link>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Transform your coding journey into a compelling story with AI-powered portfolio insights that speak to
                                employers.
                            </p>
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {
                                    features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                                            <feature.icon className="h-4 w-4 text-blue-400" />
                                            {feature.text}
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="flex gap-3">
                                {
                                    socialLinks.map((social) => (
                                        <Link
                                            key={social.href}
                                            href={social.href}
                                            target={social.href.startsWith("http") ? "_blank" : undefined}
                                            rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 ${social.color}`}
                                            aria-label={social.label}
                                        >
                                            <social.icon className="h-5 w-5" />
                                        </Link>
                                    ))
                                }
                            </div>
                        </motion.div>
                    </div>
                    <div className="lg:col-span-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {
                                footerSections.map((section, sectionIndex) => (
                                    <motion.div
                                        key={section.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
                                        <ul className="space-y-3">
                                            {
                                                section.links.map((link) => (
                                                    <li key={link.href}>
                                                        {
                                                            link.external ? (
                                                                <Link
                                                                    href={link.href}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                                                                >
                                                                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                                                    {link.label}
                                                                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                </Link>
                                                            ) : (
                                                                <Link
                                                                    href={link.href}
                                                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                                                                >
                                                                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                                                    {link.label}
                                                                </Link>
                                                            )
                                                        }
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
                            <p className="text-gray-400 mb-4 text-sm">
                                Get the latest updates on new features, career tips, and success stories.
                            </p>
                            <div className="space-y-3">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                                />
                                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                                    Subscribe
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-3">No spam, unsubscribe at any time. We respect your privacy.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>© 2024 Portfolio AI. All rights reserved.</span>
                            <span className="hidden md:inline">•</span>
                            <span className="flex items-center gap-1">
                                Made with <Heart className="h-4 w-4 text-red-500" /> for developers
                            </span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Privacy
                            </Link>
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Terms
                            </Link>
                            <Link href="/cookies" className="hover:text-white transition-colors">
                                Cookies
                            </Link>
                            <div className="flex items-center gap-1">
                                <Globe className="h-4 w-4" />
                                <span>English</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}