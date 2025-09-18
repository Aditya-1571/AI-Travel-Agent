"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FlightSearchForm } from "@/components/flights/flight-search-form"
import { FlightResults } from "@/components/flights/flight-results"
import { FlightFilters } from "@/components/flights/flight-filters"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function FlightsPage() {
  const [searchResults, setSearchResults] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    priceRange: [0, 166750], // Updated to INR range (₹0 - ₹166,750)
    stops: "any",
    airlines: [],
    departureTime: "any",
    duration: "any",
  })

  const handleSearch = async (searchData: any) => {
    setIsLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      console.log("[v0] Starting flight search with data:", searchData)

      // Call the AI-powered flight search API
      const response = await fetch("/api/flights-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Flight search response:", data)

      if (data.success) {
        setSearchResults(data.flights)
      } else {
        throw new Error(data.error || "Failed to search flights")
      }
    } catch (err) {
      console.error("[v0] Flight search error:", err)
      setError(err instanceof Error ? err.message : "An error occurred while searching flights")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Flight</h1>
          <p className="text-muted-foreground text-lg">
            Search and compare flights from hundreds of airlines worldwide with AI-powered recommendations
          </p>
        </div>

        <FlightSearchForm onSearch={handleSearch} />

        {hasSearched && (
          <div className="mt-12">
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span>Searching for the best flights...</span>
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
                <p className="text-destructive font-medium mb-2">Search Error</p>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button onClick={() => setError(null)} variant="outline" size="sm">
                  Try Again
                </Button>
              </div>
            )}

            {searchResults && !isLoading && !error && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <FlightFilters filters={filters} onFiltersChange={setFilters} />
                </div>
                <div className="lg:col-span-3">
                  <FlightResults results={searchResults} filters={filters} />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
