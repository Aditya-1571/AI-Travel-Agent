"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Heart, Camera, Loader2 } from "lucide-react"
import { PlaceDetailsModal } from "./place-details-modal"
import Image from "next/image"

interface PlacesResultsProps {
  searchParams: any
  filters: any
  results: any[]
  isLoading: boolean
}

export function PlacesResults({ searchParams, filters, results, isLoading }: PlacesResultsProps) {
  const [selectedPlace, setSelectedPlace] = useState<any>(null)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Searching for amazing places...</p>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No places found for your search criteria.</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Found {results.length} places</h2>
        <select className="px-4 py-2 border rounded-lg">
          <option>Sort by: Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Rating: High to Low</option>
          <option>Distance</option>
        </select>
      </div>

      <div className="grid gap-6">
        {results.map((place) => (
          <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="relative h-48 md:h-full">
                  <Image
                    src={
                      place.image ||
                      `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(place.name + " " + place.category)}`
                    }
                    alt={place.name}
                    fill
                    className="object-cover"
                  />
                  <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Badge className="absolute bottom-2 left-2" variant="secondary">
                    {place.category}
                  </Badge>
                </div>

                <div className="md:col-span-2 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{place.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{place.address}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{place.rating}</span>
                        <span className="text-muted-foreground">({place.reviews?.toLocaleString()})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{place.priceINR}</Badge>
                        <Badge variant="outline">{place.duration}</Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{place.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{place.openingHours}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {place.features?.slice(0, 3).map((feature: string) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={() => setSelectedPlace(place)}>
                      View Details
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Photos
                      </Button>
                      <Button size="sm" onClick={() => window.open(place.bookingUrl || "#", "_blank")}>
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPlace && (
        <PlaceDetailsModal place={selectedPlace} isOpen={!!selectedPlace} onClose={() => setSelectedPlace(null)} />
      )}
    </div>
  )
}
