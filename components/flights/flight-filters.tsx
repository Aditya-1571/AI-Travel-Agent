"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Sun, Sunrise, Sunset, Moon } from "lucide-react"

interface FlightFiltersProps {
  filters: any
  onFiltersChange: (filters: any) => void
}

export function FlightFilters({ filters, onFiltersChange }: FlightFiltersProps) {
  const layoverAirports = [
    { code: "DEL", name: "Delhi", count: 3, price: 13945 }, // ₹13,945 (≈$167)
    { code: "HYD", name: "Hyderabad", count: 3, price: 11690 }, // ₹11,690 (≈$140)
    { code: "AMD", name: "Ahmedabad", count: 2, price: 12355 }, // ₹12,355 (≈$148)
    { code: "BLR", name: "Bengaluru", count: 1, price: 11690 }, // ₹11,690 (≈$140)
    { code: "GOI", name: "Goa", count: 1, price: 28645 }, // ₹28,645 (≈$343)
    { code: "IXR", name: "Ranchi", count: 1, price: 18056 }, // ₹18,056 (≈$216)
  ]

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const timeSlots = [
    { id: "early-morning", label: "Early Morning", time: "12:00am - 4:59am", icon: Moon },
    { id: "morning", label: "Morning", time: "5:00am - 11:59am", icon: Sunrise },
    { id: "afternoon", label: "Afternoon", time: "12:00pm - 5:59pm", icon: Sun },
    { id: "evening", label: "Evening", time: "6:00pm - 11:59pm", icon: Sunset },
  ]

  return (
    <div className="space-y-6">
      {/* Total Travel Time */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Total travel time</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Under 7h</span>
            </div>
            <Slider value={[7]} max={24} min={1} step={1} className="mb-2" />
          </div>
        </CardContent>
      </Card>

      {/* Departure Time */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Departure time in Kolkata</h3>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.slice(0, 3).map((slot) => {
              const Icon = slot.icon
              return (
                <Button
                  key={slot.id}
                  variant={filters.departureTime === slot.id ? "default" : "outline"}
                  className="h-auto p-3 flex flex-col items-center gap-2"
                  onClick={() => updateFilter("departureTime", slot.id)}
                >
                  <Icon className="h-5 w-5" />
                  <div className="text-center">
                    <div className="text-sm font-medium">{slot.label}</div>
                    <div className="text-xs text-muted-foreground">({slot.time})</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Arrival Time */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Arrival time in Mumbai</h3>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => {
              const Icon = slot.icon
              return (
                <Button
                  key={slot.id}
                  variant={filters.arrivalTime === slot.id ? "default" : "outline"}
                  className="h-auto p-3 flex flex-col items-center gap-2"
                  onClick={() => updateFilter("arrivalTime", slot.id)}
                >
                  <Icon className="h-5 w-5" />
                  <div className="text-center">
                    <div className="text-sm font-medium">{slot.label}</div>
                    <div className="text-xs text-muted-foreground">({slot.time})</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Layover Airports */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Layover airport</h3>
            <span className="text-sm font-medium">From</span>
          </div>
          <div className="space-y-3">
            {layoverAirports.map((airport) => (
              <div key={airport.code} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={airport.code}
                    checked={filters.layoverAirports?.includes(airport.code)}
                    onCheckedChange={(checked) => {
                      const current = filters.layoverAirports || []
                      if (checked) {
                        updateFilter("layoverAirports", [...current, airport.code])
                      } else {
                        updateFilter(
                          "layoverAirports",
                          current.filter((a: string) => a !== airport.code),
                        )
                      }
                    }}
                  />
                  <label htmlFor={airport.code} className="text-sm cursor-pointer">
                    <span className="font-medium">{airport.code}</span> ({airport.name}) ({airport.count})
                  </label>
                </div>
                <span className="text-sm font-medium text-blue-600">₹{airport.price.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
