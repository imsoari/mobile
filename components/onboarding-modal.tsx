"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

const onboardingSteps = [
  {
    id: "welcome",
    title: "bestie, welcome to the vibe check",
    subtitle: "your cheat code to situationship clarity fr fr",
    fields: [
      {
        id: "name",
        label: "what should we call you?",
        type: "text",
        placeholder: "spill the tea ✨",
      }
    ],
    bullets: [
      "no cap, we'll help you decode those mixed signals",
      "ghost meter that hits different",
      "zero ads, just straight facts"
    ]
  },
  {
    id: "email",
    title: "let's get you in the loop",
    subtitle: "secure your spot in the group chat",
    fields: [
      {
        id: "email",
        label: "drop your email",
        type: "email",
        placeholder: "your email bestie"
      }
    ]
  },
  {
    id: "password",
    title: "keep it on lock",
    subtitle: "make it lowkey but memorable",
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
        placeholder: "one more time"
      }
    ]
  },
  {
    id: "username",
    title: "drop your @ bestie",
    subtitle: "make it iconic fr",
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
      "custom pfps available for main characters only",
      "permanent username claim with paid plans"
    ]
  }
]

interface OnboardingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: () => void
}

export function OnboardingModal({ open, onOpenChange, onComplete }: OnboardingModalProps) {
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
        onComplete()
      } catch (error) {
        console.error("Failed to create account:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const currentStepData = onboardingSteps[currentStep]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

        {/* Content */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <DialogTitle className="text-2xl font-light">{currentStepData.title}</DialogTitle>
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
              onClick={() => onOpenChange(false)}
            >
              nvm bestie
            </Button>
            <Button
              className="flex-1 bg-[#C9EDA8] hover:bg-[#C9EDA8]/90 text-[#272727]"
              onClick={handleNext}
              disabled={isLoading}
            >
              {isLoading ? "loading..." : currentStep === onboardingSteps.length - 1 ? "let's go!" : "next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}