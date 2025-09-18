import { type NextRequest, NextResponse } from "next/server"
import { searchPlaces } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const params = {
      location: searchParams.get("location") || undefined,
      category: searchParams.get("category") || undefined,
    }

    const places = await searchPlaces(params)

    return NextResponse.json({
      success: true,
      data: places,
      count: places.length,
    })
  } catch (error) {
    console.error("Places search error:", error)
    return NextResponse.json({ success: false, error: "Failed to search places" }, { status: 500 })
  }
}
