import { type NextRequest, NextResponse } from "next/server"
import { aiTravelAnalyzer } from "@/lib/ai-travel-analyzer"

export async function POST(request: NextRequest) {
  try {
    const { request: travelRequest, from, to } = await request.json()

    if (!travelRequest) {
      return NextResponse.json({ error: "Travel request is required" }, { status: 400 })
    }

    console.log("[v0] Processing travel analysis request:", { travelRequest, from, to })

    // Generate comprehensive analysis
    const result = await aiTravelAnalyzer.generateComprehensiveAnalysis(travelRequest, from, to)

    // Generate travel summary
    const summary = await aiTravelAnalyzer.generateTravelSummary(travelRequest)

    console.log("[v0] Successfully generated travel analysis")

    return NextResponse.json({
      ...result,
      summary,
    })
  } catch (error) {
    console.error("AI Travel Analysis Error:", error)

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"

    return NextResponse.json(
      {
        error: "Failed to analyze travel request",
        details: errorMessage,
        suggestion: errorMessage.includes("API key")
          ? "Please configure the Groq integration in your project settings to enable AI-powered analysis."
          : "Please try again or contact support if the issue persists.",
      },
      { status: 500 },
    )
  }
}
