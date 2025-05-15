"use client"

import { useState } from "react"
import { Calendar, MapPin, MessageSquare, Heart, User, AtSign, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { colors } from "@/lib/colors"

const relationshipTypes = [
  { value: "talking", label: "Talking" },
  { value: "dating", label: "Dating" },
  { value: "situationship", label: "Situationship" },
  { value: "fwb", label: "Friends with Benefits" },
  { value: "exclusive", label: "Exclusive" },
]

const firstImpressions = [
  { value: "excited", label: "Excited", color: colors.green },
  { value: "curious", label: "Curious", color: colors.blue },
  { value: "nervous", label: "Nervous", color: colors.purple },
  { value: "skeptical", label: "Skeptical", color: colors.dark },
  { value: "attracted", label: "Attracted", color: colors.green },
  { value: "indifferent", label: "Indifferent", color: colors.blue },
  { value: "intrigued", label: "Intrigued", color: colors.purple },
  { value: "cautious", label: "Cautious", color: colors.dark },
]

interface AddSituationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (data: any) => void
}

export function AddSituationModal({ open, onOpenChange, onSave }: AddSituationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    firstMessageDate: "",
    meetingPlace: "",
    relationshipType: "",
    firstImpression: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would save the data to a database
      console.log("Submitted data:", formData)
      setIsSubmitting(false)

      if (onSave) {
        onSave(formData)
      }

      // Reset form and close modal
      setFormData({
        name: "",
        nickname: "",
        firstMessageDate: "",
        meetingPlace: "",
        relationshipType: "",
        firstImpression: "",
      })
      onOpenChange(false)
    }, 1500)
  }

  const isFormValid = () => {
    return formData.name.trim() !== "" && formData.relationshipType !== "" && formData.firstImpression !== ""
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-light flex items-center">
            <User className="h-4 w-4 text-[#9FBCCF] mr-2" />
            add situation
          </DialogTitle>
          <DialogDescription>Add details about your new situationship to start tracking.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center mb-2">
              <User className="h-4 w-4 text-[#9FBCCF] mr-2" />
              <h2 className="text-base font-medium">basic info</h2>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="name">name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Their name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nickname">nickname (optional)</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#272727]/40 dark:text-[#F5FAFA]/40" />
                  <Input
                    id="nickname"
                    value={formData.nickname}
                    onChange={(e) => handleChange("nickname", e.target.value)}
                    placeholder="What you call them"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Relationship Details */}
          <div className="space-y-4">
            <div className="flex items-center mb-2">
              <Heart className="h-4 w-4 text-[#B3A9C6] mr-2" />
              <h2 className="text-base font-medium">relationship details</h2>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="relationshipType">relationship type</Label>
                <Select
                  value={formData.relationshipType}
                  onValueChange={(value) => handleChange("relationshipType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship type" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationshipTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstMessageDate">date of first message</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#272727]/40 dark:text-[#F5FAFA]/40" />
                  <Input
                    id="firstMessageDate"
                    type="date"
                    value={formData.firstMessageDate}
                    onChange={(e) => handleChange("firstMessageDate", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meetingPlace">where you met</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#272727]/40 dark:text-[#F5FAFA]/40" />
                  <Input
                    id="meetingPlace"
                    value={formData.meetingPlace}
                    onChange={(e) => handleChange("meetingPlace", e.target.value)}
                    placeholder="Dating app, coffee shop, etc."
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* First Impression */}
          <div className="space-y-4">
            <div className="flex items-center mb-2">
              <MessageSquare className="h-4 w-4 text-[#C9EDA8] mr-2" />
              <h2 className="text-base font-medium">first impression</h2>
            </div>

            <div className="space-y-3">
              <Label>what was your first impression?</Label>
              <RadioGroup
                value={formData.firstImpression}
                onValueChange={(value) => handleChange("firstImpression", value)}
                className="grid grid-cols-2 gap-2"
              >
                {firstImpressions.map((impression) => (
                  <div key={impression.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={impression.value}
                      id={`impression-${impression.value}`}
                      className="border-[#9FBCCF]"
                    />
                    <Label
                      htmlFor={`impression-${impression.value}`}
                      className="flex items-center text-sm cursor-pointer"
                    >
                      <span className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: impression.color }}></span>
                      {impression.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2" />
                saving...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-1" />
                save
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
