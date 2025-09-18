"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, User, Bell } from "lucide-react"

export function TopBar() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search destinations, hotels, flights..." className="pl-10 bg-input border-border" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-foreground hover:bg-muted">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-foreground hover:bg-muted">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
