"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Ghost,
  Clock,
  MessageSquare,
  Calendar,
  AlertTriangle,
  Info,
  Plus,
  RefreshCw,
  Bell,
  BellOff,
  Copy,
  Send,
  ArrowUpRight,
  Zap,
  History,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Add this at the top of the file, before the component definition
// Sample data for demonstration
const sampleSituations: Record<string, any> = {
  "1": {
    id: "1",
    name: "alex",
    lastMessageDate: new Date("2025-05-10"), // 5 days ago from current date
    lastSeenDate: new Date("2025-05-12"), // 3 days ago
    responseTime: {
      current: 72, // hours
      previous: 24, // hours
      trend: "increasing" as "increasing" | "decreasing" | "stable",
    },
    messageFrequency: {
      current: 2, // messages per week
      previous: 8, // messages per week
      trend: "decreasing" as "increasing" | "decreasing" | "stable",
    },
    initiationRatio: {
      user: 80, // percentage
      other: 20, // percentage
    },
    canceledPlans: 2,
    readReceipts: {
      enabled: true,
      readButNoResponse: 3,
    },
    ghostScore: 75, // 0-100
    recoveryProbability: 35, // 0-100
    ghostHistory: [
      { date: new Date("2025-05-01"), score: 30 },
      { date: new Date("2025-05-05"), score: 45 },
      { date: new Date("2025-05-10"), score: 60 },
      { date: new Date("2025-05-15"), score: 75 },
    ],
    ghostPatterns: [
      {
        startDate: new Date("2025-03-10"),
        endDate: new Date("2025-03-20"),
        duration: 10, // days
        recovered: true,
        maxScore: 65,
      },
      {
        startDate: new Date("2025-04-15"),
        endDate: new Date("2025-04-22"),
        duration: 7, // days
        recovered: true,
        maxScore: 70,
      },
      {
        startDate: new Date("2025-05-10"),
        endDate: null,
        duration: 5, // days so far
        recovered: false,
        maxScore: 75,
      },
    ],
    notifications: {
      enabled: true,
      threshold: 15, // notify on score change of 15+ points
      lastNotification: new Date("2025-05-15"),
    },
  },
  "2": {
    id: "2",
    name: "rob",
    lastMessageDate: new Date("2025-05-13"), // 2 days ago from current date
    lastSeenDate: new Date("2025-05-14"), // 1 day ago
    responseTime: {
      current: 48, // hours
      previous: 12, // hours
      trend: "increasing" as "increasing" | "decreasing" | "stable",
    },
    messageFrequency: {
      current: 4, // messages per week
      previous: 12, // messages per week
      trend: "decreasing" as "increasing" | "decreasing" | "stable",
    },
    initiationRatio: {
      user: 65, // percentage
      other: 35, // percentage
    },
    canceledPlans: 1,
    readReceipts: {
      enabled: true,
      readButNoResponse: 2,
    },
    ghostScore: 60, // 0-100
    recoveryProbability: 55, // 0-100
    ghostHistory: [
      { date: new Date("2025-05-01"), score: 20 },
      { date: new Date("2025-05-07"), score: 35 },
      { date: new Date("2025-05-13"), score: 60 },
    ],
    ghostPatterns: [
      {
        startDate: new Date("2025-04-01"),
        endDate: new Date("2025-04-08"),
        duration: 7, // days
        recovered: true,
        maxScore: 50,
      },
      {
        startDate: new Date("2025-05-07"),
        endDate: null,
        duration: 8, // days so far
        recovered: false,
        maxScore: 60,
      },
    ],
    notifications: {
      enabled: true,
      threshold: 10, // notify on score change of 10+ points
      lastNotification: new Date("2025-05-13"),
    },
  },
  "3": {
    id: "3",
    name: "taylor",
    lastMessageDate: new Date("2025-05-14"), // 1 day ago from current date
    lastSeenDate: new Date("2025-05-15"), // today
    responseTime: {
      current: 6, // hours
      previous: 4, // hours
      trend: "increasing" as "increasing" | "decreasing" | "stable",
    },
    messageFrequency: {
      current: 15, // messages per week
      previous: 18, // messages per week
      trend: "decreasing" as "increasing" | "decreasing" | "stable",
    },
    initiationRatio: {
      user: 45, // percentage
      other: 55, // percentage
    },
    canceledPlans: 0,
    readReceipts: {
      enabled: true,
      readButNoResponse: 0,
    },
    ghostScore: 15, // 0-100
    recoveryProbability: 95, // 0-100
    ghostHistory: [
      { date: new Date("2025-05-01"), score: 10 },
      { date: new Date("2025-05-07"), score: 12 },
      { date: new Date("2025-05-14"), score: 15 },
    ],
    ghostPatterns: [],
    notifications: {
      enabled: false,
      threshold: 15, // notify on score change of 15+ points
      lastNotification: new Date("2025-05-01"),
    },
  },
}

const messageTemplates = [
  {
    id: "1",
    title: "Casual Check-in",
    description: "A friendly message to see how they're doing without being too pushy.",
    text: "Hey! How have you been lately?",
    bestFor: "Low Ghost Score",
  },
  {
    id: "2",
    title: "Direct Inquiry",
    description: "A straightforward message to address the lack of communication.",
    text: "Hey, I've noticed we haven't talked much recently. Is everything okay?",
    bestFor: "Medium Ghost Score",
  },
  {
    id: "3",
    title: "Closure Request",
    description: "A message seeking closure if they're no longer interested.",
    text: "Hey, if you're not feeling this anymore, it's okay. Just let me know so we can both move on.",
    bestFor: "High Ghost Score",
  },
  {
    id: "4",
    title: "Humorous Approach",
    description: "A lighthearted message to break the ice and gauge their interest.",
    text: "Did I do something to offend you or did you just join a monastery?",
    bestFor: "Medium Ghost Score",
  },
  {
    id: "5",
    title: "Plan Suggestion",
    description: "Suggesting a specific activity to see if they're interested in reconnecting.",
    text: "Hey, wanna grab coffee this week?",
    bestFor: "Low Ghost Score",
  },
]

// Change the component signature to accept props
export default function GhostMeterPage({ situationId }: { situationId?: string }) {
  const router = useRouter()
  const id = situationId || "1" // Default to "1" if no ID is provided
  const [situation, setSituation] = useState(sampleSituations[id] || sampleSituations["1"])
  const [activeTab, setActiveTab] = useState("overview")
  const [isUpdating, setIsUpdating] = useState(false)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(situation.notifications.enabled)
  const [notificationThreshold, setNotificationThreshold] = useState(situation.notifications.threshold)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [customMessage, setCustomMessage] = useState("")
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [updateData, setUpdateData] = useState({
    lastMessageDate: new Date().toISOString().split("T")[0],
    initiatedByThem: false,
    responseTime: 24,
    readButNoResponse: false,
    canceledPlans: false,
  })

  // Calculate days since last message
  const daysSinceLastMessage = Math.floor(
    (new Date().getTime() - new Date(situation.lastMessageDate).getTime()) / (1000 * 60 * 60 * 24),
  )

  // Calculate days since last seen
  const daysSinceLastSeen = Math.floor(
    (new Date().getTime() - new Date(situation.lastSeenDate).getTime()) / (1000 * 60 * 60 * 24),
  )

  const getGhostLevel = (score: number) => {
    if (score < 30) return { level: "low", label: "minimal signs", color: "#C9EDA8" }
    if (score < 60) return { level: "medium", label: "potential ghosting", color: "#9FBCCF" }
    if (score < 85) return { level: "high", label: "likely ghosting", color: "#B3A9C6" }
    return { level: "extreme", label: "definitely ghosted", color: "#272727" }
  }

  const getRecoveryLevel = (probability: number) => {
    if (probability < 20) return { level: "very low", color: "#272727" }
    if (probability < 40) return { level: "low", color: "#B3A9C6" }
    if (probability < 60) return { level: "moderate", color: "#9FBCCF" }
    if (probability < 80) return { level: "good", color: "#9FBCCF" }
    return { level: "high", color: "#C9EDA8" }
  }

  const ghostLevel = getGhostLevel(situation.ghostScore)
  const recoveryLevel = getRecoveryLevel(situation.recoveryProbability)

  const handleUpdateGhostMeter = () => {
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      // Update ghost score based on new data
      const newScore = calculateNewGhostScore()
      const scoreDifference = Math.abs(newScore - situation.ghostScore)

      // Check if notification should be triggered
      if (notificationsEnabled && scoreDifference >= notificationThreshold) {
        // In a real app, this would trigger a notification
        console.log(`Ghost score changed by ${scoreDifference} points! New score: ${newScore}`)
      }

      // Update situation with new data
      setSituation((prev) => ({
        ...prev,
        ghostScore: newScore,
        lastMessageDate: updateData.lastMessageDate ? new Date(updateData.lastMessageDate) : prev.lastMessageDate,
        ghostHistory: [...prev.ghostHistory, { date: new Date(), score: newScore }],
        // Update other metrics based on form data
        responseTime: {
          ...prev.responseTime,
          current: updateData.responseTime,
          previous: prev.responseTime.current,
          trend: updateData.responseTime > prev.responseTime.current ? "increasing" : "decreasing",
        },
        // In a real app, we would update all the other metrics too
        notifications: {
          ...prev.notifications,
          lastNotification: new Date(),
        },
      }))

      setIsUpdating(false)
      setShowUpdateForm(false)
    }, 1500)
  }

  const calculateNewGhostScore = () => {
    // This would be a more complex algorithm in a real app
    let baseScore = situation.ghostScore

    // Adjust based on response time
    if (updateData.responseTime > situation.responseTime.current) {
      baseScore += 10
    } else {
      baseScore -= 5
    }

    // Adjust based on who initiated
    if (!updateData.initiatedByThem) {
      baseScore += 5
    } else {
      baseScore -= 10
    }

    // Adjust based on read receipts
    if (updateData.readButNoResponse) {
      baseScore += 15
    }

    // Adjust based on canceled plans
    if (updateData.canceledPlans) {
      baseScore += 20
    }

    // Ensure score stays within 0-100 range
    return Math.max(0, Math.min(100, baseScore))
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = messageTemplates.find((t) => t.id === templateId)
    if (template) {
      setCustomMessage(template.text)
    }
  }

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(customMessage)
    // In a real app, we would show a toast notification
    console.log("Message copied to clipboard!")
  }

  const handleSendMessage = () => {
    // In a real app, this would integrate with the messaging system
    console.log("Message sent:", customMessage)
    setShowTemplateDialog(false)
  }

  const toggleNotifications = (enabled: boolean) => {
    setNotificationsEnabled(enabled)
    setSituation((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        enabled,
      },
    }))
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5FAFA] dark:bg-[#272727] text-[#272727] dark:text-[#F5FAFA]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-lg">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-light">ghost meter</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleNotifications(!notificationsEnabled)}
            className="mr-1"
          >
            {notificationsEnabled ? (
              <Bell className="h-4 w-4 text-[#9FBCCF]" />
            ) : (
              <BellOff className="h-4 w-4 text-[#272727]/40 dark:text-[#F5FAFA]/40" />
            )}
          </Button>
          <Badge
            className={cn(
              "bg-opacity-20 border-opacity-30",
              ghostLevel.level === "low" && "bg-[#C9EDA8]/20 text-[#C9EDA8] border-[#C9EDA8]/30",
              ghostLevel.level === "medium" && "bg-[#9FBCCF]/20 text-[#9FBCCF] border-[#9FBCCF]/30",
              ghostLevel.level === "high" && "bg-[#B3A9C6]/20 text-[#B3A9C6] border-[#B3A9C6]/30",
              ghostLevel.level === "extreme" && "bg-[#272727]/20 text-[#272727] border-[#272727]/30",
            )}
          >
            {ghostLevel.label}
          </Badge>
        </div>
      </header>

      {/* Situation info */}
      <div className="px-4 py-3 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-[#9FBCCF]/20 flex items-center justify-center">
              <span className="text-sm font-medium text-[#9FBCCF]">{situation.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h2 className="text-lg font-light">{situation.name}</h2>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">
                  last message: {daysSinceLastMessage} days ago
                </p>
                <span className="text-xs text-[#272727]/40 dark:text-[#F5FAFA]/40">•</span>
                <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">
                  last seen: {daysSinceLastSeen} days ago
                </p>
              </div>
            </div>
          </div>
          <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white">
                <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Message Templates</DialogTitle>
                <DialogDescription>Choose a template based on the current ghosting situation</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-2">
                  {messageTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={cn(
                        "p-3 border rounded-md cursor-pointer transition-colors",
                        selectedTemplate === template.id
                          ? "border-[#9FBCCF] bg-[#9FBCCF]/10"
                          : "border-[#9FBCCF]/20 hover:border-[#9FBCCF]/40",
                      )}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <h4 className="text-sm font-medium">{template.title}</h4>
                      <p className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70 mt-1">{template.description}</p>
                      <Badge
                        variant="outline"
                        className="mt-2 text-[10px] bg-[#9FBCCF]/10 text-[#9FBCCF] border-[#9FBCCF]/30"
                      >
                        {template.bestFor}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Type your message or select a template"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter className="flex space-x-2 sm:justify-between">
                <Button type="button" variant="outline" onClick={handleCopyTemplate}>
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                  Copy
                </Button>
                <div className="flex space-x-2">
                  <Button type="button" variant="ghost" onClick={() => setShowTemplateDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSendMessage}
                    className="bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
                  >
                    <Send className="h-3.5 w-3.5 mr-1.5" />
                    Send
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
        <div className="px-4 pt-2 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview">overview</TabsTrigger>
            <TabsTrigger value="insights">insights</TabsTrigger>
            <TabsTrigger value="patterns">patterns</TabsTrigger>
            <TabsTrigger value="history">history</TabsTrigger>
          </TabsList>
        </div>

        <main className="flex-1 p-4">
          <TabsContent value="overview" className="mt-0 space-y-4">
            {/* Ghost Meter */}
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-[#9FBCCF]/10 flex items-center justify-center">
                      <Ghost className="h-5 w-5 text-[#9FBCCF]" />
                    </div>
                    <h3 className="text-base font-medium">ghost meter</h3>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => setShowUpdateForm(!showUpdateForm)}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    update
                  </Button>
                </div>

                {/* Ghost Meter Visualization */}
                <div className="relative h-8 bg-gradient-to-r from-[#C9EDA8]/50 via-[#9FBCCF]/50 to-[#B3A9C6]/50 rounded-full overflow-hidden mb-2">
                  <div
                    className="absolute top-0 bottom-0 left-0 w-1 bg-white dark:bg-[#272727] transition-all duration-500"
                    style={{ left: `${situation.ghostScore}%`, transform: "translateX(-50%)" }}
                  ></div>
                  <div
                    className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-[#272727] border-2 transition-all duration-500 shadow-md"
                    style={{
                      left: `${situation.ghostScore}%`,
                      transform: "translateX(-50%)",
                      borderColor: ghostLevel.color,
                    }}
                  >
                    <Ghost className="h-4 w-4" style={{ color: ghostLevel.color }} />
                  </div>
                </div>

                <div className="flex justify-between text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60 mb-4">
                  <span>active</span>
                  <span>slow responses</span>
                  <span>ghosting</span>
                </div>

                {/* Recovery Probability */}
                <div className="mt-6 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 text-[#F8CE97] mr-2" />
                      <span className="text-sm">recovery probability</span>
                    </div>
                    <Badge
                      className={`bg-[${recoveryLevel.color}]/20 text-[${recoveryLevel.color}] border-[${recoveryLevel.color}]/30`}
                    >
                      {recoveryLevel.level}
                    </Badge>
                  </div>
                  <div className="relative h-2 bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${situation.recoveryProbability}%`,
                        backgroundColor: recoveryLevel.color,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70 mt-2">
                    Based on their past patterns, there's a {situation.recoveryProbability}% chance they'll resume
                    regular contact.
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="h-4 w-4 text-[#9FBCCF]" />
                      <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">response time</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-lg font-medium">{situation.responseTime.current}h</span>
                      <div className="flex items-center text-xs">
                        {situation.responseTime.trend === "increasing" ? (
                          <span className="text-[#E57373]">
                            ↑ {situation.responseTime.current - situation.responseTime.previous}h
                          </span>
                        ) : (
                          <span className="text-[#C9E7CB]">
                            ↓ {situation.responseTime.previous - situation.responseTime.current}h
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <MessageSquare className="h-4 w-4 text-[#B3A9C6]" />
                      <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">weekly messages</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-lg font-medium">{situation.messageFrequency.current}</span>
                      <div className="flex items-center text-xs">
                        {situation.messageFrequency.trend === "decreasing" ? (
                          <span className="text-[#E57373]">
                            ↓ {situation.messageFrequency.previous - situation.messageFrequency.current}
                          </span>
                        ) : (
                          <span className="text-[#C9E7CB]">
                            ↑ {situation.messageFrequency.current - situation.messageFrequency.previous}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F8CE97]/10 dark:bg-[#F8CE97]/5 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="h-4 w-4 text-[#F8CE97]" />
                      <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">canceled plans</span>
                    </div>
                    <span className="text-lg font-medium">{situation.canceledPlans}</span>
                  </div>

                  <div className="bg-[#C9E7CB]/10 dark:bg-[#C9E7CB]/5 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <MessageSquare className="h-4 w-4 text-[#C9E7CB]" />
                      <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">initiation ratio</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">you: {situation.initiationRatio.user}%</span>
                      <span className="text-xs text-[#272727]/50 dark:text-[#F5FAFA]/50">|</span>
                      <span className="text-sm">them: {situation.initiationRatio.other}%</span>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="mt-6 pt-4 border-t border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-[#9FBCCF]" />
                      <span className="text-sm font-medium">ghost alerts</span>
                    </div>
                    <Switch checked={notificationsEnabled} onCheckedChange={toggleNotifications} />
                  </div>

                  {notificationsEnabled && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="threshold" className="text-xs">
                          alert threshold (score change)
                        </Label>
                        <span className="text-xs font-medium">{notificationThreshold} points</span>
                      </div>
                      <Slider
                        id="threshold"
                        min={5}
                        max={30}
                        step={5}
                        value={[notificationThreshold]}
                        onValueChange={(value) => setNotificationThreshold(value[0])}
                      />
                      <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">
                        You'll be notified when ghost score changes by {notificationThreshold} points or more
                      </p>
                    </div>
                  )}
                </div>

                {/* Update Form */}
                {showUpdateForm && (
                  <div className="mt-6 pt-4 border-t border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 space-y-4">
                    <h4 className="text-sm font-medium">update ghost meter</h4>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="lastMessageDate" className="text-xs">
                          when was their last message?
                        </Label>
                        <Input
                          id="lastMessageDate"
                          type="date"
                          value={updateData.lastMessageDate}
                          onChange={(e) => setUpdateData({ ...updateData, lastMessageDate: e.target.value })}
                          className="h-9"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="initiatedByThem" className="text-xs">
                          did they initiate the conversation?
                        </Label>
                        <Switch
                          id="initiatedByThem"
                          checked={updateData.initiatedByThem}
                          onCheckedChange={(checked) => setUpdateData({ ...updateData, initiatedByThem: checked })}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="responseTime" className="text-xs">
                            how long did they take to respond? (hours)
                          </Label>
                          <span className="text-xs font-medium">{updateData.responseTime}h</span>
                        </div>
                        <Slider
                          id="responseTime"
                          min={1}
                          max={72}
                          step={1}
                          value={[updateData.responseTime]}
                          onValueChange={(value) => setUpdateData({ ...updateData, responseTime: value[0] })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="readButNoResponse" className="text-xs">
                          read your message but didn't respond?
                        </Label>
                        <Switch
                          id="readButNoResponse"
                          checked={updateData.readButNoResponse}
                          onCheckedChange={(checked) => setUpdateData({ ...updateData, readButNoResponse: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="canceledPlans" className="text-xs">
                          canceled or postponed plans?
                        </Label>
                        <Switch
                          id="canceledPlans"
                          checked={updateData.canceledPlans}
                          onCheckedChange={(checked) => setUpdateData({ ...updateData, canceledPlans: checked })}
                        />
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" className="flex-1" onClick={() => setShowUpdateForm(false)}>
                        cancel
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-[#9FBCCF] to-[#B3A9C6] text-white"
                        onClick={handleUpdateGhostMeter}
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <>
                            <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2" />
                            updating...
                          </>
                        ) : (
                          <>update meter</>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ghost Advice */}
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-[#B3A9C6]/10 flex items-center justify-center">
                    <Info className="h-4 w-4 text-[#B3A9C6]" />
                  </div>
                  <h3 className="text-sm font-medium">what this means</h3>
                </div>

                <div className="space-y-3">
                  {ghostLevel.level === "low" && (
                    <p className="text-sm">
                      communication with {situation.name} seems healthy. they're responsive and engaged in the
                      conversation. keep the momentum going by maintaining balanced communication.
                    </p>
                  )}

                  {ghostLevel.level === "medium" && (
                    <p className="text-sm">
                      there are some signs that {situation.name} might be pulling back. their response times are
                      increasing and they're initiating less. this could be due to busy schedules or waning interest.
                    </p>
                  )}

                  {ghostLevel.level === "high" && (
                    <p className="text-sm">
                      the data suggests {situation.name} is showing strong ghosting patterns. their communication has
                      significantly decreased, and they're taking much longer to respond. it might be time to reassess
                      your expectations.
                    </p>
                  )}

                  {ghostLevel.level === "extreme" && (
                    <p className="text-sm">
                      all signs indicate that {situation.name} has ghosted you. they've consistently shown disengagement
                      patterns and have essentially disappeared from the conversation. it's probably time to move on.
                    </p>
                  )}

                  <div
                    className={cn(
                      "p-3 rounded-lg mt-4",
                      ghostLevel.level === "low" && "bg-[#C9EDA8]/10 dark:bg-[#C9EDA8]/5",
                      ghostLevel.level === "medium" && "bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5",
                      ghostLevel.level === "high" && "bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5",
                      ghostLevel.level === "extreme" && "bg-[#272727]/10 dark:bg-[#272727]/5",
                    )}
                  >
                    <p className="text-sm font-medium mb-1">suggested next steps</p>
                    <ul className="space-y-1">
                      {ghostLevel.level === "low" && (
                        <>
                          <li className="flex items-start text-xs">
                            <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                            <span>continue engaging naturally in the conversation</span>
                          </li>
                          <li className="flex items-start text-xs">
                            <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                            <span>suggest concrete plans to meet up</span>
                          </li>
                          <li className="flex items-start text-xs">
                            <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                            <span>maintain a balanced initiation ratio</span>
                          </li>
                        </>
                      )}

                      {ghostLevel.level === "medium" && (
                        <>
                          <li className="flex items-start text-xs">
                            <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                            <span>give them some space but remain open</span>
                          </li>
                          <li className="flex items-start text-xs">
                            <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                            <span>match their energy and communication frequency</span>
                          </li>
                          <li className="flex items-start text-xs">
                            <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                            <span>consider a direct but casual check-in</span>
                          </li>
                        </>
                      )}

                      {ghostLevel.level === "high" && (
                        <>
                          <li className="flex items-start text-xs">
                            <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                            <span>pull back and focus on your own well-being</span>
                          </li>
                          <li className="flex items-start text-xs">
                            <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                            <span>consider one final direct message for closure</span>
                          </li>
                          <li className="flex items-start text-xs">
                            <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                            <span>begin the process of moving on emotionally</span>
                          </li>
                        </>
                      )}

                      {ghostLevel.level === "extreme" && (
                        <>
                          <li className="flex items-start text-xs">
                            <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                            <span>accept that they've ghosted and move on</span>
                          </li>
                          <li className="flex items-start text-xs">
                            <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                            <span>focus on self-care and healing</span>
                          </li>
                          <li className="flex items-start text-xs">
                            <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                            <span>remember: their ghosting reflects on them, not you</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-4 py-3 border-t border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10">
                <Button
                  className="w-full bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
                  onClick={() => setShowTemplateDialog(true)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  message templates
                </Button>
              </CardFooter>
            </Card>

            {/* Red Flags */}
            {(ghostLevel.level === "high" || ghostLevel.level === "extreme") && (
              <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#E57373]/20 dark:border-[#E57373]/10">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-[#E57373]/10 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-[#E57373]" />
                    </div>
                    <h3 className="text-sm font-medium">ghosting red flags</h3>
                  </div>

                  <ul className="space-y-2">
                    <li className="flex items-start text-sm">
                      <span className="inline-block w-4 h-4 mt-0.5 mr-2 flex-shrink-0">•</span>
                      <span>they've read {situation.readReceipts.readButNoResponse} messages without responding</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="inline-block w-4 h-4 mt-0.5 mr-2 flex-shrink-0">•</span>
                      <span>
                        response time has increased by{" "}
                        {situation.responseTime.current - situation.responseTime.previous} hours
                      </span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="inline-block w-4 h-4 mt-0.5 mr-2 flex-shrink-0">•</span>
                      <span>you're initiating {situation.initiationRatio.user}% of conversations</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="inline-block w-4 h-4 mt-0.5 mr-2 flex-shrink-0">•</span>
                      <span>they've canceled plans {situation.canceledPlans} times recently</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="insights" className="mt-0 space-y-4">
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-[#B3A9C6]/10 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-[#B3A9C6]" />
                  </div>
                  <h3 className="text-sm font-medium">communication patterns</h3>
                </div>

                <div className="space-y-3">
                  <p className="text-sm">
                    {situation.name}'s communication shows a {situation.messageFrequency.trend} trend in engagement.
                    Their response time has {situation.responseTime.trend === "increasing" ? "increased" : "decreased"}
                    from {situation.responseTime.previous} to {situation.responseTime.current} hours on average.
                  </p>

                  <div className="bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">message frequency over time</p>
                    <div className="h-24 w-full bg-[#9FBCCF]/5 dark:bg-[#9FBCCF]/2 rounded-md relative">
                      {/* This would be a chart in a real app */}
                      <div className="absolute inset-0 flex items-end justify-around p-2">
                        <div className="w-1/6 bg-[#9FBCCF] rounded-t-sm" style={{ height: "70%" }}></div>
                        <div className="w-1/6 bg-[#9FBCCF] rounded-t-sm" style={{ height: "80%" }}></div>
                        <div className="w-1/6 bg-[#9FBCCF] rounded-t-sm" style={{ height: "60%" }}></div>
                        <div className="w-1/6 bg-[#9FBCCF] rounded-t-sm" style={{ height: "40%" }}></div>
                        <div className="w-1/6 bg-[#9FBCCF] rounded-t-sm" style={{ height: "30%" }}></div>
                        <div className="w-1/6 bg-[#9FBCCF] rounded-t-sm" style={{ height: "20%" }}></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-around text-[10px] text-[#272727]/60 dark:text-[#F5FAFA]/60 p-1">
                        <span>6w ago</span>
                        <span>5w ago</span>
                        <span>4w ago</span>
                        <span>3w ago</span>
                        <span>2w ago</span>
                        <span>1w ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">response time trend</p>
                    <div className="h-24 w-full bg-[#B3A9C6]/5 dark:bg-[#B3A9C6]/2 rounded-md relative">
                      {/* This would be a chart in a real app */}
                      <div className="absolute inset-0 flex items-end justify-around p-2">
                        <div className="w-1/6 bg-[#B3A9C6] rounded-t-sm" style={{ height: "20%" }}></div>
                        <div className="w-1/6 bg-[#B3A9C6] rounded-t-sm" style={{ height: "30%" }}></div>
                        <div className="w-1/6 bg-[#B3A9C6] rounded-t-sm" style={{ height: "40%" }}></div>
                        <div className="w-1/6 bg-[#B3A9C6] rounded-t-sm" style={{ height: "50%" }}></div>
                        <div className="w-1/6 bg-[#B3A9C6] rounded-t-sm" style={{ height: "60%" }}></div>
                        <div className="w-1/6 bg-[#B3A9C6] rounded-t-sm" style={{ height: "80%" }}></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-around text-[10px] text-[#272727]/60 dark:text-[#F5FAFA]/60 p-1">
                        <span>6w ago</span>
                        <span>5w ago</span>
                        <span>4w ago</span>
                        <span>3w ago</span>
                        <span>2w ago</span>
                        <span>1w ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-[#F8CE97]/10 flex items-center justify-center">
                    <Ghost className="h-4 w-4 text-[#F8CE97]" />
                  </div>
                  <h3 className="text-sm font-medium">ghosting psychology</h3>
                </div>

                <div className="space-y-3">
                  <p className="text-sm">
                    Ghosting is a modern dating phenomenon where someone abruptly cuts off all communication without
                    explanation. Understanding the psychology behind it can help you process the experience.
                  </p>

                  <div className="bg-[#F8CE97]/10 dark:bg-[#F8CE97]/5 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">common reasons people ghost</p>
                    <ul className="space-y-1">
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>avoidance of conflict or difficult conversations</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>fear of hurting the other person's feelings</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>loss of interest but unwillingness to communicate it</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>meeting someone else or rekindling with an ex</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#C9E7CB]/10 dark:bg-[#C9E7CB]/5 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">healthy perspective</p>
                    <p className="text-xs">
                      Remember that ghosting says more about the other person's communication skills and emotional
                      maturity than it does about your worth. Someone who values you will communicate clearly, even when
                      it's difficult.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-[#C9E7CB]/10 flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4 text-[#C9E7CB]" />
                  </div>
                  <h3 className="text-sm font-medium">recovery insights</h3>
                </div>

                <div className="space-y-3">
                  <p className="text-sm">
                    Based on {situation.name}'s past behavior patterns, there's a {situation.recoveryProbability}%
                    chance they'll resume regular contact. This prediction is based on their previous ghosting episodes
                    and how they resolved.
                  </p>

                  <div className="bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">previous recovery patterns</p>
                    <ul className="space-y-1">
                      {situation.ghostPatterns
                        .filter((p) => p.recovered)
                        .map((pattern, index) => (
                          <li key={index} className="flex items-start text-xs">
                            <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                            <span>
                              ghosted for {pattern.duration} days in{" "}
                              {pattern.startDate.toLocaleDateString("en-US", { month: "short" })}, then resumed contact
                            </span>
                          </li>
                        ))}
                      {situation.ghostPatterns.filter((p) => p.recovered).length === 0 && (
                        <li className="text-xs">No previous recovery patterns detected</li>
                      )}
                    </ul>
                  </div>

                  <div className="bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">factors affecting recovery</p>
                    <ul className="space-y-1">
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>length of connection before ghosting</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>depth of emotional investment</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>previous pattern of disappearing and returning</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>external factors (work stress, travel, etc.)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="mt-0 space-y-4">
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-[#9FBCCF]/10 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-[#9FBCCF]" />
                  </div>
                  <h3 className="text-sm font-medium">ghosting patterns</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-sm">
                    {situation.name} has shown {situation.ghostPatterns.length} distinct ghosting episodes.
                    Understanding these patterns can help you predict future behavior.
                  </p>

                  <div className="relative h-16 bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5 rounded-lg overflow-hidden mb-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-0.5 w-full bg-[#9FBCCF]/20 dark:bg-[#9FBCCF]/10"></div>
                    </div>

                    {situation.ghostPatterns.map((pattern, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={`absolute h-8 rounded-md ${pattern.recovered ? "bg-[#9FBCCF]/60" : "bg-[#E57373]/60"}`}
                              style={{
                                left: `${index * 30 + 10}%`,
                                width: `${Math.min(pattern.duration * 2, 20)}%`,
                                top: "50%",
                                transform: "translateY(-50%)",
                              }}
                            ></div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">
                              {pattern.startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} -
                              {pattern.endDate
                                ? pattern.endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                                : "ongoing"}
                              <br />
                              Duration: {pattern.duration} days
                              <br />
                              Max score: {pattern.maxScore}
                              <br />
                              {pattern.recovered ? "Recovered" : "Not recovered"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                  </div>

                  <div className="flex items-center space-x-4 text-xs mt-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#9FBCCF]/60 rounded-sm mr-1"></div>
                      <span>Recovered</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-[#E57373]/60 rounded-sm mr-1"></div>
                      <span>Current/Unresolved</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="text-sm font-medium">pattern analysis</h4>

                  <div className="bg-[#F8CE97]/10 dark:bg-[#F8CE97]/5 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">key observations</p>
                    <ul className="space-y-1">
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>
                          average ghosting duration:{" "}
                          {Math.round(
                            situation.ghostPatterns.reduce((sum, p) => sum + p.duration, 0) /
                              situation.ghostPatterns.length,
                          )}{" "}
                          days
                        </span>
                      </li>
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>
                          ghosting frequency: once every {Math.round(60 / situation.ghostPatterns.length)} days
                        </span>
                      </li>
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>
                          recovery rate:{" "}
                          {Math.round(
                            (situation.ghostPatterns.filter((p) => p.recovered).length /
                              situation.ghostPatterns.length) *
                              100,
                          )}
                          %
                        </span>
                      </li>
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>
                          pattern severity:{" "}
                          {situation.ghostPatterns.length > 1 &&
                          situation.ghostPatterns[situation.ghostPatterns.length - 1].maxScore >
                            situation.ghostPatterns[situation.ghostPatterns.length - 2].maxScore
                            ? "increasing"
                            : "stable"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">what this means</p>
                    <p className="text-xs">
                      {situation.name} shows a pattern of{" "}
                      {situation.ghostPatterns.length > 1 ? "recurring" : "occasional"} ghosting behavior.
                      {situation.ghostPatterns.filter((p) => p.recovered).length > 0
                        ? " They have a history of returning after periods of silence, which suggests they may return again."
                        : " This is their first ghosting episode, so it's unclear if they'll return based on past behavior."}
                      {situation.ghostPatterns.length > 1 &&
                      situation.ghostPatterns[situation.ghostPatterns.length - 1].maxScore >
                        situation.ghostPatterns[situation.ghostPatterns.length - 2].maxScore
                        ? " Their ghosting episodes are becoming more severe over time, which is a concerning trend."
                        : " Their ghosting episodes have remained consistent in severity, which suggests a pattern rather than escalation."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-[#B3A9C6]/10 flex items-center justify-center">
                    <History className="h-4 w-4 text-[#B3A9C6]" />
                  </div>
                  <h3 className="text-sm font-medium">cyclical behavior</h3>
                </div>

                <div className="space-y-3">
                  <p className="text-sm">
                    Some people exhibit cyclical ghosting behavior, where they alternate between periods of engagement
                    and withdrawal. Understanding these cycles can help you predict future behavior and protect your
                    emotional well-being.
                  </p>

                  <div className="bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">cycle detection</p>
                    {situation.ghostPatterns.length >= 2 ? (
                      <p className="text-xs">
                        {situation.name} shows evidence of cyclical ghosting behavior. They tend to ghost for
                        approximately{" "}
                        {Math.round(
                          situation.ghostPatterns.reduce((sum, p) => sum + p.duration, 0) /
                            situation.ghostPatterns.length,
                        )}{" "}
                        days before potentially returning.
                      </p>
                    ) : (
                      <p className="text-xs">
                        Not enough data to detect cyclical patterns yet. We need at least 2 ghosting episodes to
                        identify cycles.
                      </p>
                    )}
                  </div>

                  <div className="bg-[#C9E7CB]/10 dark:bg-[#C9E7CB]/5 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">handling cyclical ghosters</p>
                    <ul className="space-y-1">
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>set clear boundaries about communication expectations</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>protect your emotional investment during "away" phases</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>consider if this pattern meets your relationship needs</span>
                      </li>
                      <li className="flex items-start text-xs">
                        <span className="inline-block w-3 h-3 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>be cautious about emotional re-investment when they return</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-0 space-y-4">
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-[#9FBCCF]/10 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-[#9FBCCF]" />
                    </div>
                    <h3 className="text-sm font-medium">ghost score history</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-40 w-full bg-[#9FBCCF]/5 dark:bg-[#9FBCCF]/2 rounded-md relative">
                    {/* This would be a chart in a real app */}
                    <div className="absolute inset-0 flex items-end">
                      <div className="w-full h-full flex items-end">
                        <div className="flex-1 flex items-end justify-center">
                          <div className="w-4/5 bg-[#9FBCCF] rounded-t-sm" style={{ height: "30%" }}></div>
                        </div>
                        <div className="flex-1 flex items-end justify-center">
                          <div className="w-4/5 bg-[#9FBCCF] rounded-t-sm" style={{ height: "45%" }}></div>
                        </div>
                        <div className="flex-1 flex items-end justify-center">
                          <div className="w-4/5 bg-[#9FBCCF] rounded-t-sm" style={{ height: "60%" }}></div>
                        </div>
                        <div className="flex-1 flex items-end justify-center">
                          <div className="w-4/5 bg-[#9FBCCF] rounded-t-sm" style={{ height: "75%" }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-around text-[10px] text-[#272727]/60 dark:text-[#F5FAFA]/60 p-1">
                      <span>May 1</span>
                      <span>May 5</span>
                      <span>May 10</span>
                      <span>May 15</span>
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between items-start text-[10px] text-[#272727]/60 dark:text-[#F5FAFA]/60 p-1">
                      <span>100</span>
                      <span>75</span>
                      <span>50</span>
                      <span>25</span>
                      <span>0</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="text-sm font-medium">ghost score log</h4>

                  {situation.ghostHistory.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 last:border-0"
                    >
                      <div>
                        <p className="text-sm">
                          {entry.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                        <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">
                          {index > 0
                            ? `${entry.score > situation.ghostHistory[index - 1].score ? "+" : ""}${entry.score - situation.ghostHistory[index - 1].score} points`
                            : "baseline"}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            entry.score < 30 && "bg-[#C9EDA8]/20 text-[#C9EDA8]",
                            entry.score >= 30 && entry.score < 60 && "bg-[#9FBCCF]/20 text-[#9FBCCF]",
                            entry.score >= 60 && entry.score < 85 && "bg-[#B3A9C6]/20 text-[#B3A9C6]",
                            entry.score >= 85 && "bg-[#272727]/20 text-[#272727]",
                          )}
                        >
                          {entry.score}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-[#F8CE97]/10 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-[#F8CE97]" />
                  </div>
                  <h3 className="text-sm font-medium">notification history</h3>
                </div>

                <div className="space-y-3">
                  <p className="text-sm">
                    Ghost alerts are {notificationsEnabled ? "enabled" : "disabled"}.
                    {notificationsEnabled
                      ? ` You'll be notified when ghost score changes by ${notificationThreshold} points or more.`
                      : ""}
                  </p>

                  <div className="bg-[#F8CE97]/10 dark:bg-[#F8CE97]/5 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">recent alerts</p>
                    <div className="p-3 text-center text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">
                      <p>
                        Last notification:{" "}
                        {situation.notifications.lastNotification.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="mt-1">Ghost score increased to {situation.ghostScore}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-4 py-3 border-t border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10">
                <Button variant="outline" className="w-full" onClick={() => toggleNotifications(!notificationsEnabled)}>
                  {notificationsEnabled ? (
                    <>
                      <BellOff className="h-4 w-4 mr-2" />
                      disable notifications
                    </>
                  ) : (
                    <>
                      <Bell className="h-4 w-4 mr-2" />
                      enable notifications
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <div className="flex justify-center mt-4">
              <Button variant="outline" className="text-xs border-[#9FBCCF]/30 dark:border-[#F5FAFA]/10">
                <Plus className="h-3.5 w-3.5 mr-1" />
                add manual entry
              </Button>
            </div>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  )
}
