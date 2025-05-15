"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Settings, Edit, Bell, Shield, Moon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [user] = useState({
    name: "Jamie Smith",
    username: "@jamiesmith",
    joinDate: "May 2025",
    situationsCount: 3,
    insightsCount: 24,
  })

  const menuItems = [
    {
      icon: Settings,
      label: "Settings",
      description: "App preferences, notifications",
      onClick: () => router.push("/settings"),
    },
    {
      icon: Edit,
      label: "Edit Profile",
      description: "Change name, photo, bio",
      onClick: () => {},
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage alerts and reminders",
      onClick: () => {},
    },
    {
      icon: Shield,
      label: "Privacy",
      description: "Control your data and visibility",
      onClick: () => {},
    },
    {
      icon: Moon,
      label: "Appearance",
      description: "Dark mode, theme settings",
      onClick: () => router.push("/settings"),
    },
  ]

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <Header title="Profile" showBackButton={false} />

      <div className="flex-1 p-4 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/abstract-profile-avatar.png" alt={user.name} />
            <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.username}</p>
            <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
          </div>

          <div className="flex gap-6 pt-2">
            <div className="text-center">
              <p className="text-xl font-semibold">{user.situationsCount}</p>
              <p className="text-xs text-muted-foreground">Situations</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold">{user.insightsCount}</p>
              <p className="text-xs text-muted-foreground">Insights</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <Card key={item.label} className="overflow-hidden">
              <CardContent className="p-0">
                <Button variant="ghost" className="w-full justify-start p-4 h-auto" onClick={item.onClick}>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
