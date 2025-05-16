"use client"

import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function AuthPage() {
  const router = useRouter()
  const { theme } = useTheme()

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-12">
        <img
          src={theme === "dark" 
            ? "https://github.com/QRUMN/soairlogos/blob/main/transparent-soari%20eggshell%20logo.png?raw=true"
            : "https://github.com/QRUMN/soairlogos/blob/main/transparent-soari%20muted%20rasin%20logo.png?raw=true"
          }
          alt="Soari"
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* Auth Buttons */}
      <div className="w-full max-w-[280px] space-y-3">
        <Button
          className="w-full bg-[#C9EDA8] hover:bg-[#C9EDA8]/90 text-[#272727] text-base h-12"
          onClick={() => router.push("/onboarding")}
        >
          i need access
        </Button>
        <Button
          variant="outline"
          className="w-full text-base h-12"
          onClick={() => router.push("/login")}
        >
          lock in
        </Button>
      </div>
    </div>
  )
}