"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SunsetThemeToggle } from "@/components/sunset-theme-toggle"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeDemo() {
  const { theme, setTheme } = useTheme()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Theme Settings
          <SunsetThemeToggle />
        </CardTitle>
        <CardDescription>Choose your preferred appearance</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Current theme: {theme}</p>
        <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          Toggle
        </Button>
      </CardFooter>
    </Card>
  )
}
