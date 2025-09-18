"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface PlacesFiltersProps {
  filters: any
  setFilters: (filters: any) => void
}

export function PlacesFilters({ filters, setFilters }: PlacesFiltersProps) {
  const categories = [
    "Attractions",
    "Museums",
    "Outdoor Activities",
    "Entertainment",
    "Shopping",
    "Tours & Experiences",
    "Nightlife",
    "Cultural Sites",
  ]

  const durations = ["1-2 hours", "2-4 hours", "4-8 hours", "Full day", "Multi-day"]

  const budgets = ["Free", "Under $25", "$25 - $75", "$75 - $150", "$150+"]

  const features = [
    "Family Friendly",
    "Wheelchair Accessible",
    "Audio Guide",
    "Group Discounts",
    "Online Booking",
    "Skip the Line",
    "Photography Allowed",
    "Gift Shop",
    "Parking Available",
    "Public Transport",
    "Guided Tours",
    "Self-Guided",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Places</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={category} />
                <Label htmlFor={category} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-3">Duration</h3>
          <div className="space-y-2">
            {durations.map((duration) => (
              <div key={duration} className="flex items-center space-x-2">
                <Checkbox id={duration} />
                <Label htmlFor={duration} className="text-sm">
                  {duration}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-3">Budget</h3>
          <div className="space-y-2">
            {budgets.map((budget) => (
              <div key={budget} className="flex items-center space-x-2">
                <Checkbox id={budget} />
                <Label htmlFor={budget} className="text-sm">
                  {budget}
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
