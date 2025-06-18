"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, MapPin, User, Building2, Clock, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Enhanced mock calendar events with opportunity linking
const mockEvents = [
  {
    id: "1",
    date: "2024-01-15",
    time: "2:00 PM",
    title: "Property Tour with CEO",
    type: "Tour Scheduled",
    opportunity: {
      id: "1",
      name: "EcoVolt Expansion – Suite 901",
      company: "EcoVolt Energy",
      stage: "PROSPECT",
    },
    building: "Cobblestone Collaborative",
    assignedTo: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    attendees: [
      { name: "Sarah Chen", title: "VP Real Estate", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "David Park", title: "CFO", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "2",
    date: "2024-01-12",
    time: "EOD",
    title: "LOI Response Due",
    type: "LOI Due",
    opportunity: {
      id: "2",
      name: "TechFlow HQ Relocation – Floor 3",
      company: "TechFlow Solutions",
      stage: "NEGOTIATE",
    },
    building: "Innovation Tower",
    assignedTo: {
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    attendees: [{ name: "Mike Rodriguez", title: "Facilities Manager", avatar: "/placeholder.svg?height=32&width=32" }],
  },
  {
    id: "3",
    date: "2024-01-20",
    time: "9:00 AM",
    title: "Lease Signing & Move-In Coordination",
    type: "Move-In Date",
    opportunity: {
      id: "3",
      name: "DataCore Systems – Suite 1205",
      company: "DataCore Systems",
      stage: "CLOSED_WON",
    },
    building: "Metro Business Center",
    assignedTo: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    attendees: [
      { name: "Jennifer Park", title: "COO", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Robert Kim", title: "Legal Counsel", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "4",
    date: "2024-01-18",
    time: "10:30 AM",
    title: "Final Proposal Review",
    type: "Proposal Review",
    opportunity: {
      id: "1",
      name: "EcoVolt Expansion – Suite 901",
      company: "EcoVolt Energy",
      stage: "PROSPECT",
    },
    building: "Cobblestone Collaborative",
    assignedTo: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    attendees: [{ name: "Sarah Chen", title: "VP Real Estate", avatar: "/placeholder.svg?height=32&width=32" }],
  },
  {
    id: "5",
    date: "2024-01-25",
    time: "All Day",
    title: "Current Lease Expires",
    type: "Lease Expiration",
    opportunity: {
      id: "5",
      name: "GreenTech Renewal – Floor 2",
      company: "GreenTech Innovations",
      stage: "NEGOTIATE",
    },
    building: "Eco Building",
    assignedTo: {
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    attendees: [{ name: "David Kim", title: "Operations Director", avatar: "/placeholder.svg?height=32&width=32" }],
  },
]

const eventTypeColors = {
  "Tour Scheduled": { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  "LOI Due": { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
  "Proposal Review": { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  "Move-In Date": { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  "Lease Expiration": { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
}

const stageColors = {
  PROSPECT: "bg-blue-500",
  NEGOTIATE: "bg-yellow-500",
  CLOSED_WON: "bg-green-500",
  CLOSED_LOST: "bg-gray-400",
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)) // January 2024
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockEvents.filter((event) => event.date === dateStr)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const toggleFilter = (eventType: string) => {
    setSelectedFilters((prev) =>
      prev.includes(eventType) ? prev.filter((f) => f !== eventType) : [...prev, eventType],
    )
  }

  const filteredEvents =
    selectedFilters.length > 0 ? mockEvents.filter((event) => selectedFilters.includes(event.type)) : mockEvents

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  const eventTypes = Array.from(new Set(mockEvents.map((event) => event.type)))
  const companies = Array.from(new Set(mockEvents.map((event) => event.opportunity.company)))
  const buildings = Array.from(new Set(mockEvents.map((event) => event.building)))

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Select value={viewMode} onValueChange={(value: "month" | "week" | "day") => setViewMode(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {selectedFilters.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedFilters.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Event Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {eventTypes.map((eventType) => (
                        <Button
                          key={eventType}
                          variant="outline"
                          size="sm"
                          onClick={() => toggleFilter(eventType)}
                          className={cn(
                            "text-xs",
                            selectedFilters.includes(eventType) && "bg-blue-50 border-blue-200 text-blue-700",
                          )}
                        >
                          {eventType}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty days for month start */}
            {emptyDays.map((day) => (
              <div key={`empty-${day}`} className="h-32 p-1"></div>
            ))}

            {/* Days with events */}
            {days.map((day) => {
              const dayEvents = getEventsForDate(day).filter(
                (event) => selectedFilters.length === 0 || selectedFilters.includes(event.type),
              )

              return (
                <div key={day} className="h-32 p-1 border border-gray-100 rounded hover:bg-gray-50">
                  <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <Popover key={event.id}>
                        <PopoverTrigger asChild>
                          <div
                            className={cn(
                              "text-xs px-2 py-1 rounded cursor-pointer border-l-2 hover:shadow-sm transition-shadow",
                              eventTypeColors[event.type as keyof typeof eventTypeColors].bg,
                              eventTypeColors[event.type as keyof typeof eventTypeColors].text,
                              eventTypeColors[event.type as keyof typeof eventTypeColors].border,
                            )}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="text-xs opacity-75 truncate">{event.opportunity.company}</div>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" side="right">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900">{event.title}</h4>
                                <Badge
                                  className={cn(
                                    "text-xs mt-1",
                                    eventTypeColors[event.type as keyof typeof eventTypeColors].bg,
                                    eventTypeColors[event.type as keyof typeof eventTypeColors].text,
                                  )}
                                >
                                  {event.type}
                                </Badge>
                              </div>
                              <div
                                className={cn(
                                  "w-3 h-3 rounded-full",
                                  stageColors[event.opportunity.stage as keyof typeof stageColors],
                                )}
                              />
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-2" />
                                {event.time} • {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Building2 className="h-4 w-4 mr-2" />
                                {event.building}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <User className="h-4 w-4 mr-2" />
                                {event.assignedTo.name}
                              </div>
                            </div>

                            <div className="border-t pt-3">
                              <Link href={`/leasing/opportunities/${event.opportunity.id}`}>
                                <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                                  <div>
                                    <p className="font-medium text-sm">{event.opportunity.name}</p>
                                    <p className="text-xs text-gray-600">{event.opportunity.company}</p>
                                  </div>
                                  <div className="text-xs text-blue-600">View Opportunity →</div>
                                </div>
                              </Link>
                            </div>

                            {event.attendees.length > 0 && (
                              <div className="border-t pt-3">
                                <p className="text-sm font-medium text-gray-700 mb-2">Attendees</p>
                                <div className="space-y-1">
                                  {event.attendees.map((attendee, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                                        <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                                          {attendee.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="text-sm">
                                        <span className="font-medium">{attendee.name}</span>
                                        <span className="text-gray-500 ml-1">• {attendee.title}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Events List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        </div>
        <div className="p-4 space-y-4">
          {filteredEvents
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map((event) => (
              <Card key={event.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge
                          className={cn(
                            "text-xs",
                            eventTypeColors[event.type as keyof typeof eventTypeColors].bg,
                            eventTypeColors[event.type as keyof typeof eventTypeColors].text,
                          )}
                        >
                          {event.type}
                        </Badge>
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            stageColors[event.opportunity.stage as keyof typeof stageColors],
                          )}
                        />
                        <span className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                      <Link
                        href={`/leasing/opportunities/${event.opportunity.id}`}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {event.opportunity.name} →
                      </Link>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.building}
                        </div>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {event.assignedTo.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex -space-x-1 ml-4">
                      {event.attendees.slice(0, 3).map((attendee, index) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-white">
                          <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                            {attendee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
