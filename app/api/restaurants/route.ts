import { type NextRequest, NextResponse } from "next/server"
import { searchRestaurants } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const params = {
      location: searchParams.get("location") || undefined,
      cuisine: searchParams.get("cuisine") || undefined,
      price_range: searchParams.get("price_range") || undefined,
    }

    const restaurants = await searchRestaurants(params)

    return NextResponse.json({
      success: true,
      data: restaurants,
      count: restaurants.length,
    })
  } catch (error) {
    console.error("Restaurant search error:", error)
    return NextResponse.json({ success: false, error: "Failed to search restaurants" }, { status: 500 })
  }
}
