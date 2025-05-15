"use client"

import { usePathname, useRouter } from "next/navigation"
import { Brain, Activity, MessageCircle, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Brain,
      active: pathname === "/dashboard",
    },
    {
      name: "Situations",
      href: "/situations",
      icon: Activity,
      active: pathname === "/situations" || pathname.startsWith("/situations/"),
    },
    {
      name: "Soari",
      href: "/chat",
      icon: MessageCircle,
      active: pathname === "/chat",
    },
    {
      name: "Insights",
      href: "/soari-insights",
      icon: Sparkles,
      active: pathname === "/soari-insights",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      active: pathname === "/profile",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-lg border-t border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              item.active ? "text-[#9FBCCF]" : "text-[#272727]/60 dark:text-[#F5FAFA]/60",
            )}
            onClick={() => router.push(item.href)}
          >
            <div className="relative">
              <item.icon className={cn("h-5 w-5", item.active && "text-[#9FBCCF]")} />
            </div>
            <span className="text-[10px] mt-1">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
