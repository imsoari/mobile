"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowRight, Check, Loader2, Heart, Ghost, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
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
    title: "hey bestie! 💖",
    subtitle: "ready to level up your dating game? let's get you started!",
  },
  {
    id: "features",
    title: "here's what you'll get",
    subtitle: "everything you need to navigate your situationships",
  },
  {
    id: "name",
    title: "what should we call you?",
    subtitle: "your name is just between us bestie",
    validate: (value) => {
      if (!value) return "bestie, we need your name!"
      if (value.length < 2) return "name's a bit too short!"
      return undefined
    },
  },
  {
    id: "email",
    title: "drop your email",
    subtitle: "we'll keep your updates on lock",
    validate: (value) => {
      if (!value) return "bestie, we need your email!"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "hmm, that email doesn't look right"
      return undefined
    },
  },
  {
    id: "password",
    title: "secure the bag",
    subtitle: "create a password that's giving main character energy",
    validate: (value) => {
      if (!value) return "bestie, we need a password!"
      if (value.length < 8) return "make it at least 8 characters for extra security"
      return undefined
    },
  },
  {
    id: "username",
    title: "pick your @ handle",
    subtitle: "make it iconic, make it you",
    validate: (value) => {
      if (!value) return "bestie, pick a username!"
      if (value.length < 3) return "make it a bit longer!"
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return "keep it simple - letters, numbers, and underscores only"
      return undefined
    },
  },
]

const features = [
  {
    icon: Ghost,
    title: "Ghost Meter",
    description: "Know when they're about to ghost before it happens",
  },
  {
    icon: MessageCircle,
    title: "Soari Chat",
    description: "Get relationship advice from your AI bestie",
  },
  {
    icon: Heart,
    title: "Date Ideas",
    description: "Never run out of creative date suggestions",
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

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleNext = async () => {
    if (currentStep <= 1) {
      setCurrentStep(prev => prev + 1)
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
        await new Promise(resolve => setTimeout(resolve, 1500))
        router.push("/pricing")
      } catch (error) {
        setError("oops! something's not working. try again?")
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

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-[#9FBCCF]/5 animate-pulse" 
          style={{ animationDuration: "4s" }} />
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-[#B3A9C6]/5 animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }} />
      </div>

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
              <DialogTitle className="text-2xl font-medium tracking-tight">
                {steps[currentStep].title}
              </DialogTitle>
              <p className="text-white/60">
                {steps[currentStep].subtitle}
              </p>
            </div>

            {/* Features showcase */}
            {currentStep === 1 && (
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 transition-all duration-300 hover:bg-white/10"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <feature.icon className="h-5 w-5 mt-0.5 text-[#9FBCCF]" />
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-white/60">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Input field */}
            {currentStep > 1 && (
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type={currentStep === 4 && !showPassword ? "password" : "text"}
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
                  {currentStep === 4 && (
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
                    let's get started!
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