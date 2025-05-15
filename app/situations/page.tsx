"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Ghost, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { AddSituationModal } from "@/components/add-situation-modal"
import { colors } from "@/lib/colors"

// Sample data for demonstration
const sampleSituations = [
  {
    id: "1",
    name: "alex",
    nickname: "lex",
    relationshipType: "dating",
    lastMessage: "Hey, are we still on for Friday?",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    avatar: "A",
    color: "#9FBCCF",
    ghostScore: 75,
    riskLevel: "high",
    weeklyTrend: 15,
  },
  {
    id: "2",
    name: "rob",
    nickname: "robbie",
    relationshipType: "situationship",
    lastMessage: "I'll let you know about next week",
    lastMessageTime: "2 days ago",
    unreadCount: 2,
    avatar: "R",
    color: "#B3A9C6",
    ghostScore: 60,
    riskLevel: "medium",
    weeklyTrend: 5,
  },
  {
    id: "3",
    name: "taylor",
    nickname: "tay",
    relationshipType: "talking",
    lastMessage: "That sounds fun! I'm free on Saturday",
    lastMessageTime: "Just now",
    unreadCount: 0,
    avatar: "T",
    color: "#C9E7CB",
    ghostScore: 15,
    riskLevel: "low",
    weeklyTrend: -5,
  },
]

const getGhostLevel = (score: number) => {
  if (score < 30) return { level: "low", color: colors.green }
  if (score < 60) return { level: "medium", color: colors.blue }
  if (score < 85) return { level: "high", color: colors.purple }
  return { level: "extreme", color: colors.dark }
}

export default function SituationsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredSituations = sampleSituations.filter(
    (situation) =>
      situation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      situation.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate overall ghost metrics
  const overallMetrics = {
    averageScore: Math.round(
      sampleSituations.reduce((acc, curr) => acc + curr.ghostScore, 0) / sampleSituations.length
    ),
    lowRisk: sampleSituations.filter(s => s.ghostScore < 30).length,
    mediumRisk: sampleSituations.filter(s => s.ghostScore >= 30 && s.ghostScore < 60).length,
    highRisk: sampleSituations.filter(s => s.ghostScore >= 60).length,
    weeklyTrend: Math.round(
      sampleSituations.reduce((acc, curr) => acc + curr.weeklyTrend, 0) / sampleSituations.length
    ),
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5FAFA] dark:bg-[#272727] text-[#272727] dark:text-[#F5FAFA]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-lg safe-top">
        <h1 className="text-xl font-light">situations</h1>
        <Button
          size="sm"
          className="bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          situation
        </Button>
      </header>

      {/* Ghost Meter Overview */}
      <Card className="mx-4 mt-4 p-4 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Ghost className="h-5 w-5 text-[#9FBCCF]" />
            <h2 className="text-base font-medium">ghost meter</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={() => router.push("/ghost-insights")}
          >
            View Insights
          </Button>
        </div>

        <div className="space-y-4">
          {/* Score and Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#272727]/70 dark:text-[#F5FAFA]/70">
                average ghost score
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{overallMetrics.averageScore}/100</span>
                <div className="flex items-center text-xs">
                  <TrendingUp className={`h-3 w-3 mr-0.5 ${overallMetrics.weeklyTrend > 0 ? 'text-[#E57373]' : 'text-[#C9EDA8]'}`} />
                  <span className={overallMetrics.weeklyTrend > 0 ? 'text-[#E57373]' : 'text-[#C9EDA8]'}>
                    {Math.abs(overallMetrics.weeklyTrend)}%
                  </span>
                </div>
              </div>
            </div>
            <Progress
              value={overallMetrics.averageScore}
              className="h-1.5"
              style={{
                backgroundColor: `${colors.blue}20`,
                "--progress-color": getGhostLevel(overallMetrics.averageScore).color,
              } as React.CSSProperties}
            />
          </div>

          {/* Risk Level Summary */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-[#C9EDA8]/20 dark:bg-[#C9EDA8]/10 text-center">
              <p className="text-lg font-medium text-[#C9EDA8]">{overallMetrics.lowRisk}</p>
              <p className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">low risk</p>
            </div>
            <div className="p-2 rounded-lg bg-[#9FBCCF]/20 dark:bg-[#9FBCCF]/10 text-center">
              <p className="text-lg font-medium text-[#9FBCCF]">{overallMetrics.mediumRisk}</p>
              <p className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">medium risk</p>
            </div>
            <div className="p-2 rounded-lg bg-[#B3A9C6]/20 dark:bg-[#B3A9C6]/10 text-center">
              <p className="text-lg font-medium text-[#B3A9C6]">{overallMetrics.highRisk}</p>
              <p className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">high risk</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Search */}
      <div className="p-4 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#272727]/40 dark:text-[#F5FAFA]/40" />
          <Input
            placeholder="Search situations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Situations List */}
      <div className="flex-1 p-4 pb-20">
        <div className="space-y-3">
          {filteredSituations.length === 0 ? (
            <div className="text-center py-8 text-[#272727]/60 dark:text-[#F5FAFA]/60">
              <p>No situations found</p>
            </div>
          ) : (
            filteredSituations.map((situation) => {
              const ghostLevel = getGhostLevel(situation.ghostScore)

              return (
                <div
                  key={situation.id}
                  className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10 rounded-xl p-3 cursor-pointer"
                  onClick={() => router.push(`/situations/${situation.id}`)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 border-2" style={{ borderColor: situation.color }}>
                      <AvatarFallback style={{ backgroundColor: `${situation.color}20`, color: situation.color }}>
                        {situation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-medium">{situation.name}</h3>
                          <Badge
                            className="text-xs"
                            style={{
                              backgroundColor: `${situation.color}20`,
                              color: situation.color,
                              borderColor: `${situation.color}30`,
                            }}
                          >
                            {situation.relationshipType}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className="flex items-center space-x-1 text-xs"
                            style={{
                              backgroundColor: `${ghostLevel.color}20`,
                              color: ghostLevel.color,
                            }}
                          >
                            <Ghost className="h-3 w-3 mr-1" />
                            <span>{ghostLevel.level}</span>
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">{situation.nickname}</p>
                        <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">{situation.lastMessageTime}</p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs truncate max-w-[80%]">{situation.lastMessage}</p>
                        {situation.unreadCount > 0 && (
                          <div className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-[#9FBCCF] text-white text-xs flex items-center justify-center">
                              {situation.unreadCount}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

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