"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, IndianRupee, Loader2 } from "lucide-react"

interface PlacesSearchFormProps {
  searchParams: any
  setSearchParams: (params: any) => void
  onSearch: () => void
  isLoading: boolean
}

export function PlacesSearchForm({ searchParams, setSearchParams, onSearch, isLoading }: PlacesSearchFormProps) {
  const handleSearch = () => {
    onSearch()
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-sm font-medium">
              Destination
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="destination"
                placeholder="Where do you want to go?"
                value={searchParams.destination}
                onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Category
            </Label>
            <Select
              value={searchParams.category}
              onValueChange={(value) => setSearchParams({ ...searchParams, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="attractions">Attractions</SelectItem>
                <SelectItem value="museums">Museums</SelectItem>
                <SelectItem value="outdoor">Outdoor Activities</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="tours">Tours & Experiences</SelectItem>
                <SelectItem value="nightlife">Nightlife</SelectItem>
                <SelectItem value="cultural">Cultural Sites</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm font-medium">
              Duration
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Select
                value={searchParams.duration}
                onValueChange={(value) => setSearchParams({ ...searchParams, duration: value })}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Any duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2h">1-2 hours</SelectItem>
                  <SelectItem value="2-4h">2-4 hours</SelectItem>
                  <SelectItem value="4-8h">4-8 hours</SelectItem>
                  <SelectItem value="full-day">Full day</SelectItem>
                  <SelectItem value="multi-day">Multi-day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-sm font-medium">
              Budget (INR)
            </Label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Select
                value={searchParams.budget}
                onValueChange={(value) => setSearchParams({ ...searchParams, budget: value })}
              >
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder="Any budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="budget">Under ₹2,100</SelectItem>
                  <SelectItem value="moderate">₹2,100 - ₹6,200</SelectItem>
                  <SelectItem value="premium">₹6,200 - ₹12,500</SelectItem>
                  <SelectItem value="luxury">₹12,500+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSearch} size="lg" className="px-8" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              "Search Places"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
