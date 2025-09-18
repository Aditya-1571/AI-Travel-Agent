import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Play } from "lucide-react"

export function FeaturedDestinations() {
  const destinations = [
    {
      name: "Paris, France",
      image: "/paris-eiffel-romance.png",
      category: "Romantic",
      duration: "5-7 days",
      popularity: "Most Popular",
      description: "City of lights with world-class museums, cuisine, and architecture",
      videoDuration: "18:45",
    },
    {
      name: "Tokyo, Japan",
      image: "/placeholder-yashn.png",
      category: "Culture",
      duration: "7-10 days",
      popularity: "Trending",
      description: "Modern metropolis blending traditional culture with cutting-edge technology",
      videoDuration: "22:30",
    },
    {
      name: "New York, USA",
      image: "/nyc-manhattan-central-park.png",
      category: "Urban",
      duration: "4-6 days",
      popularity: "Classic",
      description: "The city that never sleeps with iconic landmarks and Broadway shows",
      videoDuration: "16:20",
    },
    {
      name: "Maldives",
      image: "/maldives-overwater-bungalows.png",
      category: "Beach",
      duration: "5-8 days",
      popularity: "Luxury",
      description: "Tropical paradise with overwater villas and pristine coral reefs",
      videoDuration: "14:15",
    },
    {
      name: "Iceland",
      image: "/iceland-aurora-landscape.png",
      category: "Adventure",
      duration: "6-9 days",
      popularity: "Unique",
      description: "Land of fire and ice with geysers, waterfalls, and Northern Lights",
      videoDuration: "25:10",
    },
    {
      name: "Dubai, UAE",
      image: "/placeholder-8tk5v.png",
      category: "Luxury",
      duration: "4-7 days",
      popularity: "Modern",
      description: "Futuristic city with luxury shopping, stunning architecture, and desert adventures",
      videoDuration: "19:35",
    },
  ]

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-foreground">Featured Destinations</h2>
        <p className="text-muted-foreground text-lg">Discover the world's most amazing places to visit</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:bg-card/80 transition-all cursor-pointer group bg-card border-border"
          >
            <div className="relative">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              {/* Video-style overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {destination.videoDuration}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Play className="h-6 w-6 text-white fill-white" />
                </div>
              </div>
              <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground border-0">
                {destination.popularity}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-card-foreground mb-1 truncate">{destination.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{destination.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {destination.category}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {destination.duration}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
