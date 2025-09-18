"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HotelSearchForm } from "@/components/hotels/hotel-search-form"
import { HotelResults } from "@/components/hotels/hotel-results"
import { HotelFilters } from "@/components/hotels/hotel-filters"

export default function HotelsPage() {
  const [searchResults, setSearchResults] = useState(null)
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
    propertyType: "any",
    distance: "any",
  })

  const handleSearch = (searchData: any) => {
    // Simulate search results - in real app this would call an API
    const mockResults = generateMockHotels(searchData)
    setSearchResults(mockResults)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6 overflow-hidden">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Stay</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Discover amazing hotels, resorts, and accommodations worldwide
          </p>
        </div>

        <div className="space-y-6">
          <HotelSearchForm onSearch={handleSearch} />

          {searchResults && (
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
              <div className="xl:col-span-1 order-2 xl:order-1">
                <HotelFilters filters={filters} onFiltersChange={setFilters} />
              </div>
              <div className="xl:col-span-3 order-1 xl:order-2">
                <HotelResults results={searchResults} filters={filters} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function generateMockHotels(searchData: any) {
  const realHotels = [
    {
      name: "The Ritz-Carlton New York, Central Park",
      chain: { name: "Ritz-Carlton", logo: "/ritz-carlton-logo-luxury-hotel.jpg" },
      location: {
        city: "New York",
        country: "USA",
        coordinates: { lat: 40.7589, lng: -73.9759 },
        address: "50 Central Park South, Manhattan",
        landmarks: ["Central Park", "Times Square", "Fifth Avenue Shopping"],
      },
      propertyType: "Luxury Hotel",
      rating: 4.8,
      reviewCount: 1247,
      price: 850,
      originalPrice: 1200,
      images: [
        "/ritz-carlton-new-york-luxury-hotel-exterior-centra.jpg",
        "/ritz-carlton-luxury-hotel-lobby-marble-elegant.jpg",
        "/ritz-carlton-luxury-hotel-room-central-park-view.jpg",
        "/ritz-carlton-hotel-spa-luxury-amenities.jpg",
      ],
      description:
        "Experience unparalleled luxury at this iconic hotel overlooking Central Park. Located in the heart of Manhattan, this property offers world-class service, Michelin-starred dining, and breathtaking park views.",
    },
    {
      name: "Hotel Plaza Athénée Paris",
      chain: { name: "Dorchester Collection", logo: "/dorchester-collection-logo-luxury.jpg" },
      location: {
        city: "Paris",
        country: "France",
        coordinates: { lat: 48.8656, lng: 2.3036 },
        address: "25 Avenue Montaigne, 8th Arrondissement",
        landmarks: ["Champs-Élysées", "Eiffel Tower", "Arc de Triomphe"],
      },
      propertyType: "Luxury Hotel",
      rating: 4.9,
      reviewCount: 892,
      price: 1200,
      originalPrice: 1500,
      images: [
        "/eiffel-tower-paris-sunset-golden-hour.jpg",
        "/louvre-museum-paris-glass-pyramid-architecture.jpg",
        "/le-marais-paris-historic-cobblestone-streets-cafes.jpg",
        "/hotel-plaza-ath-n-e-paris-luxury-interior.jpg",
      ],
      description:
        "A legendary Parisian palace hotel on Avenue Montaigne, featuring haute couture shopping, Alain Ducasse's restaurant, and the iconic red geranium-adorned balconies.",
    },
    {
      name: "Park Hyatt Tokyo",
      chain: { name: "Hyatt", logo: "/hyatt-hotel-logo.jpg" },
      location: {
        city: "Tokyo",
        country: "Japan",
        coordinates: { lat: 35.6938, lng: 139.7036 },
        address: "3-7-1-2 Nishi Shinjuku, Shinjuku City",
        landmarks: ["Tokyo Metropolitan Government Building", "Meiji Shrine", "Shibuya Crossing"],
      },
      propertyType: "Luxury Hotel",
      rating: 4.7,
      reviewCount: 1156,
      price: 650,
      originalPrice: 800,
      images: [
        "/senso-ji-temple-tokyo-traditional-red-architecture.jpg",
        "/traditional-japanese-ryokan-interior-tatami-mats.jpg",
        "/tsukiji-fish-market-fresh-sushi-tokyo.jpg",
        "/park-hyatt-tokyo-modern-luxury-room-city-view.jpg",
      ],
      description:
        "Sophisticated luxury in the heart of Shinjuku, featuring stunning city views, the famous New York Grill restaurant, and impeccable Japanese hospitality with modern amenities.",
    },
    {
      name: "Burj Al Arab Jumeirah",
      chain: { name: "Jumeirah", logo: "/jumeirah-hotel-logo.jpg" },
      location: {
        city: "Dubai",
        country: "UAE",
        coordinates: { lat: 25.1411, lng: 55.1855 },
        address: "Jumeirah Beach Road, Umm Suqeim 3",
        landmarks: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah"],
      },
      propertyType: "Luxury Resort",
      rating: 4.9,
      reviewCount: 2341,
      price: 1500,
      originalPrice: 2000,
      images: [
        "/burj-al-arab-dubai-sail-shaped-luxury-hotel-exteri.jpg",
        "/burj-al-arab-dubai-luxury-suite-interior-gold.jpg",
        "/burj-al-arab-dubai-underwater-restaurant-al-mahara.jpg",
        "/burj-al-arab-dubai-helipad-tennis-court-luxury-ame.jpg",
      ],
      description:
        "The world's most luxurious hotel, this sail-shaped icon offers unparalleled opulence with butler service, Rolls-Royce transfers, and dining experiences including the underwater Al Mahara restaurant.",
    },
    {
      name: "Marina Bay Sands Singapore",
      chain: { name: "Sands", logo: "/marina-bay-sands-logo.jpg" },
      location: {
        city: "Singapore",
        country: "Singapore",
        coordinates: { lat: 1.2834, lng: 103.8607 },
        address: "10 Bayfront Avenue, Marina Bay",
        landmarks: ["Gardens by the Bay", "Singapore Flyer", "Merlion Park"],
      },
      propertyType: "Luxury Hotel",
      rating: 4.6,
      reviewCount: 3456,
      price: 420,
      originalPrice: 550,
      images: [
        "/marina-bay-sands-singapore-infinity-pool-skyline.jpg",
        "/marina-bay-sands-singapore-luxury-hotel-room-city-.jpg",
        "/marina-bay-sands-singapore-casino-shopping-mall.jpg",
        "/marina-bay-sands-singapore-rooftop-bar-skypark.jpg",
      ],
      description:
        "An architectural marvel featuring the world's largest rooftop infinity pool, luxury shopping at The Shoppes, world-class dining, and spectacular views of Singapore's skyline.",
    },
    {
      name: "The Savoy London",
      chain: { name: "Fairmont", logo: "/fairmont-hotel-logo.jpg" },
      location: {
        city: "London",
        country: "UK",
        coordinates: { lat: 51.5101, lng: -0.1197 },
        address: "Strand, Covent Garden, Westminster",
        landmarks: ["Covent Garden", "Thames River", "Big Ben"],
      },
      propertyType: "Luxury Hotel",
      rating: 4.8,
      reviewCount: 1876,
      price: 750,
      originalPrice: 950,
      images: [
        "/the-savoy-london-historic-luxury-hotel-exterior-th.jpg",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      description:
        "A legendary London institution since 1889, offering timeless elegance on the Thames. Famous for its Art Deco style, the American Bar, and impeccable British hospitality.",
    },
  ]

  return realHotels.concat(
    Array.from({ length: 9 }, (_, i) => {
      const additionalHotels = [
        {
          name: "Four Seasons Resort Bali at Sayan",
          chain: "Four Seasons",
          city: "Ubud",
          country: "Indonesia",
          coordinates: { lat: -8.5069, lng: 115.2625 },
          landmarks: ["Sacred Monkey Forest", "Tegallalang Rice Terraces", "Ubud Palace"],
          type: "Luxury Resort",
          basePrice: 800,
        },
        {
          name: "Hotel Colosseum Rome",
          chain: "Marriott",
          city: "Rome",
          country: "Italy",
          coordinates: { lat: 41.8902, lng: 12.4922 },
          landmarks: ["Colosseum", "Roman Forum", "Palatine Hill"],
          type: "Historic Hotel",
          basePrice: 350,
        },
        {
          name: "W Barcelona",
          chain: "W Hotels",
          city: "Barcelona",
          country: "Spain",
          coordinates: { lat: 41.3851, lng: 2.1734 },
          landmarks: ["Sagrada Familia", "Park Güell", "Gothic Quarter"],
          type: "Design Hotel",
          basePrice: 280,
        },
        {
          name: "The Westin Sydney",
          chain: "Westin",
          city: "Sydney",
          country: "Australia",
          coordinates: { lat: -33.8688, lng: 151.2093 },
          landmarks: ["Sydney Opera House", "Harbour Bridge", "Circular Quay"],
          type: "Business Hotel",
          basePrice: 320,
        },
        {
          name: "Mandarin Oriental Bangkok",
          chain: "Mandarin Oriental",
          city: "Bangkok",
          country: "Thailand",
          coordinates: { lat: 13.7563, lng: 100.5018 },
          landmarks: ["Grand Palace", "Wat Pho Temple", "Chao Phraya River"],
          type: "Luxury Hotel",
          basePrice: 450,
        },
        {
          name: "The Westin Amsterdam",
          chain: "Westin",
          city: "Amsterdam",
          country: "Netherlands",
          coordinates: { lat: 52.3676, lng: 4.9041 },
          landmarks: ["Anne Frank House", "Van Gogh Museum", "Vondelpark"],
          type: "Business Hotel",
          basePrice: 380,
        },
        {
          name: "Conrad Maldives Rangali Island",
          chain: "Conrad",
          city: "Rangali Island",
          country: "Maldives",
          coordinates: { lat: 3.0738, lng: 72.8205 },
          landmarks: ["Ithaa Undersea Restaurant", "Coral Reefs", "Private Beaches"],
          type: "Luxury Resort",
          basePrice: 1200,
        },
        {
          name: "Grand Wailea Maui",
          chain: "Waldorf Astoria",
          city: "Wailea",
          country: "USA",
          coordinates: { lat: 20.6908, lng: -156.4419 },
          landmarks: ["Haleakala National Park", "Road to Hana", "Wailea Beach"],
          type: "Beach Resort",
          basePrice: 650,
        },
        {
          name: "Four Seasons Costa Rica",
          chain: "Four Seasons",
          city: "Guanacaste",
          country: "Costa Rica",
          coordinates: { lat: 10.351, lng: -85.6514 },
          landmarks: ["Manuel Antonio National Park", "Monteverde Cloud Forest", "Arenal Volcano"],
          type: "Eco Resort",
          basePrice: 750,
        },
      ]

      const hotel = additionalHotels[i]
      const discountPrice = Math.round(hotel.basePrice * (0.8 + Math.random() * 0.2))

      return {
        id: `hotel-${i + 6}`,
        name: hotel.name,
        chain: {
          name: hotel.chain,
          logo: `/placeholder.svg?height=40&width=120&query=${hotel.chain} hotel logo`,
        },
        location: {
          city: hotel.city,
          country: hotel.country,
          coordinates: hotel.coordinates,
          address: `Downtown ${hotel.city}`,
          landmarks: hotel.landmarks,
        },
        propertyType: hotel.type,
        rating: 4.2 + Math.random() * 0.7,
        reviewCount: Math.floor(Math.random() * 1500) + 300,
        price: discountPrice,
        originalPrice: hotel.basePrice,
        images: [
          `/placeholder.svg?height=300&width=400&query=${hotel.name} exterior luxury hotel`,
          `/placeholder.svg?height=300&width=400&query=${hotel.name} lobby elegant interior design`,
          `/placeholder.svg?height=300&width=400&query=${hotel.name} luxury room suite comfortable`,
          `/placeholder.svg?height=300&width=400&query=${hotel.name} amenities pool spa restaurant`,
        ],
        description: `Experience luxury and comfort at ${hotel.name} in ${hotel.city}. This ${hotel.type.toLowerCase()} offers world-class amenities and is perfectly located near major attractions.`,
      }
    }),
  )
}
