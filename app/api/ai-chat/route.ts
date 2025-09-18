import { type NextRequest, NextResponse } from "next/server"
import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const groqApiKey = process.env.GROQ_API_KEY

    let text: string

    if (!groqApiKey) {
      console.log("[v0] Groq API not available, using mock chat response")
      // Provide intelligent mock responses based on the user's message
      text = generateMockResponse(message)
    } else {
      try {
        // Generate AI response using Groq
        const result = await generateText({
          model: groq("llama-3.3-70b-versatile"),
          prompt: `
            You are an expert AI Travel Assistant. Respond to this travel-related question or request:
            "${message}"
            
            Guidelines:
            - Be helpful, friendly, and knowledgeable about travel
            - Provide specific, actionable advice when possible
            - If asked about destinations, include practical information like best time to visit, budget considerations, and key attractions
            - If asked about flights, hotels, or restaurants, provide realistic recommendations
            - Keep responses conversational but informative
            - If the question isn't travel-related, politely redirect to travel topics
            - Limit responses to 2-3 paragraphs maximum
            
            Respond naturally as a travel expert would.
          `,
        })
        text = result.text
      } catch (error) {
        console.log("[v0] Groq API error, falling back to mock response:", error)
        text = generateMockResponse(message)
      }
    }

    // Generate contextual suggestions based on the response
    const suggestions = generateSuggestions(message, text)

    // Generate recommendations if the response warrants them
    const recommendations = generateRecommendations(message, text)

    return NextResponse.json({
      response: text,
      suggestions,
      recommendations,
    })
  } catch (error) {
    console.error("AI Chat Error:", error)
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 })
  }
}

function generateMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("japan")) {
    return "Japan is an incredible destination! For a first visit, I'd recommend the Golden Route: Tokyo (3-4 days), Kyoto (2-3 days), and Osaka (1-2 days). **Best time to visit:** Spring (March-May) for cherry blossoms or autumn (September-November) for fall colors. **Budget:** $150-250/day for mid-range travel. **Must-visit places:** Senso-ji Temple in Asakusa, Fushimi Inari Shrine in Kyoto, Osaka Castle, and the bamboo groves of Arashiyama. Don't miss trying authentic ramen in Ichiran, kaiseki dining in Kyoto, and experiencing a traditional ryokan!"
  }

  if (lowerMessage.includes("paris")) {
    return "Paris is magical year-round! I'd suggest 4-5 days minimum. **Best neighborhoods:** Le Marais (historic charm), Saint-Germain (elegant cafés), or Montmartre (artistic vibe). **Must-see:** Louvre Museum (book timed entry), Eiffel Tower at sunset, Notre-Dame Cathedral area, and a Seine river cruise. **Local tips:** Visit Sainte-Chapelle for stunning stained glass, explore covered passages like Galerie Vivienne, and dine at traditional bistros in the 11th arrondissement. Budget €120-180/day for comfortable travel."
  }

  if (lowerMessage.includes("italy")) {
    return "Italy offers incredible diversity! **Classic route:** Rome (3 days for Colosseum, Vatican, Trevi Fountain), Florence (2 days for Uffizi, Duomo, Ponte Vecchio), Venice (2 days for St. Mark's Square, Doge's Palace, gondola rides). **Best time:** April-May or September-October for perfect weather. **Food highlights:** Carbonara in Rome, Bistecca alla Fiorentina in Florence, fresh seafood in Venice. **Pro tip:** Book skip-the-line tickets for major attractions and always make dinner reservations!"
  }

  if (lowerMessage.includes("budget") || lowerMessage.includes("cheap")) {
    return "**Top budget destinations:** Thailand ($30-50/day) - try Bangkok's street food and Chiang Mai's temples. Vietnam ($25-40/day) - explore Hanoi's Old Quarter and Ha Long Bay. Czech Republic ($40-60/day) - Prague's stunning architecture and affordable beer. **Money-saving tips:** Travel during shoulder seasons, stay in hostels or guesthouses, eat at local markets, use public transport, and book flights 2-3 months ahead using Skyscanner or Google Flights."
  }

  if (lowerMessage.includes("beach") || lowerMessage.includes("tropical")) {
    return "**Top beach destinations:** Bali, Indonesia - Seminyak for luxury, Canggu for surfing, Ubud for culture ($40-80/day). Maldives - overwater bungalows at resorts like Conrad Maldives or Four Seasons ($500-2000/night). Costa Rica - Manuel Antonio for wildlife, Tamarindo for surfing ($60-120/day). **Best time:** Bali (April-October), Maldives (November-April), Costa Rica (December-April). Always pack reef-safe sunscreen and water shoes!"
  }

  if (lowerMessage.includes("flight") || lowerMessage.includes("fly")) {
    return "For the best flight deals, book domestic flights 1-3 months ahead and international flights 2-8 months in advance. Tuesday and Wednesday departures are often cheaper. Use flexible date searches and consider nearby airports. Clear your browser cookies between searches, and consider booking one-way tickets separately for better deals!"
  }

  if (lowerMessage.includes("hotel") || lowerMessage.includes("accommodation")) {
    return "For accommodations, book directly with hotels for potential upgrades and better cancellation policies. Read recent reviews on multiple platforms. Consider location over luxury - being walkable to attractions saves time and money. Boutique hotels often offer more character than chains, and don't overlook vacation rentals for longer stays!"
  }

  // General travel advice
  if (lowerMessage.includes("first time") || lowerMessage.includes("beginner")) {
    return "For first-time international travel, start with English-speaking countries or popular tourist destinations with good infrastructure. Always notify your bank of travel plans, get travel insurance, and keep digital copies of important documents. Pack light - you can buy almost anything you need at your destination!"
  }

  if (lowerMessage.includes("solo") || lowerMessage.includes("alone")) {
    return "Solo travel is incredibly rewarding! Start with safe, tourist-friendly destinations like New Zealand, Japan, or Scandinavia. Stay in social accommodations like hostels to meet people. Trust your instincts, share your itinerary with someone at home, and don't be afraid to join group tours or activities to meet fellow travelers!"
  }

  // Default response for general queries
  return "I'd be happy to help you plan your trip! Whether you're looking for destination recommendations, travel tips, or help with bookings, I'm here to assist. What specific aspect of travel planning can I help you with today? Are you thinking about a particular destination, budget range, or type of experience?"
}

function generateSuggestions(userMessage: string, aiResponse: string): string[] {
  const lowerMessage = userMessage.toLowerCase()
  const lowerResponse = aiResponse.toLowerCase()

  // Generate contextual suggestions based on the conversation
  if (lowerMessage.includes("japan") || lowerResponse.includes("japan")) {
    return [
      "Show me a 10-day Japan itinerary",
      "Find traditional ryokans",
      "What's the best time to see cherry blossoms?",
      "Recommend Japanese restaurants",
    ]
  }

  if (lowerMessage.includes("paris") || lowerResponse.includes("paris")) {
    return [
      "Create a 5-day Paris itinerary",
      "Find romantic restaurants",
      "Show me museum passes",
      "Best neighborhoods to stay",
    ]
  }

  if (lowerMessage.includes("italy") || lowerResponse.includes("italy")) {
    return [
      "Create a 7-day Italy itinerary",
      "Find budget-friendly accommodations",
      "Best time to visit historical sites",
      "Recommend local Italian cuisine",
    ]
  }

  if (lowerMessage.includes("budget") || lowerMessage.includes("cheap")) {
    return [
      "Show me budget destinations in Asia",
      "Find hostels and budget hotels",
      "When is the cheapest time to fly?",
      "Create a $1000 Europe trip",
    ]
  }

  if (lowerMessage.includes("beach") || lowerMessage.includes("tropical")) {
    return [
      "Find tropical beach destinations",
      "Recommend beach resorts",
      "Best time for beach vacations",
      "Water sports and activities",
    ]
  }

  if (lowerMessage.includes("flight") || lowerMessage.includes("fly")) {
    return [
      "Find flight deals",
      "Book flights in advance",
      "Explore travel apps for flights",
      "Tips for budget-friendly flights",
    ]
  }

  if (lowerMessage.includes("hotel") || lowerMessage.includes("accommodation")) {
    return [
      "Find hotel deals",
      "Book hotels directly",
      "Explore travel apps for hotels",
      "Tips for budget-friendly accommodations",
    ]
  }

  // Default suggestions
  return [
    "Plan a weekend getaway",
    "Find flights to popular destinations",
    "Recommend family-friendly places",
    "Create a cultural tour itinerary",
  ]
}

function generateRecommendations(userMessage: string, aiResponse: string): any[] {
  const lowerMessage = userMessage.toLowerCase()
  const lowerResponse = aiResponse.toLowerCase()

  if (lowerMessage.includes("japan") || lowerResponse.includes("japan")) {
    return [
      {
        type: "Attraction",
        title: "Senso-ji Temple, Tokyo",
        description: "Ancient Buddhist temple in historic Asakusa district",
        icon: "MapPin",
        location: "Asakusa, Tokyo",
        image: "/senso-ji-temple-tokyo-traditional-red-architecture.jpg",
      },
      {
        type: "Experience",
        title: "Traditional Ryokan Stay",
        description: "Authentic Japanese inn experience with tatami mats and kaiseki dining",
        icon: "Hotel",
        location: "Kyoto/Hakone",
        image: "/traditional-japanese-ryokan-interior-tatami-mats.jpg",
      },
      {
        type: "Food",
        title: "Tsukiji Outer Market",
        description: "Fresh sushi and street food in Tokyo's famous fish market area",
        icon: "Utensils",
        location: "Tsukiji, Tokyo",
        image: "/tsukiji-fish-market-fresh-sushi-tokyo.jpg",
      },
    ]
  }

  if (lowerMessage.includes("paris") || lowerResponse.includes("paris")) {
    return [
      {
        type: "Museum",
        title: "Louvre Museum",
        description: "World's largest art museum, home to the Mona Lisa",
        icon: "MapPin",
        location: "1st Arrondissement, Paris",
        image: "/louvre-museum-paris-glass-pyramid-architecture.jpg",
      },
      {
        type: "Landmark",
        title: "Eiffel Tower",
        description: "Iconic iron lattice tower, best viewed at sunset",
        icon: "MapPin",
        location: "Champ de Mars, Paris",
        image: "/eiffel-tower-paris-sunset-golden-hour.jpg",
      },
      {
        type: "Neighborhood",
        title: "Le Marais District",
        description: "Historic Jewish quarter with trendy boutiques and cafés",
        icon: "MapPin",
        location: "3rd & 4th Arrondissements",
        image: "/le-marais-paris-historic-cobblestone-streets-cafes.jpg",
      },
    ]
  }

  if (lowerMessage.includes("italy") || lowerResponse.includes("italy")) {
    return [
      {
        type: "Historic Site",
        title: "Colosseum, Rome",
        description: "Ancient amphitheater and iconic symbol of Imperial Rome",
        icon: "MapPin",
        location: "Rome, Italy",
        image: "/roman-colosseum-ancient-amphitheater-architecture.jpg",
      },
      {
        type: "Art Gallery",
        title: "Uffizi Gallery, Florence",
        description: "Renaissance masterpieces including Botticelli's Birth of Venus",
        icon: "MapPin",
        location: "Florence, Italy",
        image: "/uffizi-gallery-florence-renaissance-art-museum.jpg",
      },
      {
        type: "Canal Experience",
        title: "Grand Canal, Venice",
        description: "Scenic gondola rides through Venice's main waterway",
        icon: "MapPin",
        location: "Venice, Italy",
        image: "/venice-grand-canal-gondola-traditional-boats.jpg",
      },
    ]
  }

  if (lowerMessage.includes("flight") || lowerMessage.includes("fly")) {
    return [
      {
        type: "Flight",
        title: "Flight Search",
        description: "Find the best flight deals",
        icon: "Plane",
      },
    ]
  }

  if (lowerMessage.includes("hotel") || lowerMessage.includes("stay")) {
    return [
      {
        type: "Hotel",
        title: "Hotel Booking",
        description: "Discover great accommodations",
        icon: "MapPin",
      },
    ]
  }

  if (lowerMessage.includes("restaurant") || lowerMessage.includes("food")) {
    return [
      {
        type: "Restaurant",
        title: "Dining Options",
        description: "Explore local cuisine",
        icon: "Calendar",
      },
    ]
  }

  return []
}
