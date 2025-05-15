"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Moon, Sun, Monitor } from "lucide-react"
import { SunsetThemeToggle } from "@/components/sunset-theme-toggle"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(true)
  const [dataCollection, setDataCollection] = useState(true)

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <Header title="Settings" />

      <div className="flex justify-end px-4 py-2">
        <SunsetThemeToggle />
      </div>

      <div className="flex-1 p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Appearance</h2>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => setTheme("light")}
            >
              <Sun className="h-8 w-8" />
              <span>Light</span>
            </Button>

            <Button
              variant={theme === "dark" ? "default" : "outline"}
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => setTheme("dark")}
            >
              <Moon className="h-8 w-8" />
              <span>Dark</span>
            </Button>

            <Button
              variant={theme === "system" ? "default" : "outline"}
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => setTheme("system")}
            >
              <Monitor className="h-8 w-8" />
              <span>System</span>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Notifications</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="flex flex-col">
                <span>Push Notifications</span>
                <span className="text-sm text-muted-foreground">Receive alerts about your situations</span>
              </Label>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-reports" className="flex flex-col">
                <span>Weekly Reports</span>
                <span className="text-sm text-muted-foreground">Get weekly summaries of your relationships</span>
              </Label>
              <Switch id="weekly-reports" checked={weeklyReports} onCheckedChange={setWeeklyReports} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Privacy</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="data-collection" className="flex flex-col">
                <span>Data Collection</span>
                <span className="text-sm text-muted-foreground">Allow Soari to analyze your messages for insights</span>
              </Label>
              <Switch id="data-collection" checked={dataCollection} onCheckedChange={setDataCollection} />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button variant="outline" className="w-full text-destructive">
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}
