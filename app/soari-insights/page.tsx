"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  TrendingUp,
  Calendar,
  Clock,
  MessageCircle,
  Heart,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Ghost,
  AlertTriangle,
  CheckCircle,
  Zap,
  BarChart3,
  RefreshCw,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
    ghostScore: 75,
    responseTime: 24,
    initiationRatio: { user: 80, other: 20 },
    messageFrequency: 3,
    lastActive: "2 days ago",
  },
  {
    id: "2",
    name: "rob",
    nickname: "robbie",
    avatar: "R",
    color: colors.purple,
    relationshipType: "situationship",
    ghostScore: 60,
    responseTime: 12,
    initiationRatio: { user: 65, other: 35 },
    messageFrequency: 5,
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "taylor",
    nickname: "tay",
    avatar: "T",
    color: colors.green,
    relationshipType: "talking",
    ghostScore: 15,
    responseTime: 2,
    initiationRatio: { user: 45, other: 55 },
    messageFrequency: 15,
    lastActive: "Just now",
  },
]

// Sample insights from Soari
const sampleInsights = [
  {
    id: "1",
    title: "Communication Patterns",
    description:
      "I've noticed you tend to initiate conversations more often in your relationships. In healthy connections, initiation is usually more balanced. Consider giving space for others to reach out first sometimes.",
    type: "pattern",
    icon: <MessageCircle className="h-5 w-5" />,
    color: colors.blue,
  },
  {
    id: "2",
    title: "Response Time Anxiety",
    description:
      "Your message checking frequency increases when someone takes longer to respond. This might indicate some attachment anxiety. Try setting your phone aside and engaging in self-care activities while waiting.",
    type: "insight",
    icon: <Clock className="h-5 w-5" />,
    color: colors.purple,
  },
  {
    id: "3",
    title: "Relationship Cycle",
    description:
      "I've detected a pattern where your interest peaks around 2-3 weeks into new connections, then gradually declines. Consider exploring what triggers this shift and whether you're seeking novelty over depth.",
    type: "pattern",
    icon: <TrendingUp className="h-5 w-5" />,
    color: colors.green,
  },
  {
    id: "4",
    title: "Ghosting Sensitivity",
    description:
      "You show heightened concern about being ghosted, even in relationships with low ghost scores. This might reflect past experiences affecting your current connections. Remember that not everyone communicates the same way.",
    type: "insight",
    icon: <Ghost className="h-5 w-5" />,
    color: colors.blue,
  },
]

// Sample advice from Soari
const sampleAdvice = {
  flow: [
    "Notice how your energy shifts when waiting for responses... perhaps there's an opportunity to cultivate more presence with yourself during these moments of anticipation.",
    "The patterns in your connections might be reflecting something deeper about your relationship with yourself. What if you approached each interaction with curiosity rather than expectation?",
    "Your heart seems to be seeking both connection and protection. Consider that vulnerability, while uncomfortable, often creates the space for the authentic relationships you're seeking.",
  ],
  truth: [
    "You're initiating 80% of conversations with Alex but only 45% with Taylor. Notice the difference in how those relationships feel? That's not a coincidence. Balance matters.",
    "Let's be real - checking your phone every 10 minutes won't make them text back faster. It's just making you anxious. Set boundaries with yourself first.",
    "The data doesn't lie - you ghost people too. Before getting upset about slow responses, check your own patterns. Self-awareness is step one.",
  ],
}

export default function SoariInsightsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedInsights, setExpandedInsights] = useState<string[]>([])
  const [activePersona, setActivePersona] = useState<"flow" | "truth">("flow")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const toggleInsight = (id: string) => {
    setExpandedInsights((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleRefreshInsights = () => {
    setIsRefreshing(true)
    // Simulate refreshing insights
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  const getGhostLevel = (score: number) => {
    if (score < 30) return { level: "low", color: colors.green }
    if (score < 60) return { level: "medium", color: colors.blue }
    if (score < 85) return { level: "high", color: colors.purple }
    return { level: "extreme", color: colors.dark }
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
            <Sparkles className="h-5 w-5 text-[#9FBCCF] mr-2" />
            <h1 className="text-xl font-light">soari insights</h1>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefreshInsights} disabled={isRefreshing} className="h-8">
          {isRefreshing ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
              Refresh
            </>
          )}
        </Button>
      </header>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
        <div className="px-4 pt-2 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">overview</TabsTrigger>
            <TabsTrigger value="insights">insights</TabsTrigger>
            <TabsTrigger value="advice">advice</TabsTrigger>
          </TabsList>
        </div>

        <main className="flex-1 p-4">
          <TabsContent value="overview" className="mt-0 space-y-4">
            {/* Soari Welcome Card */}
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-[#9FBCCF]/10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-[#9FBCCF]" />
                  </div>
                  <div>
                    <h2 className="text-base font-medium">hey there!</h2>
                    <p className="text-sm text-[#272727]/70 dark:text-[#F5FAFA]/70">
                      I've analyzed your relationships and have some insights for you.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
                  <p className="text-sm">
                    Based on your 3 active situations, I've identified some patterns that might help you understand your
                    relationships better. Check out the insights tab for more details!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Relationship Overview */}
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-[#B3A9C6]" />
                  Relationship Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sampleSituations.map((situation) => {
                  const ghostLevel = getGhostLevel(situation.ghostScore)

                  return (
                    <div
                      key={situation.id}
                      className="flex items-center space-x-3 p-2 hover:bg-[#9FBCCF]/5 rounded-lg cursor-pointer"
                      onClick={() => router.push(`/situations/${situation.id}`)}
                    >
                      <Avatar className="h-10 w-10 border-2" style={{ borderColor: situation.color }}>
                        <AvatarFallback style={{ backgroundColor: `${situation.color}20`, color: situation.color }}>
                          {situation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{situation.name}</p>
                          <Badge
                            className="text-xs"
                            style={{
                              backgroundColor: `${ghostLevel.color}20`,
                              color: ghostLevel.color,
                            }}
                          >
                            {ghostLevel.level} ghost
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">
                            {situation.relationshipType}
                          </p>
                          <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">
                            active {situation.lastActive}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Communication Stats */}
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2 text-[#C9EDA8]" />
                  Communication Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="h-4 w-4 text-[#9FBCCF]" />
                      <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">avg. response time</span>
                    </div>
                    <p className="text-lg font-medium">12.7 hours</p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5">
                    <div className="flex items-center space-x-2 mb-1">
                      <MessageCircle className="h-4 w-4 text-[#B3A9C6]" />
                      <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">weekly messages</span>
                    </div>
                    <p className="text-lg font-medium">23</p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#C9EDA8]/10 dark:bg-[#C9EDA8]/5">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="h-4 w-4 text-[#C9EDA8]" />
                      <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">active days</span>
                    </div>
                    <p className="text-lg font-medium">5.2 / week</p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F8CE97]/10 dark:bg-[#F8CE97]/5">
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="h-4 w-4 text-[#F8CE97]" />
                      <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">initiation ratio</span>
                    </div>
                    <p className="text-lg font-medium">63% / 37%</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-[#9FBCCF]" />
                      <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">messaging trends</span>
                    </div>
                    <span className="text-xs text-[#C9EDA8]">↑ 12% from last month</span>
                  </div>
                  <div className="h-24 w-full bg-[#9FBCCF]/5 dark:bg-[#9FBCCF]/2 rounded-md relative">
                    {/* This would be a chart in a real app */}
                    <div className="absolute inset-0 flex items-end justify-around p-2">
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "40%" }}></div>
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "60%" }}></div>
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "30%" }}></div>
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "70%" }}></div>
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "50%" }}></div>
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "65%" }}></div>
                      <div className="w-1/7 bg-[#9FBCCF] rounded-t-sm" style={{ height: "80%" }}></div>
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
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full text-xs" onClick={() => setActiveTab("insights")}>
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  View Detailed Insights
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="mt-0 space-y-4">
            {/* Insights Cards */}
            {sampleInsights.map((insight) => (
              <Card
                key={insight.id}
                className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10 cursor-pointer"
                onClick={() => toggleInsight(insight.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${insight.color}10`, color: insight.color }}
                      >
                        {insight.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-medium">{insight.title}</h3>
                        <Badge
                          className="text-xs mt-1"
                          style={{
                            backgroundColor: `${insight.color}20`,
                            color: insight.color,
                          }}
                        >
                          {insight.type}
                        </Badge>
                      </div>
                    </div>
                    {expandedInsights.includes(insight.id) ? (
                      <ChevronUp className="h-5 w-5 text-[#272727]/40 dark:text-[#F5FAFA]/40" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#272727]/40 dark:text-[#F5FAFA]/40" />
                    )}
                  </div>

                  {expandedInsights.includes(insight.id) && (
                    <div className="mt-3 space-y-3">
                      <p className="text-sm">{insight.description}</p>

                      {insight.id === "1" && (
                        <div className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
                          <h4 className="text-sm font-medium mb-2">Initiation Ratio by Relationship</h4>
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
                                    You: {situation.initiationRatio.user}% | Them: {situation.initiationRatio.other}%
                                  </span>
                                </div>
                                <div className="h-2 w-full bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#9FBCCF]"
                                    style={{ width: `${situation.initiationRatio.user}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {insight.id === "2" && (
                        <div className="p-3 rounded-lg bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5">
                          <h4 className="text-sm font-medium mb-2">Response Time Analysis</h4>
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="p-2 rounded-lg bg-[#B3A9C6]/20 dark:bg-[#B3A9C6]/10 text-center">
                              <p className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">App check frequency</p>
                              <p className="text-base font-medium">12x / hour</p>
                              <p className="text-xs text-[#E57373]">↑ 40% when waiting</p>
                            </div>
                            <div className="p-2 rounded-lg bg-[#B3A9C6]/20 dark:bg-[#B3A9C6]/10 text-center">
                              <p className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">Anxiety score</p>
                              <p className="text-base font-medium">High</p>
                              <p className="text-xs text-[#E57373]">↑ 65% after 1 hour</p>
                            </div>
                          </div>
                          <p className="text-xs">
                            Your anxiety increases significantly when waiting for responses, especially from Alex and
                            Rob.
                          </p>
                        </div>
                      )}

                      {insight.id === "3" && (
                        <div className="p-3 rounded-lg bg-[#C9EDA8]/10 dark:bg-[#C9EDA8]/5">
                          <h4 className="text-sm font-medium mb-2">Interest Cycle</h4>
                          <div className="h-24 w-full bg-[#C9EDA8]/10 dark:bg-[#C9EDA8]/5 rounded-md relative mb-2">
                            {/* This would be a chart in a real app */}
                            <div className="absolute inset-0 flex items-center">
                              <div
                                className="h-20 w-full"
                                style={{
                                  backgroundImage:
                                    "path('M 0 60 C 40 20, 80 80, 120 40 C 160 0, 200 60, 240 30 C 280 0, 320 40, 360 60')",
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "100% 100%",
                                }}
                              >
                                <svg height="100%" width="100%" viewBox="0 0 360 80" preserveAspectRatio="none">
                                  <path
                                    d="M 0 60 C 40 20, 80 80, 120 40 C 160 0, 200 60, 240 30 C 280 0, 320 40, 360 60"
                                    stroke={colors.green}
                                    strokeWidth="2"
                                    fill="none"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-[#272727]/60 dark:text-[#F5FAFA]/60 p-1">
                              <span>Week 1</span>
                              <span>Week 2</span>
                              <span>Week 3</span>
                              <span>Week 4</span>
                              <span>Week 5</span>
                            </div>
                          </div>
                          <p className="text-xs">
                            Your interest typically peaks around week 2-3 and then declines, regardless of the other
                            person's engagement level.
                          </p>
                        </div>
                      )}

                      {insight.id === "4" && (
                        <div className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
                          <h4 className="text-sm font-medium mb-2">Ghost Concern vs. Reality</h4>
                          <div className="space-y-3">
                            {sampleSituations.map((situation) => {
                              const ghostLevel = getGhostLevel(situation.ghostScore)
                              return (
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
                                      <span className="text-xs">
                                        {situation.name === "taylor" ? "Low concern" : "High concern"}
                                      </span>
                                    </div>
                                  </div>
                                  <Progress
                                    value={situation.ghostScore}
                                    className="h-1.5"
                                    style={
                                      {
                                        backgroundColor: `${ghostLevel.color}20`,
                                        "--progress-color": ghostLevel.color,
                                      } as React.CSSProperties
                                    }
                                  />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveTab("advice")
                          }}
                        >
                          Get Advice
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-center mt-4">
              <Button variant="outline" className="text-xs" onClick={() => router.push("/chat")}>
                <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                Chat with Soari for More Insights
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="advice" className="mt-0 space-y-4">
            {/* Persona Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Button
                variant={activePersona === "flow" ? "default" : "outline"}
                className={activePersona === "flow" ? "bg-[#9FBCCF] text-white" : ""}
                onClick={() => setActivePersona("flow")}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Flow Perspective
              </Button>
              <Button
                variant={activePersona === "truth" ? "default" : "outline"}
                className={activePersona === "truth" ? "bg-[#F8CE97] text-white" : ""}
                onClick={() => setActivePersona("truth")}
              >
                <Zap className="h-4 w-4 mr-2" />
                Truth Perspective
              </Button>
            </div>

            {/* Advice Cards */}
            <Card
              className={cn(
                "backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10",
                activePersona === "flow"
                  ? "bg-[#9FBCCF]/20 dark:bg-[#9FBCCF]/10"
                  : "bg-[#F8CE97]/20 dark:bg-[#F8CE97]/10",
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center",
                      activePersona === "flow" ? "bg-[#9FBCCF]/20 text-[#9FBCCF]" : "bg-[#F8CE97]/20 text-[#F8CE97]",
                    )}
                  >
                    {activePersona === "flow" ? <Sparkles className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="text-base font-medium">{activePersona === "flow" ? "soari flow" : "soari truth"}</h3>
                    <p className="text-sm text-[#272727]/70 dark:text-[#F5FAFA]/70">
                      {activePersona === "flow" ? "gentle guidance for your journey" : "straight talk, no filter"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {(activePersona === "flow" ? sampleAdvice.flow : sampleAdvice.truth).map((advice, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-3 rounded-lg",
                        activePersona === "flow"
                          ? "bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5"
                          : "bg-[#F8CE97]/10 dark:bg-[#F8CE97]/5",
                      )}
                    >
                      <p className="text-sm">{advice}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Red & Green Flags */}
            <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-[#E57373]" />
                  Relationship Flags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-[#E57373] mr-2" />
                    <h4 className="text-sm font-medium">Red Flags</h4>
                  </div>
                  <div className="p-3 rounded-lg bg-[#E57373]/10 dark:bg-[#E57373]/5">
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm">
                        <span className="inline-block w-4 h-4 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>You initiate 80% of conversations with Alex</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="inline-block w-4 h-4 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>Rob has canceled plans twice in the last month</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="inline-block w-4 h-4 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>Your anxiety spikes when waiting for responses</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-[#C9EDA8] mr-2" />
                    <h4 className="text-sm font-medium">Green Flags</h4>
                  </div>
                  <div className="p-3 rounded-lg bg-[#C9EDA8]/10 dark:bg-[#C9EDA8]/5">
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm">
                        <span className="inline-block w-4 h-4 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>Taylor responds quickly and consistently</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="inline-block w-4 h-4 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>Your communication with Taylor is balanced (45%/55%)</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="inline-block w-4 h-4 mt-0.5 mr-2 flex-shrink-0">•</span>
                        <span>You're more active on weekends, showing work/life balance</span>
                      </li>
                    </ul>
                  </div>
                </div>
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
          </TabsContent>
        </main>
      </Tabs>
    </div>
  )
}
