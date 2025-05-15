"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically call your API to save the email
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      router.push("/register")
    } catch (error) {
      console.error("Failed to submit email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[100dvh] bg-[#272727] text-[#F5FAFA] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-12">
        {/* Logo */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-light tracking-wider mb-4">let's lock</h1>
          <p className="text-lg text-[#F5FAFA]/60">
            time to claim your spot
          </p>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label htmlFor="email" className="block text-lg text-[#F5FAFA]/80">
              email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-14 bg-[#F5FAFA]/5 border-0 rounded-2xl text-[#F5FAFA] placeholder:text-[#F5FAFA]/40 focus-visible:ring-[#C9EDA8] focus-visible:ring-offset-[#272727]"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 text-lg font-normal bg-[#C9EDA8] hover:bg-[#C9EDA8]/90 text-[#272727] rounded-2xl transition-all duration-200"
          >
            {isSubmitting ? "one sec..." : "oh wait!"}
          </Button>
        </form>
      </div>
    </div>
  )
}