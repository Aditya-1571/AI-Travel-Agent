"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plane, Hotel, UtensilsCrossed, MapPin, Sparkles, Clock } from "lucide-react"
import { CurrencyConverter } from "@/lib/currency-converter"

interface AnalysisResult {
  analysis: any
  recommendations: {
    flights: any
    hotels: any
    restaurants: any
    places: any
  }
  summary?: string
}

export function AITravelAnalyzerInterface() {
  const [request, setRequest] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [activeTab, setActiveTab] = useState<"flights" | "hotels" | "restaurants" | "places">("flights")

  const handleAnalyze = async () => {
    if (!request.trim()) return

    setLoading(true)
    try {
      const analysis = await fetch("/api/ai-travel-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request }),
      })

      const data = await analysis.json()
      setResult(data)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderFlightRecommendations = () => {
    if (!result?.recommendations?.flights?.recommendations) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Plane className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No flight recommendations available</p>
          <p className="text-sm">Please try analyzing your travel request again</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {result.recommendations.flights.recommendations.map((flight: any, index: number) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-lg">{flight.airline}</h4>
                  <p className="text-sm text-gray-600">{flight.route}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {flight.departureTime} - {flight.arrivalTime}
                    </span>
                    <span>{flight.baggage}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-blue-600">{CurrencyConverter.formatINR(flight.priceINR)}</p>
                  <p className="text-sm text-gray-500">${flight.priceUSD.toLocaleString()}</p>
                  <Badge variant="outline">{flight.class}</Badge>
                </div>
              </div>
              <div className="flex gap-4 text-sm text-gray-600 mb-3">
                <span>Duration: {flight.duration}</span>
                <span>
                  Stops: {flight.stops === 0 ? "Direct" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-2">
                <span className="font-medium">Cancellation:</span> {flight.cancellation}
              </div>
              <p className="text-sm mb-3">{flight.reasoning}</p>
              <Button onClick={() => window.open(flight.bookingUrl, "_blank")} className="w-full">
                Book on {flight.airline}
              </Button>
            </CardContent>
          </Card>
        ))}

        {result.recommendations.flights.bestBookingTime && result.recommendations.flights.tips && (
          <Card className="bg-blue-50">
            <CardHeader>
              <CardTitle className="text-sm">Flight Tips & Best Booking Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 p-2 bg-blue-100 rounded text-sm">
                <span className="font-medium">💡 Best Booking Time:</span>{" "}
                {result.recommendations.flights.bestBookingTime}
              </div>
              <ul className="text-sm space-y-1">
                {result.recommendations.flights.tips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const renderHotelRecommendations = () => {
    if (!result?.recommendations?.hotels?.recommendations) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Hotel className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No hotel recommendations available</p>
          <p className="text-sm">Please try analyzing your travel request again</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {result.recommendations.hotels.recommendations.map((hotel: any, index: number) => (
          <Card key={index} className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-lg">{hotel.name}</h4>
                  <p className="text-sm text-gray-600">{hotel.location}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < hotel.rating ? "text-yellow-400" : "text-gray-300"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <Badge variant="outline">{hotel.category}</Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Check-in: {hotel.checkInTime} | Check-out: {hotel.checkOutTime}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-green-600">
                    {CurrencyConverter.formatINR(hotel.pricePerNightINR)}
                  </p>
                  <p className="text-sm text-gray-500">per night</p>
                  <p className="text-xs text-gray-400">${hotel.pricePerNightUSD}/night</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {hotel.amenities.slice(0, 4).map((amenity: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                <span className="font-medium">Cancellation:</span> {hotel.cancellationPolicy}
              </div>
              <p className="text-sm mb-3">{hotel.reasoning}</p>
              <Button onClick={() => window.open(hotel.bookingUrl, "_blank")} className="w-full">
                Book at {hotel.name}
              </Button>
            </CardContent>
          </Card>
        ))}

        {result.recommendations.hotels.neighborhoods && (
          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle className="text-sm">Neighborhood Guide</CardTitle>
            </CardHeader>
            <CardContent>
              {result.recommendations.hotels.neighborhoods.map((area: any, index: number) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium text-sm">{area.name}</h5>
                    <span className="text-xs text-green-700 font-medium">
                      Avg: {CurrencyConverter.formatINR(area.averagePriceINR)}/night
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{area.description}</p>
                  <p className="text-xs text-green-700">{area.suitability}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const renderRestaurantRecommendations = () => {
    if (!result?.recommendations?.restaurants?.recommendations) {
      return (
        <div className="text-center py-8 text-gray-500">
          <UtensilsCrossed className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No restaurant recommendations available</p>
          <p className="text-sm">Please try analyzing your travel request again</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {result.recommendations.restaurants.recommendations.map((restaurant: any, index: number) => (
          <Card key={index} className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-lg">{restaurant.name}</h4>
                  <p className="text-sm text-gray-600">{restaurant.location}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{restaurant.cuisine}</Badge>
                    <span className="text-orange-600 font-medium">
                      {CurrencyConverter.formatINR(restaurant.averageMealPriceINR)}/person
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <div>Hours: {restaurant.openingHours}</div>
                    {restaurant.phoneNumber && <div>Phone: {restaurant.phoneNumber}</div>}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {restaurant.specialties.slice(0, 3).map((specialty: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-600 mb-2">Atmosphere: {restaurant.atmosphere}</p>
              <p className="text-sm mb-3">{restaurant.reasoning}</p>
              {restaurant.reservationUrl && (
                <Button onClick={() => window.open(restaurant.reservationUrl, "_blank")} className="w-full">
                  Make Reservation
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        {result.recommendations.restaurants.foodScene && (
          <Card className="bg-orange-50">
            <CardHeader>
              <CardTitle className="text-sm">Local Food Scene & Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-orange-100 rounded">
                <h5 className="font-medium text-sm mb-2">Average Meal Costs</h5>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-medium">Street Food</div>
                    <div className="text-orange-700">
                      {CurrencyConverter.formatINR(
                        result.recommendations.restaurants.foodScene.averageMealCosts.streetFood,
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Casual Dining</div>
                    <div className="text-orange-700">
                      {CurrencyConverter.formatINR(
                        result.recommendations.restaurants.foodScene.averageMealCosts.casualDining,
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Fine Dining</div>
                    <div className="text-orange-700">
                      {CurrencyConverter.formatINR(
                        result.recommendations.restaurants.foodScene.averageMealCosts.fineDining,
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-sm mb-1">Highlights</h5>
                  <ul className="text-xs space-y-1">
                    {result.recommendations.restaurants.foodScene.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-sm mb-1">Local Specialties</h5>
                  <div className="flex flex-wrap gap-1">
                    {result.recommendations.restaurants.foodScene.localSpecialties.map(
                      (specialty: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const renderPlacesRecommendations = () => {
    if (!result?.recommendations?.places) {
      return (
        <div className="text-center py-8 text-gray-500">
          <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No places recommendations available</p>
          <p className="text-sm">Please try analyzing your travel request again</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <Card className="bg-purple-50">
          <CardHeader>
            <CardTitle className="text-sm">Budget Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-purple-100 rounded">
                <div className="text-lg font-bold text-purple-700">
                  {CurrencyConverter.formatINR(result.recommendations.places.budgetBreakdown.dailyBudgetINR)}
                </div>
                <div className="text-xs text-purple-600">Daily Budget</div>
              </div>
              <div className="text-center p-3 bg-purple-100 rounded">
                <div className="text-lg font-bold text-purple-700">
                  {CurrencyConverter.formatINR(result.recommendations.places.budgetBreakdown.totalEstimatedCostINR)}
                </div>
                <div className="text-xs text-purple-600">Total Estimated</div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-sm mb-2">💰 Cost Saving Tips</h5>
              <ul className="text-xs space-y-1">
                {result.recommendations.places.budgetBreakdown.costSavingTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardHeader>
            <CardTitle className="text-sm">Suggested Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            {result.recommendations.places.itinerary.map((day: any, index: number) => (
              <div key={index} className="mb-4 last:mb-0 p-3 bg-white rounded border">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium text-sm">
                    Day {day.day}: {day.theme}
                  </h5>
                  <span className="text-xs font-medium text-purple-700">
                    {CurrencyConverter.formatINR(day.estimatedCostINR)}
                  </span>
                </div>
                <ul className="text-xs space-y-1 mb-2">
                  {day.activities.map((activity: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      {activity}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-purple-700 mb-1">
                  <span className="font-medium">Tips:</span> {day.tips}
                </div>
                <div className="text-xs text-gray-600">
                  <span className="font-medium">🚗 Transport:</span> {day.transportationTips}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {result.recommendations.places.attractions &&
          result.recommendations.places.attractions.map((place: any, index: number) => (
            <Card key={index} className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{place.name}</h4>
                    <p className="text-sm text-gray-600">{place.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{place.type}</Badge>
                      <span className="text-sm text-gray-500">Duration: {place.duration}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      <span className="font-medium">Accessibility:</span> {place.accessibility}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">
                      {place.ticketPriceINR === 0 ? "Free" : CurrencyConverter.formatINR(place.ticketPriceINR)}
                    </p>
                    <p className="text-xs text-gray-500">Best: {place.bestTime}</p>
                  </div>
                </div>
                {place.nearbyAttractions && place.nearbyAttractions.length > 0 && (
                  <div className="mb-2">
                    <span className="text-xs font-medium text-gray-600">Nearby: </span>
                    <span className="text-xs text-gray-500">{place.nearbyAttractions.join(", ")}</span>
                  </div>
                )}
                <p className="text-sm mb-3">{place.reasoning}</p>
                {place.officialUrl && (
                  <Button onClick={() => window.open(place.officialUrl, "_blank")} className="w-full" variant="outline">
                    Visit Official Site
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Travel Analyzer
          </CardTitle>
          <p className="text-sm text-gray-600">
            Describe your travel plans and get personalized recommendations powered by AI
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Example: I'm planning a 7-day romantic trip to Paris in spring with my partner. We love art, fine dining, and want to stay in a luxury hotel near the city center. Budget is around $5000 total."
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              rows={4}
            />
            <Button onClick={handleAnalyze} disabled={loading || !request.trim()} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing your travel request...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Travel Request
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Travel Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {result.analysis ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium">Travel Type</p>
                    <Badge variant="outline">{result.analysis.travelType}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Budget</p>
                    <Badge variant="outline">{result.analysis.budget}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <Badge variant="outline">{result.analysis.duration.days} days</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Travelers</p>
                    <Badge variant="outline">
                      {result.analysis.travelers.adults}A {result.analysis.travelers.children}C
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <p>Analysis data is being processed...</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                {[
                  { key: "flights", label: "Flights", icon: Plane },
                  { key: "hotels", label: "Hotels", icon: Hotel },
                  { key: "restaurants", label: "Restaurants", icon: UtensilsCrossed },
                  { key: "places", label: "Places", icon: MapPin },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === key ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === "flights" && renderFlightRecommendations()}
              {activeTab === "hotels" && renderHotelRecommendations()}
              {activeTab === "restaurants" && renderRestaurantRecommendations()}
              {activeTab === "places" && renderPlacesRecommendations()}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
