"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Clock, Navigation, Camera } from "lucide-react"
import Image from "next/image"

interface PlaceDetailsModalProps {
  place: any
  isOpen: boolean
  onClose: () => void
}

export function PlaceDetailsModal({ place, isOpen, onClose }: PlaceDetailsModalProps) {
  if (!place) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{place.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image src={place.image || "/placeholder.svg"} alt={place.name} fill className="object-cover" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{place.rating}</span>
                    <span className="text-muted-foreground">({place.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{place.category}</Badge>
                    <Badge variant="outline">{place.price}</Badge>
                    <Badge variant="outline">{place.duration}</Badge>
                  </div>
                  <p>{place.description}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Location & Hours</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p>{place.address}</p>
                      <p className="text-sm text-muted-foreground">
                        Coordinates: {place.coordinates.lat}, {place.coordinates.lng}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{place.openingHours}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {place.features.map((feature: string) => (
                    <Badge key={feature} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Highlights</h3>
                <ul className="space-y-1">
                  {place.highlights.map((highlight: string) => (
                    <li key={highlight} className="text-sm">
                      • {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Visitor Information</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-primary mb-1">Best Time to Visit</h4>
                    <p className="text-sm text-muted-foreground">{place.bestTimeToVisit}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-primary mb-1">How to Get There</h4>
                    <p className="text-sm text-muted-foreground">{place.howToGet}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline">
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
              <Button variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                View Photos
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button>Book Now</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
