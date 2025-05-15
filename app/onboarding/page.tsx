"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Ghost, MessageCircle, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

const onboardingSteps = [
  {
    id: "welcome",
    title: "hey bestie!",
    description: "ready to level up your situationship game?",
    icon: <Sparkles className="h-12 w-12 text-[#9FBCCF]" />,
    cta: "fr fr",
  },
  {
    id: "ghost-meter",
    title: "ghost meter check",
    description: "catch the vibes before they ghost. no cap, we'll help you see it coming.",
    icon: <Ghost className="h-12 w-12 text-[#B3A9C6]" />,
    cta: "that's lowkey genius",
  },
  {
    id: "chat",
    title: "spill the tea",
    description: "soari's got your back with that main character energy. get advice that hits different.",
    icon: <MessageCircle className="h-12 w-12 text-[#C9EDA8]" />,
    cta: "periodt!",
  },
  {
    id: "situations",
    title: "track your vibe",
    description: "keep it real with all your situationships. we're here for the plot twists.",
    icon: <Heart className="h-12 w-12 text-[#F8CE97]" />,
    cta: "let's get this bread",
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [open, setOpen] = useState(true)

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100

  return (
    <div className="min-h-[100dvh] bg-background flex items-center justify-center p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md p-0 gap-0 border-0 shadow-xl">
          {/* Progress bar */}
          <div className="px-4 pt-4 pb-2">
            <Progress value={progress} className="h-1" />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col items-center text-center space-y-6">
            {/* Icon */}
            <div className="rounded-2xl bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5 p-6">
              {onboardingSteps[currentStep].icon}
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h1 className="text-2xl font-medium">
                {onboardingSteps[currentStep].title}
              </h1>
              <p className="text-muted-foreground">
                {onboardingSteps[currentStep].description}
              </p>
            </div>

            {/* Button */}
            <Button
              className="w-full bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white h-12 text-base"
              onClick={handleNext}
            >
              {onboardingSteps[currentStep].cta}
            </Button>

            {currentStep < onboardingSteps.length - 1 && (
              <Button
                variant="ghost"
                className="w-full text-sm"
                onClick={() => router.push("/dashboard")}
              >
                skip the tea
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}