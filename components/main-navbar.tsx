'use client';

import { useTheme } from "next-themes";
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from "react";
import {
    Bell, Moon, Sun, ChevronDown, Zap, Home, 
    ArrowLeft, Sparkles, Crown, Award
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

const MainNavbar = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const { theme, setTheme } = useTheme();
    const { user } = useUser();
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Mock data - replace with actual data fetching
    const [xp, setXp] = useState(1250);
    const [credits, setCredits] = useState(15);
    const [notifications, setNotifications] = useState(3);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getPageTitle = () => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const currentPath = pathSegments[pathSegments.length - 1] || 'dashboard';
        
        switch (currentPath) {
            case 'dashboard':
                return 'Dashboard';
            case 'details':
                return 'Connect Profiles';
            case 'portfolio':
                return 'Portfolio';
            case 'nextsteps':
                return 'Next Steps';
            case 'pricing':
                return 'Get Credits';
            default:
                return currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
        }
    };

    const canGoBack = () => {
        return pathname !== '/dashboard' && pathname !== '/';
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <nav className={`fixed top-0 right-0 bg-background/80 backdrop-blur-xl border-b border-border transition-all duration-300 z-10 ${scrolled ? 'shadow-sm bg-background/95' : ''} ${isCollapsed ? 'left-[60px]' : 'left-[200px]'}`}>
            <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Left Section - Page Title & Navigation */}
                    <div className="flex items-center gap-4">
                        {canGoBack() && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleBack}
                                className="hover:bg-muted rounded-xl cursor-pointer"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Button>
                        )}
                        
                        <div className="flex items-center gap-3">
                            <motion.h1 
                                className="text-xl font-bold text-foreground"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={pathname}
                            >
                                {getPageTitle()}
                            </motion.h1>
                            
                            {user && (
                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                                    <Crown className="h-3 w-3 mr-1" />
                                    Pro User
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Right Section - Controls */}
                    <div className="flex items-center gap-3">
                        {/* XP Display */}
                        <motion.div 
                            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 px-3 py-2 rounded-xl border border-indigo-500/20 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push('/pricing')}
                        >
                            <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            <span className="font-semibold text-indigo-700 dark:text-indigo-300 text-sm">
                                {xp} XP
                            </span>
                        </motion.div>

                        {/* Credits Display */}
                        <motion.div 
                            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 px-3 py-2 rounded-xl border border-amber-500/20 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push('/pricing')}
                        >
                            <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            <span className="font-semibold text-amber-700 dark:text-amber-300 text-sm">
                                {credits}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 rounded-lg text-xs font-medium cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push('/pricing');
                                }}
                            >
                                Get More
                            </Button>
                        </motion.div>

                        {/* Theme Toggle */}
                        <div className="flex items-center bg-muted/50 rounded-xl p-1 border border-border/50">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 w-8 p-0 rounded-lg transition-all cursor-pointer ${theme === 'light' ? 'bg-background shadow-sm' : 'hover:bg-muted'}`}
                                onClick={() => setTheme('light')}
                            >
                                <Sun className="h-4 w-4 text-amber-500" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 w-8 p-0 rounded-lg transition-all cursor-pointer ${theme === 'dark' ? 'bg-background shadow-sm' : 'hover:bg-muted'}`}
                                onClick={() => setTheme('dark')}
                            >
                                <Moon className="h-4 w-4 text-blue-500" />
                            </Button>
                        </div>

                        {/* Notifications */}
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="relative hover:bg-muted rounded-xl p-2 cursor-pointer"
                        >
                            <Bell className="h-5 w-5 text-muted-foreground" />
                            {notifications > 0 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1"
                                >
                                    <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center bg-rose-500 text-white text-xs">
                                        {notifications}
                                    </Badge>
                                </motion.div>
                            )}
                        </Button>

                        {/* Home Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push('/')}
                            className="hover:bg-muted rounded-xl p-2 cursor-pointer"
                        >
                            <Home className="h-5 w-5 text-muted-foreground" />
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MainNavbar; 