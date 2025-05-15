import { NextResponse } from "next/server"

export async function GET() {
  // TODO: In the future, this would check the user's actual subscription status
  // For now, return a default tier
  return NextResponse.json({
    tier: "rent-free"
  })
}