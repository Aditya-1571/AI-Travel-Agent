"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface RestaurantFiltersProps {
  filters: any
  setFilters: (filters: any) => void
}

export function RestaurantFilters({ filters, setFilters }: RestaurantFiltersProps) {
  const cuisineTypes = ["Italian", "Japanese", "French", "Indian", "Mexican", "American", "Chinese", "Mediterranean"]

  const priceRanges = [
    { label: "$ - Budget", value: "budget" },
    { label: "$$ - Moderate", value: "moderate" },
    { label: "$$$ - Expensive", value: "expensive" },
    { label: "$$$$ - Fine Dining", value: "fine-dining" },
  ]

  const ratings = ["4.5+", "4.0+", "3.5+", "3.0+"]

  const features = [
    "Outdoor Seating",
    "Delivery",
    "Takeout",
    "Reservations",
    "Live Music",
    "Private Dining",
    "Wine Bar",
    "Vegetarian Options",
    "Vegan Options",
    "Gluten-Free",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Restaurants</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Cuisine Type</h3>
          <div className="space-y-2">
            {cuisineTypes.map((cuisine) => (
              <div key={cuisine} className="flex items-center space-x-2">
                <Checkbox id={cuisine} />
                <Label htmlFor={cuisine} className="text-sm">
                  {cuisine}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <div key={range.value} className="flex items-center space-x-2">
                <Checkbox id={range.value} />
                <Label htmlFor={range.value} className="text-sm">
                  {range.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-3">Rating</h3>
          <div className="space-y-2">
            {ratings.map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox id={rating} />
                <Label htmlFor={rating} className="text-sm">
                  {rating} stars
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-3">Features</h3>
          <div className="space-y-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox id={feature} />
                <Label htmlFor={feature} className="text-sm">
                  {feature}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
