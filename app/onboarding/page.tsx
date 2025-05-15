```tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const onboardingSteps = [
  {
    id: "welcome",
    title: "welcome to the vibe check",
    subtitle: "your cheat code to emotional clarity fr fr",
    fields: [
      {
        id: "name",
        label: "drop your name bestie",
        type: "text",
        placeholder: "drop your name bestie",
      }
    ],
    bullets: [
      "drop your thoughts, we'll check the vibes",
      "analyze text messages & get the tea",
      "no ads, just straight facts"
    ]
  },
  {
    id: "email",
    title: "let's lock in!",
    subtitle: "time to claim your spot fr",
    fields: [
      {
        id: "email",
        label: "email",
        type: "email",
        placeholder: "your email"
      }
    ]
  },
  {
    id: "password",
    title: "secure your vibe",
    fields: [
      {
        id: "password",
        label: "password",
        type: "password",
        placeholder: "minimum 6 characters"
      },
      {
        id: "confirmPassword",
        label: "confirm password",
        type: "password",
        placeholder: "type it again"
      }
    ]
  },
  {
    id: "username",
    title: "drop your aesthetic",
    subtitle: "we'll set the username vibe for you",
    fields: [
      {
        id: "username",
        label: "username (max 8 characters)",
        type: "text",
        placeholder: "@ username",
        prefix: "@"
      }
    ],
    info: [
      "custom profile photos are a paid feature",
      "custom username permanently available with paid plans"
    ]
  }
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: ""
  })
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = async () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsLoading(true)
      try {
        // Here you would typically call your API to create the account
        await new Promise(resolve => setTimeout(resolve, 1000))
        router.push("/dashboard")
      } catch (error) {
        console.error("Failed to create account:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const currentStepData = onboardingSteps[currentStep]

  return (
    <div className="min-h-[100dvh] bg-[#272727] text-[#F5FAFA] flex items-center justify-center p-4">
      <Dialog open>
        <DialogContent className="sm:max-w-[425px] bg-[#272727] text-[#F5FAFA] border-0 shadow-2xl">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-8">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "bg-[#C9EDA8] scale-125"
                    : index < currentStep
                    ? "bg-[#F5FAFA]/40"
                    : "bg-[#F5FAFA]/20"
                }`}
              />
            ))}
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/soari-logo.svg" alt="Soari" className="h-8" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-light">{currentStepData.title}</h1>
              {currentStepData.subtitle && (
                <p className="text-[#F5FAFA]/60">{currentStepData.subtitle}</p>
              )}
            </div>

            {/* Bullets */}
            {currentStepData.bullets && (
              <div className="space-y-3">
                {currentStepData.bullets.map((bullet, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-[#C9EDA8]/20 flex items-center justify-center">
                      <span className="text-[#C9EDA8]">✓</span>
                    </div>
                    <span className="text-[#F5FAFA]/80">{bullet}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Fields */}
            <div className="space-y-4">
              {currentStepData.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="text-[#F5FAFA]/60 text-sm">
                    {field.label}
                  </label>
                  <div className="relative">
                    {field.prefix && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F5FAFA]/40">
                        {field.prefix}
                      </span>
                    )}
                    <Input
                      type={
                        field.type === "password"
                          ? showPassword[field.id as keyof typeof showPassword]
                            ? "text"
                            : "password"
                          : field.type
                      }
                      placeholder={field.placeholder}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className={`bg-[#F5FAFA]/5 border-0 text-[#F5FAFA] placeholder:text-[#F5FAFA]/40 h-12 ${
                        field.prefix ? "pl-8" : ""
                      }`}
                    />
                    {field.type === "password" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent"
                        onClick={() =>
                          setShowPassword(prev => ({
                            ...prev,
                            [field.id]: !prev[field.id as keyof typeof showPassword]
                          }))
                        }
                      >
                        {showPassword[field.id as keyof typeof showPassword] ? (
                          <EyeOff className="h-4 w-4 text-[#F5FAFA]/60" />
                        ) : (
                          <Eye className="h-4 w-4 text-[#F5FAFA]/60" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Info text */}
            {currentStepData.info && (
              <div className="space-y-1">
                {currentStepData.info.map((text, index) => (
                  <p key={index} className="text-sm text-[#F5FAFA]/40 text-center">
                    {text}
                  </p>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 bg-[#F5FAFA]/5 border-0 text-[#F5FAFA] hover:bg-[#F5FAFA]/10"
                onClick={() => router.push("/dashboard")}
              >
                oh wait!
              </Button>
              <Button
                className="flex-1 bg-[#C9EDA8] hover:bg-[#C9EDA8]/90 text-[#272727]"
                onClick={handleNext}
                disabled={isLoading}
              >
                {isLoading ? "loading..." : "next"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
```