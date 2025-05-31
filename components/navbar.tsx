"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
    Menu, Home, User, Briefcase, BookOpen, Github, Twitter, Linkedin, Sparkles, ArrowRight, Code,
    Sun, Moon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import Image from "next/image"
import { SignUpButton, UserButton, useUser } from "@clerk/nextjs"

const navigationLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/details", label: "Build Portfolio", icon: User },
    { href: "/portfolio", label: "Demo Portfolio", icon: Briefcase },
    { href: "/nextsteps", label: "Next Steps", icon: BookOpen },
]

const socialLinks = [
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const { user, isLoaded } = useUser();

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/"
        return pathname.startsWith(href)
    }

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="w-full h-24 flex items-center justify-center fixed top-0 z-50">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={cn(
                    "w-[96%] max-w-7xl mx-auto rounded-2xl transition-all duration-300",
                    scrolled
                        ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-lg dark:shadow-gray-800/30"
                        : "bg-white/50 dark:bg-gray-900/50 backdrop-blur-md",
                )}
            >
                <div className="px-6">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <Image
                                    src="/truefolio.png"
                                    alt="TrueFolio Logo"
                                    width={40}
                                    height={40}
                                    className="group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">
                                    <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
                                        TrueFolio
                                    </span>
                                    <span className="text-xs font-normal block bg-gradient-to-r from-teal-500 to-emerald-800 bg-clip-text text-transparent">
                                        By The Coder'z
                                    </span>
                                </h1>
                            </div>
                        </Link>
                        <div className="hidden lg:flex items-center gap-8">
                            {
                                navigationLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                            isActive(link.href)
                                                ? "text-teal-500 dark:text-teal-400"
                                                : "text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400"
                                        }`}
                                    >
                                        <link.icon className="h-4 w-4" />
                                        {link.label}
                                        {
                                            isActive(link.href) && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-emerald-400"
                                                    initial={false}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )
                                        }
                                    </Link>
                                ))
                            }
                        </div>
                        <div className="hidden lg:flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                onClick={toggleTheme}
                            >
                                {
                                    mounted && theme === 'light' ? (
                                        <Sun className="h-5 w-5 text-yellow-500" />
                                    ) : (
                                        <Moon className="h-5 w-5 text-slate-400" />
                                    )
                                }
                            </Button>
                            <Badge 
                                variant="outline" 
                                className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white border-none px-3 py-1.5 text-sm font-medium"
                            >
                                <Sparkles className="h-4 w-4 mr-1.5" />
                                AI Verified
                            </Badge>
                            {!isLoaded ? null : !user ? (
                                <SignUpButton mode="modal" forceRedirectUrl="/details">
                                    <Button className="cursor-pointer bg-gradient-to-r from-teal-400 to-emerald-400 text-white hover:from-teal-500 hover:to-emerald-500 shadow-md hover:shadow-lg transition-all duration-300">
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                </SignUpButton>
                            ) : (
                                <UserButton afterSignOutUrl="/" />
                            )}
                        </div>
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="lg:hidden">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80 p-0">
                                <div className="flex flex-col h-full">
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
                                    <div className="flex-1 p-6">
                                        <div className="space-y-2">
                                            {
                                                navigationLinks.map((link) => (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive(link.href)
                                                            ? "text-blue-600 bg-blue-50 border border-blue-200"
                                                            : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                                            }`}
                                                    >
                                                        {link.label}
                                                        {isActive(link.href) && <Badge className="ml-auto bg-blue-500 text-white">Active</Badge>}
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                        <div className="mt-8 space-y-4">
                                            <Badge
                                                variant="secondary"
                                                className="bg-gray-800 text-white border-gray-700 w-full justify-center py-2"
                                            >
                                                <Sparkles className="h-3 w-3 mr-1" />
                                                AI Verified Platform
                                            </Badge>
                                            {!isLoaded ? null : !user ? (
                                                <SignUpButton mode="modal" forceRedirectUrl="/details">
                                                <Button className="w-full bg-white text-black hover:bg-gray-100">
                                                    Get Started Free
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                                </SignUpButton>
                                            ) : (
                                                <div className="flex justify-center">
                                                    <UserButton afterSignOutUrl="/" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="text-sm font-medium text-gray-900 mb-4">Connect With Us</h3>
                                            <div className="flex gap-3">
                                                {
                                                    socialLinks.map((social) => (
                                                        <a
                                                            key={social.href}
                                                            href={social.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                                                        >
                                                            <social.icon className="h-5 w-5" />
                                                        </a>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
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
        </div>
    )
}