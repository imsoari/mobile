"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Sun,
  Moon,
  Sparkles,
  Heart,
  Coffee,
  Utensils,
  Music,
  Palette,
  Wine,
  Trees,
  DollarSign,
  Star,
  Search,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { colors } from "@/lib/colors"

// Sample date ideas for demonstration
const dateIdeas = [
  {
    id: "1",
    title: "Sunset Picnic at Highland Park",
    type: "Romantic",
    time: "Evening",
    distance: "0.8 miles away",
    description: "Perfect spot for a cozy evening with city views. Known for amazing sunsets and quiet atmosphere.",
    price: "$$",
    weather: "Clear skies expected",
    bestTime: "6:30 PM - 8:00 PM",
    category: "outdoor",
    tags: ["scenic", "romantic", "quiet"],
    rating: 4.8,
    reviews: 124,
    imageUrl: "https://images.pexels.com/photos/5122174/pexels-photo-5122174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "2",
    title: "Art Gallery Night",
    type: "Cultural",
    time: "Evening",
    distance: "1.2 miles away",
    description: "Local artists showcase with wine tasting. Great for meaningful conversations.",
    price: "$$",
    weather: "Indoor venue",
    bestTime: "7:00 PM - 9:00 PM",
    category: "indoor",
    tags: ["art", "wine", "cultural"],
    rating: 4.6,
    reviews: 89,
    imageUrl: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "3",
    title: "Cozy Coffee & Pastries",
    type: "Casual",
    time: "Morning",
    distance: "0.3 miles away",
    description: "Charming local café known for artisanal pastries and specialty coffee. Perfect for morning conversations.",
    price: "$",
    weather: "Indoor venue",
    bestTime: "9:00 AM - 11:00 AM",
    category: "indoor",
    tags: ["coffee", "casual", "cozy"],
    rating: 4.9,
    reviews: 256,
    imageUrl: "https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "4",
    title: "Botanical Garden Walk",
    type: "Adventure",
    time: "Afternoon",
    distance: "2.1 miles away",
    description: "Beautiful gardens with seasonal blooms. Features hidden benches and peaceful walking paths.",
    price: "$",
    weather: "Sunny, 72°F",
    bestTime: "2:00 PM - 4:00 PM",
    category: "outdoor",
    tags: ["nature", "peaceful", "active"],
    rating: 4.7,
    reviews: 178,
    imageUrl: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
]

const categories = [
  { icon: Coffee, label: "Coffee", color: colors.blue },
  { icon: Utensils, label: "Dining", color: colors.purple },
  { icon: Music, label: "Music", color: colors.green },
  { icon: Palette, label: "Art", color: colors.blue },
  { icon: Wine, label: "Drinks", color: colors.purple },
  { icon: Trees, label: "Outdoor", color: colors.green },
]

export default function DateNitePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [timeOfDay, setTimeOfDay] = useState<"day" | "night">("day")

  const filteredIdeas = dateIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || idea.tags.includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-lg safe-top">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-light">date nite</h1>
            <p className="text-xs text-muted-foreground">premium feature</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTimeOfDay(timeOfDay === "day" ? "night" : "day")}
        >
          {timeOfDay === "day" ? (
            <Sun className="h-5 w-5 text-[#F8CE97]" />
          ) : (
            <Moon className="h-5 w-5 text-[#9FBCCF]" />
          )}
        </Button>
      </header>

      {/* Search and Filters */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search date ideas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(({ icon: Icon, label, color }) => (
            <Button
              key={label}
              variant={selectedCategory === label ? "default" : "outline"}
              className="flex-shrink-0"
              style={{
                backgroundColor: selectedCategory === label ? `${color}20` : undefined,
                color: selectedCategory === label ? color : undefined,
              }}
              onClick={() => setSelectedCategory(selectedCategory === label ? null : label)}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Date Ideas */}
      <div className="flex-1 p-4 space-y-4">
        {filteredIdeas.map((idea) => (
          <Card
            key={idea.id}
            className="overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
            onClick={() => router.push(`/date-nite/${idea.id}`)}
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${idea.imageUrl})` }}
            />
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{idea.title}</h3>
                <Badge
                  className="text-xs"
                  style={{
                    backgroundColor: `${colors.accent}20`,
                    color: colors.accent,
                  }}
                >
                  {idea.type}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                {idea.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{idea.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{idea.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>{idea.price}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-[#F8CE97]">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{idea.rating}</span>
                  <span className="text-muted-foreground">({idea.reviews})</span>
                </div>
                <span className="text-muted-foreground">{idea.bestTime}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 safe-bottom">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 shadow-lg"
        >
          <Filter className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}