"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Briefcase, Star, Clock, Building2, MapPin, DollarSign,
    Sparkles, Target, TrendingUp, Users, CheckCircle, ArrowRight,
    Github, Linkedin, Twitter, Globe, Mail
} from "lucide-react";

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
}

interface Job {
    id: string;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    salary: string;
    type: string;
    matchPercentage: number;
    postedAt: string;
    description: string;
    skills: string[];
    benefits: string[];
}

export default function DashboardPage() {
    const { user } = useUser();
    const [recentJobs, setRecentJobs] = useState<Job[]>([]);
    const [specializedJobs, setSpecializedJobs] = useState<Job[]>([]);

    // Mock data - Replace with actual API calls
    useEffect(() => {
        const mockJobs: Job[] = [
            {
                id: "1",
                title: "Senior Frontend Developer",
                company: "TechCorp",
                companyLogo: "https://ui-avatars.com/api/?name=TechCorp&background=0D8ABC&color=fff",
                location: "Remote",
                salary: "$120k - $150k",
                type: "Full-time",
                matchPercentage: 95,
                postedAt: "2h ago",
                description: "We're looking for a Senior Frontend Developer to join our team and help build the next generation of our product.",
                skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
                benefits: ["Remote Work", "Health Insurance", "401k", "Unlimited PTO"]
            },
            {
                id: "2",
                title: "Full Stack Engineer",
                company: "StartupX",
                companyLogo: "https://ui-avatars.com/api/?name=StartupX&background=0D8ABC&color=fff",
                location: "New York, NY",
                salary: "$130k - $160k",
                type: "Full-time",
                matchPercentage: 88,
                postedAt: "5h ago",
                description: "Join our team to work on cutting-edge projects and be part of a dynamic team.",
                skills: ["JavaScript", "Node.js", "React", "Python"],
                benefits: ["Health Insurance", "401k", "Unlimited PTO"]
            },
            // Add more mock jobs as needed
        ];

        setRecentJobs(mockJobs);
        setSpecializedJobs([...mockJobs].reverse());
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-32">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-4">
                                <Badge className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-1">
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    AI-Powered Dashboard
                                </Badge>
                                <Badge variant="outline" className="px-4 py-1 border-teal-500/20">
                                    <Target className="h-4 w-4 mr-2" />
                                    Match Score: 85%
                                </Badge>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {getGreeting()}, {user?.firstName || "there"}! 👋
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Here's what's happening with your job search today.
                            </p>
                        </div>
                        <Link href="/portfolio">
                            <Button className="bg-gradient-to-r from-teal-400 to-emerald-400 text-white hover:from-teal-500 hover:to-emerald-500">
                                View Portfolio
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Job Listings - Left Side (2/3 width) */}
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="recent" className="w-full">
                            <TabsList className="mb-6 bg-gray-100 dark:bg-gray-800">
                                <TabsTrigger value="recent" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
                                    <Clock className="h-4 w-4" />
                                    Recent Matches
                                </TabsTrigger>
                                <TabsTrigger value="specialized" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
                                    <Star className="h-4 w-4" />
                                    AI Specialized
                                </TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="recent">
                                <div className="space-y-6">
                                    {recentJobs.map((job) => (
                                        <JobCard key={job.id} job={job} />
                                    ))}
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="specialized">
                                <div className="space-y-6">
                                    {specializedJobs.map((job) => (
                                        <JobCard key={job.id} job={job} />
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Profile Summary - Right Side (1/3 width) */}
                    <div className="space-y-6">
                        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                            {user?.fullName}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1 text-gray-600 dark:text-gray-400">
                                            <Mail className="h-4 w-4" />
                                            {user?.primaryEmailAddress?.emailAddress}
                                        </CardDescription>
                                    </div>
                                    <div className="h-12 w-12 rounded-full overflow-hidden">
                                        <Image
                                            src={user?.imageUrl || "https://ui-avatars.com/api/?name=User"}
                                            alt="Profile"
                                            width={48}
                                            height={48}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">Profile Completion</span>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">85%</span>
                                        </div>
                                        <Progress value={85} className="h-2 bg-gray-100 dark:bg-gray-800" />
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Connected Platforms</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-black text-white">
                                                    <Github className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">GitHub</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">@username</div>
                                                </div>
                                                <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-600 text-white">
                                                    <Linkedin className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">LinkedIn</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">@username</div>
                                                </div>
                                                <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-white">
                                    <TrendingUp className="h-5 w-5 text-teal-500" />
                                    Job Search Stats
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">Profile Views</span>
                                        <span className="text-lg font-semibold text-teal-600 dark:text-teal-400">124</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">Job Matches</span>
                                        <span className="text-lg font-semibold text-teal-600 dark:text-teal-400">45</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">Applications</span>
                                        <span className="text-lg font-semibold text-teal-600 dark:text-teal-400">12</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

function JobCard({ job }: { job: Job }) {
    return (
        <Card className="hover:shadow-lg transition-all duration-300 group border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={job.companyLogo}
                            alt={job.company}
                            width={48}
                            height={48}
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                    {job.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1 text-gray-600 dark:text-gray-400">
                                    <Building2 className="h-4 w-4" />
                                    <span>{job.company}</span>
                                    <span>•</span>
                                    <MapPin className="h-4 w-4" />
                                    <span>{job.location}</span>
                                </div>
                            </div>
                            <Badge className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800">
                                {job.matchPercentage}% Match
                            </Badge>
                        </div>
                        
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{job.description}</p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Badge variant="secondary" className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                    <Briefcase className="h-3 w-3" />
                                    {job.type}
                                </Badge>
                                <Badge variant="secondary" className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                    <DollarSign className="h-3 w-3" />
                                    {job.salary}
                                </Badge>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{job.postedAt}</span>
                            </div>
                            <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
                                Apply Now
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 