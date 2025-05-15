"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Sample responses from Soari's Flow persona
const flowResponses = [
  "I'm sensing some confusion in how you're reading their messages... it's like they're speaking two languages at once. This uncertainty you're feeling? Completely valid. When someone's actions and words don't align, it creates this emotional static that's hard to tune out. What if we sit with this feeling for a moment and ask: what parts of their communication feel true to you? Sometimes our body knows before our mind catches up. ✨",

  "It sounds like there's a gentle voice inside you asking for more space... that voice deserves to be heard. Boundaries aren't walls - they're more like the banks of a river, creating a safe channel for your feelings to flow. What might it feel like to honor your need for clarity here? Sometimes the most loving thing we can do - both for ourselves and others - is to name what we need, even when our voice shakes a little. ✨",

  "I hear the ache in your words... that slow letting go of something that once felt so close. Healing isn't linear - it's more like the tide, coming and going in waves. On the days when the waters feel calm, celebrate that peace. And when the waves return, remember they get smaller with time. Your heart is learning a new rhythm now. What tiny thing could you do today that future you would thank you for? ✨",

  "That flutter of anxiety when waiting for a reply comes from a very human place of wanting connection. How might you ground yourself in your own worthiness during these waiting moments? Remember that your value doesn't change with their response time. ✨",

  "Relationships unfold in their own time, like flowers opening. There's beauty in allowing this connection to reveal itself naturally, while staying attuned to how it nurtures your spirit. What does your heart whisper when you create quiet space to listen? ✨",
]

// Sample responses from Soari's Truth persona
const truthResponses = [
  "Let's be real - mixed signals are just a NO in fancy packaging. If they wanted to, they WOULD. No one's too busy to text back the people they're actually into. You're not confused - they're confusing you. Big difference. Your gut is screaming the truth, you're just not listening. Time to stop analyzing their every emoji like it's a cryptic treasure map. You deserve someone whose interest doesn't require a detective kit to uncover.",

  "Boundaries aren't just suggestions, bestie - they're your emotional security system. And right now? Your alarm is BLARING. Stop apologizing for having needs! That discomfort you feel when setting limits? It's just the growing pains of your self-respect leveling up. They might not like your boundaries, but that's literally not your problem. Repeat after me: 'This is what works for me.' Full stop. No footnotes, no apologies.",

  "They're your ex for a reason - remember that when your phone starts feeling magnetic at 2am. Delete the texts. Untag the photos. Stop the late-night Instagram archaeology expeditions. Yes, it hurts. Growth usually does. But you're not missing them - you're missing who you thought they were. And that person? Doesn't exist. Your future self is begging you to put down the phone and pick up your life. They weren't the end of your story - they were just a plot twist.",

  "If their texting habits are giving you anxiety, they're not your person. Period. Someone right for you won't have you analyzing read receipts like you're cracking a secret code. Your time is too valuable for that detective work.",

  "Potential isn't enough, bestie. You can't date potential. Either they're showing up for you NOW or they're wasting your time. Stop investing in someone's demo version. You deserve the full release, not the buggy beta.",
]

type Message = {
  id: string
  content: string
  sender: "user" | "soari"
  timestamp: Date
  persona: "flow" | "truth"
}

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "hey bestie! what's going on in your situationship world today?",
      sender: "soari",
      timestamp: new Date(),
      persona: "flow",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activePersona, setActivePersona] = useState<"flow" | "truth">("flow")
  const [isTransitioning, setIsTransitioning] = useState(false)
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
  }, [input])

  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
      persona: activePersona,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate Soari typing
    setIsTyping(true)
    setTimeout(
      () => {
        // Add Soari response
        const responses = activePersona === "flow" ? flowResponses : truthResponses
        const soariMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: responses[Math.floor(Math.random() * responses.length)],
          sender: "soari",
          timestamp: new Date(),
          persona: activePersona,
        }
        setMessages((prev) => [...prev, soariMessage])
        setIsTyping(false)
      },
      1500 + Math.random() * 1500,
    ) // Random delay between 1.5-3s
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handlePersonaSwitch = (newPersona: "flow" | "truth") => {
    if (newPersona === activePersona) return

    setIsTransitioning(true)
    setTimeout(() => {
      setActivePersona(newPersona)
      setIsTransitioning(false)

      // Add a transition message
      const transitionMessage: Message = {
        id: Date.now().toString(),
        content:
          newPersona === "flow"
            ? "switching to flow perspective... let's explore this with a bit more gentleness ✨"
            : "switching to truth perspective... time for some real talk!",
        sender: "soari",
        timestamp: new Date(),
        persona: newPersona,
      }
      setMessages((prev) => [...prev, transitionMessage])
    }, 500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen transition-colors duration-300",
        activePersona === "flow"
          ? "bg-[#F5FAFA] dark:bg-[#272727] text-[#272727] dark:text-[#F5FAFA]"
          : "bg-[#FFF9F0] dark:bg-[#272727] text-[#272727] dark:text-[#F5FAFA]",
      )}
    >
      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-10 flex items-center justify-between p-4 border-b backdrop-blur-lg transition-colors duration-300",
          activePersona === "flow"
            ? "border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80"
            : "border-[#F8CE97]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80",
        )}
      >
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-light">soari</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Label
            htmlFor="persona-toggle"
            className={cn(
              "text-xs transition-colors",
              activePersona === "flow" ? "text-[#9FBCCF]" : "text-[#272727]/40 dark:text-[#F5FAFA]/40",
            )}
          >
            flow
          </Label>
          <Switch
            id="persona-toggle"
            checked={activePersona === "truth"}
            onCheckedChange={(checked) => handlePersonaSwitch(checked ? "truth" : "flow")}
            className={cn(
              "data-[state=checked]:bg-[#F8CE97] data-[state=unchecked]:bg-[#9FBCCF]",
              isTransitioning && "opacity-50",
            )}
          />
          <Label
            htmlFor="persona-toggle"
            className={cn(
              "text-xs transition-colors",
              activePersona === "truth" ? "text-[#F8CE97]" : "text-[#272727]/40 dark:text-[#F5FAFA]/40",
            )}
          >
            truth
          </Label>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[80%] transition-all duration-300",
                  message.sender === "user" ? "order-2" : "order-2",
                )}
              >
                <div
                  className={cn(
                    "px-4 py-3 rounded-2xl",
                    message.sender === "user"
                      ? "bg-[#B3A9C6] text-white rounded-tr-none"
                      : message.persona === "flow"
                        ? "bg-[#9FBCCF]/20 dark:bg-[#9FBCCF]/30 rounded-tl-none"
                        : "bg-[#F8CE97]/20 dark:bg-[#F8CE97]/30 rounded-tl-none",
                  )}
                >
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                </div>
                <div
                  className={`flex items-center mt-1 text-xs text-[#272727]/50 dark:text-[#F5FAFA]/50 ${
                    message.sender === "user" ? "justify-end mr-2" : "justify-start ml-2"
                  }`}
                >
                  <span>{formatTime(message.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <div
                  className={cn(
                    "px-4 py-3 rounded-2xl rounded-tl-none",
                    activePersona === "flow"
                      ? "bg-[#9FBCCF]/20 dark:bg-[#9FBCCF]/30"
                      : "bg-[#F8CE97]/20 dark:bg-[#F8CE97]/30",
                  )}
                >
                  <div className="flex space-x-1">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full animate-bounce",
                        activePersona === "flow" ? "bg-[#9FBCCF]" : "bg-[#F8CE97]",
                      )}
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full animate-bounce",
                        activePersona === "flow" ? "bg-[#9FBCCF]" : "bg-[#F8CE97]",
                      )}
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full animate-bounce",
                        activePersona === "flow" ? "bg-[#9FBCCF]" : "bg-[#F8CE97]",
                      )}
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

      {/* Input */}
      <div
        className={cn(
          "p-3 border-t backdrop-blur-lg transition-colors duration-300",
          activePersona === "flow"
            ? "border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80"
            : "border-[#F8CE97]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80",
        )}
      >
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              placeholder="Message soari..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(
                "resize-none pr-12 py-2.5 min-h-[40px] max-h-[120px] rounded-full transition-all",
                activePersona === "flow" ? "focus-visible:ring-[#9FBCCF]" : "focus-visible:ring-[#F8CE97]",
              )}
            />
            <Button
              size="icon"
              className={cn(
                "absolute right-1 bottom-1 h-8 w-8 rounded-full",
                activePersona === "flow" ? "bg-[#9FBCCF] hover:bg-[#9FBCCF]/90" : "bg-[#F8CE97] hover:bg-[#F8CE97]/90",
              )}
              onClick={handleSendMessage}
              disabled={input.trim() === ""}
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
