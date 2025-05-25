"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Code,
  Users,
  PenTool,
  Mail,
  Github,
  Code2,
  Linkedin,
  Twitter,
  FileText,
  Hash,
  Plus,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Instagram,
  Youtube,
  Globe,
  Briefcase,
  MessageSquare,
} from "lucide-react"

interface UserData {
  code: { platform: string; link: string }[]
  socials: { platform: string; link: string }[]
  blogs: { platform: string; link: string }[]
  contact: { platform: string; link: string }[]
}

export default function InputPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData>({
    code: [],
    socials: [],
    blogs: [],
    contact: [],
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [customDialogOpen, setCustomDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<keyof UserData>("code")
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [inputLink, setInputLink] = useState("")
  const [customPlatform, setCustomPlatform] = useState("")
  const [customLink, setCustomLink] = useState("")

  const categories = [
    {
      key: "code" as keyof UserData,
      title: "Coding Platforms",
      description: "Connect your development profiles",
      icon: Code,
      color: "from-blue-500 to-purple-500",
      options: [
        { value: "github", label: "GitHub", icon: Github },
        { value: "leetcode", label: "LeetCode", icon: Code2 },
        { value: "codechef", label: "CodeChef", icon: Code },
        { value: "codeforces", label: "Codeforces", icon: Code },
        { value: "hackerrank", label: "HackerRank", icon: Code },
        { value: "kaggle", label: "Kaggle", icon: Code },
        { value: "gitlab", label: "GitLab", icon: Github },
        { value: "bitbucket", label: "Bitbucket", icon: Github },
      ],
    },
    {
      key: "socials" as keyof UserData,
      title: "Social Networks",
      description: "Link your social presence",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      options: [
        { value: "linkedin", label: "LinkedIn", icon: Linkedin },
        { value: "twitter", label: "Twitter", icon: Twitter },
        { value: "instagram", label: "Instagram", icon: Instagram },
        { value: "youtube", label: "YouTube", icon: Youtube },
        { value: "discord", label: "Discord", icon: MessageSquare },
        { value: "telegram", label: "Telegram", icon: MessageSquare },
      ],
    },
    {
      key: "blogs" as keyof UserData,
      title: "Content Platforms",
      description: "Showcase your writing",
      icon: PenTool,
      color: "from-orange-500 to-red-500",
      options: [
        { value: "medium", label: "Medium", icon: FileText },
        { value: "hashnode", label: "Hashnode", icon: Hash },
        { value: "devto", label: "Dev.to", icon: FileText },
        { value: "substack", label: "Substack", icon: FileText },
        { value: "personal-blog", label: "Personal Blog", icon: Globe },
        { value: "notion", label: "Notion", icon: FileText },
      ],
    },
    {
      key: "contact" as keyof UserData,
      title: "Contact Information",
      description: "How employers can reach you",
      icon: Mail,
      color: "from-pink-500 to-rose-500",
      options: [
        { value: "email", label: "Email", icon: Mail },
        { value: "phone", label: "Phone", icon: Mail },
        { value: "website", label: "Personal Website", icon: Globe },
        { value: "portfolio", label: "Portfolio Site", icon: Briefcase },
      ],
    },
  ]

  const handlePlatformSelect = (category: keyof UserData, platform: string) => {
    setCurrentCategory(category)
    setSelectedPlatform(platform)
    setDialogOpen(true)
  }

  const handleCustomPlatform = (category: keyof UserData) => {
    setCurrentCategory(category)
    setCustomDialogOpen(true)
  }

  const handleSubmit = () => {
    if (inputLink.trim() && selectedPlatform) {
      setUserData((prev) => ({
        ...prev,
        [currentCategory]: [...prev[currentCategory], { platform: selectedPlatform, link: inputLink.trim() }],
      }))
      setInputLink("")
      setSelectedPlatform("")
      setDialogOpen(false)
    }
  }

  const handleCustomSubmit = () => {
    if (customLink.trim() && customPlatform.trim()) {
      setUserData((prev) => ({
        ...prev,
        [currentCategory]: [...prev[currentCategory], { platform: customPlatform.trim(), link: customLink.trim() }],
      }))
      setCustomLink("")
      setCustomPlatform("")
      setCustomDialogOpen(false)
    }
  }

  const handleGeneratePortfolio = () => {
    const username = "demo-user"
    router.push(`/portfolio/${username}`)
  }

  const removePlatform = (category: keyof UserData, index: number) => {
    setUserData((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }))
  }

  const totalConnections = Object.values(userData).flat().length
  const progressPercentage = Math.min((totalConnections / 8) * 100, 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Portfolio Builder
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Connect Your Digital Presence
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Link your platforms and let our AI create insights that showcase your true potential to employers
          </p>

          {/* Progress Indicator */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{totalConnections}/8 platforms connected</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </motion.div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl group h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 bg-gradient-to-r ${category.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">{category.title}</CardTitle>
                      <CardDescription className="text-gray-600">{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Platform Selector */}
                  <Select onValueChange={(value) => handlePlatformSelect(category.key, value)}>
                    <SelectTrigger className="border-gray-300 hover:border-blue-400 transition-colors">
                      <SelectValue placeholder="Choose a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {category.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-3">
                            <option.icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Custom Platform Button */}
                  <Button
                    variant="outline"
                    onClick={() => handleCustomPlatform(category.key)}
                    className="w-full border-dashed border-gray-300 hover:border-blue-400 text-gray-600 hover:text-blue-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Platform
                  </Button>

                  {/* Connected Platforms */}
                  <div className="space-y-3">
                    {userData[category.key].map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                          <div>
                            <div className="font-medium text-gray-900 capitalize">{item.platform}</div>
                            <div className="text-sm text-gray-600 truncate max-w-[200px]">{item.link}</div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePlatform(category.key, itemIndex)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          ×
                        </Button>
                      </motion.div>
                    ))}

                    {userData[category.key].length === 0 && (
                      <div className="text-center py-8 text-gray-400">
                        <Plus className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">No platforms connected yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Generate Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            onClick={handleGeneratePortfolio}
            disabled={totalConnections === 0}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg px-12 py-4 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {totalConnections === 0 ? (
              "Connect at least one platform"
            ) : (
              <>
                Generate AI Portfolio ({totalConnections} connections)
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          {totalConnections > 0 && (
            <p className="text-sm text-gray-600 mt-4">Our AI will analyze your data and create personalized insights</p>
          )}
        </motion.div>

        {/* Dialog for platform links */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Add {selectedPlatform} Profile</DialogTitle>
              <DialogDescription>
                Enter your {selectedPlatform} profile URL or username to connect your account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="link" className="text-sm font-medium">
                  Profile URL or Username
                </Label>
                <Input
                  id="link"
                  value={inputLink}
                  onChange={(e) => setInputLink(e.target.value)}
                  placeholder={`https://${selectedPlatform}.com/yourprofile`}
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                disabled={!inputLink.trim()}
              >
                Connect Platform
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog for custom platforms */}
        <Dialog open={customDialogOpen} onOpenChange={setCustomDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Add Custom Platform</DialogTitle>
              <DialogDescription>
                Add a platform that's not in our list. Enter the platform name and your profile link.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="custom-platform" className="text-sm font-medium">
                  Platform Name
                </Label>
                <Input
                  id="custom-platform"
                  value={customPlatform}
                  onChange={(e) => setCustomPlatform(e.target.value)}
                  placeholder="e.g., Behance, Dribbble, etc."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="custom-link" className="text-sm font-medium">
                  Profile URL
                </Label>
                <Input
                  id="custom-link"
                  value={customLink}
                  onChange={(e) => setCustomLink(e.target.value)}
                  placeholder="https://platform.com/yourprofile"
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setCustomDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCustomSubmit}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                disabled={!customPlatform.trim() || !customLink.trim()}
              >
                Add Platform
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
