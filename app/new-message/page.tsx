"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { colors } from "@/lib/colors"

// Sample data for demonstration
const sampleContacts = [
  {
    id: "1",
    name: "alex",
    nickname: "lex",
    avatar: "A",
    color: colors.blue,
  },
  {
    id: "2",
    name: "rob",
    nickname: "robbie",
    avatar: "R",
    color: colors.purple,
  },
  {
    id: "3",
    name: "taylor",
    nickname: "tay",
    avatar: "T",
    color: colors.green,
  },
  {
    id: "4",
    name: "jordan",
    nickname: "j",
    avatar: "J",
    color: colors.blue,
  },
  {
    id: "5",
    name: "casey",
    nickname: "case",
    avatar: "C",
    color: colors.purple,
  },
  {
    id: "6",
    name: "morgan",
    nickname: "morg",
    avatar: "M",
    color: colors.green,
  },
  {
    id: "7",
    name: "riley",
    nickname: "ri",
    avatar: "R",
    color: colors.blue,
  },
  {
    id: "8",
    name: "avery",
    nickname: "ave",
    avatar: "A",
    color: colors.purple,
  },
]

export default function NewMessagePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [message, setMessage] = useState("")

  const filteredContacts = sampleContacts.filter(
    (contact) =>
      (contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.nickname.toLowerCase().includes(searchQuery.toLowerCase())) &&
      !selectedContacts.includes(contact.id),
  )

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts([...selectedContacts, contactId])
    setSearchQuery("")
  }

  const handleRemoveContact = (contactId: string) => {
    setSelectedContacts(selectedContacts.filter((id) => id !== contactId))
  }

  const handleSendMessage = () => {
    if (selectedContacts.length === 0 || message.trim() === "") return

    // In a real app, this would send the message to the selected contacts
    console.log("Sending message to:", selectedContacts)
    console.log("Message:", message)

    // Navigate to the first selected contact's messages
    if (selectedContacts.length === 1) {
      router.push(`/situations/${selectedContacts[0]}/messages`)
    } else {
      router.push("/messages")
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
          <h1 className="text-xl font-light">new dm</h1>
        </div>
        <Button
          size="sm"
          className="bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
          onClick={handleSendMessage}
          disabled={selectedContacts.length === 0 || message.trim() === ""}
        >
          <Send className="h-4 w-4 mr-1" />
          send
        </Button>
      </header>

      {/* Recipients */}
      <div className="p-4 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-sm font-medium">To:</span>
          {selectedContacts.map((contactId) => {
            const contact = sampleContacts.find((c) => c.id === contactId)
            if (!contact) return null

            return (
              <div
                key={contact.id}
                className="flex items-center space-x-1 px-2 py-1 bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/20 rounded-full"
              >
                <Avatar className="h-5 w-5">
                  <AvatarFallback
                    style={{ backgroundColor: `${contact.color}20`, color: contact.color, fontSize: "10px" }}
                  >
                    {contact.avatar}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs">{contact.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full"
                  onClick={() => handleRemoveContact(contact.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )
          })}
          <Input
            placeholder={selectedContacts.length > 0 ? "" : "Search contacts..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-none shadow-none focus-visible:ring-0 p-0 h-8 min-w-[100px]"
          />
        </div>

        {searchQuery.length > 0 && filteredContacts.length > 0 && (
          <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white dark:bg-[#333]">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center p-3 hover:bg-[#9FBCCF]/10 dark:hover:bg-[#9FBCCF]/20 cursor-pointer"
                onClick={() => handleSelectContact(contact.id)}
              >
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarFallback style={{ backgroundColor: `${contact.color}20`, color: contact.color }}>
                    {contact.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{contact.name}</p>
                  <p className="text-xs text-[#272727]/60 dark:text-[#F5FAFA]/60">{contact.nickname}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="flex-1 p-4">
        <Textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-full min-h-[200px] resize-none"
        />
      </div>
    </div>
  )
}
