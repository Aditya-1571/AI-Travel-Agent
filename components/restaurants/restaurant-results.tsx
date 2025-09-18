"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Phone, Heart } from "lucide-react"
import { RestaurantDetailsModal } from "./restaurant-details-modal"
import Image from "next/image"

interface RestaurantResultsProps {
  searchParams: any
  filters: any
}

export function RestaurantResults({ searchParams, filters }: RestaurantResultsProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null)

  const restaurants = [
    {
      id: 1,
      name: "Le Bernardin",
      cuisine: "French Seafood",
      rating: 4.8,
      reviews: 2847,
      priceRange: "$$$$",
      image: "/restaurant-fine-dining.png",
      address: "155 West 51st Street, New York, NY 10019",
      phone: "+1 (212) 554-1515",
      website: "le-bernardin.com",
      hours: "5:30 PM - 10:30 PM",
      description: "Elegant French seafood restaurant with impeccable service and world-class cuisine.",
      features: ["Fine Dining", "Reservations Required", "Wine Pairing", "Private Dining"],
      coordinates: { lat: 40.7614, lng: -73.9776 },
      menu: [
        { category: "Appetizers", items: ["Tuna Tartare", "Oyster Selection", "Lobster Bisque"] },
        { category: "Main Courses", items: ["Black Bass", "Halibut", "Lobster Thermidor"] },
        { category: "Desserts", items: ["Chocolate Soufflé", "Lemon Tart", "Cheese Selection"] },
      ],
    },
    {
      id: 2,
      name: "Nobu Malibu",
      cuisine: "Japanese",
      rating: 4.6,
      reviews: 1923,
      priceRange: "$$$",
      image: "/restaurant-japanese.png",
      address: "22706 Pacific Coast Highway, Malibu, CA 90265",
      phone: "+1 (310) 317-9140",
      website: "noburestaurants.com",
      hours: "5:00 PM - 11:00 PM",
      description: "Oceanfront Japanese restaurant with innovative sushi and spectacular Pacific views.",
      features: ["Ocean View", "Sushi Bar", "Sake Selection", "Outdoor Seating"],
      coordinates: { lat: 34.0259, lng: -118.7798 },
      menu: [
        { category: "Sushi", items: ["Yellowtail Jalapeño", "Black Cod Miso", "Toro Tartare"] },
        { category: "Hot Dishes", items: ["Miso Glazed Cod", "Wagyu Beef", "Rock Shrimp Tempura"] },
        { category: "Desserts", items: ["Green Tea Ice Cream", "Chocolate Bento Box"] },
      ],
    },
    {
      id: 3,
      name: "Osteria Francescana",
      cuisine: "Italian",
      rating: 4.9,
      reviews: 1456,
      priceRange: "$$$$",
      image: "/restaurant-italian.png",
      address: "Via Stella 22, 41121 Modena, Italy",
      phone: "+39 059 210118",
      website: "osteriafrancescana.it",
      hours: "7:30 PM - 11:00 PM",
      description: "Three Michelin-starred Italian restaurant showcasing the finest Emilian cuisine.",
      features: ["Michelin Stars", "Wine Cellar", "Tasting Menu", "Chef's Table"],
      coordinates: { lat: 44.6471, lng: 10.9252 },
      menu: [
        { category: "Antipasti", items: ["Tortellini in Brodo", "Parmigiano Reggiano", "Prosciutto di Parma"] },
        { category: "Primi", items: ["Risotto Amarone", "Tagliatelle al Ragù", "Cappelletti"] },
        { category: "Secondi", items: ["Osso Buco", "Cotechino", "Bollito Misto"] },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Found {restaurants.length} restaurants</h2>
        <select className="px-4 py-2 border rounded-lg">
          <option>Sort by: Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Rating: High to Low</option>
          <option>Distance</option>
        </select>
      </div>

      <div className="grid gap-6">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="relative h-48 md:h-full">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                  <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="md:col-span-2 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{restaurant.name}</h3>
                      <p className="text-muted-foreground">{restaurant.cuisine}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{restaurant.rating}</span>
                        <span className="text-muted-foreground">({restaurant.reviews})</span>
                      </div>
                      <Badge variant="secondary">{restaurant.priceRange}</Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{restaurant.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{restaurant.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{restaurant.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{restaurant.phone}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={() => setSelectedRestaurant(restaurant)}>
                      View Details
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button size="sm">Make Reservation</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRestaurant && (
        <RestaurantDetailsModal
          restaurant={selectedRestaurant}
          isOpen={!!selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  )
}
