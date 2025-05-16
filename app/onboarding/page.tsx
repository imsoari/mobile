"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { OnboardingModal } from "@/components/onboarding-modal"

export default function OnboardingPage() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Show modal after a short delay for smooth transition
    const timer = setTimeout(() => {
      setShowModal(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleComplete = () => {
    router.push("/pricing")
  }

  return (
    <div className="min-h-[100dvh] bg-[#272727] text-[#F5FAFA] flex items-center justify-center">
      <OnboardingModal
        open={showModal}
        onOpenChange={setShowModal}
        onComplete={handleComplete}
      />
    </div>
  )
}