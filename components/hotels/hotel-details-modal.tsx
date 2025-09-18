"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MapPin, Wifi, Car, Utensils, Waves, Users, Bed, Maximize } from "lucide-react"

interface HotelDetailsModalProps {
  hotel: any
  isOpen: boolean
  onClose: () => void
}

export function HotelDetailsModal({ hotel, isOpen, onClose }: HotelDetailsModalProps) {
  const [selectedRoom, setSelectedRoom] = useState(hotel?.rooms[0])

  if (!hotel) return null

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Free WiFi":
        return <Wifi className="h-5 w-5" />
      case "Pool":
        return <Waves className="h-5 w-5" />
      case "Restaurant":
        return <Utensils className="h-5 w-5" />
      case "Valet Parking":
        return <Car className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{hotel.name}</DialogTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: Math.floor(hotel.rating) }, (_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              {hotel.rating % 1 !== 0 && <Star className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />}
            </div>
            <span className="font-medium">{hotel.rating}</span>
            <span className="text-muted-foreground">({hotel.reviewCount} reviews)</span>
            <Badge variant="secondary">{hotel.propertyType}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hotel Images Gallery */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 h-64">
            {hotel.images.map((image: string, index: number) => (
              <img
                key={index}
                src={
                  image ||
                  `/placeholder.svg?height=200&width=300&query=hotel ${index === 0 ? "exterior" : index === 1 ? "lobby" : index === 2 ? "room" : "amenity"}`
                }
                alt={`${hotel.name} ${index === 0 ? "exterior" : index === 1 ? "lobby" : index === 2 ? "room" : "amenity"}`}
                className="w-full h-full object-cover rounded-lg"
              />
            ))}
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">About This Property</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{hotel.description}</p>

                  <h4 className="font-medium mb-2">Property Highlights</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Located in {hotel.location.address}</li>
                    <li>• {hotel.distanceFromCenter}</li>
                    <li>• Near {hotel.location.landmarks.join(", ")}</li>
                    <li>• {hotel.rooms.length} room types available</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Policies</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">Check-in / Check-out</h4>
                      <p className="text-sm text-muted-foreground">
                        Check-in: {hotel.policies.checkIn} | Check-out: {hotel.policies.checkOut}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Cancellation</h4>
                      <p className="text-sm text-muted-foreground">{hotel.policies.cancellation}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Pet Policy</h4>
                      <p className="text-sm text-muted-foreground">{hotel.policies.pets}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rooms" className="space-y-4">
              <h3 className="text-lg font-semibold">Available Rooms</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {hotel.rooms.map((room: any, index: number) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all ${selectedRoom?.type === room.type ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{room.type}</CardTitle>
                      <div className="text-2xl font-bold text-primary">
                        ${room.price}
                        <span className="text-sm font-normal text-muted-foreground">/night</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Maximize className="h-4 w-4 text-muted-foreground" />
                          <span>{room.size}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-muted-foreground" />
                          <span>{room.beds}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>Up to {room.capacity} guests</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <h5 className="font-medium text-sm mb-1">Room Amenities</h5>
                        <div className="flex flex-wrap gap-1">
                          {room.amenities.slice(0, 3).map((amenity: string) => (
                            <Badge key={amenity} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {room.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{room.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="space-y-4">
              <h3 className="text-lg font-semibold">Hotel Amenities</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity: string) => (
                  <div key={amenity} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    {getAmenityIcon(amenity)}
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <h3 className="text-lg font-semibold">Location & Nearby</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    {hotel.location.address}
                    <br />
                    {hotel.location.city}, {hotel.location.country}
                  </p>
                  <p className="text-sm text-muted-foreground">{hotel.distanceFromCenter}</p>

                  <h4 className="font-medium mt-6 mb-3">Coordinates</h4>
                  <p className="text-sm text-muted-foreground">
                    Latitude: {hotel.location.coordinates.lat}
                    <br />
                    Longitude: {hotel.location.coordinates.lng}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Nearby Landmarks</h4>
                  <div className="space-y-2">
                    {hotel.location.landmarks.map((landmark: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>{landmark}</span>
                        <span className="text-muted-foreground">({(Math.random() * 2 + 0.1).toFixed(1)} km)</span>
                      </div>
                    ))}
                  </div>

                  {/* Mock Map Placeholder */}
                  <div className="mt-6 h-48 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Interactive Map</p>
                      <p className="text-xs">Real location: {hotel.location.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator />

          {/* Booking Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold text-primary">
                ${selectedRoom?.price || hotel.price}
                <span className="text-lg font-normal text-muted-foreground">/night</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedRoom ? selectedRoom.type : "Starting from"} • includes taxes & fees
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Close Details
              </Button>
              <Button size="lg" className="px-8">
                Book {selectedRoom ? selectedRoom.type : "Hotel"} - ${selectedRoom?.price || hotel.price}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
