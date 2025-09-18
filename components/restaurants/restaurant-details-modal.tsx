"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Clock, Phone, Globe, Navigation } from "lucide-react"
import Image from "next/image"

interface RestaurantDetailsModalProps {
  restaurant: any
  isOpen: boolean
  onClose: () => void
}

export function RestaurantDetailsModal({ restaurant, isOpen, onClose }: RestaurantDetailsModalProps) {
  if (!restaurant) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{restaurant.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Restaurant Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{restaurant.rating}</span>
                    <span className="text-muted-foreground">({restaurant.reviews} reviews)</span>
                    <Badge variant="secondary">{restaurant.priceRange}</Badge>
                  </div>
                  <p className="text-muted-foreground">{restaurant.cuisine}</p>
                  <p>{restaurant.description}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Contact & Location</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <p>{restaurant.address}</p>
                      <p className="text-sm text-muted-foreground">
                        Coordinates: {restaurant.coordinates.lat}, {restaurant.coordinates.lng}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{restaurant.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{restaurant.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>{restaurant.website}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.features.map((feature: string) => (
                    <Badge key={feature} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Menu Highlights</h3>
                <div className="space-y-4">
                  {restaurant.menu.map((section: any) => (
                    <div key={section.category}>
                      <h4 className="font-medium text-primary mb-2">{section.category}</h4>
                      <ul className="space-y-1">
                        {section.items.map((item: string) => (
                          <li key={item} className="text-sm text-muted-foreground">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
                <Phone className="h-4 w-4 mr-2" />
                Call Restaurant
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button>Make Reservation</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
