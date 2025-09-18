"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Car, Bike, Bus, PersonStanding, Plane, Train, CheckCircle } from "lucide-react"

interface DetectedTrip {
  id: string
  detectedMode: string
  confidence: number
  actualMode?: string
  corrected: boolean
}

export default function ModeDetectionPage() {
  const [trips, setTrips] = useState<DetectedTrip[]>([
    {
      id: "1",
      detectedMode: "Car",
      confidence: 85,
      corrected: false,
    },
    {
      id: "2",
      detectedMode: "Walking",
      confidence: 92,
      corrected: false,
    },
    {
      id: "3",
      detectedMode: "Bus",
      confidence: 78,
      corrected: false,
    },
  ])

  const [selectedCorrection, setSelectedCorrection] = useState<string>("")
  const [correctingTripId, setCorrectingTripId] = useState<string | null>(null)

  const transportModes = [
    { value: "Car", label: "Car", icon: Car },
    { value: "Bike", label: "Bike", icon: Bike },
    { value: "Bus", label: "Bus", icon: Bus },
    { value: "Walking", label: "Walking", icon: PersonStanding },
    { value: "Train", label: "Train", icon: Train },
    { value: "Plane", label: "Plane", icon: Plane },
  ]

  const startCorrection = (tripId: string) => {
    setCorrectingTripId(tripId)
    const trip = trips.find((t) => t.id === tripId)
    setSelectedCorrection(trip?.detectedMode || "")
  }

  const saveCorrection = () => {
    if (correctingTripId && selectedCorrection) {
      setTrips((prev) =>
        prev.map((trip) =>
          trip.id === correctingTripId ? { ...trip, actualMode: selectedCorrection, corrected: true } : trip,
        ),
      )
      setCorrectingTripId(null)
      setSelectedCorrection("")
    }
  }

  const cancelCorrection = () => {
    setCorrectingTripId(null)
    setSelectedCorrection("")
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-500"
    if (confidence >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 90) return "High"
    if (confidence >= 70) return "Medium"
    return "Low"
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mode Detection</h1>
        <p className="text-muted-foreground">Review and correct automatically detected travel modes</p>
      </div>

      {/* Smart Nudge Screen */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Smart Nudge System</CardTitle>
          <CardDescription>Help improve our AI by confirming or correcting detected travel modes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {trips.map((trip) => (
            <div key={trip.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-medium">
                    Detected: <Badge variant="secondary">{trip.detectedMode}</Badge>
                  </div>
                  <div className={`text-sm ${getConfidenceColor(trip.confidence)}`}>
                    {getConfidenceLabel(trip.confidence)} confidence ({trip.confidence}%)
                  </div>
                  {trip.corrected && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Corrected</span>
                    </div>
                  )}
                </div>

                {!trip.corrected && correctingTripId !== trip.id && (
                  <Button variant="outline" size="sm" onClick={() => startCorrection(trip.id)}>
                    Correct Mode
                  </Button>
                )}
              </div>

              {trip.corrected && trip.actualMode && (
                <div className="text-sm text-muted-foreground">
                  Corrected to: <Badge variant="default">{trip.actualMode}</Badge>
                </div>
              )}

              {correctingTripId === trip.id && (
                <div className="space-y-4 border-t border-border pt-4">
                  <h4 className="font-medium">What was your actual mode of transport?</h4>
                  <RadioGroup value={selectedCorrection} onValueChange={setSelectedCorrection}>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {transportModes.map((mode) => (
                        <div key={mode.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={mode.value} id={mode.value} />
                          <Label htmlFor={mode.value} className="flex items-center gap-2 cursor-pointer">
                            <mode.icon className="h-4 w-4" />
                            {mode.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                  <div className="flex gap-2">
                    <Button onClick={saveCorrection} disabled={!selectedCorrection}>
                      Save Correction
                    </Button>
                    <Button variant="outline" onClick={cancelCorrection}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Detection Statistics */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Detection Accuracy</CardTitle>
          <CardDescription>How well our AI is performing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">87%</div>
              <div className="text-sm text-muted-foreground">Overall Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{trips.filter((t) => t.corrected).length}</div>
              <div className="text-sm text-muted-foreground">Corrections Made</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{trips.length}</div>
              <div className="text-sm text-muted-foreground">Total Trips</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
