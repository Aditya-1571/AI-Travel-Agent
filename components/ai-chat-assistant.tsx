"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Bot, User, Send, Sparkles, MapPin, Plane, Calendar, Hotel, Utensils } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  suggestions?: string[]
  recommendations?: any[]
}

const iconMap = {
  MapPin,
  Plane,
  Calendar,
  Hotel,
  Utensils,
}

export function AIChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI Travel Assistant. I can help you plan your perfect trip, find flights, hotels, restaurants, and create personalized itineraries. What destination are you thinking about?",
      timestamp: new Date(),
      suggestions: [
        "Plan a 7-day trip to Japan",
        "Find flights to Paris",
        "Recommend hotels in New York",
        "Create a romantic getaway itinerary",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()

      const aiResponse: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: data.response,
        timestamp: new Date(),
        suggestions: data.suggestions || [],
        recommendations: data.recommendations || [],
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("AI Chat Error:", error)
      const errorResponse: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date(),
        suggestions: [
          "Try asking about destinations",
          "Ask for travel tips",
          "Request flight information",
          "Get hotel recommendations",
        ],
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  return (
    <Card className="h-full flex flex-col min-h-[400px]">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <div className="p-2 bg-primary/10 rounded-full">
            <Bot className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          </div>
          <span className="truncate">AI Travel Assistant</span>
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            Smart
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        <ScrollArea className="flex-1 px-3 md:px-4 overflow-hidden" ref={scrollAreaRef}>
          <div className="space-y-3 md:space-y-4 pb-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2 md:space-y-3">
                <div className={`flex gap-2 md:gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  {message.type === "ai" && (
                    <div className="p-1.5 md:p-2 bg-primary/10 rounded-full h-fit flex-shrink-0">
                      <Bot className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] md:max-w-[80%] rounded-lg p-2 md:p-3 break-words ${
                      message.type === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                    }`}
                  >
                    <p className="text-xs md:text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  {message.type === "user" && (
                    <div className="p-1.5 md:p-2 bg-muted rounded-full h-fit flex-shrink-0">
                      <User className="h-3 w-3 md:h-4 md:w-4" />
                    </div>
                  )}
                </div>

                {message.recommendations && message.recommendations.length > 0 && (
                  <div className="ml-6 md:ml-12 space-y-2">
                    <p className="text-xs md:text-sm font-medium text-muted-foreground">Recommended Places:</p>
                    <div className="grid gap-3">
                      {message.recommendations.map((rec, index) => {
                        const IconComponent = iconMap[rec.icon as keyof typeof iconMap] || MapPin
                        return (
                          <div
                            key={index}
                            className="flex gap-3 p-3 bg-background border rounded-lg hover:shadow-sm transition-shadow"
                          >
                            {rec.image && (
                              <div className="flex-shrink-0">
                                <img
                                  src={rec.image || "/placeholder.svg"}
                                  alt={rec.title}
                                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2 mb-1">
                                <IconComponent className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-foreground leading-tight">{rec.title}</p>
                                  {rec.location && (
                                    <p className="text-xs text-muted-foreground mt-0.5">{rec.location}</p>
                                  )}
                                </div>
                                <Badge variant="outline" className="text-xs flex-shrink-0">
                                  {rec.type}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {message.suggestions && (
                  <div className="ml-6 md:ml-12 space-y-2">
                    <p className="text-xs md:text-sm font-medium text-muted-foreground">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-6 md:h-7 bg-transparent px-2 md:px-3"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <span className="truncate max-w-[120px] md:max-w-none">{suggestion}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 md:gap-3 justify-start">
                <div className="p-1.5 md:p-2 bg-primary/10 rounded-full h-fit">
                  <Bot className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-2 md:p-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 md:w-2 md:h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 md:w-2 md:h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />

        <div className="p-3 md:p-4 flex-shrink-0">
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything about your trip..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
              className="flex-1 text-sm"
            />
            <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isTyping} size="sm">
              <Send className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
