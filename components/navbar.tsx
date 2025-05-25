"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
    Menu, Home, User, Briefcase, BookOpen, Github, Twitter, Linkedin, Sparkles, ArrowRight, Code
} from "lucide-react"

const navigationLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/input", label: "Build Portfolio", icon: User },
    { href: "/portfolio/demo-user", label: "Demo Portfolio", icon: Briefcase },
    { href: "/next-steps", label: "Next Steps", icon: BookOpen },
]

const socialLinks = [
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname.startsWith(href)
    }

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Code className="h-6 w-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                <Sparkles className="h-2 w-2 text-white" />
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                TrueFolio
                            </h1>
                            <p className="text-xs text-gray-500 -mt-1">Build. Verify. Succeed.</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive(link.href)
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                    }`}
                            >
                                <link.icon className="h-4 w-4" />
                                {link.label}
                                {isActive(link.href) && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-blue-100 rounded-lg -z-10"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI Verified
                        </Badge>
                        <Link href="/input">
                            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="sm" className="lg:hidden">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80 p-0">
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <SheetHeader className="p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                                    <Code className="h-6 w-6 text-white" />
                                                </div>
                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                                    <Sparkles className="h-2 w-2 text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <SheetTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                    TrueFolio
                                                </SheetTitle>
                                                <p className="text-xs text-gray-500">Build. Verify. Succeed.</p>
                                            </div>
                                        </div>
                                    </div>
                                </SheetHeader>

                                {/* Navigation Links */}
                                <div className="flex-1 p-6">
                                    <div className="space-y-2">
                                        {navigationLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive(link.href)
                                                        ? "text-blue-600 bg-blue-50 border border-blue-200"
                                                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                                    }`}
                                            >
                                                <link.icon className="h-5 w-5" />
                                                {link.label}
                                                {isActive(link.href) && <Badge className="ml-auto bg-blue-500 text-white">Active</Badge>}
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Mobile CTA */}
                                    <div className="mt-8 space-y-4">
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-50 text-green-700 border-green-200 w-full justify-center py-2"
                                        >
                                            <Sparkles className="h-3 w-3 mr-1" />
                                            AI Verified Platform
                                        </Badge>
                                        <Link href="/input" onClick={() => setIsOpen(false)}>
                                            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                                                Get Started Free
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* Social Links */}
                                    <div className="mt-8">
                                        <h3 className="text-sm font-medium text-gray-900 mb-4">Connect With Us</h3>
                                        <div className="flex gap-3">
                                            {socialLinks.map((social) => (
                                                <a
                                                    key={social.href}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                                                >
                                                    <social.icon className="h-5 w-5" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="p-6 border-t border-gray-200 bg-gray-50">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">© 2024 Portfolio AI</p>
                                        <p className="text-xs text-gray-400 mt-1">Empowering careers with AI</p>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.nav>
    )
}