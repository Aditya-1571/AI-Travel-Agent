"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users, ArrowLeftRight } from "lucide-react"

interface FlightSearchFormProps {
  onSearch: (searchData: any) => void
}

export function FlightSearchForm({ onSearch }: FlightSearchFormProps) {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: "1",
    class: "economy",
    tripType: "roundtrip",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchData)
  }

  const swapCities = () => {
    setSearchData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }))
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Type Selection */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="tripType"
                value="roundtrip"
                checked={searchData.tripType === "roundtrip"}
                onChange={(e) => setSearchData((prev) => ({ ...prev, tripType: e.target.value }))}
                className="text-primary"
              />
              Round Trip
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="tripType"
                value="oneway"
                checked={searchData.tripType === "oneway"}
                onChange={(e) => setSearchData((prev) => ({ ...prev, tripType: e.target.value }))}
                className="text-primary"
              />
              One Way
            </label>
          </div>

          {/* From/To Cities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Departure city or airport"
                  className="pl-10"
                  value={searchData.from}
                  onChange={(e) => setSearchData((prev) => ({ ...prev, from: e.target.value }))}
                  required
                />
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute left-1/2 top-8 transform -translate-x-1/2 z-10 bg-background border border-border rounded-full p-2 hidden md:flex"
              onClick={swapCities}
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Destination city or airport"
                  className="pl-10"
                  value={searchData.to}
                  onChange={(e) => setSearchData((prev) => ({ ...prev, to: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Departure Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-10"
                  value={searchData.departureDate}
                  onChange={(e) => setSearchData((prev) => ({ ...prev, departureDate: e.target.value }))}
                  required
                />
              </div>
            </div>

            {searchData.tripType === "roundtrip" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Return Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pl-10"
                    value={searchData.returnDate}
                    onChange={(e) => setSearchData((prev) => ({ ...prev, returnDate: e.target.value }))}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Passengers and Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Passengers</label>
              <Select
                value={searchData.passengers}
                onValueChange={(value) => setSearchData((prev) => ({ ...prev, passengers: value }))}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Adult</SelectItem>
                  <SelectItem value="2">2 Adults</SelectItem>
                  <SelectItem value="3">3 Adults</SelectItem>
                  <SelectItem value="4">4 Adults</SelectItem>
                  <SelectItem value="5">5+ Adults</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <Select
                value={searchData.class}
                onValueChange={(value) => setSearchData((prev) => ({ ...prev, class: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="premium">Premium Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full md:w-auto px-12">
            Search Flights
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
