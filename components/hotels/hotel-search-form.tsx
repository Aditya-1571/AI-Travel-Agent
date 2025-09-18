"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Users } from "lucide-react"

interface HotelSearchFormProps {
  onSearch: (searchData: any) => void
}

export function HotelSearchForm({ onSearch }: HotelSearchFormProps) {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    rooms: "1",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchData)
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Destination */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="City, hotel name, or landmark"
                  className="pl-10"
                  value={searchData.destination}
                  onChange={(e) => setSearchData((prev) => ({ ...prev, destination: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Check-in Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-10"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData((prev) => ({ ...prev, checkIn: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Check-out Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-10"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData((prev) => ({ ...prev, checkOut: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Guests & Rooms */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Guests & Rooms</label>
              <Select
                value={`${searchData.guests}-${searchData.rooms}`}
                onValueChange={(value) => {
                  const [guests, rooms] = value.split("-")
                  setSearchData((prev) => ({ ...prev, guests, rooms }))
                }}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-1">1 Guest, 1 Room</SelectItem>
                  <SelectItem value="2-1">2 Guests, 1 Room</SelectItem>
                  <SelectItem value="3-1">3 Guests, 1 Room</SelectItem>
                  <SelectItem value="4-1">4 Guests, 1 Room</SelectItem>
                  <SelectItem value="4-2">4 Guests, 2 Rooms</SelectItem>
                  <SelectItem value="6-2">6 Guests, 2 Rooms</SelectItem>
                  <SelectItem value="8-3">8 Guests, 3 Rooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full md:w-auto px-12">
            Search Hotels
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
