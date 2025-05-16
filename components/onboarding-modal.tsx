import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Sparkles, Lock, User, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { colors } from "@/lib/colors"

interface OnboardingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const steps = [
  {
    id: "splash",
    title: "",
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
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Reset to first step when modal is opened
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

  // Auto-advance splash screen
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

  const getStepContent = () => {
    switch (steps[currentStep].id) {
      case "splash":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src="/placeholder-logo.svg"
              alt="Soari"
              className="w-24 h-24 mb-4"
            />
          </div>
        )

      case "welcome":
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#C9EDA8]" />
              <h2 className="text-2xl font-medium">{steps[currentStep].title}</h2>
              <p className="text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5">
                <h3 className="font-medium mb-2">Features</h3>
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
          </div>
        )

      case "user-info":
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <User className="w-12 h-12 mx-auto mb-4 text-[#9FBCCF]" />
              <h2 className="text-2xl font-medium">{steps[currentStep].title}</h2>
              <p className="text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )

      case "password":
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-[#B3A9C6]" />
              <h2 className="text-2xl font-medium">{steps[currentStep].title}</h2>
              <p className="text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value })
                      updatePasswordStrength(e.target.value)
                    }}
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
              <div className="space-y-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )

      case "profile":
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <Camera className="w-12 h-12 mx-auto mb-4 text-[#C9EDA8]" />
              <h2 className="text-2xl font-medium">{steps[currentStep].title}</h2>
              <p className="text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
                <Button variant="outline">Upload Photo</Button>
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )

      case "subscription":
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#F8CE97]" />
              <h2 className="text-2xl font-medium">{steps[currentStep].title}</h2>
              <p className="text-muted-foreground">
                {steps[currentStep].subtitle}
              </p>
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-between h-auto p-4"
                onClick={() => setFormData({ ...formData, plan: "rent-free" })}
              >
                <div className="text-left">
                  <div className="font-medium">Rent Free</div>
                  <div className="text-sm text-muted-foreground">$0/month</div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    formData.plan === "rent-free"
                      ? "bg-[#C9EDA8] border-[#C9EDA8]"
                      : "border-muted"
                  }`}
                />
              </Button>

              <Button
                variant="outline"
                className="w-full justify-between h-auto p-4"
                onClick={() => setFormData({ ...formData, plan: "main-character" })}
              >
                <div className="text-left">
                  <div className="font-medium">Main Character</div>
                  <div className="text-sm text-muted-foreground">
                    $9.99/month
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    formData.plan === "main-character"
                      ? "bg-[#C9EDA8] border-[#C9EDA8]"
                      : "border-muted"
                  }`}
                />
              </Button>
            </div>
          </div>
        )

      case "confirmation":
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-[#C9EDA8]" />
              <h2 className="text-2xl font-medium">{steps[currentStep].title}</h2>
              <p className="text-muted-foreground">
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
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 bg-background/95 backdrop-blur-xl">
        {steps[currentStep].showProgress && (
          <div className="px-6 pt-6 pb-2">
            <Progress value={progress} className="h-1" />
          </div>
        )}

        <div className="p-6">{getStepContent()}</div>

        {currentStep > 0 && currentStep < steps.length - 1 && (
          <div className="p-6 pt-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-[#C9EDA8]/10 hover:bg-[#C9EDA8]/20 text-[#C9EDA8]"
                onClick={handleBack}
              >
                oh wait!
              </Button>
              <Button
                className="flex-1 bg-[#C9EDA8] hover:bg-[#C9EDA8]/90 text-[#272727]"
                onClick={handleNext}
              >
                next
              </Button>
            </div>
          </div>
        )}

        {currentStep === steps.length - 1 && (
          <div className="p-6 pt-2">
            <Button
              className="w-full bg-[#C9EDA8] hover:bg-[#C9EDA8]/90 text-[#272727]"
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