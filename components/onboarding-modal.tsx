import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Ghost, Sparkles, MessageCircle, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface OnboardingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const steps = [
  {
    id: "splash",
    title: "Welcome to Soari",
    showProgress: false,
  },
  {
    id: "welcome",
    title: "your cheat code to clarity",
    description: "track your situationships, decode messages, and get personalized advice",
    showProgress: true,
  },
  {
    id: "user-info",
    title: "let's lock in",
    description: "we'll keep your info private",
    showProgress: true,
  },
  {
    id: "password",
    title: "secure your vibe",
    description: "create a strong password to protect your account",
    showProgress: true,
  },
  {
    id: "profile",
    title: "drop your aesthetic",
    description: "make your profile uniquely you",
    showProgress: true,
  },
  {
    id: "subscription",
    title: "clarity level",
    subtitle: "all plans slap with a 7-day free trial, no cap",
    showProgress: true,
  },
  {
    id: "confirmation",
    title: "bag secured",
    showProgress: false,
  },
]

const planFeatures = {
  "rent-free": [
    "3 active situations",
    "Basic ghost meter",
    "Standard Soari chat",
    "Basic insights",
  ],
  "main-character": [
    "10 active situations",
    "Advanced ghost meter",
    "Priority Soari chat",
    "Date night suggestions",
    "Detailed insights",
    "Custom themes",
    "Priority support",
  ],
}

export function OnboardingModal({ open, onOpenChange }: OnboardingModalProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    plan: "rent-free",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [usernameError, setUsernameError] = useState("")

  useEffect(() => {
    if (open) {
      setCurrentStep(0)
      setFormData({
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        plan: "rent-free",
      })
    }
  }, [open])

  useEffect(() => {
    if (currentStep === 0 && open) {
      const timer = setTimeout(() => {
        setCurrentStep(1)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, open])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/dashboard")
      onOpenChange(false)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    setPasswordStrength(strength)
  }

  const validateUsername = (username: string) => {
    if (username.length > 8) {
      setUsernameError("Username must be 8 characters or less")
      return false
    }
    if (/[^a-zA-Z0-9]/.test(username)) {
      setUsernameError("Only letters and numbers allowed")
      return false
    }
    setUsernameError("")
    return true
  }

  const getStepContent = () => {
    switch (steps[currentStep].id) {
      case "splash":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src="/placeholder-logo.svg"
              alt="Soari"
              className="w-16 h-16 mb-4"
            />
          </div>
        )

      case "welcome":
        return (
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-medium">{steps[currentStep].title}</h2>
              <p className="text-sm text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
              <h3 className="text-sm font-medium mb-2">Features</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#9FBCCF]" />
                  <span>Track response patterns with Ghost Meter</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#B3A9C6]" />
                  <span>Get personalized advice from Soari AI</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#C9EDA8]" />
                  <span>Manage multiple situations effortlessly</span>
                </li>
              </ul>
            </div>
          </div>
        )

      case "user-info":
        return (
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-medium">{steps[currentStep].title}</h2>
              <p className="text-sm text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </div>

            <div className="space-y-3">
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="placeholder:text-muted-foreground/70"
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="placeholder:text-muted-foreground/70"
              />
            </div>
          </div>
        )

      case "password":
        return (
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-medium">{steps[currentStep].title}</h2>
              <p className="text-sm text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value })
                      updatePasswordStrength(e.target.value)
                    }}
                    className="pl-10 placeholder:text-muted-foreground/70"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Progress value={passwordStrength} className="h-1" />
                <p className="text-xs text-muted-foreground">
                  Password strength:{" "}
                  {passwordStrength === 100
                    ? "Strong"
                    : passwordStrength >= 50
                    ? "Medium"
                    : "Weak"}
                </p>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="pl-10 placeholder:text-muted-foreground/70"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )

      case "profile":
        return (
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-medium">{steps[currentStep].title}</h2>
              <p className="text-sm text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5 flex items-center justify-center text-muted-foreground/70">
                  tap to upload
                </div>
              </div>
              <div className="space-y-1">
                <Input
                  placeholder="@username"
                  value={formData.username}
                  onChange={(e) => {
                    const value = e.target.value.replace("@", "")
                    if (validateUsername(value)) {
                      setFormData({ ...formData, username: value })
                    }
                  }}
                  className="placeholder:text-muted-foreground/70"
                />
                {usernameError && (
                  <p className="text-xs text-[#E57373]">{usernameError}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  8 characters max, letters and numbers only
                </p>
              </div>
            </div>
          </div>
        )

      case "subscription":
        return (
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-medium">{steps[currentStep].title}</h2>
              <p className="text-sm text-muted-foreground">
                {steps[currentStep].subtitle}
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className={`w-full justify-between h-auto p-4 rounded-xl ${
                  formData.plan === "rent-free" ? "ring-2 ring-[#9FBCCF]" : ""
                }`}
                onClick={() => setFormData({ ...formData, plan: "rent-free" })}
              >
                <div className="text-left flex-1">
                  <div className="font-medium mb-2">Rent Free</div>
                  <div className="text-2xl font-bold mb-3">$0/mo</div>
                  <div className="space-y-2">
                    {planFeatures["rent-free"].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-left">
                        <Ghost className="h-4 w-4 text-[#9FBCCF]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className={`w-full justify-between h-auto p-4 rounded-xl ${
                  formData.plan === "main-character" ? "ring-2 ring-[#B3A9C6]" : ""
                }`}
                onClick={() => setFormData({ ...formData, plan: "main-character" })}
              >
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="font-medium">Main Character</div>
                    <Badge className="bg-[#B3A9C6]/20 text-[#B3A9C6]">Popular</Badge>
                  </div>
                  <div className="text-2xl font-bold mb-3">$9.99/mo</div>
                  <div className="space-y-2">
                    {planFeatures["main-character"].map((feature, index) => {
                      let icon
                      if (feature.includes("ghost")) icon = Ghost
                      else if (feature.includes("chat")) icon = MessageCircle
                      else if (feature.includes("date")) icon = Calendar
                      else if (feature.includes("insights")) icon = Sparkles
                      else icon = Star

                      const Icon = icon
                      return (
                        <div key={index} className="flex items-center gap-2 text-sm text-left">
                          <Icon className="h-4 w-4 text-[#B3A9C6]" />
                          <span>{feature}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Button>
            </div>
          </div>
        )

      case "confirmation":
        return (
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-medium">{steps[currentStep].title}</h2>
              <p className="text-sm text-muted-foreground">
                {formData.plan === "rent-free"
                  ? "rent free is crazy but we ain't judging you"
                  : "you're about to be the main character"}
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const progress = ((currentStep + 1) / (steps.length - 2)) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[360px] p-0 gap-0 bg-background/95 backdrop-blur-xl rounded-xl border-0">
        <DialogTitle className="sr-only">{steps[currentStep].title}</DialogTitle>
        {steps[currentStep].showProgress && (
          <div className="px-4 pt-4 pb-2">
            <Progress value={progress} className="h-1" />
          </div>
        )}

        <div className="p-4">{getStepContent()}</div>

        {currentStep > 0 && currentStep < steps.length - 1 && (
          <div className="p-4 pt-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-[#C9EDA8]/10 hover:bg-[#C9EDA8]/20 text-[#C9EDA8] rounded-xl"
                onClick={handleBack}
              >
                oh wait!
              </Button>
              <Button
                className="flex-1 bg-[#C9EDA8] hover:bg-[#C9EDA8]/90 text-[#272727] rounded-xl"
                onClick={handleNext}
              >
                next
              </Button>
            </div>
          </div>
        )}

        {currentStep === steps.length - 1 && (
          <div className="p-4 pt-2">
            <Button
              className="w-full bg-[#C9EDA8] hover:bg-[#C9EDA8]/90 text-[#272727] rounded-xl"
              onClick={handleNext}
            >
              let's gooo!
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}