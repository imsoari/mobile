"use client"

import { usePathname, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { SimpleSunsetThemeToggle } from "@/components/sunset-theme-toggle"

interface HeaderProps {
  title: string
  showBackButton?: boolean
  showThemeToggle?: boolean
}

export function Header({ title, showBackButton = true, showThemeToggle = true }: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Don't show back button on main navigation pages
  const isMainPage = ["/dashboard", "/situations", "/chat", "/soari-insights", "/profile"].includes(pathname)

  const shouldShowBackButton = showBackButton && !isMainPage

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-lg border-b border-primary/10">
      <div className="flex items-center">
        {shouldShowBackButton && (
          <button onClick={() => router.back()} className="mr-3 text-foreground" aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      {showThemeToggle && <SimpleSunsetThemeToggle />}
    </div>
  )
}
