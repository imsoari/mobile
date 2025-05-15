"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Ghost, Sparkles, MessageCircle, Heart, Star, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { colors } from "@/lib/colors"

const tiers = [
  {
    name: "Rent Free",
    description: "Essential features for casual dating",
    price: "Free",
    features: [
      "Up to 3 active situations",
      "Basic ghost meter",
      "Chat with Soari (Flow & Truth)",
      "Standard insights",
    ],
    limitations: [
      "No date night suggestions",
      "Limited insights history",
      "Basic themes only",
      "Standard support",
    ],
    cta: "Get Started",
    color: colors.blue,
    icon: Ghost,
  },
  {
    name: "Main Character",
    description: "Premium features for serious daters",
    price: "$9.99",
    interval: "month",
    features: [
      "Up to 10 active situations",
      "Advanced ghost meter",
      "Priority Soari chat",
      "Date night suggestions",
      "Detailed relationship insights",
      "Custom themes",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Upgrade Now",
    color: colors.purple,
    icon: Crown,
    popular: true,
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (tier: string) => {
    setSelectedTier(tier)
    setIsLoading(true)

    try {
      // Create checkout session
      const response = await fetch("/api/stripe/checkout_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tier,
        }),
      })

      const data = await response.json()

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (error) {
      console.error("Failed to create checkout session:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-2">Choose Your Story</h1>
          <p className="text-muted-foreground">
            Select the plan that best fits your dating journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative p-6 ${
                tier.popular ? "border-2 border-[#B3A9C6]" : ""
              }`}
            >
              {tier.popular && (
                <Badge
                  className="absolute -top-2 right-6"
                  style={{
                    backgroundColor: `${colors.purple}20`,
                    color: colors.purple,
                  }}
                >
                  Most Popular
                </Badge>
              )}

              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-medium mb-2">{tier.name}</h2>
                  <p className="text-muted-foreground">{tier.description}</p>
                </div>
                <tier.icon className="h-8 w-8" style={{ color: tier.color }} />
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.interval && (
                    <span className="text-muted-foreground ml-2">
                      /{tier.interval}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="space-y-2">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-[#C9EDA8]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {tier.limitations && (
                  <div className="space-y-2">
                    {tier.limitations.map((limitation) => (
                      <div
                        key={limitation}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <span className="h-4 w-4 mr-2">×</span>
                        <span>{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                className="w-full"
                style={{
                  backgroundColor: tier.color,
                  color: "white",
                }}
                disabled={isLoading && selectedTier === tier.name}
                onClick={() => {
                  if (tier.price === "Free") {
                    router.push("/dashboard")
                  } else {
                    handleSubscribe(tier.name.toLowerCase())
                  }
                }}
              >
                {isLoading && selectedTier === tier.name
                  ? "Processing..."
                  : tier.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-16">
          <h2 className="text-2xl font-medium mb-8 text-center">
            Detailed Feature Comparison
          </h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted">
              <div>Feature</div>
              <div className="text-center">Rent Free</div>
              <div className="text-center">Main Character</div>
            </div>

            {[
              {
                name: "Active Situations",
                free: "3 max",
                pro: "10 max",
                icon: Heart,
              },
              {
                name: "Ghost Meter",
                free: "Basic tracking",
                pro: "Advanced analytics",
                icon: Ghost,
              },
              {
                name: "Soari Chat",
                free: "Standard access",
                pro: "Priority access",
                icon: MessageCircle,
              },
              {
                name: "Date Night",
                free: "Not available",
                pro: "Full access",
                icon: Star,
              },
              {
                name: "Insights",
                free: "Basic",
                pro: "Detailed + History",
                icon: Sparkles,
              },
            ].map((feature) => (
              <div
                key={feature.name}
                className="grid grid-cols-3 gap-4 p-4 rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <feature.icon className="h-4 w-4" />
                  {feature.name}
                </div>
                <div className="text-center text-muted-foreground">
                  {feature.free}
                </div>
                <div className="text-center font-medium">{feature.pro}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}