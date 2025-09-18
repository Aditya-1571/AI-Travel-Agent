"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Plane, Clock, Phone, Download, Star } from "lucide-react"

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const bookings = {
    upcoming: [
      {
        id: "FLIGHT123456",
        type: "flight",
        status: "confirmed",
        title: "New York → London",
        subtitle: "American Airlines AA100",
        date: "March 20, 2024",
        time: "8:30 PM - 7:45 AM+1",
        details: "Economy Class • 1 Passenger",
        price: "$899.00",
        image: "/american-airlines-logo.png",
      },
      {
        id: "HOTEL789012",
        type: "hotel",
        status: "confirmed",
        title: "The Ritz-Carlton New York",
        subtitle: "Central Park View",
        date: "March 21-24, 2024",
        time: "Check-in: 3:00 PM",
        details: "Deluxe Room • 3 nights • 2 guests",
        price: "$2,697.00",
        image: "/luxury-hotel-exterior.png",
      },
      {
        id: "REST345678",
        type: "restaurant",
        status: "confirmed",
        title: "Le Bernardin",
        subtitle: "Fine Dining Experience",
        date: "March 22, 2024",
        time: "7:30 PM",
        details: "Table for 2 • Tasting Menu",
        price: "Reservation",
        image: "/restaurant-fine-dining.png",
      },
    ],
    past: [
      {
        id: "PLACE901234",
        type: "place",
        status: "completed",
        title: "Eiffel Tower",
        subtitle: "Skip-the-Line Tickets",
        date: "February 15, 2024",
        time: "2:00 PM",
        details: "2 Adult Tickets • Summit Access",
        price: "$58.00",
        image: "/eiffel-tower.png",
      },
    ],
    cancelled: [],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="h-4 w-4" />
      case "hotel":
      case "restaurant":
      case "place":
        return <MapPin className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">My Bookings</h1>
          <p className="text-lg text-muted-foreground">Manage and view all your travel bookings in one place</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({bookings.upcoming.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({bookings.past.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({bookings.cancelled.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {bookings.upcoming.length > 0 ? (
              <div className="grid gap-6">
                {bookings.upcoming.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                        <div className="relative h-32 md:h-full">
                          <img
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge className={`absolute top-2 left-2 ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </Badge>
                        </div>

                        <div className="md:col-span-2 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {getTypeIcon(booking.type)}
                                <h3 className="text-lg font-bold">{booking.title}</h3>
                              </div>
                              <p className="text-muted-foreground">{booking.subtitle}</p>
                              <p className="text-sm text-muted-foreground mt-1">Booking Reference: {booking.id}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{booking.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{booking.details}</p>
                          </div>
                        </div>

                        <div className="p-6 bg-muted/50 flex flex-col justify-between">
                          <div className="text-right mb-4">
                            <p className="text-2xl font-bold text-primary">{booking.price}</p>
                          </div>

                          <div className="space-y-2">
                            <Button size="sm" className="w-full">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            {booking.type === "restaurant" && (
                              <Button variant="outline" size="sm" className="w-full bg-transparent">
                                <Phone className="h-4 w-4 mr-2" />
                                Call Restaurant
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                  <p className="text-muted-foreground mb-4">Start planning your next adventure!</p>
                  <Button>Browse Destinations</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {bookings.past.length > 0 ? (
              <div className="grid gap-6">
                {bookings.past.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden opacity-75">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                        <div className="relative h-32 md:h-full">
                          <img
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.title}
                            className="w-full h-full object-cover"
                          />
                          <Badge className={`absolute top-2 left-2 ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </Badge>
                        </div>

                        <div className="md:col-span-2 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {getTypeIcon(booking.type)}
                                <h3 className="text-lg font-bold">{booking.title}</h3>
                              </div>
                              <p className="text-muted-foreground">{booking.subtitle}</p>
                              <p className="text-sm text-muted-foreground mt-1">Booking Reference: {booking.id}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{booking.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{booking.details}</p>
                          </div>
                        </div>

                        <div className="p-6 bg-muted/50 flex flex-col justify-between">
                          <div className="text-right mb-4">
                            <p className="text-2xl font-bold text-primary">{booking.price}</p>
                          </div>

                          <div className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              <Download className="h-4 w-4 mr-2" />
                              Download Receipt
                            </Button>
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              <Star className="h-4 w-4 mr-2" />
                              Leave Review
                            </Button>
                            <Button variant="outline" size="sm" className="w-full bg-transparent">
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No past bookings</h3>
                  <p className="text-muted-foreground">Your completed trips will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-6">
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No cancelled bookings</h3>
                <p className="text-muted-foreground">Cancelled bookings will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
