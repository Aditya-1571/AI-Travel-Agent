"use client"
import { Button } from "@/components/ui/button"
import {
  Home,
  Plane,
  Hotel,
  UtensilsCrossed,
  MapPin,
  Bot,
  Search,
  User,
  Settings,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Activity,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const { theme, setTheme } = useTheme()

  const navigationItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Plane, label: "Flights", href: "/flights" },
    { icon: Hotel, label: "Hotels", href: "/hotels" },
    { icon: UtensilsCrossed, label: "Restaurants", href: "/restaurants" },
    { icon: MapPin, label: "Places", href: "/places" },
    { icon: Bot, label: "AI Assistant", href: "/ai-assistant" },
    { icon: Search, label: "AI Analyzer", href: "/ai-analyzer" },
  ]

  const tripLoggingItems = [
    { icon: Navigation, label: "Trip Logger", href: "/trip-logger" },
    { icon: Activity, label: "Mode Detection", href: "/mode-detection" },
    { icon: Shield, label: "Privacy Settings", href: "/privacy" },
  ]

  const bottomItems = [
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Plane className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-sidebar-foreground">TravelAI</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-sidebar-foreground hover:bg-sidebar-primary"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 sidebar-scroll overflow-y-auto">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground ${
                    isCollapsed ? "px-2" : "px-3"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            ))}
          </div>

          {!isCollapsed && (
            <div className="mt-6">
              <h3 className="px-3 mb-2 text-xs font-semibold text-sidebar-muted-foreground uppercase tracking-wider">
                Trip Logging
              </h3>
            </div>
          )}
          <div className="space-y-1">
            {tripLoggingItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground ${
                    isCollapsed ? "px-2" : "px-3"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="p-2 border-t border-sidebar-border">
          <div className="space-y-1">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground ${
                isCollapsed ? "px-2" : "px-3"
              }`}
            >
              {theme === "dark" ? (
                <Sun className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
              ) : (
                <Moon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
              )}
              {!isCollapsed && <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
            </Button>

            {bottomItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground ${
                    isCollapsed ? "px-2" : "px-3"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
