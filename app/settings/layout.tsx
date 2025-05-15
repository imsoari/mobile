import type React from "react"
import type { Metadata } from "next"
import { BottomNav } from "@/components/bottom-nav"

export const metadata: Metadata = {
  title: "Settings | Soari",
  description: "App settings",
}

export default function SettingsLayout({
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
