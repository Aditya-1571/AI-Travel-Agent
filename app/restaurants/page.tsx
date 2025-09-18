"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RestaurantSearchForm } from "@/components/restaurants/restaurant-search-form"
import { RestaurantFilters } from "@/components/restaurants/restaurant-filters"
import { RestaurantResults } from "@/components/restaurants/restaurant-results"

export default function RestaurantsPage() {
  const [searchParams, setSearchParams] = useState({
    location: "",
    cuisine: "",
    priceRange: "",
    rating: "",
    date: "",
    time: "",
    guests: 2,
  })

  const [filters, setFilters] = useState({
    cuisine: [],
    priceRange: [],
    rating: [],
    features: [],
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Find Amazing Restaurants</h1>
          <p className="text-lg text-muted-foreground">Discover the best dining experiences in your destination</p>
        </div>

        <RestaurantSearchForm searchParams={searchParams} setSearchParams={setSearchParams} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-1">
            <RestaurantFilters filters={filters} setFilters={setFilters} />
          </div>

          <div className="lg:col-span-3">
            <RestaurantResults searchParams={searchParams} filters={filters} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
