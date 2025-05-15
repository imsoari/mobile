"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Upload,
  Mic,
  Copy,
  MessageSquare,
  Heart,
  Clock,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Send,
  Info,
  Bookmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { colors } from "@/lib/colors"

// Sample analysis result
const sampleAnalysis = {
  directInsight: {
    truth:
      "they're keeping you on the back burner. that 'definitely' doesn't mean anything without an actual plan. they're interested enough to not want you to disappear completely, but not enough to make you a priority.",
    flow: "i'm sensing their energy is more friendly than romantic. there's warmth, but it's wrapped in hesitation... notice how they acknowledge the connection but aren't creating space for it? sometimes when people are truly invested, their actions align more clearly with their words. ✨",
  },
  interestLevel: {
    score: 35,
    label: "Low-Medium Interest",
    description:
      "showing low-medium interest. the 'definitely' and 'though' are linguistic hedges that often indicate hesitation. they've acknowledged the connection but aren't prioritizing it, as shown by the vague 'soon' with no specific plans.",
  },
  toneAnalysis: {
    score: 60,
    label: "Casual-Friendly",
    description:
      "this message has a casual, friendly tone with mild apologetic elements. the enthusiasm feels somewhat performative rather than genuine, with the exclamation point serving as compensation for the vague timeframe.",
  },
  patternRecognition: {
    description:
      "if this delayed response pattern is recurring, it suggests a comfort with inconsistent communication. the 'busy with work' explanation without specific details is a common low-investment response.",
  },
  keyPhrases: [
    {
      text: "sorry I've been mia lately",
      analysis: "Acknowledges absence without specific explanation",
      sentiment: "neutral",
    },
    {
      text: "crazy busy with work",
      analysis: "Common non-specific excuse that may indicate low priority",
      sentiment: "negative",
    },
    {
      text: "definitely hang out soon",
      analysis: "Vague timeframe with emphasis word ('definitely') often signals uncertainty",
      sentiment: "neutral",
    },
  ],
  redFlags: [
    "Vague plans without specific timing",
    "Non-specific excuse for absence",
    "Compensatory enthusiasm without action",
  ],
  greenFlags: ["Acknowledges the gap in communication", "Expresses desire for future connection"],
  guidance:
    "consider whether this pattern meets your needs. a direct response with a specific suggestion (like 'how about coffee this saturday?') will help clarify their actual interest level.",
}

export default function DecodeMessagePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<typeof sampleAnalysis | null>(null)
  const [activePersona, setActivePersona] = useState<"flow" | "truth">("truth")
  const [expandedSections, setExpandedSections] = useState<{
    tone: boolean
    interest: boolean
    patterns: boolean
    phrases: boolean
    flags: boolean
    guidance: boolean
  }>({
    tone: true,
    interest: true,
    patterns: false,
    phrases: false,
    flags: false,
    guidance: false,
  })

  const handleAnalyzeMessage = () => {
    if (message.trim() === "") return

    setIsAnalyzing(true)

    // Simulate analysis with loading states
    setTimeout(() => {
      setAnalysisResult(sampleAnalysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleCopyInsight = () => {
    if (!analysisResult) return
    const textToCopy =
      activePersona === "truth" ? analysisResult.directInsight.truth : analysisResult.directInsight.flow
    navigator.clipboard.writeText(textToCopy)
    // In a real app, we would show a toast notification
  }

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen transition-colors duration-300",
        activePersona === "flow"
          ? "bg-[#F5FAFA] dark:bg-[#272727] text-[#272727] dark:text-[#F5FAFA]"
          : "bg-[#FFF9F0] dark:bg-[#272727] text-[#272727] dark:text-[#F5FAFA]",
      )}
    >
      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-10 flex items-center justify-between p-4 border-b backdrop-blur-lg transition-colors duration-300",
          activePersona === "flow"
            ? "border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80"
            : "border-[#F8CE97]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80",
        )}
      >
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-light">decode message</h1>
        </div>
        {analysisResult && (
          <div className="flex items-center space-x-2">
            <Label
              htmlFor="persona-toggle"
              className={cn(
                "text-xs transition-colors",
                activePersona === "flow" ? "text-[#9FBCCF]" : "text-[#272727]/40 dark:text-[#F5FAFA]/40",
              )}
            >
              flow
            </Label>
            <Switch
              id="persona-toggle"
              checked={activePersona === "truth"}
              onCheckedChange={(checked) => setActivePersona(checked ? "truth" : "flow")}
              className={cn("data-[state=checked]:bg-[#F8CE97] data-[state=unchecked]:bg-[#9FBCCF]")}
            />
            <Label
              htmlFor="persona-toggle"
              className={cn(
                "text-xs transition-colors",
                activePersona === "truth" ? "text-[#F8CE97]" : "text-[#272727]/40 dark:text-[#F5FAFA]/40",
              )}
            >
              truth
            </Label>
          </div>
        )}
      </header>

      <main className="flex-1 p-4 space-y-4">
        {/* Message Input Section */}
        {!analysisResult && (
          <div
            className={cn(
              "p-4 rounded-2xl border transition-colors duration-300",
              activePersona === "flow"
                ? "bg-white/80 dark:bg-[#272727]/80 border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10"
                : "bg-white/80 dark:bg-[#272727]/80 border-[#F8CE97]/20 dark:border-[#F5FAFA]/10",
            )}
          >
            <div className="flex items-center mb-4">
              <MessageSquare
                className={cn("h-5 w-5 mr-2", activePersona === "flow" ? "text-[#9FBCCF]" : "text-[#F8CE97]")}
              />
              <h2 className="text-lg font-medium">message to decode</h2>
            </div>

            <Textarea
              placeholder="Paste the message you want to analyze..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] resize-none mb-4"
            />

            <div className="flex flex-col space-y-3">
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1 h-10" onClick={handleFileUpload}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Screenshot
                </Button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />

                <Button variant="outline" className="flex-1 h-10">
                  <Mic className="h-4 w-4 mr-2" />
                  Voice Message
                </Button>
              </div>

              <Button
                className={cn(
                  "w-full h-10",
                  activePersona === "flow"
                    ? "bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
                    : "bg-[#F8CE97] hover:bg-[#F8CE97]/90 text-white",
                )}
                onClick={handleAnalyzeMessage}
                disabled={message.trim() === "" || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2" />
                    <span className="text-sm">analyzing message...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    <span className="text-sm">decode message</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Analysis Loading Animation */}
        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div
              className={cn(
                "h-16 w-16 rounded-full animate-pulse",
                activePersona === "flow" ? "bg-[#9FBCCF]/30" : "bg-[#F8CE97]/30",
              )}
            ></div>
            <p className="text-sm text-center text-[#272727]/60 dark:text-[#F5FAFA]/60">looking for patterns...</p>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-4">
            {/* Original Message Display */}
            <div
              className={cn(
                "p-4 rounded-2xl border transition-colors duration-300",
                activePersona === "flow"
                  ? "bg-white/80 dark:bg-[#272727]/80 border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10"
                  : "bg-white/80 dark:bg-[#272727]/80 border-[#F8CE97]/20 dark:border-[#F5FAFA]/10",
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <MessageSquare
                    className={cn("h-4 w-4 mr-2", activePersona === "flow" ? "text-[#9FBCCF]" : "text-[#F8CE97]")}
                  />
                  <h3 className="text-sm font-medium">original message</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="p-3 rounded-xl bg-[#F5FAFA] dark:bg-[#333]">
                <p className="text-sm">
                  hey, sorry I've been mia lately. been crazy busy with work. we should definitely hang out soon though!
                </p>
              </div>
            </div>

            {/* Direct Insight */}
            <div
              className={cn(
                "p-4 rounded-2xl transition-colors duration-300",
                activePersona === "flow"
                  ? "bg-[#9FBCCF]/20 dark:bg-[#9FBCCF]/30"
                  : "bg-[#F8CE97]/20 dark:bg-[#F8CE97]/30",
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <h3 className="text-sm font-medium">soari's take</h3>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopyInsight}>
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-sm">
                {activePersona === "truth" ? analysisResult.directInsight.truth : analysisResult.directInsight.flow}
              </p>
            </div>

            {/* Interest Level */}
            <div
              className={cn(
                "p-4 rounded-2xl border transition-colors duration-300 cursor-pointer",
                expandedSections.interest ? "mb-2" : "",
                activePersona === "flow"
                  ? "bg-white/80 dark:bg-[#272727]/80 border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10"
                  : "bg-white/80 dark:bg-[#272727]/80 border-[#F8CE97]/20 dark:border-[#F5FAFA]/10",
              )}
              onClick={() => toggleSection("interest")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-[#B3A9C6]" />
                  <h3 className="text-sm font-medium">interest level</h3>
                </div>
                <div className="flex items-center">
                  <span
                    className={cn(
                      "text-xs mr-2",
                      analysisResult.interestLevel.score < 30
                        ? "text-[#E57373]"
                        : analysisResult.interestLevel.score < 60
                          ? "text-[#F8CE97]"
                          : "text-[#C9EDA8]",
                    )}
                  >
                    {analysisResult.interestLevel.label}
                  </span>
                  {expandedSections.interest ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>

              <div className="mt-2">
                <Progress
                  value={analysisResult.interestLevel.score}
                  className="h-1.5"
                  style={
                    {
                      backgroundColor: `${colors.blue}20`,
                      "--progress-color":
                        analysisResult.interestLevel.score < 30
                          ? colors.purple
                          : analysisResult.interestLevel.score < 60
                            ? colors.blue
                            : colors.green,
                    } as React.CSSProperties
                  }
                />
              </div>

              {expandedSections.interest && (
                <div className="mt-3 text-sm">
                  <p>{analysisResult.interestLevel.description}</p>
                </div>
              )}
            </div>

            {/* Tone Analysis */}
            <div
              className={cn(
                "p-4 rounded-2xl border transition-colors duration-300 cursor-pointer",
                expandedSections.tone ? "mb-2" : "",
                activePersona === "flow"
                  ? "bg-white/80 dark:bg-[#272727]/80 border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10"
                  : "bg-white/80 dark:bg-[#272727]/80 border-[#F8CE97]/20 dark:border-[#F5FAFA]/10",
              )}
              onClick={() => toggleSection("tone")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-[#9FBCCF]" />
                  <h3 className="text-sm font-medium">tone analysis</h3>
                </div>
                <div className="flex items-center">
                  <span className="text-xs mr-2">{analysisResult.toneAnalysis.label}</span>
                  {expandedSections.tone ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>

              <div className="mt-2">
                <Progress
                  value={analysisResult.toneAnalysis.score}
                  className="h-1.5"
                  style={
                    {
                      backgroundColor: `${colors.blue}20`,
                      "--progress-color": colors.blue,
                    } as React.CSSProperties
                  }
                />
              </div>

              {expandedSections.tone && (
                <div className="mt-3 text-sm">
                  <p>{analysisResult.toneAnalysis.description}</p>
                </div>
              )}
            </div>

            {/* Pattern Recognition */}
            <div
              className={cn(
                "p-4 rounded-2xl border transition-colors duration-300 cursor-pointer",
                expandedSections.patterns ? "mb-2" : "",
                activePersona === "flow"
                  ? "bg-white/80 dark:bg-[#272727]/80 border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10"
                  : "bg-white/80 dark:bg-[#272727]/80 border-[#F8CE97]/20 dark:border-[#F5FAFA]/10",
              )}
              onClick={() => toggleSection("patterns")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-[#F8CE97]" />
                  <h3 className="text-sm font-medium">pattern recognition</h3>
                </div>
                {expandedSections.patterns ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>

              {expandedSections.patterns && (
                <div className="mt-3 text-sm">
                  <p>{analysisResult.patternRecognition.description}</p>
                </div>
              )}
            </div>

            {/* Key Phrases */}
            <div
              className={cn(
                "p-4 rounded-2xl border transition-colors duration-300 cursor-pointer",
                expandedSections.phrases ? "mb-2" : "",
                activePersona === "flow"
                  ? "bg-white/80 dark:bg-[#272727]/80 border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10"
                  : "bg-white/80 dark:bg-[#272727]/80 border-[#F8CE97]/20 dark:border-[#F5FAFA]/10",
              )}
              onClick={() => toggleSection("phrases")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-[#9FBCCF]" />
                  <h3 className="text-sm font-medium">key phrases</h3>
                </div>
                {expandedSections.phrases ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>

              {expandedSections.phrases && (
                <div className="mt-3 space-y-2">
                  {analysisResult.keyPhrases.map((phrase, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-3 rounded-lg",
                        phrase.sentiment === "positive"
                          ? "bg-[#C9EDA8]/20 dark:bg-[#C9EDA8]/10"
                          : phrase.sentiment === "negative"
                            ? "bg-[#E57373]/20 dark:bg-[#E57373]/10"
                            : "bg-[#9FBCCF]/20 dark:bg-[#9FBCCF]/10",
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">"{phrase.text}"</p>
                      </div>
                      <p className="text-xs">{phrase.analysis}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Red & Green Flags */}
            <div
              className={cn(
                "p-4 rounded-2xl border transition-colors duration-300 cursor-pointer",
                expandedSections.flags ? "mb-2" : "",
                activePersona === "flow"
                  ? "bg-white/80 dark:bg-[#272727]/80 border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10"
                  : "bg-white/80 dark:bg-[#272727]/80 border-[#F8CE97]/20 dark:border-[#F5FAFA]/10",
              )}
              onClick={() => toggleSection("flags")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-[#E57373]" />
                  <h3 className="text-sm font-medium">red & green flags</h3>
                </div>
                {expandedSections.flags ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>

              {expandedSections.flags && (
                <div className="mt-3 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <AlertTriangle className="h-3.5 w-3.5 text-[#E57373] mr-1.5" />
                      <h4 className="text-xs font-medium">Red Flags</h4>
                    </div>
                    <ul className="space-y-1 pl-5 list-disc">
                      {analysisResult.redFlags.map((flag, index) => (
                        <li key={index} className="text-xs text-[#272727]/80 dark:text-[#F5FAFA]/80">
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center">
                      <CheckCircle className="h-3.5 w-3.5 text-[#C9EDA8] mr-1.5" />
                      <h4 className="text-xs font-medium">Green Flags</h4>
                    </div>
                    <ul className="space-y-1 pl-5 list-disc">
                      {analysisResult.greenFlags.map((flag, index) => (
                        <li key={index} className="text-xs text-[#272727]/80 dark:text-[#F5FAFA]/80">
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Guidance */}
            <div
              className={cn(
                "p-4 rounded-2xl border transition-colors duration-300 cursor-pointer",
                expandedSections.guidance ? "mb-2" : "",
                activePersona === "flow"
                  ? "bg-white/80 dark:bg-[#272727]/80 border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10"
                  : "bg-white/80 dark:bg-[#272727]/80 border-[#F8CE97]/20 dark:border-[#F5FAFA]/10",
              )}
              onClick={() => toggleSection("guidance")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Send className="h-4 w-4 mr-2 text-[#B3A9C6]" />
                  <h3 className="text-sm font-medium">response guidance</h3>
                </div>
                {expandedSections.guidance ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>

              {expandedSections.guidance && (
                <div className="mt-3 text-sm">
                  <p>{analysisResult.guidance}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setAnalysisResult(null)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                <span className="text-xs">New Decode</span>
              </Button>

              <Button
                className={cn(
                  "flex-1",
                  activePersona === "flow"
                    ? "bg-[#9FBCCF] hover:bg-[#9FBCCF]/90 text-white"
                    : "bg-[#F8CE97] hover:bg-[#F8CE97]/90 text-white",
                )}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                <span className="text-xs">Save Analysis</span>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
