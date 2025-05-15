import type React from "react"
import { BottomNav } from "@/components/bottom-nav"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">{children}</div>
      <BottomNav />
    </div>
  )
}
