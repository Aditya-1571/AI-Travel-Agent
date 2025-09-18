"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Square, MapPin, Clock, Activity } from "lucide-react"

interface TripData {
  id: string
  startTime: Date
  endTime?: Date
  distance: number
  duration: number
  detectedMode: string
  isActive: boolean
}

export default function TripLoggerPage() {
  const [isTracking, setIsTracking] = useState(false)
  const [currentTrip, setCurrentTrip] = useState<TripData | null>(null)
  const [trips, setTrips] = useState<TripData[]>([])
  const [startTime, setStartTime] = useState<Date | null>(null)

  // Simulate GPS and accelerometer data collection
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isTracking && currentTrip) {
      interval = setInterval(() => {
        // Simulate distance and duration updates
        setCurrentTrip((prev) =>
          prev
            ? {
                ...prev,
                distance: prev.distance + Math.random() * 0.1,
                duration: Date.now() - prev.startTime.getTime(),
              }
            : null,
        )
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking, currentTrip])

  const startTrip = () => {
    const now = new Date()
    const newTrip: TripData = {
      id: Date.now().toString(),
      startTime: now,
      distance: 0,
      duration: 0,
      detectedMode: "Detecting...",
      isActive: true,
    }

    setCurrentTrip(newTrip)
    setIsTracking(true)
    setStartTime(now)

    // Simulate mode detection after 3 seconds
    setTimeout(() => {
      const modes = ["Walking", "Vehicle", "Cycling", "Bus"]
      const detectedMode = modes[Math.floor(Math.random() * modes.length)]
      setCurrentTrip((prev) => (prev ? { ...prev, detectedMode } : null))
    }, 3000)
  }

  const stopTrip = () => {
    if (currentTrip) {
      const endedTrip = {
        ...currentTrip,
        endTime: new Date(),
        isActive: false,
      }

      setTrips((prev) => [endedTrip, ...prev])
      setCurrentTrip(null)
    }

    setIsTracking(false)
    setStartTime(null)
  }

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`
    } else {
      return `${seconds}s`
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Trip Logger</h1>
        <p className="text-muted-foreground">Track your journeys with automatic mode detection</p>
      </div>

      {/* Active Trip Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Current Trip
          </CardTitle>
          <CardDescription>{isTracking ? "Trip in progress..." : "Start a new trip to begin tracking"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentTrip && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{formatDuration(currentTrip.duration)}</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{currentTrip.distance.toFixed(2)} km</div>
                <div className="text-sm text-muted-foreground">Distance</div>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="text-sm">
                  {currentTrip.detectedMode}
                </Badge>
                <div className="text-sm text-muted-foreground mt-1">Mode</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <MapPin className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">Active</span>
                </div>
                <div className="text-sm text-muted-foreground">Status</div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            {!isTracking ? (
              <Button onClick={startTrip} size="lg" className="bg-green-600 hover:bg-green-700">
                <Play className="h-5 w-5 mr-2" />
                Start Trip
              </Button>
            ) : (
              <Button onClick={stopTrip} size="lg" variant="destructive">
                <Square className="h-5 w-5 mr-2" />
                Stop Trip
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trip History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Trip History
          </CardTitle>
          <CardDescription>Your recent journeys</CardDescription>
        </CardHeader>
        <CardContent>
          {trips.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No trips recorded yet. Start your first trip above!
            </div>
          ) : (
            <div className="space-y-4">
              {trips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <div className="font-medium">
                        {trip.startTime.toLocaleDateString()} at {trip.startTime.toLocaleTimeString()}
                      </div>
                      <div className="text-muted-foreground">
                        {formatDuration(trip.duration)} • {trip.distance.toFixed(2)} km
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{trip.detectedMode}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
