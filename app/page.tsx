"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { HeroSection } from "@/components/hero-section"
import { SearchInterface } from "@/components/search-interface"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { AIRecommendations } from "@/components/ai-recommendations"

export default function HomePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className={`transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <TopBar />

        <main className="p-6">
          <HeroSection />
          <SearchInterface />
          <AIRecommendations />
          <FeaturedDestinations />
        </main>
      </div>
    </div>
  )
}
