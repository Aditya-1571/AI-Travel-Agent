import { type NextRequest, NextResponse } from "next/server"
import { searchHotels } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const params = {
      location: searchParams.get("location") || undefined,
      checkin: searchParams.get("checkin") || undefined,
      checkout: searchParams.get("checkout") || undefined,
      guests: Number.parseInt(searchParams.get("guests") || "2"),
      rooms: Number.parseInt(searchParams.get("rooms") || "1"),
    }

    const hotels = await searchHotels(params)

    return NextResponse.json({
      success: true,
      data: hotels,
      count: hotels.length,
    })
  } catch (error) {
    console.error("Hotel search error:", error)
    return NextResponse.json({ success: false, error: "Failed to search hotels" }, { status: 500 })
  }
}
