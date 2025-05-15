"use client"

import { useRouter } from "next/navigation"
import { BarChart3, Ghost, Info, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { colors } from "@/lib/colors"

export default function GhostInsightsPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-[#F5FAFA] dark:bg-[#272727] text-[#272727] dark:text-[#F5FAFA]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-[#9FBCCF]/10 dark:border-[#F5FAFA]/10 bg-white/80 dark:bg-[#272727]/80 backdrop-blur-lg">
        <h1 className="text-xl font-light">ghost insights</h1>
      </header>

      <main className="flex-1 p-4 space-y-4">
        <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Ghost className="h-4 w-4 mr-2 text-[#9FBCCF]" />
              Ghost Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active situations</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Potential ghosting</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Likely ghosted</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average ghost score</span>
                <span className="font-medium">50/100</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-[#B3A9C6]" />
              Ghost Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-40 w-full bg-[#9FBCCF]/5 dark:bg-[#9FBCCF]/2 rounded-md relative">
                {/* This would be a chart in a real app */}
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full h-full flex items-end">
                    <div className="flex-1 flex items-end justify-center">
                      <div className="w-4/5 bg-[#9FBCCF] rounded-t-sm" style={{ height: "30%" }}></div>
                    </div>
                    <div className="flex-1 flex items-end justify-center">
                      <div className="w-4/5 bg-[#9FBCCF] rounded-t-sm" style={{ height: "45%" }}></div>
                    </div>
                    <div className="flex-1 flex items-end justify-center">
                      <div className="w-4/5 bg-[#9FBCCF] rounded-t-sm" style={{ height: "60%" }}></div>
                    </div>
                    <div className="flex-1 flex items-end justify-center">
                      <div className="w-4/5 bg-[#9FBCCF] rounded-t-sm" style={{ height: "75%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-around text-[10px] text-[#272727]/60 dark:text-[#F5FAFA]/60 p-1">
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                </div>
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between items-start text-[10px] text-[#272727]/60 dark:text-[#F5FAFA]/60 p-1">
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>
                </div>
              </div>
              <p className="text-xs text-[#272727]/70 dark:text-[#F5FAFA]/70">
                Your average ghost score has increased by 15 points in the last month.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Info className="h-4 w-4 mr-2 text-[#C9EDA8]" />
              Ghost Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-[#9FBCCF]/10 dark:bg-[#9FBCCF]/5 rounded-lg">
                <h4 className="text-sm font-medium mb-1">Common Ghosting Days</h4>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                    <div
                      key={i}
                      className={`py-1 rounded-md text-xs ${
                        i === 4 || i === 5
                          ? "bg-[#B3A9C6]/30 text-[#B3A9C6]"
                          : "bg-[#9FBCCF]/10 text-[#272727]/70 dark:text-[#F5FAFA]/70"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-2 text-[#272727]/70 dark:text-[#F5FAFA]/70">
                  You're most likely to be ghosted on Friday and Saturday.
                </p>
              </div>

              <div className="p-3 bg-[#B3A9C6]/10 dark:bg-[#B3A9C6]/5 rounded-lg">
                <h4 className="text-sm font-medium mb-1">Average Ghosting Duration</h4>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-[#B3A9C6]" />
                  <span className="text-base font-medium">7.5 days</span>
                </div>
                <p className="text-xs mt-2 text-[#272727]/70 dark:text-[#F5FAFA]/70">
                  When someone ghosts you, they typically return after about a week.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-[#272727]/80 backdrop-blur-md border-[#9FBCCF]/20 dark:border-[#F5FAFA]/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Ghost className="h-4 w-4 mr-2 text-[#9FBCCF]" />
              Ghost Risk Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.green}10`, color: colors.green }}>
                <h4 className="text-sm font-medium mb-1">Low Risk</h4>
                <div className="flex justify-between items-center">
                  <span className="text-xs">taylor</span>
                  <Badge className="text-xs" style={{ backgroundColor: `${colors.green}20`, color: colors.green }}>
                    15/100
                  </Badge>
                </div>
              </div>

              <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.blue}10`, color: colors.blue }}>
                <h4 className="text-sm font-medium mb-1">Medium Risk</h4>
                <div className="flex justify-between items-center">
                  <span className="text-xs">rob</span>
                  <Badge className="text-xs" style={{ backgroundColor: `${colors.blue}20`, color: colors.blue }}>
                    60/100
                  </Badge>
                </div>
              </div>

              <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.purple}10`, color: colors.purple }}>
                <h4 className="text-sm font-medium mb-1">High Risk</h4>
                <div className="flex justify-between items-center">
                  <span className="text-xs">alex</span>
                  <Badge className="text-xs" style={{ backgroundColor: `${colors.purple}20`, color: colors.purple }}>
                    75/100
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
