"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, CheckCircle, Plane, MapPin } from "lucide-react"

interface BookingFlowProps {
  type: "flight" | "hotel" | "restaurant" | "place"
  item: any
  onClose: () => void
}

export function BookingFlow({ type, item, onClose }: BookingFlowProps) {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Travel Details
    passengers: 1,
    rooms: 1,
    guests: 2,
    specialRequests: "",

    // Payment Information
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",

    // Booking Options
    insurance: false,
    newsletter: false,
    terms: false,
  })

  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingReference, setBookingReference] = useState("")

  const handleInputChange = (field: string, value: any) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleConfirmBooking()
    }
  }

  const handleConfirmBooking = () => {
    // Generate booking reference
    const reference = `${type.toUpperCase()}${Date.now().toString().slice(-6)}`
    setBookingReference(reference)
    setBookingConfirmed(true)

    // Here you would typically send the booking data to your API
    console.log("[v0] Booking confirmed:", { reference, type, item, bookingData })
  }

  const getBookingTitle = () => {
    switch (type) {
      case "flight":
        return `${item.departure_city} → ${item.arrival_city}`
      case "hotel":
        return item.name
      case "restaurant":
        return `Table at ${item.name}`
      case "place":
        return `Tickets for ${item.name}`
      default:
        return "Booking"
    }
  }

  const getBookingPrice = () => {
    switch (type) {
      case "flight":
        return item.price_economy * bookingData.passengers
      case "hotel":
        return item.rooms?.[0]?.price_per_night * bookingData.rooms || 0
      case "restaurant":
        return 0 // Restaurants typically don't charge for reservations
      case "place":
        return item.ticket_price * bookingData.guests
      default:
        return 0
    }
  }

  if (bookingConfirmed) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Booking Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Booking Reference: {bookingReference}</p>
            <p className="text-muted-foreground">
              Your booking has been confirmed. You will receive a confirmation email shortly.
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Booking Details</h3>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p>
                <strong>{getBookingTitle()}</strong>
              </p>
              {type === "flight" && (
                <>
                  <p>
                    Flight: {item.airline_name} {item.flight_number}
                  </p>
                  <p>Departure: {new Date(item.departure_time).toLocaleString()}</p>
                  <p>Passengers: {bookingData.passengers}</p>
                </>
              )}
              {type === "hotel" && (
                <>
                  <p>Hotel: {item.name}</p>
                  <p>Address: {item.address}</p>
                  <p>Rooms: {bookingData.rooms}</p>
                </>
              )}
              {type === "restaurant" && (
                <>
                  <p>Restaurant: {item.name}</p>
                  <p>Cuisine: {item.cuisine_type}</p>
                  <p>Guests: {bookingData.guests}</p>
                </>
              )}
              {type === "place" && (
                <>
                  <p>Attraction: {item.name}</p>
                  <p>Category: {item.category}</p>
                  <p>Tickets: {bookingData.guests}</p>
                </>
              )}
              <p>
                <strong>Total: ${getBookingPrice().toFixed(2)}</strong>
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              View My Bookings
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {type === "flight" && <Plane className="h-5 w-5" />}
          {type === "hotel" && <MapPin className="h-5 w-5" />}
          {type === "restaurant" && <MapPin className="h-5 w-5" />}
          {type === "place" && <MapPin className="h-5 w-5" />}
          Book {getBookingTitle()}
        </CardTitle>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {stepNum}
              </div>
              {stepNum < 3 && <div className="w-8 h-0.5 bg-muted mx-2" />}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={bookingData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={bookingData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={bookingData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <Separator />

            <h3 className="text-lg font-semibold">Booking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {type === "flight" && (
                <div className="space-y-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Select
                    value={bookingData.passengers.toString()}
                    onValueChange={(value) => handleInputChange("passengers", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Passenger" : "Passengers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {type === "hotel" && (
                <div className="space-y-2">
                  <Label htmlFor="rooms">Number of Rooms</Label>
                  <Select
                    value={bookingData.rooms.toString()}
                    onValueChange={(value) => handleInputChange("rooms", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Room" : "Rooms"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(type === "restaurant" || type === "place") && (
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select
                    value={bookingData.guests.toString()}
                    onValueChange={(value) => handleInputChange("guests", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
              <Input
                id="specialRequests"
                value={bookingData.specialRequests}
                onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                placeholder="Any special requirements or requests..."
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  value={bookingData.cardholderName}
                  onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={bookingData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={bookingData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={bookingData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    placeholder="123"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingAddress">Billing Address</Label>
                <Input
                  id="billingAddress"
                  value={bookingData.billingAddress}
                  onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                  placeholder="123 Main St, City, State, ZIP"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="insurance"
                  checked={bookingData.insurance}
                  onCheckedChange={(checked) => handleInputChange("insurance", checked)}
                />
                <Label htmlFor="insurance" className="text-sm">
                  Add travel insurance (+$29.99)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={bookingData.newsletter}
                  onCheckedChange={(checked) => handleInputChange("newsletter", checked)}
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Subscribe to our newsletter for exclusive deals
                </Label>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review & Confirm</h3>

            <div className="bg-muted p-4 rounded-lg space-y-3">
              <h4 className="font-medium">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{getBookingTitle()}</span>
                  <span>${getBookingPrice().toFixed(2)}</span>
                </div>
                {bookingData.insurance && (
                  <div className="flex justify-between">
                    <span>Travel Insurance</span>
                    <span>$29.99</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${(getBookingPrice() + (bookingData.insurance ? 29.99 : 0)).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">Secure Payment</p>
                  <p className="text-blue-700">Your payment information is encrypted and secure.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={bookingData.terms}
                onCheckedChange={(checked) => handleInputChange("terms", checked)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              Back
            </Button>
          )}
          <Button onClick={handleNextStep} className="flex-1" disabled={step === 3 && !bookingData.terms}>
            {step === 3 ? "Confirm Booking" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
