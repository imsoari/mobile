"use client"

import { useState, useEffect } from "react"
import { Ghost, AlertTriangle, Clock, MessageCircle, Heart, TrendingUp, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { colors } from "@/lib/colors"

interface GhostMeterProps {
  situationId: string
}

interface GhostData {
  score: number
  level: string
  color: string
  factors: {
    responseTime: number
    messageFrequency: number
    initiationRatio: number
    lastActive: string
  }
  insights: string[]
  recommendations: string[]
}

const getGhostLevel = (score: number) => {
  if (score < 30) return { level: "minimal", color: colors.green }
  if (score < 60) return { level: "moderate", color: colors.blue }
  if (score < 85) return { level: "high", color: colors.purple }
  return { level: "extreme", color: colors.dark }
}

export default function GhostMeterPage({ situationId }: GhostMeterProps) {
  const [ghostData, setGhostData] = useState<GhostData>({
    score: 50,
    level: "moderate",
    color: colors.blue,
    factors: {
      responseTime: 12,
      messageFrequency: 5,
      initiationRatio: 65,
      lastActive: "2 days ago"
    },
    insights: [
      "Response times have increased by 40% this week",
      "Message frequency has decreased significantly",
      "You're initiating most conversations"
    ],
    recommendations: [
      "Give them space to initiate contact",
      "Focus on quality over quantity in messages",
      "Consider discussing communication expectations"
    ]
  })

  useEffect(() => {
    const level = getGhostLevel(ghostData.score)
    setGhostData(prev => ({
      ...prev,
      level: level.level,
      color: level.color
    }))
  }, [ghostData.score])

  return (
    <div className="flex flex-col min-h-screen bg-background p-4 space-y-4">
      {/* Main Ghost Score Card */}
      <Card className="p-4 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Ghost className="h-5 w-5" style={{ color: ghostData.color }} />
            <h2 className="text-lg font-medium">Ghost Meter</h2>
          </div>
          <Badge
            className="text-sm"
            style={{
              backgroundColor: `${ghostData.color}20`,
              color: ghostData.color
            }}
          >
            {ghostData.level}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold mb-2" style={{ color: ghostData.color }}>
              {ghostData.score}/100
            </div>
            <Progress
              value={ghostData.score}
              className="h-2"
              style={{
                "--progress-color": ghostData.color
              } as React.CSSProperties}
            />
          </div>

          {/* Key Factors */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-[#9FBCCF]" />
                <span className="text-xs">Response Time</span>
              </div>
              <p className="text-lg font-medium">{ghostData.factors.responseTime}h</p>
            </div>

            <div className="p-3 rounded-lg bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="h-4 w-4 text-[#B3A9C6]" />
                <span className="text-xs">Messages/Day</span>
              </div>
              <p className="text-lg font-medium">{ghostData.factors.messageFrequency}</p>
            </div>

            <div className="p-3 rounded-lg bg-[#C9EDA8]/10 dark:bg-[#C9EDA8]/5">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="h-4 w-4 text-[#C9EDA8]" />
                <span className="text-xs">Your Initiation</span>
              </div>
              <p className="text-lg font-medium">{ghostData.factors.initiationRatio}%</p>
            </div>

            <div className="p-3 rounded-lg bg-[#F8CE97]/10 dark:bg-[#F8CE97]/5">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-[#F8CE97]" />
                <span className="text-xs">Last Active</span>
              </div>
              <p className="text-lg font-medium">{ghostData.factors.lastActive}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-4 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-[#F8CE97]" />
          <h2 className="text-lg font-medium">Key Insights</h2>
        </div>
        <div className="space-y-2">
          {ghostData.insights.map((insight, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-[#F8CE97]/10 dark:bg-[#F8CE97]/5 text-sm"
            >
              {insight}
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-4 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="h-5 w-5 text-[#C9EDA8]" />
          <h2 className="text-lg font-medium">Recommendations</h2>
        </div>
        <div className="space-y-2">
          {ghostData.recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-[#C9EDA8]/10 dark:bg-[#C9EDA8]/5 text-sm"
            >
              {recommendation}
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4 safe-bottom">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {}}
        >
          <Ghost className="h-4 w-4 mr-2" />
          View History
        </Button>
        <Button
          className="flex-1 bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
          onClick={() => {}}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Get Advice
        </Button>
      </div>
    </div>
  )
}