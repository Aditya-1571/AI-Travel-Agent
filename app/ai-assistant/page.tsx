"use client"

import { AIChatAssistant } from "@/components/ai-chat-assistant"
import { AIItineraryPlanner } from "@/components/ai-itinerary-planner"
import { AIRecommendations } from "@/components/ai-recommendations"

export default function AIAssistantPage() {
  return (
    <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col">
      <div className="mb-6 md:mb-8 flex-shrink-0">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">AI Travel Assistant</h1>
        <p className="text-base md:text-lg text-muted-foreground">
          Get personalized travel recommendations, itineraries, and planning assistance powered by AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 flex-1 min-h-0 mb-6">
        <div className="min-h-[400px] lg:min-h-0">
          <AIChatAssistant />
        </div>
        <div className="min-h-[400px] lg:min-h-0">
          <AIItineraryPlanner />
        </div>
      </div>

      <div className="flex-shrink-0">
        <AIRecommendations />
      </div>
    </div>
  )
}
