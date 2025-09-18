"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plane, Wifi, Utensils, Monitor, Luggage, MapPin } from "lucide-react"

interface FlightDetailsModalProps {
  flight: any
  isOpen: boolean
  onClose: () => void
}

export function FlightDetailsModal({ flight, isOpen, onClose }: FlightDetailsModalProps) {
  if (!flight) return null

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "WiFi":
        return <Wifi className="h-5 w-5" />
      case "Entertainment":
        return <Monitor className="h-5 w-5" />
      case "Meals":
        return <Utensils className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Flight Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Flight Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={flight.airline.logo || "/placeholder.svg"}
                alt={flight.airline.name}
                className="w-12 h-12 rounded"
              />
              <div>
                <h3 className="text-xl font-bold">{flight.airline.name}</h3>
                <p className="text-muted-foreground">
                  {flight.flightNumber} • {flight.aircraft}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">${flight.price}</div>
              <div className="text-muted-foreground">per person</div>
            </div>
          </div>

          <Separator />

          {/* Flight Route */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{flight.departure.time}</div>
              <div className="text-lg font-medium">{flight.departure.airport}</div>
              <div className="text-muted-foreground">{flight.departure.city}</div>
              <div className="text-sm text-muted-foreground mt-1">{flight.departure.date}</div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center w-full">
                <div className="flex-1 h-px bg-border"></div>
                <Plane className="mx-4 h-6 w-6 text-primary" />
                <div className="flex-1 h-px bg-border"></div>
              </div>
              <div className="mt-2 text-center">
                <div className="font-medium">{flight.duration}</div>
                {flight.stops > 0 ? (
                  <div className="text-sm text-muted-foreground">
                    {flight.stops} stop{flight.stops > 1 ? "s" : ""}
                  </div>
                ) : (
                  <Badge variant="secondary" className="mt-1">
                    Nonstop
                  </Badge>
                )}
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{flight.arrival.time}</div>
              <div className="text-lg font-medium">{flight.arrival.airport}</div>
              <div className="text-muted-foreground">{flight.arrival.city}</div>
              <div className="text-sm text-muted-foreground mt-1">{flight.arrival.date}</div>
            </div>
          </div>

          {/* Stops Information */}
          {flight.stops > 0 && (
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Layover Information
              </h4>
              <div className="space-y-1">
                {flight.stopCities.map((city: string, index: number) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    Stop {index + 1}: {city} (Layover time varies)
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Flight Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amenities */}
            <div>
              <h4 className="font-medium mb-3">Amenities & Services</h4>
              <div className="space-y-2">
                {flight.amenities.map((amenity: string) => (
                  <div key={amenity} className="flex items-center gap-2">
                    {getAmenityIcon(amenity)}
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Baggage */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Luggage className="h-4 w-4" />
                Baggage Policy
              </h4>
              <div className="text-sm space-y-1">
                <div>{flight.baggage}</div>
                <div className="text-muted-foreground">Additional fees may apply for extra baggage</div>
              </div>
            </div>

            {/* Class Details */}
            <div>
              <h4 className="font-medium mb-3">Travel Class</h4>
              <div className="text-sm">
                <div className="font-medium">{flight.class}</div>
                <div className="text-muted-foreground">Standard seat selection included</div>
              </div>
            </div>

            {/* Aircraft */}
            <div>
              <h4 className="font-medium mb-3">Aircraft Information</h4>
              <div className="text-sm">
                <div className="font-medium">{flight.aircraft}</div>
                <div className="text-muted-foreground">Modern aircraft with latest safety features</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" onClick={onClose}>
              Close Details
            </Button>
            <Button size="lg" className="px-8">
              Book This Flight - ${flight.price}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
