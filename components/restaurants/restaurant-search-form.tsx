"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Clock, Users } from "lucide-react"

interface RestaurantSearchFormProps {
  searchParams: any
  setSearchParams: (params: any) => void
}

export function RestaurantSearchForm({ searchParams, setSearchParams }: RestaurantSearchFormProps) {
  const handleSearch = () => {
    console.log("[v0] Restaurant search:", searchParams)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="City or restaurant name"
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cuisine" className="text-sm font-medium">
              Cuisine Type
            </Label>
            <Select
              value={searchParams.cuisine}
              onValueChange={(value) => setSearchParams({ ...searchParams, cuisine: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="indian">Indian</SelectItem>
                <SelectItem value="mexican">Mexican</SelectItem>
                <SelectItem value="american">American</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
                <SelectItem value="mediterranean">Mediterranean</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium">
              Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                value={searchParams.date}
                onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-sm font-medium">
              Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="time"
                type="time"
                value={searchParams.time}
                onChange={(e) => setSearchParams({ ...searchParams, time: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="guests" className="text-sm font-medium">
              Guests:
            </Label>
            <Select
              value={searchParams.guests.toString()}
              onValueChange={(value) => setSearchParams({ ...searchParams, guests: Number.parseInt(value) })}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSearch} size="lg" className="px-8">
            Search Restaurants
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
