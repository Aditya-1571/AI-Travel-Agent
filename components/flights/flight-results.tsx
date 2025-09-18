"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FlightDetailsModal } from "./flight-details-modal"

interface FlightResultsProps {
  results: any[]
  filters: any
}

export function FlightResults({ results, filters }: FlightResultsProps) {
  const [selectedFlight, setSelectedFlight] = useState(null)

  const filteredResults = results.filter((flight) => {
    if (flight.price < filters.priceRange[0] || flight.price > filters.priceRange[1]) return false
    if (filters.stops !== "any" && flight.stops > Number.parseInt(filters.stops)) return false
    if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline.name)) return false
    return true
  })

  const getAirlineLogo = (airlineName: string) => {
    const logos: { [key: string]: string } = {
      IndiGo: "/indigo-airline-logo-blue.jpg",
      "Air India": "/air-india-airline-logo-red.jpg",
      SpiceJet: "/spicejet-airline-logo-red.jpg",
      Vistara: "/vistara-airline-logo-purple.jpg",
      GoAir: "/goair-airline-logo-orange.jpg",
    }
    return logos[airlineName] || "/abstract-airline-logo.png"
  }

  return (
    <div className="space-y-4">
      {filteredResults.map((flight) => (
        <Card key={flight.id} className="hover:shadow-md transition-shadow border border-gray-200">
          <CardContent className="p-6">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-300 rounded-sm flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Kolkata (CCU) - Mumbai (BOM)</div>
                  <div className="text-sm font-medium text-gray-800">{flight.airline.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Roundtrip per traveler</div>
                <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-normal">
                  Flight details
                </Button>
              </div>
            </div>

            {/* Main Flight Info Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Airline Logo */}
                <div className="flex items-center">
                  <img
                    src={getAirlineLogo(flight.airline.name) || "/placeholder.svg"}
                    alt={flight.airline.name}
                    className="w-8 h-8 rounded object-contain"
                  />
                </div>

                {/* Flight Times and Route */}
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{flight.departure.time}</div>
                    <div className="text-sm text-gray-600">Kolkata (CCU) - Mumbai (BOM)</div>
                    <div className="text-sm text-gray-600">{flight.airline.name}</div>
                  </div>

                  {/* Flight Path Visualization */}
                  <div className="flex items-center gap-2 px-4">
                    <div className="w-12 h-px bg-gray-300"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-12 h-px bg-gray-300"></div>
                  </div>

                  <div>
                    <div className="text-lg font-bold text-gray-900">{flight.arrival.time}</div>
                  </div>
                </div>

                {/* Duration and Stops Info */}
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {flight.duration} • {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop`}
                  </div>
                  {flight.stops > 0 && flight.layover && (
                    <div className="text-xs text-gray-500 mt-1">{flight.layover}</div>
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{flight.priceFormatted}</div>
                <div className="text-sm text-gray-500">Roundtrip per traveler</div>
                <Button
                  variant="link"
                  className="text-blue-600 p-0 h-auto text-sm font-normal mt-1"
                  onClick={() => setSelectedFlight(flight)}
                >
                  Flight details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Flight Details Modal */}
      {selectedFlight && (
        <FlightDetailsModal flight={selectedFlight} isOpen={!!selectedFlight} onClose={() => setSelectedFlight(null)} />
      )}
    </div>
  )
}
