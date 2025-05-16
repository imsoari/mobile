"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Ghost, MessageCircle, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { colors } from "@/lib/colors"

const onboardingSteps = [
  {
    id: "welcome",
    title: "welcome to soari",
    description: "your personal relationship companion for navigating modern dating",
    icon: <Sparkles className="h-12 w-12 text-[#9FBCCF]" />,
  },
  {
    id: "ghost-meter",
    title: "ghost meter",
    description: "track response patterns and get insights on your relationships",
    icon: <Ghost className="h-12 w-12 text-[#B3A9C6]" />,
  },
  {
    id: "chat",
    title: "chat with soari",
    description: "get personalized advice and support when you need it",
    icon: <MessageCircle className="h-12 w-12 text-[#C9EDA8]" />,
  },
  {
    id: "situations",
    title: "manage situations",
    description: "keep track of your relationships and their unique dynamics",
    icon: <Heart className="h-12 w-12 text-[#F8CE97]" />,
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-foreground antialiased">
      <main className="flex-1 flex flex-col">
        {/* Progress bar */}
        <div className="px-4 pt-4 pb-2">
          <Progress value={progress} className="h-1" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Card className="w-full max-w-md mx-auto p-8 flex flex-col items-center justify-center space-y-6 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
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
          </Card>
        </div>

        {/* Navigation */}
        <div className="p-4 safe-bottom">
          <Button
            className="w-full bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white h-12 text-base"
            onClick={handleNext}
          >
            {currentStep < onboardingSteps.length - 1 ? "Continue" : "Get Started"}
          </Button>
          
          {currentStep < onboardingSteps.length - 1 && (
            <Button
              variant="ghost"
              className="w-full mt-2 text-sm"
              onClick={() => router.push("/dashboard")}
            >
              Skip
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}