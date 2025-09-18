import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

// Currency conversion rate (USD to INR)
const USD_TO_INR = 83.5

function convertUSDToINR(usdPrice: string | number): string {
  // Convert to string if it's a number
  const priceStr = String(usdPrice)

  if (priceStr.toLowerCase() === "free" || priceStr === "0") return "Free"

  const numericPrice = Number.parseFloat(priceStr.replace(/[^0-9.]/g, ""))
  if (isNaN(numericPrice)) return priceStr

  const inrPrice = Math.round(numericPrice * USD_TO_INR)
  return `₹${inrPrice.toLocaleString()}`
}

export async function POST(request: NextRequest) {
  try {
    const { destination, category, duration, budget } = await request.json()

    if (!destination) {
      return NextResponse.json({ error: "Destination is required" }, { status: 400 })
    }

    const prompt = `Generate 5-8 realistic places to visit in ${destination}${category ? ` in the ${category} category` : ""}. 
    
    For each place, provide:
    - name: Real place name
    - category: Type of attraction
    - rating: Realistic rating (4.0-4.9)
    - reviews: Number of reviews (1000-50000)
    - priceUSD: Entry price in USD (or "Free")
    - duration: Time needed to visit
    - address: Real street address
    - description: 2-3 sentence description
    - openingHours: Realistic opening hours
    - features: Array of 3-4 features/amenities
    - highlights: Array of 3-4 main attractions
    - bestTimeToVisit: Best time recommendation
    - howToGet: Transportation information
    - imageDescription: Detailed description for generating a realistic photo of this place (architecture, landscape, activities, atmosphere)
    
    Budget context: ${budget || "any budget"}
    Duration preference: ${duration || "any duration"}
    
    Return as valid JSON array with these exact field names. Make sure all places are real and exist in ${destination}.`

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
      temperature: 0.7,
    })

    let places = []
    try {
      // Extract JSON from the AI response
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        places = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No valid JSON found in response")
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      // Fallback to sample data if AI parsing fails
      places = [
        {
          name: `Popular Attraction in ${destination}`,
          category: category || "Attraction",
          rating: 4.5,
          reviews: 12500,
          priceUSD: "$15",
          duration: "2-3 hours",
          address: `Main Street, ${destination}`,
          description: `A must-visit attraction in ${destination} offering great experiences for visitors.`,
          openingHours: "9:00 AM - 6:00 PM",
          features: ["Guided Tours", "Photography Allowed", "Gift Shop"],
          highlights: ["Scenic Views", "Historical Significance", "Cultural Experience"],
          bestTimeToVisit: "Morning hours for fewer crowds",
          howToGet: "Accessible by public transport",
          imageDescription: "A detailed description for generating a realistic photo of this place.",
        },
      ]
    }

    const processedPlaces = places.map((place: any, index: number) => ({
      ...place,
      id: index + 1,
      priceINR: convertUSDToINR(place.priceUSD || "Free"),
      // Generate actual images based on place description
      image: `/images/places/${encodeURIComponent(place.name.toLowerCase().replace(/\s+/g, "-"))}.jpg`,
      bookingUrl: `https://www.google.com/search?q=${encodeURIComponent(place.name + " " + destination + " booking")}`,
      coordinates: { lat: 0, lng: 0 }, // Would be populated with real coordinates in production
    }))

    return NextResponse.json({
      places: processedPlaces,
      searchParams: { destination, category, duration, budget },
    })
  } catch (error) {
    console.error("Places search error:", error)
    return NextResponse.json({ error: "Failed to search places" }, { status: 500 })
  }
}
