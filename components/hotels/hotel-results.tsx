"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Wifi, Car, Utensils, Waves, ExternalLink } from "lucide-react"
import { HotelDetailsModal } from "./hotel-details-modal"

interface HotelResultsProps {
  results: any[]
  filters: any
}

export function HotelResults({ results, filters }: HotelResultsProps) {
  const [sortBy, setSortBy] = useState("price")
  const [selectedHotel, setSelectedHotel] = useState(null)

  // Filter results based on current filters
  const filteredResults = results.filter((hotel) => {
    if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) return false
    if (filters.rating > 0 && hotel.rating < filters.rating) return false
    if (filters.propertyType !== "any" && hotel.propertyType !== filters.propertyType) return false
    if (filters.amenities.length > 0) {
      const hasRequiredAmenities = filters.amenities.every((amenity: string) => hotel.amenities?.includes(amenity))
      if (!hasRequiredAmenities) return false
    }
    if (filters.distance !== "any" && hotel.distanceFromCenter) {
      const hotelDistance = Number.parseFloat(hotel.distanceFromCenter)
      if (hotelDistance > Number.parseInt(filters.distance)) return false
    }
    return true
  })

  // Sort results
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price
      case "rating":
        return b.rating - a.rating
      case "distance":
        const aDistance = a.distanceFromCenter ? Number.parseFloat(a.distanceFromCenter) : 999
        const bDistance = b.distanceFromCenter ? Number.parseFloat(b.distanceFromCenter) : 999
        return aDistance - bDistance
      default:
        return 0
    }
  })

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Free WiFi":
        return <Wifi className="h-3 w-3 md:h-4 md:w-4" />
      case "Pool":
        return <Waves className="h-3 w-3 md:h-4 md:w-4" />
      case "Restaurant":
        return <Utensils className="h-3 w-3 md:h-4 md:w-4" />
      case "Valet Parking":
        return <Car className="h-3 w-3 md:h-4 md:w-4" />
      default:
        return null
    }
  }

  const handleBookHotel = (hotel: any) => {
    const bookingUrls: { [key: string]: string } = {
      "Ritz-Carlton": "https://www.ritzcarlton.com",
      "Dorchester Collection": "https://www.dorchestercollection.com",
      Marriott: "https://www.marriott.com",
      Hilton: "https://www.hilton.com",
      Hyatt: "https://www.hyatt.com",
      InterContinental: "https://www.ihg.com",
      "Four Seasons": "https://www.fourseasons.com",
    }

    const chainName = hotel.chain?.name || hotel.name.split(" ")[0]
    const bookingUrl = bookingUrls[chainName] || "https://www.booking.com"
    window.open(bookingUrl, "_blank")
  }

  return (
    <div className="space-y-4 md:space-y-6 max-w-full overflow-hidden">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold">{sortedResults.length} hotels found</h2>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price (Low to High)</SelectItem>
            <SelectItem value="rating">Rating (High to Low)</SelectItem>
            <SelectItem value="distance">Distance from Center</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Hotel Cards */}
      <div className="space-y-4 md:space-y-6">
        {sortedResults.map((hotel, index) => (
          <Card key={hotel.id || index} className="overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Hotel Images */}
                <div className="lg:w-1/3 relative flex-shrink-0">
                  <div className="grid grid-cols-2 gap-1 h-48 lg:h-64">
                    <img
                      src={
                        hotel.images?.[0] ||
                        "/placeholder.svg?height=300&width=400&query=luxury hotel exterior modern architecture"
                      }
                      alt={`${hotel.name} exterior`}
                      className="w-full h-full object-cover"
                    />
                    <div className="grid grid-rows-2 gap-1">
                      <img
                        src={
                          hotel.images?.[1] ||
                          "/placeholder.svg?height=150&width=200&query=hotel lobby elegant interior"
                        }
                        alt={`${hotel.name} lobby`}
                        className="w-full h-full object-cover"
                      />
                      <div className="relative">
                        <img
                          src={
                            hotel.images?.[2] ||
                            "/placeholder.svg?height=150&width=200&query=hotel room luxury comfortable"
                          }
                          alt={`${hotel.name} room`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            +{(hotel.images?.length || 4) - 3} more
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {hotel.propertyType}
                  </Badge>
                </div>

                {/* Hotel Info */}
                <div className="lg:w-2/3 p-4 md:p-6 min-w-0 flex-1">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-full">
                    {/* Hotel Details */}
                    <div className="flex-1 space-y-3 md:space-y-4 min-w-0">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold mb-2 line-clamp-2 break-words">{hotel.name}</h3>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <div className="flex items-center">
                            {Array.from({ length: Math.floor(hotel.rating) }, (_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            {hotel.rating % 1 !== 0 && <Star className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />}
                          </div>
                          <span className="font-medium">{hotel.rating}</span>
                          <span className="text-muted-foreground text-sm">({hotel.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-start gap-1 text-muted-foreground mb-2">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span className="text-sm line-clamp-2 break-words">
                            {hotel.location.address}, {hotel.location.city}, {hotel.location.country}
                          </span>
                        </div>
                        {hotel.distanceFromCenter && (
                          <div className="text-sm text-muted-foreground">{hotel.distanceFromCenter}</div>
                        )}
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 break-words">
                        {hotel.description}
                      </p>

                      {/* Amenities */}
                      {hotel.amenities && (
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.slice(0, 4).map((amenity: string) => (
                            <div key={amenity} className="flex items-center gap-1 text-xs text-muted-foreground">
                              {getAmenityIcon(amenity)}
                              <span className="truncate max-w-[100px]">{amenity}</span>
                            </div>
                          ))}
                          {hotel.amenities.length > 4 && (
                            <span className="text-xs text-muted-foreground">+{hotel.amenities.length - 4} more</span>
                          )}
                        </div>
                      )}

                      {/* Nearby Landmarks */}
                      {hotel.location.landmarks && (
                        <div className="hidden md:block">
                          <h4 className="text-sm font-medium mb-1">Nearby Landmarks</h4>
                          <div className="text-xs text-muted-foreground line-clamp-1 break-words">
                            {hotel.location.landmarks.slice(0, 3).join(" • ")}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price and Actions */}
                    <div className="flex flex-row lg:flex-col justify-between lg:justify-end items-end lg:items-end lg:w-48 flex-shrink-0">
                      <div className="text-left lg:text-right">
                        {hotel.originalPrice && hotel.originalPrice > hotel.price && (
                          <div className="text-sm text-muted-foreground line-through">${hotel.originalPrice}</div>
                        )}
                        <div className="text-2xl md:text-3xl font-bold text-primary">${hotel.price}</div>
                        <div className="text-sm text-muted-foreground">per night</div>
                        <div className="text-xs text-muted-foreground mt-1 hidden lg:block">includes taxes & fees</div>
                      </div>

                      <div className="flex flex-col gap-2 w-32 lg:w-full lg:mt-4">
                        <Button onClick={() => setSelectedHotel(hotel)} variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                        <Button onClick={() => handleBookHotel(hotel)} size="sm" className="w-full">
                          <span className="hidden sm:inline truncate">Book Official Site</span>
                          <span className="sm:hidden">Book Now</span>
                          <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hotel Details Modal */}
      {selectedHotel && (
        <HotelDetailsModal hotel={selectedHotel} isOpen={!!selectedHotel} onClose={() => setSelectedHotel(null)} />
      )}
    </div>
  )
}
