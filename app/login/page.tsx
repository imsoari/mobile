"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const router = useRouter()
  const { theme } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      {/* Logo */}
      <div className="flex justify-center p-8">
        <img
          src={theme === "dark" 
            ? "https://github.com/QRUMN/soairlogos/blob/main/transparent-soari%20eggshell%20logo.png?raw=true"
            : "https://github.com/QRUMN/soairlogos/blob/main/transparent-soari%20muted%20rasin%20logo.png?raw=true"
          }
          alt="Soari"
          className="w-20 h-20 object-contain"
        />
      </div>

      {/* Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-[280px] space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-medium">welcome back</h1>
            <p className="text-sm text-muted-foreground">
              lock in to your account
            </p>
          </div>

          <div className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="placeholder:text-muted-foreground/70"
            />
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 placeholder:text-muted-foreground/70"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#C9EDA8] hover:bg-[#C9EDA8]/90 text-[#272727] text-base h-12"
          >
            lock in
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => router.push("/auth")}
            >
              need access? sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}