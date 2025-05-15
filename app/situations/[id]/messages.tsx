"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ImageIcon, Send, Smile, Paperclip, Mic, MoreVertical, Check, CheckCheck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { colors } from "@/lib/colors"

// Sample data for demonstration
const sampleSituations = {
  "1": {
    id: "1",
    name: "alex",
    nickname: "lex",
    avatar: "A",
    color: colors.blue,
    online: false,
    lastSeen: "Today at 2:30 PM",
    typing: false,
  },
  "2": {
    id: "2",
    name: "rob",
    nickname: "robbie",
    avatar: "R",
    color: colors.purple,
    online: true,
    lastSeen: "Online",
    typing: true,
  },
  "3": {
    id: "3",
    name: "taylor",
    nickname: "tay",
    avatar: "T",
    color: colors.green,
    online: false,
    lastSeen: "Yesterday at 9:15 PM",
    typing: false,
  },
}

// Sample messages for demonstration
const sampleMessages = {
  "1": [
    {
      id: "1",
      text: "Hey! How's your week going?",
      sender: "user",
      timestamp: "Monday, 10:30 AM",
      status: "read",
    },
    {
      id: "2",
      text: "Pretty busy with work, but good overall. You?",
      sender: "other",
      timestamp: "Monday, 11:45 AM",
      status: "read",
    },
    {
      id: "3",
      text: "Same here. Want to grab coffee this weekend?",
      sender: "user",
      timestamp: "Monday, 12:15 PM",
      status: "read",
    },
    {
      id: "4",
      text: "Hey, are we still on for Friday?",
      sender: "user",
      timestamp: "Yesterday, 9:30 AM",
      status: "delivered",
    },
  ],
  "2": [
    {
      id: "1",
      text: "Hey Rob! How's it going?",
      sender: "user",
      timestamp: "Sunday, 2:30 PM",
      status: "read",
    },
    {
      id: "2",
      text: "Not bad, just finishing up some work. How about you?",
      sender: "other",
      timestamp: "Sunday, 3:15 PM",
      status: "read",
    },
    {
      id: "3",
      text: "I'm good! Just wondering if you're free next weekend for that concert?",
      sender: "user",
      timestamp: "Sunday, 3:20 PM",
      status: "read",
    },
    {
      id: "4",
      text: "I should be! Let me check my schedule and get back to you.",
      sender: "other",
      timestamp: "Sunday, 3:45 PM",
      status: "read",
    },
    {
      id: "5",
      text: "Any update on next weekend?",
      sender: "user",
      timestamp: "Yesterday, 10:15 AM",
      status: "read",
    },
    {
      id: "6",
      text: "I'll let you know about next week",
      sender: "other",
      timestamp: "Yesterday, 4:30 PM",
      status: "read",
    },
  ],
  "3": [
    {
      id: "1",
      text: "Hey Taylor! I had a great time yesterday!",
      sender: "user",
      timestamp: "Yesterday, 10:30 AM",
      status: "read",
    },
    {
      id: "2",
      text: "Me too! That restaurant was amazing.",
      sender: "other",
      timestamp: "Yesterday, 11:15 AM",
      status: "read",
    },
    {
      id: "3",
      text: "We should definitely go back sometime. Are you free next Saturday?",
      sender: "user",
      timestamp: "Yesterday, 11:30 AM",
      status: "read",
    },
    {
      id: "4",
      text: "That sounds fun! I'm free on Saturday",
      sender: "other",
      timestamp: "Yesterday, 12:45 PM",
      status: "read",
    },
  ],
}

// Sample emoji data
const sampleEmojis = [
  "😊",
  "😂",
  "❤️",
  "👍",
  "🙌",
  "🔥",
  "😍",
  "🥰",
  "😘",
  "😭",
  "🤔",
  "🙄",
  "😬",
  "😳",
  "🥺",
  "😴",
  "🤮",
  "🤢",
  "🤕",
  "🤒",
  "👋",
  "👏",
  "👀",
  "🙏",
  "💪",
  "🤝",
  "✌️",
  "🤞",
  "🤟",
  "🤘",
  "💯",
  "⭐",
  "🌟",
  "✨",
  "💫",
  "💥",
  "💦",
  "💨",
  "💣",
  "💬",
]

export default function MessagesPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const situation = sampleSituations[id as keyof typeof sampleSituations]
  const [messages, setMessages] = useState(sampleMessages[id as keyof typeof sampleMessages] || [])
  const [newMessage, setNewMessage] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [attachmentType, setAttachmentType] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [newMessage])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: (messages.length + 1).toString(),
      text: newMessage,
      sender: "user",
      timestamp: "Just now",
      status: "sent",
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
    setIsExpanded(false)

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg.id === newMsg.id ? { ...msg, status: "delivered" } : msg)),
      )
    }, 1000)

    // Simulate reply for demo purposes
    if (situation.id === "2" && Math.random() > 0.5) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: (prevMessages.length + 1).toString(),
            text: "I'll get back to you soon!",
            sender: "other",
            timestamp: "Just now",
            status: "read",
          },
        ])
      }, 5000)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-[#9FBCCF]" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-[#9FBCCF]" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-[#C9EDA8]" />
      default:
        return <Clock className="h-3 w-3 text-[#9FBCCF]" />
    }
  }

  const formatDate = (timestamp: string) => {
    if (timestamp === "Just now") return timestamp

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const todayString = today.toLocaleDateString()
    const yesterdayString = yesterday.toLocaleDateString()

    if (timestamp.startsWith("Today")) {
      return timestamp
    } else if (timestamp.startsWith("Yesterday")) {
      return timestamp
    } else {
      return timestamp
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#F5FAFA] dark:bg-[#272727] text-[#272727] dark:text-[#F5FAFA]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-lg">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10 mr-3 border-2" style={{ borderColor: situation.color }}>
            <AvatarFallback style={{ backgroundColor: `${situation.color}20`, color: situation.color }}>
              {situation.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-base font-medium">{situation.name}</h1>
            <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">
              {situation.online ? (
                <span className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9EDA8] mr-1"></span>
                  Online
                </span>
              ) : (
                situation.lastSeen
              )}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </header>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isUser = message.sender === "user"
            const showDate =
              index === 0 || messages[index - 1].timestamp.split(",")[0] !== message.timestamp.split(",")[0]

            return (
              <div key={message.id} className="space-y-1">
                {showDate && (
                  <div className="flex justify-center my-4">
                    <div className="px-3 py-1 text-xs bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/20 rounded-full text-[#272727]/70 dark:text-[#F5FAFA]/70">
                      {message.timestamp.split(",")[0]}
                    </div>
                  </div>
                )}
                <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[75%]">
                    <div
                      className={cn(
                        "px-4 py-2 rounded-2xl",
                        isUser
                          ? "bg-[#9FBCCF] text-white rounded-br-none"
                          : "bg-[#F5FAFA] dark:bg-[#333] border border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 rounded-bl-none",
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words">{message.text}</p>
                    </div>
                    <div
                      className={`flex items-center mt-1 text-xs text-[#272727]/50 dark:text-[#F5FAFA]/50 ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span>{message.timestamp.split(", ")[1]}</span>
                      {isUser && <span className="ml-1 flex items-center">{getStatusIcon(message.status)}</span>}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          {situation.typing && (
            <div className="flex justify-start">
              <div className="max-w-[75%]">
                <div className="px-4 py-2 rounded-2xl bg-[#F5FAFA] dark:bg-[#333] border border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div
                      className="h-2 w-2 rounded-full bg-[#9FBCCF] animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 rounded-full bg-[#9FBCCF] animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 rounded-full bg-[#9FBCCF] animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-lg">
        {attachmentType === "emoji" && (
          <div className="p-2 mb-2 bg-[#F5FAFA] dark:bg-[#333] border border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 rounded-lg">
            <div className="grid grid-cols-10 gap-2">
              {sampleEmojis.map((emoji, index) => (
                <button
                  key={index}
                  className="h-8 w-8 flex items-center justify-center text-xl hover:bg-[#9FBCCF]/10 rounded-md transition-colors"
                  onClick={() => {
                    setNewMessage((prev) => prev + emoji)
                    setAttachmentType(null)
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {attachmentType === "media" && (
          <div className="p-4 mb-2 bg-[#F5FAFA] dark:bg-[#333] border border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 rounded-lg">
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-square bg-[#9FBCCF]/10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[#9FBCCF]/20 transition-colors">
                <ImageIcon className="h-6 w-6 text-[#9FBCCF] mb-2" />
                <span className="text-xs">Gallery</span>
              </div>
              <div className="aspect-square bg-[#9FBCCF]/10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[#9FBCCF]/20 transition-colors">
                <ImageIcon className="h-6 w-6 text-[#9FBCCF] mb-2" />
                <span className="text-xs">Camera</span>
              </div>
              <div className="aspect-square bg-[#9FBCCF]/10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[#9FBCCF]/20 transition-colors">
                <Paperclip className="h-6 w-6 text-[#9FBCCF] mb-2" />
                <span className="text-xs">Files</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-end space-x-2">
          <div className="flex space-x-2">
            <Popover
              open={attachmentType === "media"}
              onOpenChange={(open) => setAttachmentType(open ? "media" : null)}
            >
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                  <Paperclip className="h-5 w-5 text-[#9FBCCF]" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-full p-0">
                {/* Content is handled by the conditional rendering above */}
              </PopoverContent>
            </Popover>

            <Popover
              open={attachmentType === "emoji"}
              onOpenChange={(open) => setAttachmentType(open ? "emoji" : null)}
            >
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                  <Smile className="h-5 w-5 text-[#9FBCCF]" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-full p-0">
                {/* Content is handled by the conditional rendering above */}
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              placeholder="Message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(
                "resize-none pr-12 py-2.5 min-h-[40px] max-h-[120px] transition-all",
                isExpanded ? "rounded-2xl" : "rounded-full",
              )}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => newMessage === "" && setIsExpanded(false)}
            />
            <Button
              size="icon"
              className="absolute right-1 bottom-1 h-8 w-8 rounded-full bg-[#9FBCCF] hover:bg-[#9FBCCF]/90"
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
            <Mic className="h-5 w-5 text-[#9FBCCF]" />
          </Button>
        </div>
      </div>
    </div>
  )
}
