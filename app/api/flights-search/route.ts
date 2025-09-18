import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

function convertUSDToINR(usdPrice: string | number): { usd: number; inr: number; inrFormatted: string } {
  const exchangeRate = 83.5 // Current USD to INR rate

  let numericPrice: number

  if (typeof usdPrice === "string") {
    // Remove currency symbols and extract number
    const cleanPrice = usdPrice.toLowerCase().replace(/[$₹,\s]/g, "")
    numericPrice = Number.parseFloat(cleanPrice) || 0
  } else {
    numericPrice = usdPrice || 0
  }

  const inrPrice = Math.round(numericPrice * exchangeRate)

  return {
    usd: numericPrice,
    inr: inrPrice,
    inrFormatted: `₹${inrPrice.toLocaleString("en-IN")}`,
  }
}

export async function POST(request: NextRequest) {
  try {
    const searchData = await request.json()
    console.log("[v0] Flight search request:", searchData)

    const prompt = `You are a flight search expert. Generate ONLY realistic flight options for the EXACT route requested.

SEARCH CRITERIA:
From: ${searchData.from}
To: ${searchData.to}
Departure Date: ${searchData.departureDate}
Return Date: ${searchData.returnDate || "One-way"}
Passengers: ${searchData.passengers}
Class: ${searchData.class}

IMPORTANT RULES:
1. ONLY generate flights that go from "${searchData.from}" to "${searchData.to}"
2. For domestic routes (within same country), prioritize domestic airlines and direct flights
3. For international routes, include realistic connecting flights through major hubs
4. Do NOT include flights that go to unrelated destinations
5. Use appropriate airport codes for the cities mentioned
6. Price flights realistically based on route distance and class

Generate 6-8 realistic flight options with:
- Airlines that actually operate on this route
- Realistic flight numbers and times
- Accurate flight duration based on actual distance
- Realistic pricing in USD for this specific route
- Direct flights when available, connecting flights through logical hubs only
- Proper aircraft types for the route distance

For domestic Indian routes (like Delhi-Mumbai, Kolkata-Mumbai, etc.):
- Use Indian airlines: IndiGo, SpiceJet, Air India, Vistara, GoAir
- Mostly direct flights (2-3 hours for major routes)
- Prices: Economy $80-200, Business $200-400

For international routes:
- Include major international airlines with realistic connections
- Connecting flights through logical hubs (Dubai for Middle East, Singapore for Asia, etc.)

Return ONLY a JSON array with this exact structure:
[
  {
    "id": "flight-1",
    "airline": {
      "name": "IndiGo",
      "code": "6E",
      "logo": "/airline-logos/indigo.png"
    },
    "flightNumber": "6E123",
    "departure": {
      "airport": "CCU",
      "city": "${searchData.from}",
      "time": "08:30",
      "date": "${searchData.departureDate}"
    },
    "arrival": {
      "airport": "BOM",
      "city": "${searchData.to}",
      "time": "11:00",
      "date": "${searchData.departureDate}"
    },
    "duration": "2h 30m",
    "stops": 0,
    "stopCities": [],
    "priceUSD": 120,
    "class": "${searchData.class}",
    "baggage": "1 carry-on, 1 checked bag",
    "amenities": ["WiFi", "Entertainment", "Meals"],
    "aircraft": "Airbus A320"
  }
]

Focus on accuracy and relevance to the specific route requested.`

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: prompt,
      maxTokens: 4000,
    })

    console.log("[v0] AI response:", text)

    // Parse the AI response
    let flights
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error("No JSON array found in response")
      }

      flights = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error("[v0] JSON parsing error:", parseError)
      throw new Error("Failed to parse flight data")
    }

    const flightsWithINR = flights.map((flight: any) => {
      const priceConversion = convertUSDToINR(flight.priceUSD)

      return {
        ...flight,
        price: priceConversion.inr, // Main price in INR
        priceUSD: priceConversion.usd,
        priceINR: priceConversion.inr,
        priceFormatted: priceConversion.inrFormatted,
        currency: "INR",
      }
    })

    console.log("[v0] Flights with INR conversion:", flightsWithINR.length)

    return NextResponse.json({
      success: true,
      flights: flightsWithINR,
      count: flightsWithINR.length,
      searchData,
    })
  } catch (error) {
    console.error("[v0] Flight search error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to search flights",
        flights: [],
      },
      { status: 500 },
    )
  }
}
