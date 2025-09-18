"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Clock, Star, Utensils, Camera, Plane, Download, BookOpen } from "lucide-react"

interface ItineraryDay {
  day: number
  date: string
  activities: {
    time: string
    title: string
    description: string
    type: "attraction" | "restaurant" | "hotel" | "transport"
    duration: string
    cost: string
    rating?: number
  }[]
}

export function AIItineraryPlanner() {
  const [selectedDestination, setSelectedDestination] = useState("tokyo")

  const itineraries: { [key: string]: ItineraryDay[] } = {
    tokyo: [
      {
        day: 1,
        date: "March 15, 2024",
        activities: [
          {
            time: "9:00 AM",
            title: "Arrive at Narita Airport",
            description: "Land and take the Narita Express to Shibuya Station",
            type: "transport",
            duration: "1.5 hours",
            cost: "$10",
          },
          {
            time: "12:00 PM",
            title: "Check-in at Shibuya Sky Hotel",
            description: "Modern hotel with panoramic city views in the heart of Tokyo",
            type: "hotel",
            duration: "30 minutes",
            cost: "$180/night",
            rating: 4.6,
          },
          {
            time: "1:30 PM",
            title: "Lunch at Ichiran Ramen Shibuya",
            description: "Famous tonkotsu ramen with customizable flavor intensity",
            type: "restaurant",
            duration: "1 hour",
            cost: "$12",
            rating: 4.4,
          },
          {
            time: "3:00 PM",
            title: "Explore Shibuya Crossing & Hachiko Statue",
            description: "World's busiest pedestrian crossing and loyal dog memorial",
            type: "attraction",
            duration: "2 hours",
            cost: "Free",
            rating: 4.7,
          },
        ],
      },
      {
        day: 2,
        date: "March 16, 2024",
        activities: [
          {
            time: "9:00 AM",
            title: "Visit Senso-ji Temple",
            description: "Tokyo's oldest Buddhist temple in historic Asakusa district",
            type: "attraction",
            duration: "2 hours",
            cost: "Free",
            rating: 4.8,
          },
          {
            time: "12:00 PM",
            title: "Traditional Lunch at Daikokuya Tempura",
            description: "Authentic tempura restaurant established in 1887",
            type: "restaurant",
            duration: "1.5 hours",
            cost: "$35",
            rating: 4.6,
          },
          {
            time: "2:30 PM",
            title: "Tokyo Skytree Observation Deck",
            description: "Panoramic city views from 634m tower with shopping complex",
            type: "attraction",
            duration: "2.5 hours",
            cost: "$25",
            rating: 4.5,
          },
        ],
      },
      {
        day: 3,
        date: "March 17, 2024",
        activities: [
          {
            time: "9:30 AM",
            title: "Meiji Shrine",
            description: "Peaceful Shinto shrine dedicated to Emperor Meiji in Shibuya forest",
            type: "attraction",
            duration: "2 hours",
            cost: "Free",
            rating: 4.7,
          },
          {
            time: "12:30 PM",
            title: "Harajuku Street Food Tour",
            description: "Explore Takeshita Street's colorful food scene and crepes",
            type: "restaurant",
            duration: "2 hours",
            cost: "$25",
            rating: 4.5,
          },
          {
            time: "3:00 PM",
            title: "Omotesando Hills Shopping",
            description: "Luxury shopping complex with architectural spiral design",
            type: "attraction",
            duration: "2 hours",
            cost: "$0-200",
            rating: 4.3,
          },
        ],
      },
    ],
    paris: [
      {
        day: 1,
        date: "April 10, 2024",
        activities: [
          {
            time: "10:00 AM",
            title: "Arrive at Charles de Gaulle Airport",
            description: "Take RER B train to central Paris",
            type: "transport",
            duration: "1 hour",
            cost: "$12",
          },
          {
            time: "2:00 PM",
            title: "Check-in at Hotel Plaza Athénée",
            description: "Luxury hotel on Avenue Montaigne with Eiffel Tower views",
            type: "hotel",
            duration: "30 minutes",
            cost: "$800/night",
            rating: 4.9,
          },
          {
            time: "4:00 PM",
            title: "Louvre Museum",
            description: "World's largest art museum, home to Mona Lisa and Venus de Milo",
            type: "attraction",
            duration: "3 hours",
            cost: "$18",
            rating: 4.8,
          },
        ],
      },
      {
        day: 2,
        date: "April 11, 2024",
        activities: [
          {
            time: "9:00 AM",
            title: "Eiffel Tower & Trocadéro",
            description: "Iconic iron tower with best photo spots from Trocadéro Gardens",
            type: "attraction",
            duration: "2.5 hours",
            cost: "$30",
            rating: 4.7,
          },
          {
            time: "1:00 PM",
            title: "Lunch at Le Comptoir du Relais",
            description: "Traditional French bistro in Saint-Germain-des-Prés",
            type: "restaurant",
            duration: "1.5 hours",
            cost: "$45",
            rating: 4.6,
          },
        ],
      },
    ],
  }

  const destinations = [
    { value: "tokyo", label: "Tokyo, Japan", days: 7, budget: "$1,200" },
    { value: "paris", label: "Paris, France", days: 5, budget: "$1,800" },
  ]

  const currentDestination = destinations.find((d) => d.value === selectedDestination)
  const currentItinerary = itineraries[selectedDestination] || []

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "attraction":
        return Camera
      case "restaurant":
        return Utensils
      case "hotel":
        return MapPin
      case "transport":
        return Plane
      default:
        return MapPin
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "attraction":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "restaurant":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "hotel":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "transport":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleCustomizeItinerary = () => {
    alert("Customization feature coming soon! You'll be able to modify activities, timing, and preferences.")
  }

  const handleExportPDF = () => {
    alert("PDF export feature coming soon! Your itinerary will be formatted for easy printing and sharing.")
  }

  const handleBookTrip = () => {
    alert("Booking integration coming soon! You'll be able to book hotels, flights, and activities directly.")
  }

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          AI-Generated Itinerary
        </CardTitle>
        <div className="flex items-center gap-4 mt-2">
          <Select value={selectedDestination} onValueChange={setSelectedDestination}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((dest) => (
                <SelectItem key={dest.value} value={dest.value}>
                  {dest.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-muted-foreground text-sm">
          Personalized {currentDestination?.days}-day itinerary based on your preferences for culture, food, and
          sightseeing
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4 overflow-hidden">
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">{currentDestination?.days} Days</Badge>
            <Badge variant="outline">Cultural Focus</Badge>
            <Badge variant="outline">Budget: {currentDestination?.budget}</Badge>
          </div>
          <Button variant="outline" size="sm" onClick={handleCustomizeItinerary}>
            Customize Itinerary
          </Button>
        </div>

        <Separator className="flex-shrink-0" />

        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {currentItinerary.map((day) => (
            <div key={day.day} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  {day.day}
                </div>
                <div>
                  <h3 className="font-semibold">Day {day.day}</h3>
                  <p className="text-sm text-muted-foreground">{day.date}</p>
                </div>
              </div>

              <div className="ml-11 space-y-3">
                {day.activities.map((activity, index) => {
                  const IconComponent = getActivityIcon(activity.type)
                  return (
                    <div key={index} className="flex gap-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center gap-2 flex-shrink-0">
                        <div className={`p-2 rounded-full border ${getActivityColor(activity.type)}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">{activity.time}</span>
                      </div>

                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium truncate">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
                          </div>
                          {activity.rating && (
                            <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{activity.rating}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{activity.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-primary">{activity.cost}</span>
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">
                            {activity.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <Separator className="flex-shrink-0" />

        <div className="flex items-center justify-between flex-shrink-0">
          <div className="text-sm text-muted-foreground">
            This itinerary was generated based on your preferences and can be customized
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="h-4 w-4 mr-1" />
              Export PDF
            </Button>
            <Button size="sm" onClick={handleBookTrip}>
              <BookOpen className="h-4 w-4 mr-1" />
              Book This Trip
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
