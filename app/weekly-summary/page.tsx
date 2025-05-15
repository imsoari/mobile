"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  MessageCircle,
  Clock,
  Ghost,
  Heart,
  Sparkles,
  BarChart3,
  Download,
  Share2,
  Star,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { colors } from "@/lib/colors"

// Sample data for demonstration
const sampleSituations = [
  {
    id: "1",
    name: "alex",
    nickname: "lex",
    avatar: "A",
    color: colors.blue,
    relationshipType: "dating",
    ghostScore: {
      current: 75,
      previous: 65,
      change: 10,
    },
    responseTime: {
      current: 24,
      previous: 18,
      change: 6,
    },
    initiationRatio: {
      current: { user: 80, other: 20 },
      previous: { user: 75, other: 25 },
      change: 5,
    },
    messageFrequency: {
      current: 3,
      previous: 5,
      change: -2,
    },
    lastActive: "2 days ago",
    weeklyHighlight: "Canceled plans once this week",
    weeklyInsight: "Communication has become more one-sided",
  },
  {
    id: "2",
    name: "rob",
    nickname: "robbie",
    avatar: "R",
    color: colors.purple,
    relationshipType: "situationship",
    ghostScore: {
      current: 60,
      previous: 55,
      change: 5,
    },
    responseTime: {
      current: 12,
      previous: 10,
      change: 2,
    },
    initiationRatio: {
      current: { user: 65, other: 35 },
      previous: { user: 60, other: 40 },
      change: 5,
    },
    messageFrequency: {
      current: 5,
      previous: 6,
      change: -1,
    },
    lastActive: "1 day ago",
    weeklyHighlight: "Response time has increased slightly",
    weeklyInsight: "Showing early signs of potential ghosting",
  },
  {
    id: "3",
    name: "taylor",
    nickname: "tay",
    avatar: "T",
    color: colors.green,
    relationshipType: "talking",
    ghostScore: {
      current: 15,
      previous: 20,
      change: -5,
    },
    responseTime: {
      current: 2,
      previous: 3,
      change: -1,
    },
    initiationRatio: {
      current: { user: 45, other: 55 },
      previous: { user: 50, other: 50 },
      change: -5,
    },
    messageFrequency: {
      current: 15,
      previous: 12,
      change: 3,
    },
    lastActive: "Just now",
    weeklyHighlight: "Made concrete plans for next weekend",
    weeklyInsight: "Communication is becoming more balanced and frequent",
  },
]

// Sample weekly summaries
const weeklySummaries = [
  {
    weekOf: "May 8 - May 14, 2025",
    overallStatus: "Mixed progress",
    overallGhostScore: {
      current: 50,
      previous: 47,
      change: 3,
    },
    messageCount: {
      total: 87,
      change: -5,
    },
    topInsights: [
      "Taylor is showing increased engagement this week",
      "Alex's ghost score has increased significantly",
      "Overall response times are slightly longer",
    ],
    recommendations: [
      "Consider having a direct conversation with Alex about communication expectations",
      "Continue building on the positive momentum with Taylor",
      "Try to balance initiation with Rob more evenly",
    ],
    highlights: {
      positive: ["Made concrete plans with Taylor", "Rob responded to your last three messages within 6 hours"],
      negative: ["Alex canceled plans once this week", "Your message frequency with Alex has decreased by 40%"],
    },
  },
  {
    weekOf: "May 1 - May 7, 2025",
    overallStatus: "Slight improvement",
    overallGhostScore: {
      current: 47,
      previous: 52,
      change: -5,
    },
    messageCount: {
      total: 92,
      change: 8,
    },
    topInsights: [
      "Overall ghost scores have improved this week",
      "Message frequency has increased across all situations",
      "Rob is showing more consistent communication patterns",
    ],
    recommendations: [
      "Continue the current communication patterns with Rob and Taylor",
      "Watch for early signs of ghosting with Alex",
      "Try initiating fewer conversations to see if others step up",
    ],
    highlights: {
      positive: ["Rob initiated more conversations this week", "Taylor's response time improved by 33%"],
      negative: ["Alex's ghost score increased slightly", "You're still initiating 75% of conversations with Alex"],
    },
  },
  {
    weekOf: "April 24 - April 30, 2025",
    overallStatus: "Needs attention",
    overallGhostScore: {
      current: 52,
      previous: 45,
      change: 7,
    },
    messageCount: {
      total: 84,
      change: -12,
    },
    topInsights: [
      "Overall communication has decreased this week",
      "Ghost scores have increased across all situations",
      "You're initiating more conversations than before",
    ],
    recommendations: [
      "Give your situations some space to reach out first",
      "Focus on quality over quantity in your messages",
      "Consider discussing communication expectations",
    ],
    highlights: {
      positive: ["Taylor responded to all your messages", "Had a good in-person meeting with Rob"],
      negative: ["Alex's response time has doubled", "Overall message frequency has decreased by 14%"],
    },
  },
]

const getGhostLevel = (score: number) => {
  if (score < 30) return { level: "low", color: colors.green }
  if (score < 60) return { level: "medium", color: colors.blue }
  if (score < 85) return { level: "high", color: colors.purple }
  return { level: "extreme", color: colors.dark }
}

const getChangeIndicator = (change: number, inverse = false) => {
  if (change === 0) return null

  const isPositive = inverse ? change < 0 : change > 0
  const Icon = isPositive ? TrendingUp : TrendingDown
  const color = isPositive ? "#C9EDA8" : "#E57373"

  return (
    <div className="flex items-center" style={{ color }}>
      <Icon className="h-3.5 w-3.5 mr-1" />
      <span>{Math.abs(change)}</span>
    </div>
  )
}

export default function WeeklySummaryPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)
  const currentSummary = weeklySummaries[currentWeekIndex]

  const handlePreviousWeek = () => {
    if (currentWeekIndex < weeklySummaries.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1)
    }
  }

  const handleNextWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5FAFA] dark:bg-[#272727] text-[#272727] dark:text-[#F5FAFA]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-lg">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-[#9FBCCF] mr-2" />
            <h1 className="text-xl font-light">weekly summary</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePreviousWeek}
            disabled={currentWeekIndex >= weeklySummaries.length - 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNextWeek} disabled={currentWeekIndex <= 0}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Week Selector */}
      <div className="px-4 py-3 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white/60 dark:bg-[#272727]/60">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-medium">{currentSummary.weekOf}</h2>
            <div className="flex items-center mt-1">
              <Badge
                className={cn(
                  "text-xs",
                  currentSummary.overallStatus === "Mixed progress" && "bg-[#F8CE97]/20 text-[#F8CE97]",
                  currentSummary.overallStatus === "Slight improvement" && "bg-[#C9EDA8]/20 text-[#C9EDA8]",
                  currentSummary.overallStatus === "Needs attention" && "bg-[#E57373]/20 text-[#E57373]",
                )}
              >
                {currentSummary.overallStatus}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="h-8">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Share2 className="h-3.5 w-3.5 mr-1.5" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
        <div className="px-4 pt-2 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">overview</TabsTrigger>
            <TabsTrigger value="situations">situations</TabsTrigger>
            <TabsTrigger value="insights">insights</TabsTrigger>
          </TabsList>
        </div>

        <main className="flex-1 p-4">
          <TabsContent value="overview" className="mt-0 space-y-4">
            {/* Weekly Stats */}
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-[#9FBCCF]" />
                  Weekly Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <Ghost className="h-4 w-4 text-[#9FBCCF]" />
                        <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">avg. ghost score</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">{currentSummary.overallGhostScore.current}</span>
                        {getChangeIndicator(currentSummary.overallGhostScore.change, true)}
                      </div>
                    </div>
                    <Progress
                      value={currentSummary.overallGhostScore.current}
                      className="h-1.5"
                      style={
                        {
                          backgroundColor: `${colors.blue}20`,
                          "--progress-color": getGhostLevel(currentSummary.overallGhostScore.current).color,
                        } as React.CSSProperties
                      }
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4 text-[#B3A9C6]" />
                        <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">total messages</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">{currentSummary.messageCount.total}</span>
                        {getChangeIndicator(currentSummary.messageCount.change)}
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-[#B3A9C6]/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#B3A9C6]"
                        style={{ width: `${Math.min(100, (currentSummary.messageCount.total / 100) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-[#9FBCCF]" />
                    <span className="text-sm font-medium">weekly trends</span>
                  </div>
                  <div className="h-32 w-full bg-[#9FBCCF]/5 dark:bg-[#9FBCCF]/2 rounded-md relative">
                    {/* This would be a chart in a real app */}
                    <div className="absolute inset-0 flex items-end justify-around p-2">
                      {/* Ghost Score Line */}
                      <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                          d="M0,40 L14.29,45 L28.57,50 L42.86,48 L57.14,52 L71.43,60 L85.71,55 L100,50"
                          stroke={colors.purple}
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>

                      {/* Message Frequency Bars */}
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "60%" }}></div>
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "65%" }}></div>
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "70%" }}></div>
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "65%" }}></div>
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "55%" }}></div>
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "50%" }}></div>
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "45%" }}></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-around text-[10px] text-[#272727]/60 dark:text-[#F5FAFA]/60 p-1">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                    <div className="absolute top-2 right-2 flex items-center space-x-3 text-[10px]">
                      <div className="flex items-center">
                        <div className="w-3 h-1 bg-[#9FBCCF] mr-1"></div>
                        <span>Messages</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-1 bg-[#B3A9C6] mr-1"></div>
                        <span>Ghost Score</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Highlights */}
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Star className="h-4 w-4 mr-2 text-[#F8CE97]" />
                  Weekly Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-[#C9EDA8]/10 dark:bg-[#C9EDA8]/5">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-[#C9EDA8]" />
                      <span className="text-sm font-medium">Positive</span>
                    </div>
                    <ul className="space-y-2">
                      {currentSummary.highlights.positive.map((highlight, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="inline-block w-4 h-4 mt-0.5 mr-2 flex-shrink-0">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-[#E57373]/10 dark:bg-[#E57373]/5">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-[#E57373]" />
                      <span className="text-sm font-medium">Needs Attention</span>
                    </div>
                    <ul className="space-y-2">
                      {currentSummary.highlights.negative.map((highlight, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="inline-block w-4 h-4 mt-0.5 mr-2 flex-shrink-0">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Soari's Insights */}
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-[#9FBCCF]" />
                  Soari's Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentSummary.topInsights.map((insight, index) => (
                  <div key={index} className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
                    <p className="text-sm">{insight}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full text-xs" onClick={() => setActiveTab("insights")}>
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  View All Insights
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="situations" className="mt-0 space-y-4">
            {/* Situation Cards */}
            {sampleSituations.map((situation) => {
              const ghostLevel = getGhostLevel(situation.ghostScore.current)

              return (
                <Card
                  key={situation.id}
                  className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-10 w-10 border-2" style={{ borderColor: situation.color }}>
                        <AvatarFallback style={{ backgroundColor: `${situation.color}20`, color: situation.color }}>
                          {situation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-medium">{situation.name}</h3>
                          <Badge
                            className="text-xs"
                            style={{
                              backgroundColor: `${situation.color}20`,
                              color: situation.color,
                            }}
                          >
                            {situation.relationshipType}
                          </Badge>
                        </div>
                        <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">
                          Last active: {situation.lastActive}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Ghost Score */}
                      <div className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <Ghost className="h-4 w-4 text-[#9FBCCF]" />
                            <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">ghost score</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className="text-xs"
                              style={{
                                backgroundColor: `${ghostLevel.color}20`,
                                color: ghostLevel.color,
                              }}
                            >
                              {ghostLevel.level}
                            </Badge>
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-1">{situation.ghostScore.current}</span>
                              {getChangeIndicator(situation.ghostScore.change, true)}
                            </div>
                          </div>
                        </div>
                        <Progress
                          value={situation.ghostScore.current}
                          className="h-1.5"
                          style={
                            {
                              backgroundColor: `${ghostLevel.color}20`,
                              "--progress-color": ghostLevel.color,
                            } as React.CSSProperties
                          }
                        />
                      </div>

                      {/* Communication Stats */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2 rounded-lg bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5">
                          <div className="flex items-center space-x-1 mb-1">
                            <Clock className="h-3 w-3 text-[#B3A9C6]" />
                            <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">response</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{situation.responseTime.current}h</span>
                            {getChangeIndicator(situation.responseTime.change, true)}
                          </div>
                        </div>

                        <div className="p-2 rounded-lg bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5">
                          <div className="flex items-center space-x-1 mb-1">
                            <MessageCircle className="h-3 w-3 text-[#B3A9C6]" />
                            <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">msgs/day</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{situation.messageFrequency.current}</span>
                            {getChangeIndicator(situation.messageFrequency.change)}
                          </div>
                        </div>

                        <div className="p-2 rounded-lg bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5">
                          <div className="flex items-center space-x-1 mb-1">
                            <Heart className="h-3 w-3 text-[#B3A9C6]" />
                            <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">initiation</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{situation.initiationRatio.current.user}%</span>
                            {getChangeIndicator(situation.initiationRatio.change, true)}
                          </div>
                        </div>
                      </div>

                      {/* Weekly Insight */}
                      <div className="p-3 rounded-lg bg-[#F8CE97]/10 dark:bg-[#F8CE97]/5">
                        <div className="flex items-center space-x-2 mb-1">
                          <Sparkles className="h-4 w-4 text-[#F8CE97]" />
                          <span className="text-xs font-medium">weekly insight</span>
                        </div>
                        <p className="text-sm">{situation.weeklyInsight}</p>
                      </div>

                      {/* Weekly Highlight */}
                      <div className="p-3 rounded-lg bg-[#C9EDA8]/10 dark:bg-[#C9EDA8]/5">
                        <div className="flex items-center space-x-2 mb-1">
                          <Star className="h-4 w-4 text-[#C9EDA8]" />
                          <span className="text-xs font-medium">weekly highlight</span>
                        </div>
                        <p className="text-sm">{situation.weeklyHighlight}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 px-4 pb-4">
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => router.push(`/situations/${situation.id}`)}
                    >
                      View Details
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </TabsContent>

          <TabsContent value="insights" className="mt-0 space-y-4">
            {/* Soari's Recommendations */}
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-[#9FBCCF]" />
                  Soari's Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentSummary.recommendations.map((recommendation, index) => (
                  <div key={index} className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
                    <div className="flex items-start">
                      <span className="inline-block w-5 h-5 mr-2 flex-shrink-0 bg-[#9FBCCF]/20 rounded-full text-center text-[#9FBCCF]">
                        {index + 1}
                      </span>
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  className="w-full bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
                  onClick={() => router.push("/chat")}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Discuss with Soari
                </Button>
              </CardFooter>
            </Card>

            {/* Detailed Insights */}
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-[#B3A9C6]" />
                  Detailed Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5">
                  <h3 className="text-sm font-medium mb-2">Communication Balance</h3>
                  <div className="space-y-3">
                    {sampleSituations.map((situation) => (
                      <div key={situation.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback
                                style={{ backgroundColor: `${situation.color}20`, color: situation.color }}
                              >
                                {situation.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{situation.name}</span>
                          </div>
                          <span className="text-xs">
                            You: {situation.initiationRatio.current.user}% | Them:{" "}
                            {situation.initiationRatio.current.other}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#B3A9C6]"
                            style={{ width: `${situation.initiationRatio.current.user}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
                  <h3 className="text-sm font-medium mb-2">Response Time Trends</h3>
                  <div className="h-32 w-full bg-[#9FBCCF]/5 dark:bg-[#9FBCCF]/2 rounded-md relative mb-2">
                    {/* This would be a chart in a real app */}
                    <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,20 L33.33,30 L66.67,40 L100,60" stroke={colors.blue} strokeWidth="2" fill="none" />
                      <path d="M0,40 L33.33,45 L66.67,50 L100,55" stroke={colors.purple} strokeWidth="2" fill="none" />
                      <path d="M0,15 L33.33,10 L66.67,12 L100,8" stroke={colors.green} strokeWidth="2" fill="none" />
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-[#272727]/60 dark:text-[#F5FAFA]/60 p-1">
                      <span>Week 1</span>
                      <span>Week 2</span>
                      <span>Week 3</span>
                      <span>Current</span>
                    </div>
                    <div className="absolute top-2 right-2 flex flex-col space-y-1 text-[10px]">
                      <div className="flex items-center">
                        <div className="w-3 h-1 mr-1" style={{ backgroundColor: colors.blue }}></div>
                        <span>Alex</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-1 mr-1" style={{ backgroundColor: colors.purple }}></div>
                        <span>Rob</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-1 mr-1" style={{ backgroundColor: colors.green }}></div>
                        <span>Taylor</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">
                    Alex and Rob's response times are increasing, while Taylor's remains consistently fast.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#C9EDA8]/10 dark:bg-[#C9EDA8]/5">
                  <h3 className="text-sm font-medium mb-2">Message Frequency by Day</h3>
                  <div className="h-32 w-full bg-[#C9EDA8]/10 dark:bg-[#C9EDA8]/5 rounded-md relative">
                    {/* This would be a chart in a real app */}
                    <div className="absolute inset-0 flex items-end justify-around p-2">
                      <div className="w-1/7 bg-[#C9EDA8] rounded-t-sm" style={{ height: "40%" }}></div>
                      <div className="w-1/7 bg-[#C9EDA8] rounded-t-sm" style={{ height: "60%" }}></div>
                      <div className="w-1/7 bg-[#C9EDA8] rounded-t-sm" style={{ height: "30%" }}></div>
                      <div className="w-1/7 bg-[#C9EDA8] rounded-t-sm" style={{ height: "70%" }}></div>
                      <div className="w-1/7 bg-[#C9EDA8] rounded-t-sm" style={{ height: "50%" }}></div>
                      <div className="w-1/7 bg-[#C9EDA8] rounded-t-sm" style={{ height: "65%" }}></div>
                      <div className="w-1/7 bg-[#C9EDA8] rounded-t-sm" style={{ height: "80%" }}></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-around text-[10px] text-[#272727]/60 dark:text-[#F5FAFA]/60 p-1">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Soari's Analysis */}
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-[#F8CE97]" />
                  Soari's Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 rounded-lg bg-[#F8CE97]/10 dark:bg-[#F8CE97]/5">
                  <p className="text-sm">
                    This week shows {currentSummary.overallStatus.toLowerCase()} in your relationships. Taylor is
                    showing increased engagement with faster response times and more frequent messaging. However, Alex's
                    ghost score has increased significantly, which might indicate they're pulling back. Rob remains in a
                    moderate zone, but watch for early signs of ghosting.
                  </p>
                  <p className="text-sm mt-2">
                    Your overall communication patterns show you're still initiating most conversations, especially with
                    Alex. Consider giving your situations space to reach out first and see how they respond. This can
                    help balance the relationship dynamics and give you insight into their level of interest.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  className="w-full bg-[#F8CE97] hover:bg-[#F8CE97]/90 text-white"
                  onClick={() => router.push("/soari-insights")}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  View Full Insights
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  )
}
