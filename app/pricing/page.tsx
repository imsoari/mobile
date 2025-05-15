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
    cta: "Upgrade with Apple Pay",
    ctaAndroid: "Upgrade with Google Pay",
    color: colors.purple,
    icon: Crown,
    popular: true,
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)

  // Detect Android device on mount
  React.useEffect(() => {
    setIsAndroid(/Android/i.test(navigator.userAgent))
  }, [])

  const handleSubscribe = async (tier: string) => {
    setSelectedTier(tier)
    setIsLoading(true)

    try {
      // Create payment session
      const response = await fetch("/api/stripe/payment_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tier,
          paymentMethod: isAndroid ? "google_pay" : "apple_pay",
        }),
      })

      const data = await response.json()

      // Trigger native payment sheet
      if (isAndroid) {
        // Google Pay flow
        const paymentRequest = {
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [{
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["MASTERCARD", "VISA"]
            }
          }],
          merchantInfo: {
            merchantId: process.env.NEXT_PUBLIC_GOOGLE_MERCHANT_ID,
            merchantName: "Soari"
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPrice: "9.99",
            currencyCode: "USD"
          }
        }

        // @ts-ignore
        const paymentsClient = new google.payments.api.PaymentsClient()
        const paymentData = await paymentsClient.loadPaymentData(paymentRequest)
        
        // Send payment data to backend
        await fetch("/api/stripe/confirm_payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentData, sessionId: data.sessionId })
        })
      } else {
        // Apple Pay flow
        const session = new ApplePaySession(3, {
          countryCode: "US",
          currencyCode: "USD",
          supportedNetworks: ["visa", "masterCard"],
          merchantCapabilities: ["supports3DS"],
          total: {
            label: "Soari Main Character",
            amount: "9.99"
          }
        })

        session.onpaymentauthorized = async (event) => {
          // Send payment data to backend
          await fetch("/api/stripe/confirm_payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              payment: event.payment,
              sessionId: data.sessionId 
            })
          })
          
          session.completePayment(ApplePaySession.STATUS_SUCCESS)
          router.push("/dashboard")
        }

        session.begin()
      }
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium mb-2">Choose Your Story</h1>
          <p className="text-muted-foreground">
            Select the plan that best fits your dating journey
          </p>
        </div>

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
                  : isAndroid && tier.ctaAndroid
                  ? tier.ctaAndroid
                  : tier.cta}
              </Button>
            </Card>
          ))}
        </div>

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