'use client';

import { useTheme } from "next-themes";
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from "react";
import {
    Bell, Moon, Sun, ChevronDown, Zap, Home, 
    Menu, User, Settings, LogOut, Crown, Award
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { motion } from "framer-motion";

const MainNavbar = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const { theme, setTheme } = useTheme();
    const { user } = useUser();
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Mock data - replace with actual data fetching
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
            case 'cards':
                return 'Portfolio Cards';
            default:
                return currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
        }
    };

    return (
        <nav className={`fixed top-0 right-0 bg-background/80 backdrop-blur-xl border-b border-border transition-all duration-300 z-10 ${scrolled ? 'shadow-sm bg-background/95' : ''} ${isCollapsed ? 'left-[60px]' : 'left-[200px]'} left-0`}>
            <div className="px-3 sm:px-6 py-3 sm:py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <motion.h1 
                                className="text-lg sm:text-xl font-bold text-foreground truncate"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={pathname}
                            >
                                {getPageTitle()}
                            </motion.h1>
                            
                            {user && (
                                <Badge variant="secondary" className="hidden sm:flex bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                                    <Crown className="h-3 w-3 mr-1" />
                                    Pro
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Right Section - Controls */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Credits Display - Always Visible */}
                        <motion.div 
                            className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-amber-500/20 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push('/pricing')}
                        >
                            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600 dark:text-amber-400" />
                            <span className="font-semibold text-amber-700 dark:text-amber-300 text-xs sm:text-sm">
                                {credits}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hidden sm:flex h-5 sm:h-6 px-1 sm:px-2 bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 rounded text-xs font-medium cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push('/pricing');
                                }}
                            >
                                Get More
                            </Button>
                        </motion.div>

                        {/* Desktop Theme Toggle */}
                        <div className="hidden md:flex items-center bg-muted/50 rounded-xl p-1 border border-border/50">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-7 w-7 p-0 rounded-lg transition-all cursor-pointer ${theme === 'light' ? 'bg-background shadow-sm' : 'hover:bg-muted'}`}
                                onClick={() => setTheme('light')}
                            >
                                <Sun className="h-3 w-3 text-amber-500" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`h-7 w-7 p-0 rounded-lg transition-all cursor-pointer ${theme === 'dark' ? 'bg-background shadow-sm' : 'hover:bg-muted'}`}
                                onClick={() => setTheme('dark')}
                            >
                                <Moon className="h-3 w-3 text-blue-500" />
                            </Button>
                        </div>

                        {/* Desktop Notifications */}
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="hidden md:flex relative hover:bg-muted rounded-xl p-2 cursor-pointer"
                        >
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            {notifications > 0 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1"
                                >
                                    <Badge className="h-4 w-4 rounded-full p-0 flex items-center justify-center bg-rose-500 text-white text-xs">
                                        {notifications}
                                    </Badge>
                                </motion.div>
                            )}
                        </Button>

                        {/* User Dropdown Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                                    <Avatar className="h-8 w-8 border-2 border-border/50">
                                        <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold">
                                            {user?.fullName?.split(" ").map(n => n[0]).join("") || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <motion.div
                                        className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border border-background"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user?.primaryEmailAddress?.emailAddress}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                
                                <DropdownMenuItem className="cursor-pointer md:hidden" onClick={() => router.push('/')}>
                                    <Home className="mr-2 h-4 w-4" />
                                    <span>Home</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem className="cursor-pointer md:hidden">
                                    <Bell className="mr-2 h-4 w-4" />
                                    <span>Notifications</span>
                                    {notifications > 0 && (
                                        <Badge className="ml-auto h-4 w-4 rounded-full p-0 flex items-center justify-center bg-rose-500 text-white text-xs">
                                            {notifications}
                                        </Badge>
                                    )}
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem className="cursor-pointer md:hidden" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                                    {theme === 'dark' ? (
                                        <>
                                            <Sun className="mr-2 h-4 w-4" />
                                            <span>Light Mode</span>
                                        </>
                                    ) : (
                                        <>
                                            <Moon className="mr-2 h-4 w-4" />
                                            <span>Dark Mode</span>
                                        </>
                                    )}
                                </DropdownMenuItem>
                                
                                <DropdownMenuSeparator className="md:hidden" />
                                
                                <DropdownMenuItem className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuSeparator />
                                
                                <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MainNavbar; 