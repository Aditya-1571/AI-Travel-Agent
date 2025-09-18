"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlacesSearchForm } from "@/components/places/places-search-form"
import { PlacesFilters } from "@/components/places/places-filters"
import { PlacesResults } from "@/components/places/places-results"

export default function PlacesPage() {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    category: "",
    duration: "",
    budget: "",
  })

  const [filters, setFilters] = useState({
    categories: [],
    duration: [],
    budget: [],
    features: [],
  })

  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async () => {
    if (!searchParams.destination.trim()) {
      alert("Please enter a destination to search")
      return
    }

    setIsLoading(true)
    setHasSearched(true)

    try {
      const response = await fetch("/api/places-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchParams),
      })

      const data = await response.json()
      setSearchResults(data.places || [])
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Discover Amazing Places</h1>
          <p className="text-lg text-muted-foreground">
            Find the best attractions, activities, and experiences for your trip
          </p>
        </div>

        <PlacesSearchForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-1">
            <PlacesFilters filters={filters} setFilters={setFilters} />
          </div>

          <div className="lg:col-span-3">
            {hasSearched && (
              <PlacesResults
                searchParams={searchParams}
                filters={filters}
                results={searchResults}
                isLoading={isLoading}
              />
            )}
            {!hasSearched && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">Enter a destination and click "Search Places" to find amazing locations</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
