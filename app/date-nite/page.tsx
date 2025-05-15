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
  Bookmark,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { colors } from "@/lib/colors"

// Sample date ideas data
const dateIdeas = [
  {
    id: 1,
    title: "Cozy Coffee Date",
    description: "Enjoy artisanal coffee and pastries at a local café",
    imageUrl: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg",
    type: "Casual",
    distance: "0.5 miles",
    time: "1-2 hours",
    price: "$",
    rating: "4.8",
    reviews: "324",
    bestTime: "Morning",
    tags: ["coffee"],
    category: "indoor"
  },
  {
    id: 2,
    title: "Art Gallery Tour",
    description: "Explore local art exhibits and discuss your interpretations",
    imageUrl: "https://images.pexels.com/photos/1674049/pexels-photo-1674049.jpeg",
    type: "Cultural",
    distance: "2.1 miles",
    time: "2-3 hours",
    price: "$$",
    rating: "4.6",
    reviews: "156",
    bestTime: "Afternoon",
    tags: ["art"],
    category: "indoor"
  }
]

// Categories with visual styling
const categories = [
  { icon: Coffee, label: "Coffee", color: colors.blue },
  { icon: Utensils, label: "Dining", color: colors.purple },
  { icon: Music, label: "Music", color: colors.green },
  { icon: Palette, label: "Art", color: colors.blue },
  { icon: Wine, label: "Drinks", color: colors.purple },
  { icon: Trees, label: "Outdoor", color: colors.green },
]

// Relationship stages for filtering
const relationshipStages = [
  "Talking Stage",
  "Early Dating",
  "Situationship",
  "Established",
  "Rekindling",
]

// Price ranges
const priceRanges = ["$", "$$", "$$$", "$$$$"]

export default function DateNitePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [timeOfDay, setTimeOfDay] = useState<"day" | "night">("day")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    maxDistance: 10,
    priceRange: ["$", "$$"],
    relationshipStage: "Early Dating",
    indoor: true,
    outdoor: true,
  })

  // Filter the date ideas based on all criteria
  const filteredIdeas = dateIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || idea.tags.includes(selectedCategory.toLowerCase())
    const matchesPrice = filters.priceRange.includes(idea.price)
    const matchesLocation = (filters.indoor && idea.category === "indoor") ||
      (filters.outdoor && idea.category === "outdoor")
    const matchesDistance = parseFloat(idea.distance) <= filters.maxDistance
    return matchesSearch && matchesCategory && matchesPrice && matchesLocation && matchesDistance
  })

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 glass-effect safe-top">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-light">date nite</h1>
            <p className="text-xs text-muted-foreground">premium feature</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
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
          <Button variant="ghost" size="icon" onClick={() => router.push("/date-nite/saved")}>
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
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
              className="flex-shrink-0 hover-lift"
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

        {/* Active Filters */}
        {(filters.priceRange.length < priceRanges.length || filters.maxDistance < 10) && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.priceRange.length < priceRanges.length && (
              <Badge variant="outline" className="flex-shrink-0">
                {filters.priceRange.join(", ")}
              </Badge>
            )}
            {filters.maxDistance < 10 && (
              <Badge variant="outline" className="flex-shrink-0">
                Within {filters.maxDistance} miles
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Date Ideas Grid */}
      <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
        {filteredIdeas.map((idea) => (
          <Card
            key={idea.id}
            className="overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer hover-lift"
            onClick={() => router.push(`/date-nite/${idea.id}`)}
          >
            <div
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${idea.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  // Toggle save
                }}
              >
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
            
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

              <p className="text-sm text-muted-foreground line-clamp-2">
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

      {/* Filter Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 shadow-lg safe-bottom"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" side="top" align="end">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Distance</h4>
              <Slider
                value={[filters.maxDistance]}
                max={10}
                step={0.5}
                onValueChange={([value]) => setFilters({ ...filters, maxDistance: value })}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 miles</span>
                <span>{filters.maxDistance} miles</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Price Range</h4>
              <div className="flex gap-2">
                {priceRanges.map((price) => (
                  <Button
                    key={price}
                    variant={filters.priceRange.includes(price) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const newPriceRange = filters.priceRange.includes(price)
                        ? filters.priceRange.filter(p => p !== price)
                        : [...filters.priceRange, price]
                      setFilters({ ...filters, priceRange: newPriceRange })
                    }}
                  >
                    {price}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Relationship Stage</h4>
              <div className="grid grid-cols-2 gap-2">
                {relationshipStages.map((stage) => (
                  <Button
                    key={stage}
                    variant={filters.relationshipStage === stage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilters({ ...filters, relationshipStage: stage })}
                  >
                    {stage}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Location Type</h4>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <Switch
                    checked={filters.indoor}
                    onCheckedChange={(checked) => setFilters({ ...filters, indoor: checked })}
                  />
                  <span>Indoor</span>
                </label>
                <label className="flex items-center gap-2">
                  <Switch
                    checked={filters.outdoor}
                    onCheckedChange={(checked) => setFilters({ ...filters, outdoor: checked })}
                  />
                  <span>Outdoor</span>
                </label>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}