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
            { href: "/portfolio/demo-user", label: "Demo", icon: Users },
        ],
    },
    {
        title: "Company",
        links: [
            { href: "/about", label: "About", icon: Users },
            { href: "/privacy", label: "Privacy", icon: Shield },
            { href: "/contact", label: "Contact", icon: Mail },
        ],
    },
]

const socialLinks = [
    { href: "https://github.com", icon: Github, label: "GitHub", color: "hover:text-gray-300" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter", color: "hover:text-gray-300" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn", color: "hover:text-gray-300" },
]

const features = [
    { icon: Zap, text: "AI-Powered Insights" },
    { icon: Shield, text: "Verified Achievements" },
    { icon: Users, text: "15K+ Students" },
    { icon: Globe, text: "Global Community" },
]

export function Footer() {
    return (
        <footer className="bg-black text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="relative">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                                    <Code className="h-6 w-6 text-black" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">TrueFolio</h2>
                                <p className="text-sm text-gray-400">Build. Verify. Succeed.</p>
                            </div>
                        </Link>
                        <div className="flex gap-4 mb-6">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.href}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-gray-400 ${social.color}`}
                                >
                                    <social.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-2 gap-8">
                            {footerSections.map((section) => (
                                <div key={section.title}>
                                    <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
                                    <ul className="space-y-3">
                                        {section.links.map((link) => (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="text-gray-400 hover:text-white text-sm flex items-center gap-2"
                                                >
                                                    <link.icon className="h-4 w-4" />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-gray-400">© 2025 TrueFolio. All rights reserved(The Coder&apos;z).</p>
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <Link href="/privacy" className="hover:text-white">Privacy</Link>
                            <Link href="/terms" className="hover:text-white">Terms</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}