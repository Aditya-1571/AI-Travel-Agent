"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"

interface HotelFiltersProps {
  filters: any
  onFiltersChange: (filters: any) => void
}

export function HotelFilters({ filters, onFiltersChange }: HotelFiltersProps) {
  const amenities = [
    "Free WiFi",
    "Pool",
    "Spa",
    "Fitness Center",
    "Restaurant",
    "Room Service",
    "Pet Friendly",
    "Airport Shuttle",
    "Beach Access",
    "Business Center",
  ]

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-3">Price per night</h4>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
              max={1000}
              min={0}
              step={25}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <h4 className="font-medium mb-3">Minimum Rating</h4>
            <div className="space-y-2">
              {[0, 3, 3.5, 4, 4.5].map((rating) => (
                <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={filters.rating === rating}
                    onChange={(e) => updateFilter("rating", Number.parseFloat(e.target.value))}
                    className="text-primary"
                  />
                  <div className="flex items-center gap-1">
                    {rating === 0 ? (
                      <span className="text-sm">Any rating</span>
                    ) : (
                      <>
                        {Array.from({ length: Math.floor(rating) }, (_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        {rating % 1 !== 0 && <Star className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />}
                        <span className="text-sm ml-1">{rating}+ stars</span>
                      </>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div>
            <h4 className="font-medium mb-3">Property Type</h4>
            <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any type</SelectItem>
                <SelectItem value="Hotel">Hotel</SelectItem>
                <SelectItem value="Resort">Resort</SelectItem>
                <SelectItem value="Boutique Hotel">Boutique Hotel</SelectItem>
                <SelectItem value="Luxury Hotel">Luxury Hotel</SelectItem>
                <SelectItem value="Business Hotel">Business Hotel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="font-medium mb-3">Amenities</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilter("amenities", [...filters.amenities, amenity])
                      } else {
                        updateFilter(
                          "amenities",
                          filters.amenities.filter((a: string) => a !== amenity),
                        )
                      }
                    }}
                  />
                  <label htmlFor={amenity} className="text-sm">
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Distance from Center */}
          <div>
            <h4 className="font-medium mb-3">Distance from Center</h4>
            <Select value={filters.distance} onValueChange={(value) => updateFilter("distance", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any distance</SelectItem>
                <SelectItem value="1">Within 1 km</SelectItem>
                <SelectItem value="2">Within 2 km</SelectItem>
                <SelectItem value="5">Within 5 km</SelectItem>
                <SelectItem value="10">Within 10 km</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
