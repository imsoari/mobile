"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, MessageSquare, Phone, Calendar, Clock, Ghost, Heart, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import GhostMeterPage from "./ghost-meter"
import MessagesPage from "./messages"
import { colors } from "@/lib/colors"

// Sample data for demonstration
const sampleSituations = {
  "1": {
    id: "1",
    name: "alex",
    nickname: "lex",
    firstDate: "2025-04-10",
    meetingPlace: "Coffee shop",
    relationshipType: "dating",
    lastMessage: "Hey, are we still on for Friday?",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    avatar: "A",
    color: colors.blue,
  },
  "2": {
    id: "2",
    name: "rob",
    nickname: "robbie",
    firstDate: "2025-03-15",
    meetingPlace: "Friend's party",
    relationshipType: "situationship",
    lastMessage: "I'll let you know about next week",
    lastMessageTime: "2 days ago",
    unreadCount: 2,
    avatar: "R",
    color: colors.purple,
  },
  "3": {
    id: "3",
    name: "taylor",
    nickname: "tay",
    firstDate: "2025-05-01",
    meetingPlace: "Dating app",
    relationshipType: "talking",
    lastMessage: "That sounds fun! I'm free on Saturday",
    lastMessageTime: "Just now",
    unreadCount: 0,
    avatar: "T",
    color: colors.green,
  },
}

export default function SituationPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const situation = sampleSituations[id as keyof typeof sampleSituations]
  const [activeTab, setActiveTab] = useState("overview")

  if (!situation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-xl mb-4">Situation not found</h1>
        <Button onClick={() => router.push("/situations")}>Back to Situations</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5FAFA] dark:bg-[#272727] text-[#272727] dark:text-[#F5FAFA]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-lg">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/situations")} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-light">{situation.name}</h1>
            <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">
              {situation.nickname} • {situation.relationshipType}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setActiveTab("messages")}>
            <MessageSquare className="h-4 w-4" />
            {situation.unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-[#9FBCCF] text-white text-[10px] flex items-center justify-center">
                {situation.unreadCount}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Situation info */}
      <div className="px-4 py-3 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10">
        <div className="flex items-center space-x-3">
          <Avatar className="h-16 w-16 border-2" style={{ borderColor: situation.color }}>
            <AvatarFallback style={{ backgroundColor: `${situation.color}20`, color: situation.color }}>
              {situation.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Badge
                className="bg-opacity-20 border-opacity-30"
                style={{
                  backgroundColor: `${situation.color}20`,
                  color: situation.color,
                  borderColor: `${situation.color}30`,
                }}
              >
                {situation.relationshipType}
              </Badge>
              <Badge
                variant="outline"
                className="bg-opacity-10 border-opacity-30 text-[#272727]/70 dark:text-[#F5FAFA]/70"
              >
                since {new Date(situation.firstDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">met at: {situation.meetingPlace}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
        <div className="px-4 pt-2 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">overview</TabsTrigger>
            <TabsTrigger value="messages">
              dms
              {situation.unreadCount > 0 && (
                <span className="ml-1.5 h-4 w-4 rounded-full bg-[#9FBCCF] text-white text-[10px] flex items-center justify-center">
                  {situation.unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="ghost">ghost meter</TabsTrigger>
          </TabsList>
        </div>

        <main className="flex-1">
          <TabsContent value="overview" className="mt-0 p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="h-4 w-4 text-[#9FBCCF]" />
                  <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">first date</span>
                </div>
                <p className="text-sm">
                  {new Date(situation.firstDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="h-4 w-4 text-[#B3A9C6]" />
                  <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">last message</span>
                </div>
                <p className="text-sm">{situation.lastMessageTime}</p>
              </div>

              <div className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Ghost className="h-4 w-4 text-[#F8CE97]" />
                  <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">ghost score</span>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm">{id === "1" ? "75" : id === "2" ? "60" : "15"}/100</p>
                  <Badge
                    className="text-xs"
                    style={{
                      backgroundColor:
                        id === "1" ? `${colors.purple}/20` : id === "2" ? `${colors.blue}/20` : `${colors.green}/20`,
                      color: id === "1" ? colors.purple : id === "2" ? colors.blue : colors.green,
                    }}
                  >
                    {id === "1" ? "high" : id === "2" ? "medium" : "low"}
                  </Badge>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Heart className="h-4 w-4 text-[#B3A9C6]" />
                  <span className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">vibe</span>
                </div>
                <p className="text-sm">{id === "1" ? "fading" : id === "2" ? "uncertain" : "promising"}</p>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-3">recent activity</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-full bg-[#9FBCCF]/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-4 w-4 text-[#9FBCCF]" />
                  </div>
                  <div>
                    <p className="text-sm">{situation.lastMessage}</p>
                    <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">{situation.lastMessageTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              send dm
            </Button>
          </TabsContent>

          <TabsContent value="messages" className="mt-0 flex flex-col h-full p-0">
            <MessagesPage />
          </TabsContent>

          <TabsContent value="ghost" className="mt-0 h-full">
            <GhostMeterPage situationId={id} />
          </TabsContent>
        </main>
      </Tabs>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button size="icon" className="h-12 w-12 rounded-full bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 shadow-lg">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
