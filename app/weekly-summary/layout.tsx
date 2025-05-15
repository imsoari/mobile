import type React from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"

export default function WeeklySummaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Weekly Summary" />
      <div className="flex-1">{children}</div>
      <BottomNav />
    </div>
  )
}
