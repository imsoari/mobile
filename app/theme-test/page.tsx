"use client"

import { Header } from "@/components/header"
import { ThemeDemo } from "@/components/theme-demo"
import { SunsetThemeToggle, SimpleSunsetThemeToggle } from "@/components/sunset-theme-toggle"

export default function ThemeTestPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Theme Test" />

      <main className="flex-1 p-4 space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Theme Toggles</h2>

          <div className="flex flex-col space-y-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">Dropdown Toggle</h3>
              <div className="flex justify-center">
                <SunsetThemeToggle />
              </div>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">Simple Toggle</h3>
              <div className="flex justify-center">
                <SimpleSunsetThemeToggle />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Theme Demo</h2>
          <ThemeDemo />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Color Samples</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-background border rounded-lg">Background</div>
            <div className="p-4 bg-foreground text-background border rounded-lg">Foreground</div>
            <div className="p-4 bg-card border rounded-lg">Card</div>
            <div className="p-4 bg-card-foreground text-background border rounded-lg">Card Foreground</div>
            <div className="p-4 bg-primary text-primary-foreground border rounded-lg">Primary</div>
            <div className="p-4 bg-secondary text-secondary-foreground border rounded-lg">Secondary</div>
            <div className="p-4 bg-accent text-accent-foreground border rounded-lg">Accent</div>
            <div className="p-4 bg-muted text-muted-foreground border rounded-lg">Muted</div>
          </div>
        </section>
      </main>
    </div>
  )
}
