"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plane, Menu, User, X } from "lucide-react"
import Link from "next/link"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignIn = () => {
    // Placeholder for sign in functionality
    alert("Sign in functionality would be implemented here")
  }

  const handleGetStarted = () => {
    // Navigate to AI assistant for onboarding
    window.location.href = "/ai-assistant"
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Plane className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">TravelAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/flights" className="text-foreground hover:text-primary transition-colors">
            Flights
          </Link>
          <Link href="/hotels" className="text-foreground hover:text-primary transition-colors">
            Hotels
          </Link>
          <Link href="/restaurants" className="text-foreground hover:text-primary transition-colors">
            Restaurants
          </Link>
          <Link href="/places" className="text-foreground hover:text-primary transition-colors">
            Places
          </Link>
          <Link href="/ai-analyzer" className="text-foreground hover:text-primary transition-colors font-medium">
            AI Analyzer
          </Link>
          <Link href="/ai-assistant" className="text-foreground hover:text-primary transition-colors">
            AI Assistant
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex" onClick={handleSignIn}>
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          <Button size="sm" onClick={handleGetStarted}>
            Get Started
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/flights"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Flights
            </Link>
            <Link
              href="/hotels"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hotels
            </Link>
            <Link
              href="/restaurants"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Restaurants
            </Link>
            <Link
              href="/places"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Places
            </Link>
            <Link
              href="/ai-analyzer"
              className="text-foreground hover:text-primary transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AI Analyzer
            </Link>
            <Link
              href="/ai-assistant"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AI Assistant
            </Link>
            <Button variant="ghost" size="sm" className="justify-start" onClick={handleSignIn}>
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
