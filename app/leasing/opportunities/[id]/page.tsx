"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Building2,
  MapPin,
  Square,
  Calendar,
  Phone,
  Mail,
  FileText,
  Upload,
  Edit3,
  MessageSquare,
  Clock,
  User,
  Star,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock opportunity data
const mockOpportunity = {
  id: "1",
  name: "EcoVolt Expansion – Suite 901",
  stage: "PROSPECT",
  status: "Active",
  company: {
    name: "EcoVolt Energy",
    logo: "/placeholder.svg?height=64&width=64",
    industry: "Clean Energy",
    size: "500+ employees",
    creditRating: "A+",
    website: "ecovolt.com",
  },
  building: {
    name: "Cobblestone Collaborative",
    image: "/placeholder.svg?height=400&width=600",
    address: "1200 Tech Blvd, Austin, TX 78701",
    class: "Class A",
    yearBuilt: "2019",
  },
  space: {
    suites: ["Suite 901"],
    totalSF: "12,475 SF",
    floor: "9th Floor",
    leaseType: "Full Service Gross",
    term: "5 years",
    rate: "$36/SF/year",
  },
  dates: {
    targetClose: "2024-02-15",
    leaseStart: "2024-03-01",
    leaseExpiration: "2029-02-28",
    created: "2024-01-05",
  },
  contacts: [
    {
      id: "1",
      name: "Sarah Chen",
      title: "VP Real Estate",
      email: "sarah.chen@ecovolt.com",
      phone: "(512) 555-0123",
      avatar: "/placeholder.svg?height=40&width=40",
      isPrimary: true,
    },
    {
      id: "2",
      name: "David Park",
      title: "CFO",
      email: "david.park@ecovolt.com",
      phone: "(512) 555-0124",
      avatar: "/placeholder.svg?height=40&width=40",
      isPrimary: false,
    },
  ],
  expectedValue: "$450,000",
  notes:
    "EcoVolt is looking to expand their Austin operations. They need move-in ready space with modern amenities and parking for 50+ employees. Strong credit profile and established relationship.",
  attachments: [
    { name: "LOI_EcoVolt_Suite901.pdf", type: "LOI", date: "2024-01-10" },
    { name: "Financial_Statements_2023.pdf", type: "Financial", date: "2024-01-08" },
    { name: "Floor_Plan_Suite901.pdf", type: "Floor Plan", date: "2024-01-05" },
  ],
}

const mockActivities = [
  {
    id: "1",
    type: "tour",
    title: "Property Tour Scheduled",
    description: "Scheduled property tour with Sarah Chen and David Park",
    date: "2024-01-15T14:00:00",
    user: "John Smith",
    userAvatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    type: "email",
    title: "LOI Sent",
    description: "Letter of Intent sent to EcoVolt for review",
    date: "2024-01-10T09:30:00",
    user: "John Smith",
    userAvatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    type: "call",
    title: "Initial Call",
    description: "Discovery call with Sarah Chen to understand space requirements",
    date: "2024-01-08T11:00:00",
    user: "John Smith",
    userAvatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    type: "note",
    title: "Lead Created",
    description: "Opportunity created from inbound inquiry",
    date: "2024-01-05T16:20:00",
    user: "System",
    userAvatar: "/placeholder.svg?height=32&width=32",
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "tour":
      return <Building2 className="h-4 w-4" />
    case "email":
      return <Mail className="h-4 w-4" />
    case "call":
      return <Phone className="h-4 w-4" />
    case "note":
      return <MessageSquare className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case "tour":
      return "bg-blue-100 text-blue-700"
    case "email":
      return "bg-green-100 text-green-700"
    case "call":
      return "bg-purple-100 text-purple-700"
    case "note":
      return "bg-gray-100 text-gray-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false)
  const [opportunity] = useState(mockOpportunity)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/leasing">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Opportunities
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-xl font-semibold text-gray-900">{opportunity.name}</h1>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {opportunity.stage === "PROSPECT"
                ? "Prospect"
                : opportunity.stage === "NEGOTIATE"
                  ? "Negotiate"
                  : opportunity.stage === "CLOSED_WON"
                    ? "Closed – Won"
                    : "Closed – Lost"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Building Image Header */}
            <Card>
              <CardContent className="p-0">
                <div className="relative h-64 bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={opportunity.building.image || "/placeholder.svg"}
                    alt={opportunity.building.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold">{opportunity.building.name}</h2>
                    <p className="text-white/90 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {opportunity.building.address}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button variant="secondary" size="sm" onClick={() => setIsEditing(!isEditing)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      {isEditing ? "Save" : "Edit"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opportunity Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                    Company
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={opportunity.company.logo || "/placeholder.svg"} />
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {opportunity.company.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{opportunity.company.name}</h3>
                      <p className="text-sm text-gray-600">{opportunity.company.industry}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Size:</span>
                      <p className="font-medium">{opportunity.company.size}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Credit Rating:</span>
                      <p className="font-medium flex items-center">
                        {opportunity.company.creditRating}
                        <Star className="h-3 w-3 ml-1 text-yellow-500 fill-current" />
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Space Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Square className="h-5 w-5 mr-2 text-blue-600" />
                    Space Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Total SF:</span>
                      <p className="font-semibold text-lg">{opportunity.space.totalSF}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Suite:</span>
                      <p className="font-medium">{opportunity.space.suites.join(", ")}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Floor:</span>
                      <p className="font-medium">{opportunity.space.floor}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Lease Type:</span>
                      <p className="font-medium">{opportunity.space.leaseType}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Rate:</span>
                      <p className="font-medium">{opportunity.space.rate}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Term:</span>
                      <p className="font-medium">{opportunity.space.term}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {opportunity.contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{contact.name}</h4>
                            {contact.isPrimary && (
                              <Badge variant="secondary" className="text-xs">
                                Primary
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{contact.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    defaultValue={opportunity.notes}
                    className="min-h-[100px]"
                    placeholder="Add notes about this opportunity..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{opportunity.notes}</p>
                )}
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Attachments
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {opportunity.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm">{attachment.name}</p>
                          <p className="text-xs text-gray-500">
                            {attachment.type} • {attachment.date}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Timeline & Activity */}
          <div className="space-y-6">
            {/* Key Dates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Key Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Target Close:</span>
                  <span className="font-medium">{new Date(opportunity.dates.targetClose).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Lease Start:</span>
                  <span className="font-medium">{new Date(opportunity.dates.leaseStart).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Lease Expiration:</span>
                  <span className="font-medium">
                    {new Date(opportunity.dates.leaseExpiration).toLocaleDateString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Expected Value:</span>
                    <span className="font-semibold text-lg text-green-600">{opportunity.expectedValue}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Activity Timeline
                  </div>
                  <Button variant="outline" size="sm">
                    Add Activity
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActivities.map((activity, index) => (
                    <div key={activity.id} className="flex space-x-3">
                      <div
                        className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                          getActivityColor(activity.type),
                        )}
                      >
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                          <span className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Avatar className="h-4 w-4 mr-1">
                            <AvatarImage src={activity.userAvatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">{activity.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {activity.user}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
