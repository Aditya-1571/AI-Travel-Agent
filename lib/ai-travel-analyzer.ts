import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { z } from "zod"
import { CurrencyConverter } from "./currency-converter"

const isGroqAvailable = () => {
  return !!process.env.GROQ_API_KEY
}

// Schema for structured travel analysis
const TravelAnalysisSchema = z.object({
  travelType: z.enum(["business", "leisure", "family", "romantic", "adventure", "cultural"]),
  budget: z.enum(["budget", "mid-range", "luxury", "ultra-luxury"]),
  duration: z.object({
    days: z.number(),
    category: z.enum(["short", "medium", "long"]),
  }),
  preferences: z.object({
    accommodation: z.array(z.string()),
    dining: z.array(z.string()),
    activities: z.array(z.string()),
    transportation: z.array(z.string()),
  }),
  destinations: z.object({
    primary: z.string(),
    secondary: z.array(z.string()).optional(),
  }),
  travelers: z.object({
    adults: z.number(),
    children: z.number(),
    infants: z.number(),
  }),
  dates: z.object({
    departure: z.string().nullable().optional(),
    return: z.string().nullable().optional(),
    flexible: z.boolean(),
  }),
  specialRequirements: z.array(z.string()),
})

const FlightRecommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      airline: z.string(),
      route: z.string(),
      class: z.enum(["economy", "premium-economy", "business", "first"]),
      priceUSD: z.number(),
      priceINR: z.number(),
      duration: z.string(),
      stops: z.number(),
      departureTime: z.string(),
      arrivalTime: z.string(),
      reasoning: z.string(),
      bookingUrl: z.string(),
      baggage: z.string(),
      cancellation: z.string(),
    }),
  ),
  tips: z.array(z.string()),
  alternatives: z.array(z.string()),
  bestBookingTime: z.string(),
})

const HotelRecommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      name: z.string(),
      location: z.string(),
      category: z.enum(["budget", "mid-range", "luxury", "ultra-luxury"]),
      rating: z.number(),
      pricePerNightUSD: z.number(),
      pricePerNightINR: z.number(),
      amenities: z.array(z.string()),
      reasoning: z.string(),
      bookingUrl: z.string(),
      checkInTime: z.string(),
      checkOutTime: z.string(),
      cancellationPolicy: z.string(),
    }),
  ),
  neighborhoods: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      suitability: z.string(),
      averagePriceINR: z.number(),
    }),
  ),
  tips: z.array(z.string()),
})

const RestaurantRecommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      name: z.string(),
      cuisine: z.string(),
      averageMealPriceINR: z.number(),
      location: z.string(),
      specialties: z.array(z.string()),
      atmosphere: z.string(),
      reasoning: z.string(),
      reservationUrl: z.string().optional(),
      openingHours: z.string(),
      phoneNumber: z.string().optional(),
    }),
  ),
  foodScene: z.object({
    highlights: z.array(z.string()),
    localSpecialties: z.array(z.string()),
    diningTips: z.array(z.string()),
    averageMealCosts: z.object({
      streetFood: z.number(),
      casualDining: z.number(),
      fineDining: z.number(),
    }),
  }),
})

const PlacesRecommendationSchema = z.object({
  attractions: z.array(
    z.object({
      name: z.string(),
      type: z.enum([
        "museum",
        "landmark",
        "nature",
        "entertainment",
        "cultural",
        "historical",
        "temple",
        "park",
        "shopping",
        "beach",
        "market",
        "monument",
        "garden",
        "zoo",
        "aquarium",
        "palace",
        "fort",
        "religious",
        "adventure",
      ]),
      location: z.string(),
      duration: z.string(),
      bestTime: z.string(),
      ticketPriceINR: z.number(),
      reasoning: z.string(),
      officialUrl: z.string().optional(),
      nearbyAttractions: z.array(z.string()),
      accessibility: z.string(),
    }),
  ),
  itinerary: z.array(
    z.object({
      day: z.number(),
      theme: z.string(),
      activities: z.array(z.string()),
      estimatedCostINR: z.number(),
      tips: z.string(),
      transportationTips: z.string(),
    }),
  ),
  localInsights: z.array(z.string()),
  budgetBreakdown: z.object({
    dailyBudgetINR: z.number(),
    totalEstimatedCostINR: z.number(),
    costSavingTips: z.array(z.string()),
  }),
})

export class AITravelAnalyzer {
  private model = groq("llama-3.3-70b-versatile")

  private cleanJsonResponse(text: string): string {
    // Remove markdown code blocks if present
    const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/
    const match = text.match(codeBlockRegex)

    if (match) {
      return match[1].trim()
    }

    // If no code blocks found, return the original text trimmed
    return text.trim()
  }

  private generateMockTravelAnalysis(request: string): z.infer<typeof TravelAnalysisSchema> {
    // Simple keyword-based analysis for mock data
    const lowerRequest = request.toLowerCase()

    const travelType = lowerRequest.includes("business")
      ? "business"
      : lowerRequest.includes("family")
        ? "family"
        : lowerRequest.includes("romantic")
          ? "romantic"
          : lowerRequest.includes("adventure")
            ? "adventure"
            : "leisure"

    const budget =
      lowerRequest.includes("luxury") || lowerRequest.includes("expensive")
        ? "luxury"
        : lowerRequest.includes("budget") || lowerRequest.includes("cheap")
          ? "budget"
          : "mid-range"

    // Extract destination from request (simple pattern matching)
    const destinations = ["Mumbai", "Delhi", "Goa", "Bangalore", "Chennai", "Kolkata", "Jaipur", "Kerala"]
    const foundDestination = destinations.find((dest) => lowerRequest.includes(dest.toLowerCase())) || "Mumbai"

    return {
      travelType,
      budget,
      duration: { days: 7, category: "medium" },
      preferences: {
        accommodation: ["hotel", "resort"],
        dining: ["local cuisine", "fine dining"],
        activities: ["sightseeing", "cultural tours"],
        transportation: ["flight", "taxi"],
      },
      destinations: { primary: foundDestination, secondary: [] },
      travelers: { adults: 2, children: 0, infants: 0 },
      dates: { departure: null, return: null, flexible: true },
      specialRequirements: [],
    }
  }

  private generateMockFlightRecommendations(from: string, to: string): z.infer<typeof FlightRecommendationSchema> {
    return {
      recommendations: [
        {
          airline: "IndiGo",
          route: `${from} to ${to}`,
          class: "economy",
          priceUSD: 150,
          priceINR: 12525,
          duration: "2h 30m",
          stops: 0,
          departureTime: "10:30 AM",
          arrivalTime: "1:00 PM",
          reasoning: "Best value for money with good timing",
          bookingUrl: "https://www.goindigo.in",
          baggage: "15kg checked, 7kg cabin",
          cancellation: "Free cancellation within 24 hours",
        },
        {
          airline: "Air India",
          route: `${from} to ${to}`,
          class: "economy",
          priceUSD: 180,
          priceINR: 15030,
          duration: "2h 45m",
          stops: 0,
          departureTime: "2:15 PM",
          arrivalTime: "5:00 PM",
          reasoning: "National carrier with reliable service",
          bookingUrl: "https://www.airindia.in",
          baggage: "20kg checked, 8kg cabin",
          cancellation: "Cancellation charges apply",
        },
      ],
      tips: ["Book 2-3 months in advance for better prices", "Check for direct flights to save time"],
      alternatives: ["Train travel for scenic routes", "Bus services for budget travel"],
      bestBookingTime: "Tuesday and Wednesday mornings typically offer better deals",
    }
  }

  private generateMockHotelRecommendations(destination: string): z.infer<typeof HotelRecommendationSchema> {
    return {
      recommendations: [
        {
          name: "The Grand Palace Hotel",
          location: `Central ${destination}`,
          category: "luxury",
          rating: 4.5,
          pricePerNightUSD: 200,
          pricePerNightINR: 16700,
          amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym"],
          reasoning: "Luxury hotel with excellent amenities and central location",
          bookingUrl: "https://www.booking.com",
          checkInTime: "3:00 PM",
          checkOutTime: "12:00 PM",
          cancellationPolicy: "Free cancellation up to 24 hours before check-in",
        },
        {
          name: "City Center Inn",
          location: `Downtown ${destination}`,
          category: "mid-range",
          rating: 4.0,
          pricePerNightUSD: 80,
          pricePerNightINR: 6680,
          amenities: ["WiFi", "Restaurant", "24/7 Reception"],
          reasoning: "Great value hotel in prime location",
          bookingUrl: "https://www.booking.com",
          checkInTime: "2:00 PM",
          checkOutTime: "11:00 AM",
          cancellationPolicy: "Free cancellation up to 48 hours before check-in",
        },
      ],
      neighborhoods: [
        {
          name: "City Center",
          description: "Heart of the city with shopping and dining",
          suitability: "Perfect for business and leisure travelers",
          averagePriceINR: 8000,
        },
      ],
      tips: ["Book early for better rates", "Check for package deals with flights"],
    }
  }

  private generateMockRestaurantRecommendations(destination: string): z.infer<typeof RestaurantRecommendationSchema> {
    return {
      recommendations: [
        {
          name: "Local Flavors",
          cuisine: "Regional Indian",
          averageMealPriceINR: 800,
          location: `Central ${destination}`,
          specialties: ["Local specialties", "Traditional curries"],
          atmosphere: "Authentic local dining experience",
          reasoning: "Best place to experience authentic local cuisine",
          reservationUrl: "https://www.zomato.com",
          openingHours: "11:00 AM - 11:00 PM",
          phoneNumber: "+91 98765 43210",
        },
        {
          name: "Fine Dining Palace",
          cuisine: "Multi-cuisine",
          averageMealPriceINR: 2500,
          location: `Premium area, ${destination}`,
          specialties: ["Continental", "Indian fusion"],
          atmosphere: "Upscale dining with elegant ambiance",
          reasoning: "Perfect for special occasions and fine dining",
          reservationUrl: "https://www.opentable.com",
          openingHours: "7:00 PM - 12:00 AM",
          phoneNumber: "+91 98765 43211",
        },
      ],
      foodScene: {
        highlights: ["Rich culinary heritage", "Street food culture", "Fine dining scene"],
        localSpecialties: ["Regional delicacies", "Street food favorites"],
        diningTips: ["Try local street food", "Book fine dining in advance"],
        averageMealCosts: {
          streetFood: 100,
          casualDining: 500,
          fineDining: 2000,
        },
      },
    }
  }

  private generateMockPlacesRecommendations(
    destination: string,
    days: number,
  ): z.infer<typeof PlacesRecommendationSchema> {
    return {
      attractions: [
        {
          name: `${destination} Heritage Museum`,
          type: "museum",
          location: `Central ${destination}`,
          duration: "2-3 hours",
          bestTime: "Morning hours",
          ticketPriceINR: 200,
          reasoning: "Rich collection showcasing local history and culture",
          officialUrl: "https://www.museum.gov.in",
          nearbyAttractions: ["City Park", "Shopping District"],
          accessibility: "Wheelchair accessible",
        },
        {
          name: `${destination} City Palace`,
          type: "palace",
          location: `Old City, ${destination}`,
          duration: "3-4 hours",
          bestTime: "Early morning or late afternoon",
          ticketPriceINR: 500,
          reasoning: "Magnificent architecture and royal history",
          officialUrl: "https://www.heritage.gov.in",
          nearbyAttractions: ["Royal Gardens", "Traditional Market"],
          accessibility: "Partially accessible",
        },
      ],
      itinerary: Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        theme: `Day ${i + 1}: ${i === 0 ? "Arrival & City Tour" : i === days - 1 ? "Shopping & Departure" : "Cultural Exploration"}`,
        activities: [
          i === 0 ? "Check-in and city orientation" : "Morning sightseeing",
          "Local cuisine experience",
          i === days - 1 ? "Shopping and departure prep" : "Evening cultural activities",
        ],
        estimatedCostINR: 3000,
        tips: i === 0 ? "Start with nearby attractions" : "Book popular attractions in advance",
        transportationTips: "Use local transportation for authentic experience",
      })),
      localInsights: [
        `${destination} is known for its rich cultural heritage`,
        "Local people are friendly and helpful to tourists",
        "Best time to visit is during cooler months",
      ],
      budgetBreakdown: {
        dailyBudgetINR: 3000,
        totalEstimatedCostINR: days * 3000,
        costSavingTips: ["Use public transportation", "Eat at local restaurants", "Book accommodations in advance"],
      },
    }
  }

  async analyzeTravelRequest(request: string): Promise<z.infer<typeof TravelAnalysisSchema>> {
    if (!isGroqAvailable()) {
      console.log("[v0] Groq API not available, using mock travel analysis")
      return this.generateMockTravelAnalysis(request)
    }

    try {
      const { text } = await generateText({
        model: this.model,
        prompt: `
          Analyze this travel request and extract structured information as valid JSON:
          "${request}"
          
          Consider:
          - Travel type and purpose
          - Budget indicators (luxury, budget, etc.)
          - Duration clues
          - Destination preferences
          - Number of travelers
          - Special requirements or preferences
          - Accommodation preferences
          - Activity interests
          
          Return ONLY a valid JSON object with this exact structure (no markdown, no explanations):
          {
            "travelType": "leisure",
            "budget": "mid-range",
            "duration": {
              "days": 7,
              "category": "medium"
            },
            "preferences": {
              "accommodation": ["hotel", "resort"],
              "dining": ["local cuisine", "fine dining"],
              "activities": ["sightseeing", "cultural tours"],
              "transportation": ["flight", "taxi"]
            },
            "destinations": {
              "primary": "Mumbai",
              "secondary": ["Goa", "Delhi"]
            },
            "travelers": {
              "adults": 2,
              "children": 0,
              "infants": 0
            },
            "dates": {
              "departure": null,
              "return": null,
              "flexible": true
            },
            "specialRequirements": ["vegetarian meals", "wheelchair accessible"]
          }
          
          Use the exact field names and types shown above. If information is not available, use reasonable defaults.
        `,
      })

      const cleanedText = this.cleanJsonResponse(text)
      const parsed = JSON.parse(cleanedText)
      return TravelAnalysisSchema.parse(parsed)
    } catch (error) {
      console.error("Failed to parse travel analysis:", error)
      return this.generateMockTravelAnalysis(request)
    }
  }

  async generateFlightRecommendations(
    analysis: z.infer<typeof TravelAnalysisSchema>,
    from: string,
    to: string,
  ): Promise<z.infer<typeof FlightRecommendationSchema>> {
    if (!isGroqAvailable()) {
      console.log("[v0] Groq API not available, using mock flight recommendations")
      return this.generateMockFlightRecommendations(from, to)
    }

    try {
      const { text } = await generateText({
        model: this.model,
        prompt: `
          You are an expert travel agent. Based on this travel analysis, recommend flights from ${from} to ${to}:
          
          Travel Type: ${analysis.travelType}
          Budget: ${analysis.budget}
          Travelers: ${analysis.travelers.adults} adults, ${analysis.travelers.children} children
          Duration: ${analysis.duration.days} days
          
          Return ONLY a valid JSON object with this exact structure (no markdown, no explanations):
          {
            "recommendations": [
              {
                "airline": "IndiGo",
                "route": "${from} to ${to}",
                "class": "economy",
                "priceUSD": 150,
                "priceINR": 12525,
                "duration": "2h 30m",
                "stops": 0,
                "departureTime": "10:30 AM",
                "arrivalTime": "1:00 PM",
                "reasoning": "Best value for money with good timing",
                "bookingUrl": "https://www.goindigo.in",
                "baggage": "15kg checked, 7kg cabin",
                "cancellation": "Free cancellation within 24 hours"
              }
            ],
            "tips": ["Book 2-3 months in advance", "Check for direct flights"],
            "alternatives": ["Train travel", "Bus services"],
            "bestBookingTime": "Tuesday and Wednesday mornings"
          }
          
          Provide 3-5 flight recommendations with realistic pricing and details.
        `,
      })

      const cleanedText = this.cleanJsonResponse(text)
      const parsed = JSON.parse(cleanedText)
      const validated = FlightRecommendationSchema.parse(parsed)

      const convertedRecommendations = validated.recommendations.map((rec) => ({
        ...rec,
        priceINR: CurrencyConverter.convertUSDToINR(rec.priceUSD),
      }))

      return {
        ...validated,
        recommendations: convertedRecommendations,
      }
    } catch (error) {
      console.error("Failed to parse flight recommendations:", error)
      return this.generateMockFlightRecommendations(from, to)
    }
  }

  async generateHotelRecommendations(
    analysis: z.infer<typeof TravelAnalysisSchema>,
    destination: string,
  ): Promise<z.infer<typeof HotelRecommendationSchema>> {
    if (!isGroqAvailable()) {
      console.log("[v0] Groq API not available, using mock hotel recommendations")
      return this.generateMockHotelRecommendations(destination)
    }

    try {
      const { text } = await generateText({
        model: this.model,
        prompt: `
          Recommend hotels in ${destination} based on this analysis:
          
          Travel Type: ${analysis.travelType}
          Budget: ${analysis.budget}
          Travelers: ${analysis.travelers.adults} adults, ${analysis.travelers.children} children
          
          Return ONLY a valid JSON object with this exact structure (no markdown, no explanations):
          {
            "recommendations": [
              {
                "name": "The Taj Mahal Palace",
                "location": "Colaba, Mumbai",
                "category": "luxury",
                "rating": 4.5,
                "pricePerNightUSD": 200,
                "pricePerNightINR": 16700,
                "amenities": ["WiFi", "Pool", "Spa", "Restaurant"],
                "reasoning": "Iconic luxury hotel with excellent service",
                "bookingUrl": "https://www.tajhotels.com",
                "checkInTime": "3:00 PM",
                "checkOutTime": "12:00 PM",
                "cancellationPolicy": "Free cancellation up to 24 hours before check-in"
              }
            ],
            "neighborhoods": [
              {
                "name": "Colaba",
                "description": "Historic area near Gateway of India",
                "suitability": "Perfect for first-time visitors",
                "averagePriceINR": 8000
              }
            ],
            "tips": ["Book early for better rates", "Check for package deals"]
          }
          
          Provide 3-5 hotel recommendations with realistic details.
        `,
      })

      const cleanedText = this.cleanJsonResponse(text)
      const parsed = JSON.parse(cleanedText)
      const validated = HotelRecommendationSchema.parse(parsed)

      const convertedRecommendations = validated.recommendations.map((rec) => ({
        ...rec,
        pricePerNightINR: CurrencyConverter.convertUSDToINR(rec.pricePerNightUSD),
      }))

      return {
        ...validated,
        recommendations: convertedRecommendations,
      }
    } catch (error) {
      console.error("Failed to parse hotel recommendations:", error)
      return this.generateMockHotelRecommendations(destination)
    }
  }

  async generateRestaurantRecommendations(
    analysis: z.infer<typeof TravelAnalysisSchema>,
    destination: string,
  ): Promise<z.infer<typeof RestaurantRecommendationSchema>> {
    if (!isGroqAvailable()) {
      console.log("[v0] Groq API not available, using mock restaurant recommendations")
      return this.generateMockRestaurantRecommendations(destination)
    }

    try {
      const { text } = await generateText({
        model: this.model,
        prompt: `
          Recommend restaurants in ${destination} based on this analysis:
          
          Travel Type: ${analysis.travelType}
          Budget: ${analysis.budget}
          
          Return ONLY a valid JSON object with this exact structure (no markdown, no explanations):
          {
            "recommendations": [
              {
                "name": "Trishna",
                "cuisine": "Seafood",
                "averageMealPriceINR": 2500,
                "location": "Fort, Mumbai",
                "specialties": ["Koliwada Prawns", "Crab Curry"],
                "atmosphere": "Fine dining with modern Indian cuisine",
                "reasoning": "Award-winning restaurant known for innovative seafood",
                "reservationUrl": "https://www.trishna-mumbai.com",
                "openingHours": "12:00 PM - 3:00 PM, 7:00 PM - 11:30 PM",
                "phoneNumber": "+91 22 2270 3213"
              }
            ],
            "foodScene": {
              "highlights": ["Street food culture", "Fine dining scene"],
              "localSpecialties": ["Vada Pav", "Pav Bhaji", "Bombay Duck"],
              "diningTips": ["Try street food at Mohammed Ali Road", "Book fine dining in advance"],
              "averageMealCosts": {
                "streetFood": 100,
                "casualDining": 500,
                "fineDining": 2000
              }
            }
          }
          
          Provide 3-5 restaurant recommendations with realistic details.
        `,
      })

      const cleanedText = this.cleanJsonResponse(text)
      const parsed = JSON.parse(cleanedText)
      return RestaurantRecommendationSchema.parse(parsed)
    } catch (error) {
      console.error("Failed to parse restaurant recommendations:", error)
      return this.generateMockRestaurantRecommendations(destination)
    }
  }

  async generatePlacesRecommendations(
    analysis: z.infer<typeof TravelAnalysisSchema>,
    destination: string,
  ): Promise<z.infer<typeof PlacesRecommendationSchema>> {
    if (!isGroqAvailable()) {
      console.log("[v0] Groq API not available, using mock places recommendations")
      return this.generateMockPlacesRecommendations(destination, analysis.duration.days)
    }

    try {
      const { text } = await generateText({
        model: this.model,
        prompt: `
          Recommend places and create an itinerary for ${destination} based on this analysis:
          
          Travel Type: ${analysis.travelType}
          Duration: ${analysis.duration.days} days
          
          IMPORTANT: For the "type" field, use ONLY these exact values:
          "museum", "landmark", "nature", "entertainment", "cultural", "historical", "temple", "park", "shopping", "beach", "market", "monument", "garden", "zoo", "aquarium", "palace", "fort", "religious", "adventure"
          
          Return ONLY a valid JSON object with this exact structure (no markdown, no explanations):
          {
            "attractions": [
              {
                "name": "Gateway of India",
                "type": "landmark",
                "location": "Colaba, Mumbai",
                "duration": "1-2 hours",
                "bestTime": "Early morning or evening",
                "ticketPriceINR": 0,
                "reasoning": "Iconic landmark and starting point for Mumbai exploration",
                "officialUrl": "https://www.maharashtratourism.gov.in",
                "nearbyAttractions": ["Taj Mahal Palace", "Colaba Causeway"],
                "accessibility": "Wheelchair accessible"
              }
            ],
            "itinerary": [
              {
                "day": 1,
                "theme": "Historic Mumbai",
                "activities": ["Visit Gateway of India", "Explore Colaba Causeway", "Taj Mahal Palace tour"],
                "estimatedCostINR": 2000,
                "tips": "Start early to avoid crowds",
                "transportationTips": "Use local trains or taxis"
              }
            ],
            "localInsights": ["Mumbai locals are called Mumbaikars", "Local trains are the lifeline of the city"],
            "budgetBreakdown": {
              "dailyBudgetINR": 3000,
              "totalEstimatedCostINR": 21000,
              "costSavingTips": ["Use local trains", "Eat at local restaurants"]
            }
          }
          
          Create a ${analysis.duration.days}-day itinerary with realistic attractions and costs.
          Remember: Use only the specified type values exactly as listed above.
        `,
      })

      const cleanedText = this.cleanJsonResponse(text)
      const parsed = JSON.parse(cleanedText)
      return PlacesRecommendationSchema.parse(parsed)
    } catch (error) {
      console.error("Failed to parse places recommendations:", error)
      return this.generateMockPlacesRecommendations(destination, analysis.duration.days)
    }
  }

  async generateComprehensiveAnalysis(request: string, from?: string, to?: string) {
    try {
      // Step 1: Analyze the travel request
      const analysis = await this.analyzeTravelRequest(request)

      // Step 2: Generate recommendations for each category
      const [flights, hotels, restaurants, places] = await Promise.all([
        from && to ? this.generateFlightRecommendations(analysis, from, to) : null,
        this.generateHotelRecommendations(analysis, analysis.destinations.primary),
        this.generateRestaurantRecommendations(analysis, analysis.destinations.primary),
        this.generatePlacesRecommendations(analysis, analysis.destinations.primary),
      ])

      return {
        analysis,
        recommendations: {
          flights,
          hotels,
          restaurants,
          places,
        },
      }
    } catch (error) {
      console.error("AI Analysis Error:", error)
      throw new Error(`Failed to analyze travel request: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  async generateTravelSummary(request: string): Promise<string> {
    if (!isGroqAvailable()) {
      console.log("[v0] Groq API not available, using mock travel summary")
      return `Based on your travel request, here's a comprehensive overview:

**Best Time to Visit**: The ideal time depends on your destination, but generally avoid extreme weather seasons for the most comfortable experience.

**Budget Considerations**: Plan for accommodation (40-50% of budget), food (20-25%), transportation (15-20%), and activities (15-20%). Consider booking in advance for better deals.

**Cultural Insights**: India offers incredible diversity in culture, cuisine, and traditions. Each region has its unique character and attractions worth exploring.

**Practical Tips**: 
- Keep important documents in digital and physical copies
- Learn basic local phrases for better interaction
- Try local cuisine but be mindful of spice levels
- Respect local customs and dress codes

**Transportation**: Domestic flights for long distances, trains for scenic routes, and local transportation for city exploration work best.

**Safety**: India is generally safe for tourists. Stay aware of your surroundings, use reputable transportation, and keep emergency contacts handy.

This analysis is generated using demo data. For personalized AI-powered recommendations, please configure the Groq integration in your project settings.`
    }

    try {
      const { text } = await generateText({
        model: this.model,
        prompt: `
          Provide a comprehensive travel summary and expert advice for this request:
          "${request}"
          
          Include:
          - Best time to visit
          - Budget considerations
          - Cultural insights
          - Practical tips
          - Weather considerations
          - Local customs
          - Transportation advice
          - Safety information
          
          Write in a friendly, expert tone as a professional travel advisor.
          Keep it informative but concise (300-500 words).
        `,
      })

      return text
    } catch (error) {
      console.error("Failed to generate travel summary:", error)
      return `Unable to generate personalized travel summary at this time. Please check your API configuration and try again.`
    }
  }
}

export const aiTravelAnalyzer = new AITravelAnalyzer()
