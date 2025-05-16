"use client"

import { useState } from "react"
import { OnboardingModal } from "@/components/onboarding-modal"

export default function OnboardingPage() {
  const [showModal, setShowModal] = useState(true)

  return <OnboardingModal open={showModal} onOpenChange={setShowModal} />
}