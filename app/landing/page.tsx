"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Ghost, MessageCircle, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const features = [
  {
    title: "Ghost Meter",
    description: "Track response patterns and get insights on your relationships",
    icon: Ghost,
    color: "#9FBCCF",
  },
  {
    title: "AI Relationship Coach",
    description: "Get personalized advice from Soari, your AI companion",
    icon: MessageCircle,
    color: "#B3A9C6",
  },
  {
    title: "Situation Tracking",
    description: "Keep track of your relationships and their unique dynamics",
    icon: Heart,
    color: "#C9EDA8",
  },
  {
    title: "Smart Insights",
    description: "Understand patterns and make better relationship decisions",
    icon: Sparkles,
    color: "#F8CE97",
  },
]

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold mb-4">
              Navigate Modern Dating with Confidence
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your personal AI companion for understanding relationships, tracking communication patterns, and making better dating decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
                onClick={() => router.push("/register")}
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => router.push("/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-8 pb-16">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6">
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon 
                    className="h-6 w-6"
                    style={{ color: feature.color }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}