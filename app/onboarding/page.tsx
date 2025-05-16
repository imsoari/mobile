"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowRight, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface OnboardingStep {
  id: string
  title: string
  subtitle: string
  validate?: (value: string) => string | undefined
}

const steps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "welcome bestie! 👋",
    subtitle: "ready to level up your dating game?",
  },
  {
    id: "name",
    title: "what's your name?",
    subtitle: "we'll use this to personalize your experience",
    validate: (value) => {
      if (!value) return "name is required bestie!"
      if (value.length < 2) return "name's too short bestie!"
      return undefined
    },
  },
  {
    id: "email",
    title: "what's your email?",
    subtitle: "we'll keep you in the loop",
    validate: (value) => {
      if (!value) return "email is required bestie!"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "that's not a valid email bestie!"
      return undefined
    },
  },
  {
    id: "password",
    title: "create a password",
    subtitle: "make it strong and memorable",
    validate: (value) => {
      if (!value) return "password is required bestie!"
      if (value.length < 8) return "password needs to be at least 8 characters bestie!"
      return undefined
    },
  },
  {
    id: "username",
    title: "pick a username",
    subtitle: "make it uniquely you",
    validate: (value) => {
      if (!value) return "username is required bestie!"
      if (value.length < 3) return "username's too short bestie!"
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return "username can only contain letters, numbers, and underscores bestie!"
      return undefined
    },
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  // Auto-show modal after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleNext = async () => {
    if (currentStep === 0) {
      setCurrentStep(1)
      return
    }

    const step = steps[currentStep]
    const value = formData[step.id as keyof typeof formData]
    const error = step.validate?.(value)

    if (error) {
      setError(error)
      return
    }

    if (currentStep === steps.length - 1) {
      setIsLoading(true)
      try {
        // Here you would normally send the data to your backend
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
        router.push("/pricing")
      } catch (error) {
        setError("something went wrong bestie! try again?")
      } finally {
        setIsLoading(false)
      }
      return
    }

    setCurrentStep(prev => prev + 1)
    setError(undefined)
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="relative min-h-[100dvh] bg-[#272727] text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#272727] via-[#272727] to-[#9FBCCF]/20" />

      {/* Onboarding Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px] bg-white/10 backdrop-blur-xl border-white/20">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden rounded-t-lg">
            <div
              className="h-full bg-[#9FBCCF] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="pt-6 space-y-8">
            {/* Step content */}
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-medium tracking-tight">
                {steps[currentStep].title}
              </h2>
              <p className="text-white/60">
                {steps[currentStep].subtitle}
              </p>
            </div>

            {/* Input field */}
            {currentStep > 0 && (
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type={currentStep === 3 && !showPassword ? "password" : "text"}
                    placeholder={`enter your ${steps[currentStep].id}`}
                    value={formData[steps[currentStep].id as keyof typeof formData]}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        [steps[currentStep].id]: e.target.value
                      }))
                      setError(undefined)
                    }}
                    className={cn(
                      "bg-white/5 border-white/10 text-white placeholder:text-white/40",
                      error && "border-red-400/50 focus-visible:ring-red-400/50"
                    )}
                  />
                  {currentStep === 3 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 text-white/40 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="space-y-2">
              <Button
                className="w-full bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
                onClick={handleNext}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : currentStep === steps.length - 1 ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    let's go!
                  </>
                ) : (
                  <>
                    next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  className="w-full text-white/60 hover:text-white hover:bg-white/5"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                >
                  back
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}