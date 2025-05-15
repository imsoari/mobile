import type React from "react"
import type { Metadata } from "next"
import { BottomNav } from "@/components/bottom-nav"

export const metadata: Metadata = {
  title: "Ghost Insights | Soari",
  description: "Analyze your ghosting patterns",
}

export default function GhostInsightsLayout({
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
