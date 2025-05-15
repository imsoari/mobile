"use client"

import type React from "react"
import { useState } from "react"

import { useRouter } from "next/navigation"
import {
  Plus,
  Ghost,
  MessageSquare,
  Calendar,
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
  MessageCircle,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { colors } from "@/lib/colors"
import { AddSituationModal } from "@/components/add-situation-modal"

// Sample data for demonstration
const sampleSituations = [
  {
    id: "1",
    name: "alex",
    nickname: "lex",
    avatar: "A",
    color: colors.blue,
    lastMessage: "Hey, are we still on for Friday?",
    lastMessageTime: "Yesterday",
    ghostScore: 75,
    relationshipType: "dating",
  },
  {
    id: "2",
    name: "rob",
    nickname: "robbie",
    avatar: "R",
    color: colors.purple,
    lastMessage: "I'll let you know about next week",
    lastMessageTime: "2 days ago",
    ghostScore: 60,
    relationshipType: "situationship",
  },
  {
    id: "3",
    name: "taylor",
    nickname: "tay",
    avatar: "T",
    color: colors.green,
    lastMessage: "That sounds fun! I'm free on Saturday",
    lastMessageTime: "Just now",
    ghostScore: 15,
    relationshipType: "talking",
  },
]

const getGhostLevel = (score: number) => {
  if (score < 30) return { level: "low", label: "minimal signs", color: colors.green }
  if (score < 60) return { level: "medium", label: "potential ghosting", color: colors.blue }
  if (score < 85) return { level: "high", label: "likely ghosting", color: colors.purple }
  return { level: "extreme", label: "definitely ghosted", color: colors.dark }
}

export default function DashboardPage() {
  const router = useRouter()
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-[#F5FAFA] dark:bg-[#272727] text-[#272727] dark:text-[#F5FAFA]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-lg">
        <div>
          <h1 className="text-xl font-light">dashboard</h1>
          <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">Welcome back, Jamie</p>
        </div>
        <Button
          size="sm"
          className="bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          situation
        </Button>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
            <CardContent className="p-3 flex flex-col items-center justify-center">
              <Users className="h-5 w-5 text-[#9FBCCF] mb-1" />
              <p className="text-lg font-medium">3</p>
              <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">Situations</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
            <CardContent className="p-3 flex flex-col items-center justify-center">
              <MessageSquare className="h-5 w-5 text-[#B3A9C6] mb-1" />
              <p className="text-lg font-medium">5</p>
              <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">Messages</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
            <CardContent className="p-3 flex flex-col items-center justify-center">
              <Ghost className="h-5 w-5 text-[#C9EDA8] mb-1" />
              <p className="text-lg font-medium">50</p>
              <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">Avg. Ghost</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Summary */}
        <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-[#9FBCCF]" />
                Weekly Summary
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => router.push("/weekly-summary")}>
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-[#9FBCCF]" />
                  <h3 className="text-sm font-medium">May 8 - May 14, 2025</h3>
                </div>
                <Badge className="bg-[#F8CE97]/20 text-[#F8CE97] border-[#F8CE97]/30">Mixed progress</Badge>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">Ghost Score</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">50</span>
                  <div className="flex items-center text-[#E57373]">
                    <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                    <span className="text-xs">3</span>
                  </div>
                </div>
              </div>
              <Progress
                value={50}
                className="h-1.5"
                style={
                  {
                    backgroundColor: `${colors.blue}20`,
                    "--progress-color": getGhostLevel(50).color,
                  } as React.CSSProperties
                }
              />
            </div>

            <div className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
              <div className="flex items-center space-x-2 mb-1">
                <Sparkles className="h-4 w-4 text-[#9FBCCF]" />
                <span className="text-xs font-medium">top insights</span>
              </div>
              <ul className="space-y-1">
                <li className="flex items-start text-xs">
                  <span className="inline-block w-3 h-3 mt-0.5 mr-1 flex-shrink-0">•</span>
                  <span>Taylor is showing increased engagement this week</span>
                </li>
                <li className="flex items-start text-xs">
                  <span className="inline-block w-3 h-3 mt-0.5 mr-1 flex-shrink-0">•</span>
                  <span>Alex's ghost score has increased significantly</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full text-xs" onClick={() => router.push("/weekly-summary")}>
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              View Weekly Summary
            </Button>
          </CardFooter>
        </Card>

        {/* Soari Insights */}
        <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center justify-between">
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-[#9FBCCF]" />
                Soari Insights
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => router.push("/soari-insights")}>
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
              <div className="flex items-center space-x-3 mb-2">
                <MessageCircle className="h-4 w-4 text-[#9FBCCF]" />
                <h3 className="text-sm font-medium">Communication Patterns</h3>
              </div>
              <p className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">
                You initiate 80% of conversations with Alex. In healthy connections, initiation is usually more
                balanced.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5">
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="h-4 w-4 text-[#B3A9C6]" />
                <h3 className="text-sm font-medium">Response Time Anxiety</h3>
              </div>
              <p className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">
                Your message checking frequency increases when someone takes longer to respond.
              </p>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full text-xs" onClick={() => router.push("/soari-insights")}>
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              View All Insights
            </Button>
          </CardFooter>
        </Card>

        {/* Ghost Meter Overview */}
        <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center justify-between">
              <div className="flex items-center">
                <Ghost className="h-4 w-4 mr-2 text-[#9FBCCF]" />
                Ghost Meter Overview
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => router.push("/ghost-insights")}>
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sampleSituations.map((situation) => {
              const ghostLevel = getGhostLevel(situation.ghostScore)

              return (
                <div key={situation.id} className="flex items-center space-x-3">
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
                        {ghostLevel.level}
                      </Badge>
                    </div>
                    <div className="mt-1">
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
                  </div>
                </div>
              )
            })}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full text-xs" onClick={() => router.push("/ghost-insights")}>
              <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
              View Ghost Trends
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Messages */}
        <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-[#B3A9C6]" />
                Recent DMs (Situations)
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => router.push("/messages")}>
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sampleSituations.map((situation) => (
              <div
                key={situation.id}
                className="flex items-center space-x-3 p-2 hover:bg-[#9FBCCF]/5 rounded-lg cursor-pointer"
                onClick={() => router.push(`/situations/${situation.id}/messages`)}
              >
                <Avatar className="h-10 w-10 border-2" style={{ borderColor: situation.color }}>
                  <AvatarFallback style={{ backgroundColor: `${situation.color}20`, color: situation.color }}>
                    {situation.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{situation.name}</p>
                    <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">{situation.lastMessageTime}</p>
                  </div>
                  <p className="text-xs truncate">{situation.lastMessage}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full text-xs" onClick={() => router.push("/new-message")}>
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              New DM
            </Button>
          </CardFooter>
        </Card>

        {/* Soari AI Chat */}
        <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2 text-[#C9EDA8]" />
                Soari Chat
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => router.push("/chat")}>
                Chat Now
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-[#272727]/70 dark:text-[#F5FAFA]/70">
              Need relationship advice? Chat with Soari, your AI relationship assistant.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full text-xs" onClick={() => router.push("/chat")}>
              <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
              Ask Soari
            </Button>
          </CardFooter>
        </Card>

        {/* Upcoming Events */}
        <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-[#C9EDA8]" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-2 bg-[#C9EDA8]/10 rounded-lg">
              <div className="h-10 w-10 rounded-lg bg-[#C9EDA8]/20 flex flex-col items-center justify-center">
                <span className="text-xs font-medium text-[#C9EDA8]">FRI</span>
                <span className="text-sm font-bold text-[#C9EDA8]">17</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Coffee with Alex</p>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 text-[#272727]/60 dark:text-[#F5FAFA]/60 mr-1" />
                  <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">3:00 PM</p>
                </div>
              </div>
              <Badge className="bg-[#C9EDA8]/20 text-[#C9EDA8] border-[#C9EDA8]/30">Confirmed</Badge>
            </div>

            <div className="flex items-center space-x-3 p-2 bg-[#9FBCCF]/10 rounded-lg">
              <div className="h-10 w-10 rounded-lg bg-[#9FBCCF]/20 flex flex-col items-center justify-center">
                <span className="text-xs font-medium text-[#9FBCCF]">SAT</span>
                <span className="text-sm font-bold text-[#9FBCCF]">18</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Movie with Taylor</p>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 text-[#272727]/60 dark:text-[#F5FAFA]/60 mr-1" />
                  <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">7:30 PM</p>
                </div>
              </div>
              <Badge className="bg-[#9FBCCF]/20 text-[#9FBCCF] border-[#9FBCCF]/30">Pending</Badge>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full text-xs">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Add Event
            </Button>
          </CardFooter>
        </Card>
      </main>
      {/* Add Situation Modal */}
      <AddSituationModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSave={(data) => {
          // In a real app, this would add the new situation to the list
          console.log("New situation:", data)
        }}
      />
    </div>
  )
}
