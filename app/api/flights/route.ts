import { type NextRequest, NextResponse } from "next/server"
import { searchFlights } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const params = {
      from: searchParams.get("from") || undefined,
      to: searchParams.get("to") || undefined,
      departure_date: searchParams.get("departure_date") || undefined,
      return_date: searchParams.get("return_date") || undefined,
      passengers: Number.parseInt(searchParams.get("passengers") || "1"),
      class: searchParams.get("class") || "economy",
    }

    const flights = await searchFlights(params)

    return NextResponse.json({
      success: true,
      data: flights,
      count: flights.length,
    })
  } catch (error) {
    console.error("Flight search error:", error)
    return NextResponse.json({ success: false, error: "Failed to search flights" }, { status: 500 })
  }
}
