import type React from "react"
import type { Metadata } from "next"
import { BottomNav } from "@/components/bottom-nav"

export const metadata: Metadata = {
  title: "New DM | Soari",
  description: "Start a new conversation",
}

export default function NewMessageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pb-16">
      {children}
      <BottomNav />
    </div>
  )
}
