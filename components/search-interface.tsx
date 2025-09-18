"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Plane, Building, Utensils, Sparkles, Search } from "lucide-react"
import { useRouter } from "next/navigation"

export function SearchInterface() {
  const [searchType, setSearchType] = useState("flights")
  const router = useRouter()

  const handleSearch = () => {
    // Navigate to the appropriate results page based on search type
    switch (searchType) {
      case "flights":
        router.push("/flights")
        break
      case "hotels":
        router.push("/hotels")
        break
      case "restaurants":
        router.push("/restaurants")
        break
      case "places":
        router.push("/places")
        break
      default:
        router.push("/ai-assistant")
    }
  }

  const handleAIAnalyzer = () => {
    router.push("/ai-analyzer")
  }

  return (
    <section className="mb-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Search className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Plan Your Perfect Trip</h2>
        </div>
        <p className="text-muted-foreground text-lg">
          Search flights, hotels, restaurants, and attractions all in one place
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <Tabs value={searchType} onValueChange={setSearchType} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6 bg-muted">
              <TabsTrigger
                value="flights"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Plane className="h-4 w-4" />
                <span className="hidden sm:inline">Flights</span>
              </TabsTrigger>
              <TabsTrigger
                value="hotels"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Building className="h-4 w-4" />
                <span className="hidden sm:inline">Hotels</span>
              </TabsTrigger>
              <TabsTrigger
                value="restaurants"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Utensils className="h-4 w-4" />
                <span className="hidden sm:inline">Restaurants</span>
              </TabsTrigger>
              <TabsTrigger
                value="places"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Places</span>
              </TabsTrigger>
              <TabsTrigger
                value="ai-assistant"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">AI</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flights">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Departure city" className="pl-10 bg-input border-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Destination city" className="pl-10 bg-input border-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Departure</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="date" className="pl-10 bg-input border-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="1 Adult" className="pl-10 bg-input border-border" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hotels">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="City or hotel name" className="pl-10 bg-input border-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Check-in</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="date" className="pl-10 bg-input border-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Check-out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="date" className="pl-10 bg-input border-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="2 Adults, 1 Room" className="pl-10 bg-input border-border" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="restaurants">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="City or area" className="pl-10 bg-input border-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Cuisine Type</label>
                  <Input placeholder="Italian, Asian, etc." className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Date & Time</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="datetime-local" className="pl-10 bg-input border-border" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="places">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="City or region" className="pl-10 bg-input border-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Interest Type</label>
                  <Input placeholder="Museums, Parks, Landmarks, etc." className="bg-input border-border" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai-assistant">
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-card-foreground">Describe Your Trip</label>
                  <Input
                    placeholder="I want to go to Paris for a weekend with my family..."
                    className="bg-input border-border h-12"
                  />
                </div>
              </div>
            </TabsContent>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-12 py-3 text-lg bg-primary hover:bg-primary/90" onClick={handleSearch}>
                <Search className="mr-2 h-5 w-5" />
                Search with AI
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-lg border-border hover:bg-muted bg-transparent"
                onClick={handleAIAnalyzer}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                AI Travel Analyzer
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}
