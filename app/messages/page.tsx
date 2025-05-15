"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Search, Plus, Check, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { colors } from "@/lib/colors"

// Sample data for demonstration
const sampleConversations = [
  {
    id: "1",
    name: "alex",
    nickname: "lex",
    avatar: "A",
    color: colors.blue,
    lastMessage: "Hey, are we still on for Friday?",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    status: "sent",
    online: false,
  },
  {
    id: "2",
    name: "rob",
    nickname: "robbie",
    avatar: "R",
    color: colors.purple,
    lastMessage: "I'll let you know about next week",
    lastMessageTime: "2 days ago",
    unreadCount: 2,
    status: "read",
    online: true,
  },
  {
    id: "3",
    name: "taylor",
    nickname: "tay",
    avatar: "T",
    color: colors.green,
    lastMessage: "That sounds fun! I'm free on Saturday",
    lastMessageTime: "Just now",
    unreadCount: 0,
    status: "delivered",
    online: false,
  },
  {
    id: "4",
    name: "jordan",
    nickname: "j",
    avatar: "J",
    color: colors.blue,
    lastMessage: "Can't wait to see you next week!",
    lastMessageTime: "3 days ago",
    unreadCount: 0,
    status: "read",
    online: false,
  },
  {
    id: "5",
    name: "casey",
    nickname: "case",
    avatar: "C",
    color: colors.purple,
    lastMessage: "Let me know when you're free",
    lastMessageTime: "1 week ago",
    unreadCount: 0,
    status: "read",
    online: true,
  },
]

export default function MessagesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")

  const filteredConversations = sampleConversations.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.nickname.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-[#9FBCCF]" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-[#9FBCCF]" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-[#C9EDA8]" />
      default:
        return null
    }
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("q", value)
    } else {
      params.delete("q")
    }
    router.replace(`/messages?${params.toString()}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F5FAFA] dark:bg-[#272727] text-[#272727] dark:text-[#F5FAFA]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-lg safe-top">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/situations")} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-light">dms</h1>
        </div>
        <Button
          size="sm"
          className="bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
          onClick={() => router.push("/new-message")}
        >
          <Plus className="h-4 w-4 mr-1" />
          new message
        </Button>
      </header>

      {/* Search */}
      <div className="p-4 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#272727]/40 dark:text-[#F5FAFA]/40" />
          <Input
            placeholder="Search dms..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 p-4">
        <div className="space-y-3">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-[#272727]/60 dark:text-[#F5FAFA]/60">
              <p>No dms found</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10 rounded-lg p-3 cursor-pointer"
                onClick={() => router.push(`/situations/${conversation.id}/messages`)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2" style={{ borderColor: conversation.color }}>
                      <AvatarFallback style={{ backgroundColor: `${conversation.color}20`, color: conversation.color }}>
                        {conversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#C9EDA8] border-2 border-white dark:border-[#272727]"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-medium">{conversation.name}</h3>
                      <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">{conversation.lastMessageTime}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-1">
                        <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">{conversation.nickname}</p>
                        {conversation.status && conversation.lastMessage.startsWith("Hey") && (
                          <span className="flex items-center">{getStatusIcon(conversation.status)}</span>
                        )}
                      </div>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-[#9FBCCF] text-white text-xs">{conversation.unreadCount}</Badge>
                      )}
                    </div>
                    <p className="text-sm mt-1 truncate">{conversation.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 safe-bottom">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 shadow-lg"
          onClick={() => router.push("/new-message")}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}