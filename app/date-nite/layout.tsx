import type React from "react"
import type { Metadata } from "next"
import { BottomNav } from "@/components/bottom-nav"

export const metadata: Metadata = {
  title: "Date Nite | Soari",
  description: "Discover perfect date ideas",
}

export default function DateNiteLayout({
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