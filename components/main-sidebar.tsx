'use client';

import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, ChevronLeft, ChevronRight, Share2, MessageCircleCodeIcon, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { UserButton, useUser } from '@clerk/nextjs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export interface Route {
    path: string;
    name: string;
    icon?: React.ReactNode;
    status: string;
}

interface SidebarProps {
    routes?: Route[];
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar = ({ routes = [], isCollapsed, toggleSidebar }: SidebarProps) => {
    const { theme } = useTheme();
    const { user } = useUser();
    const pathname = usePathname();
    const router = useRouter();

    const isActiveRoute = (path: string) => {
        if (path === 'dashboard') {
            return pathname === '/dashboard' || pathname === '/';
        }
        return pathname.includes(path);
    };

    // Filter routes by status
    const activeRoutes = routes.filter(route => route.status === 'active');
    const comingRoutes = routes.filter(route => route.status === 'coming');

    return (
        <TooltipProvider>
            <motion.div
                className="fixed top-0 left-0 h-full bg-background/95 backdrop-blur-xl border-r border-border shadow-xl z-20"
                animate={{ width: isCollapsed ? 60 : 200 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-center p-4 h-[80px] border-b border-border/50">
                        <Link href="/" className="flex gap-2 items-center justify-center group cursor-pointer">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                                    <span className="text-primary-foreground font-bold text-lg">T</span>
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background"></div>
                            </div>
                            <motion.div
                                animate={{
                                    opacity: isCollapsed ? 0 : 1,
                                    x: isCollapsed ? -20 : 0,
                                    width: isCollapsed ? 0 : "auto"
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                            >
                                <h1 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent whitespace-nowrap">
                                    TrueFolio
                                </h1>
                            </motion.div>
                        </Link>
                    </div>

                    {/* Toggle Button */}
                    <motion.button
                        onClick={toggleSidebar}
                        className="absolute top-8 -right-3 p-1.5 bg-background rounded-full hover:bg-muted border border-border shadow-lg hover:shadow-xl transition-all duration-300 z-30 cursor-pointer"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        animate={{ rotate: isCollapsed ? 0 : 180 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </motion.button>

                    {/* Main Navigation */}
                    <div className="flex-grow overflow-y-auto py-4">
                        {/* Active Routes */}
                        <div className={`space-y-1 ${isCollapsed ? 'px-2' : 'px-3'}`}>
                            <motion.div
                                animate={{
                                    opacity: isCollapsed ? 0 : 1,
                                    height: isCollapsed ? 0 : "auto"
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                                className="px-3 mb-3"
                            >
                                {activeRoutes.length > 0 && (
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                                        Main
                                    </p>
                                )}
                            </motion.div>
                            <SidebarLinks routes={activeRoutes} collapsed={isCollapsed} isActiveRoute={isActiveRoute} />
                        </div>

                        {/* Coming Soon Routes */}
                        {comingRoutes.length > 0 && (
                            <div className={`space-y-1 mt-6 ${isCollapsed ? 'px-2' : 'px-3'}`}>
                                <motion.div
                                    animate={{
                                        opacity: isCollapsed ? 0 : 1,
                                        height: isCollapsed ? 0 : "auto"
                                    }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    style={{ overflow: "hidden" }}
                                    className="px-3 mb-3"
                                >
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                                        Coming Soon
                                    </p>
                                </motion.div>
                                <SidebarLinks routes={comingRoutes} collapsed={isCollapsed} isActiveRoute={isActiveRoute} />
                            </div>
                        )}
                    </div>

                    {/* User Section */}
                    <div className="border-t border-border/50 p-3 mt-auto">
                        {user && (
                            <div className="flex items-center justify-center mb-3">
                                {isCollapsed ? (
                                    <Tooltip>
                                        <TooltipTrigger className="cursor-pointer">
                                            <UserButton
                                                appearance={{
                                                    elements: {
                                                        avatarBox: "w-8 h-8 cursor-pointer"
                                                    }
                                                }}
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{user.fullName || user.firstName}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ) : (
                                    <motion.div
                                        animate={{
                                            opacity: isCollapsed ? 0 : 1,
                                            scale: isCollapsed ? 0.8 : 1
                                        }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="flex items-center gap-3 w-full p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                                    >
                                        <UserButton
                                            appearance={{
                                                elements: {
                                                    avatarBox: "w-8 h-8 cursor-pointer"
                                                }
                                            }}
                                        />
                                        <motion.div
                                            className="flex-1 min-w-0"
                                            animate={{
                                                opacity: isCollapsed ? 0 : 1,
                                                x: isCollapsed ? -10 : 0
                                            }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <p className="text-sm font-medium text-foreground truncate">
                                                {user.fullName || user.firstName}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {user.primaryEmailAddress?.emailAddress}
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {/* Quick Actions - Settings Commented Out */}
                        {/* 
						<div className="space-y-1">
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => router.push('/settings')}
										className={`w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start'} hover:bg-muted cursor-pointer`}
									>
										<Settings className={`h-4 w-4 ${isCollapsed ? '' : 'mr-2'}`} />
										{!isCollapsed && <span className="text-sm">Settings</span>}
									</Button>
								</TooltipTrigger>
								{isCollapsed && (
									<TooltipContent>
										<p>Settings</p>
									</TooltipContent>
								)}
							</Tooltip>
						</div>
						*/}
                    </div>
                </div>
            </motion.div>
        </TooltipProvider>
    );
};

interface SidebarLinksProps {
    routes: Route[];
    collapsed: boolean;
    isActiveRoute: (path: string) => boolean;
}

const SidebarLinks = ({ routes, collapsed, isActiveRoute }: SidebarLinksProps) => {
    const router = useRouter();

    const handleNavigation = (path: string, status: string) => {
        if (status === "coming") {
            toast("🚀 Feature Coming Soon!", {
                description: "This awesome feature is currently under development.",
                duration: 3000,
            });
        } else {
            router.push(`/${path}`);
        }
    };

    return (
        <div className="space-y-1">
            {routes.map((route, index) => {
                const isActive = isActiveRoute(route.path);

                return (
                    <Tooltip key={index}>
                        <TooltipTrigger asChild>
                            <motion.button
                                onClick={() => handleNavigation(route.path, route.status)}
                                className="block w-full cursor-pointer"
                                whileHover={{ x: collapsed ? 0 : 4 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.1 }}
                            >
                                <div className={`
                                    ${isActive
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                        : "hover:bg-muted/70 text-foreground"
                                    } 
                                    flex items-center rounded-xl transition-all duration-200 cursor-pointer group relative overflow-hidden
                                    ${route.status === "coming" ? "opacity-60" : ""}
                                    ${collapsed ? "justify-center px-3 py-3" : "px-3 py-2.5"}
                                `}>
                                    {/* Background gradient for active state */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeBackground"
                                            className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-xl"
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}

                                    {collapsed ? (
                                        // Collapsed state - center icon only
                                        <div className="relative z-10 flex items-center justify-center">
                                            <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                                                {route.icon}
                                            </div>
                                        </div>
                                    ) : (
                                        // Expanded state - icon and text
                                        <div className="flex items-center gap-3 relative z-10 w-full">
                                            <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'} flex-shrink-0`}>
                                                {route.icon}
                                            </div>
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="text-sm font-medium truncate"
                                            >
                                                {route.name}
                                            </motion.span>
                                            {route.status === "coming" && (
                                                <Badge variant="secondary" className="ml-auto text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                                    Soon
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.button>
                        </TooltipTrigger>
                        {collapsed && (
                            <TooltipContent>
                                <p>{route.name}</p>
                                {route.status === "coming" && (
                                    <p className="text-xs text-muted-foreground">Coming Soon</p>
                                )}
                            </TooltipContent>
                        )}
                    </Tooltip>
                );
            })}
        </div>
    );
};

export default Sidebar;