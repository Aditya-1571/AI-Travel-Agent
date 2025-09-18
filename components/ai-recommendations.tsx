"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Heart, Star, MapPin } from "lucide-react"

export function AIRecommendations() {
  const recommendations = [
    {
      type: "Trending",
      title: "Bali, Indonesia",
      description:
        "Perfect for digital nomads with stunning beaches, affordable living, and vibrant culture in Ubud and Seminyak",
      image: "/bali-beach-resort-tropical-paradise-palm-trees.jpg",
      price: "From $89/night",
      rating: 4.8,
      icon: TrendingUp,
      location: "Southeast Asia",
      highlights: ["Beach Resorts", "Cultural Sites", "Affordable Living"],
    },
    {
      type: "AI Pick",
      title: "Kyoto, Japan",
      description:
        "Based on your love for culture and history, you'll adore the ancient temples, traditional gardens, and cherry blossoms",
      image: "/kyoto-temple-cherry-blossoms-traditional-japanese-.jpg",
      price: "From $156/night",
      rating: 4.9,
      icon: Sparkles,
      location: "East Asia",
      highlights: ["Historic Temples", "Cherry Blossoms", "Traditional Culture"],
    },
    {
      type: "Popular",
      title: "Santorini, Greece",
      description:
        "Romantic getaway with breathtaking sunsets, white-washed architecture, and crystal-clear Aegean waters",
      image: "/santorini-sunset-white-buildings-blue-domes-greece.jpg",
      price: "From $234/night",
      rating: 4.7,
      icon: Heart,
      location: "Mediterranean",
      highlights: ["Romantic Sunsets", "Luxury Resorts", "Wine Tasting"],
    },
  ]

  const handleRecommendationClick = (recommendation: any) => {
    alert(
      `Exploring ${recommendation.title}! This would normally open detailed information about ${recommendation.title} including hotels, flights, and activities.`,
    )
  }

  return (
    <section className="mb-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">AI-Powered Recommendations</h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Personalized suggestions based on your preferences and travel history
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => {
          const IconComponent = rec.icon
          return (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group bg-card border-border"
              onClick={() => handleRecommendationClick(rec)}
            >
              <div className="relative">
                <img
                  src={rec.image || "/placeholder.svg"}
                  alt={rec.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground border-0">
                  <IconComponent className="h-3 w-3 mr-1" />
                  {rec.type}
                </Badge>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-sm">
                  <MapPin className="h-3 w-3" />
                  <span className="font-medium">{rec.location}</span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-1">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{rec.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {rec.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-semibold text-primary">{rec.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{rec.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
