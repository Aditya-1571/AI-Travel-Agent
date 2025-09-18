import { AITravelAnalyzerInterface } from "@/components/ai-travel-analyzer-interface"

export default function AIAnalyzerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Travel Analyzer</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized travel recommendations powered by advanced AI. Simply describe your travel plans and
            receive detailed suggestions for flights, hotels, restaurants, and attractions.
          </p>
        </div>

        <AITravelAnalyzerInterface />
      </div>
    </div>
  )
}
