"use client"

import Link from "next/link"
import { Code, Github, Twitter, Linkedin } from "lucide-react"

const footerSections = [
    {
        title: "Pages",
        links: [
            { href: "/", label: "Home" },
            { href: "/input", label: "Build Portfolio" },
            { href: "/portfolio/demo-user", label: "Demo" },
            { href: "/pricing", label: "Pricing" },
        ],
    },
    {
        title: "Socials",
        links: [
            { href: "https://twitter.com", label: "X" },
            { href: "https://linkedin.com", label: "LinkedIn" },
            { href: "https://github.com", label: "GitHub" },
        ],
    },
    {
        title: "Extensions",
        links: [
            { href: "/vscode", label: "Vs Code" },
            { href: "/neovim", label: "NeoVim (soon)" },
        ],
    },
    {
        title: "Legal",
        links: [
            { href: "/terms", label: "Terms of services" },
            { href: "/privacy", label: "Privacy policy" },
        ],
    },
]

const socialLinks = [
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
]

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white relative overflow-hidden">
            {/* Large Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold text-gray-800/20 select-none">
                    TrueFolio
                </div>
            </div>

            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-1">
                            <Link href="/" className="flex items-center gap-3 mb-6">
                                <Code className="h-6 w-6 text-white" />
                                <div>
                                    <h2 className="text-lg font-medium text-white">TrueFolio</h2>
                                    <p className="text-sm text-gray-400">The Coder'z</p>
                                </div>
                            </Link>
                            <p className="text-sm text-gray-400 mb-6 max-w-xs">Code with superpowers TrueFolio</p>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <Link
                                        key={social.href}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white transition-colors duration-200"
                                    >
                                        <social.icon className="h-5 w-5" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="lg:col-span-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {footerSections.map((section) => (
                                    <div key={section.title}>
                                        <h3 className="text-sm font-medium text-white mb-4">{section.title}</h3>
                                        <ul className="space-y-3">
                                            {section.links.map((link) => (
                                                <li key={link.href}>
                                                    <Link
                                                        href={link.href}
                                                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                                                    >
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

                {/* Bottom Section */}
                <div className="border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-400">© 2025 TrueFolio. All rights reserved (The Coder&apos;z).</p>
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                                <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                                    Privacy
                                </Link>
                                <Link href="/terms" className="hover:text-white transition-colors duration-200">
                                    Terms
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
