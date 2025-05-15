"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type SubscriptionTier = "rent-free" | "main-character"

interface SubscriptionContextType {
  tier: SubscriptionTier
  isLoading: boolean
  features: {
    maxSituations: number
    dateNite: boolean
    advancedInsights: boolean
    customThemes: boolean
    prioritySupport: boolean
  }
  checkAccess: (feature: keyof SubscriptionContextType["features"]) => boolean
  upgradeRequired: () => void
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

const TIER_FEATURES = {
  "rent-free": {
    maxSituations: 3,
    dateNite: false,
    advancedInsights: false,
    customThemes: false,
    prioritySupport: false,
  },
  "main-character": {
    maxSituations: 10,
    dateNite: true,
    advancedInsights: true,
    customThemes: true,
    prioritySupport: true,
  },
}

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [tier, setTier] = useState<SubscriptionTier>("rent-free")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch subscription status from API
    const fetchSubscription = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch("/api/subscription")
        const data = await response.json()
        setTier(data.tier)
      } catch (error) {
        console.error("Failed to fetch subscription status:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscription()
  }, [])

  const features = TIER_FEATURES[tier]

  const checkAccess = (feature: keyof typeof features) => {
    return features[feature]
  }

  const upgradeRequired = () => {
    router.push("/pricing")
  }

  return (
    <SubscriptionContext.Provider
      value={{
        tier,
        isLoading,
        features,
        checkAccess,
        upgradeRequired,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider")
  }
  return context
}