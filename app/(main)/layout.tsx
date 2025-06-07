'use client'

import { useState, useEffect, useMemo } from 'react';
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    User, 
    FileText, 
    TrendingUp, 
    Settings,
    Code2,
    FolderKanban,
    GitBranch,
    WifiOff,
    RotateCcw,
    ImageIcon
} from 'lucide-react';
import Sidebar, { Route } from '@/components/main-sidebar';
import MainNavbar from '@/components/main-navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const pathname = usePathname();
    
    // Set initial state from localStorage if available, otherwise default to true (collapsed)
    const [isCollapsed, setIsCollapsed] = useState(() => {
        // Only run on client side
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('sidebarCollapsed');
            return saved !== null ? JSON.parse(saved) : true;
        }
        return true;
    });

    const routes: Route[] = useMemo(() => [
        {
            path: "dashboard",
            name: "Dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
            status: "active"
        },
        {
            path: "details",
            name: "Connect Profiles", 
            icon: <GitBranch className="h-5 w-5" />,
            status: "active"
        },
        {
            path: "portfolio",
            name: "Portfolio",
            icon: <User className="h-5 w-5" />,
            status: "active"
        },
        {
            path: "cards",
            name: "Cards",
            icon: <ImageIcon className="h-5 w-5" />,
            status: "active"
        },
        {
            path: "nextsteps",
            name: "Next Steps",
            icon: <TrendingUp className="h-5 w-5" />,
            status: "active"
        },
        {
            path: "projects",
            name: "Projects",
            icon: <FolderKanban className="h-5 w-5" />,
            status: "coming"
        },
        {
            path: "code-review",
            name: "Code Review",
            icon: <Code2 className="h-5 w-5" />,
            status: "coming"
        }
    ], []);

    // This effect only runs once on initial load to check screen size
    useEffect(() => {
        // Only set initial state based on screen size if there's no saved preference
        if (typeof window !== 'undefined' && localStorage.getItem('sidebarCollapsed') === null) {
            const shouldBeCollapsed = window.innerWidth < 1024;
            setIsCollapsed(shouldBeCollapsed);
        }
    }, []);

    const toggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        // Save preference to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
        }
    };

    const isOnline = useNetworkStatus();

    if (!isOnline) return <OfflineFallback />;

    return (
        <div className="flex h-screen bg-background">
            <Sidebar
                routes={routes}
                isCollapsed={isCollapsed}
                toggleSidebar={toggleSidebar}
            />
            <div className="flex flex-col flex-1">
                <MainNavbar isCollapsed={isCollapsed} />
                <main className={`bg-background transition-all duration-300 ${isCollapsed ? 'ml-[60px]' : 'ml-[200px]'} pt-16`}>
                    <div className="h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

const OfflineFallback = () => {
    const handleRefresh = () => window.location.reload();

    return (
        <div className="h-screen flex items-center justify-center bg-background px-4">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 100 }}
                    transition={{ duration: 0.6, ease: 'easeOut', type: 'spring', stiffness: 100 }}
                    className="bg-gradient-to-br from-primary/10 via-primary/5 to-background backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-sm w-full text-center border border-border"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                        className="flex justify-center mb-6"
                    >
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                            <WifiOff className="w-8 h-8 text-primary" />
                        </div>
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-3 text-foreground">
                        Connection Lost
                    </h2>
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                        Your internet connection seems to have wandered off. Check your connection and let's get back to building amazing portfolios.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRefresh}
                        className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                    </motion.button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Layout; 