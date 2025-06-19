"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// System stage definitions - standardized across all customers
const SYSTEM_STAGES = {
  NEW: {
    system_stage: "NEW",
    default_display: "Prospect", 
    color: "bg-blue-50 text-blue-700 border-blue-200",
    description: "Initial inquiry or lead",
    order: 1,
  },
  QUALIFIED: {
    system_stage: "QUALIFIED", 
    default_display: "Qualified",
    color: "bg-purple-50 text-purple-700 border-purple-200", 
    description: "Qualified prospect with confirmed needs",
    order: 2,
  },
  NEGOTIATING: {
    system_stage: "NEGOTIATING",
    default_display: "Negotiating",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    description: "Active negotiations and proposals", 
    order: 3,
  },
  LEASE_DRAFTING: {
    system_stage: "LEASE_DRAFTING",
    default_display: "Lease Review", 
    color: "bg-orange-50 text-orange-700 border-orange-200",
    description: "Legal review and lease documentation",
    order: 4,
  },
  CLOSED_WON: {
    system_stage: "CLOSED_WON",
    default_display: "Closed - Won",
    color: "bg-green-50 text-green-700 border-green-200", 
    description: "Deal successfully closed",
    order: 5,
  },
  CLOSED_LOST: {
    system_stage: "CLOSED_LOST", 
    default_display: "Closed - Lost",
    color: "bg-gray-50 text-gray-700 border-gray-200",
    description: "Deal lost or abandoned", 
    order: 6,
  },
}

// Customer-specific stage customization (this would come from customer settings)
const customerStageConfig = {
  NEW: { display_name: "Prospect", system_stage: "NEW" },
  QUALIFIED: { display_name: "Qualified Lead", system_stage: "QUALIFIED" },
  NEGOTIATING: { display_name: "Hot Pursuit", system_stage: "NEGOTIATING" },
  LEASE_DRAFTING: { display_name: "Legal Review", system_stage: "LEASE_DRAFTING" },
  CLOSED_WON: { display_name: "Deal Closed", system_stage: "CLOSED_WON" },
  CLOSED_LOST: { display_name: "Lost Deal", system_stage: "CLOSED_LOST" },
}

const mockActivities = [
  {
    id: "1",
    type: "tour",
    title: "Cobblestone Property Tour Completed",
    description: "Comprehensive tour of Suites 901 & 902 with Sarah Chen, David Park, and Jennifer Martinez. Positive feedback on layout and city views.",
    date: "2024-01-15T14:00:00",
    user: "John Smith",
    userAvatar: "/placeholder.svg?height=32&width=32",
    building: "Cobblestone Collaborative",
    opportunitySpaceId: "os1",
  },
  {
    id: "2", 
    type: "alert",
    title: "Competition Alert - Innovation Tower",
    description: "2 competing opportunities (TechFlow Solutions, DataCore Systems) submitted LOIs for Suite 1205-1210. EcoVolt needs to respond by EOD tomorrow.",
    date: "2024-01-12T16:45:00",
    user: "System Alert",
    userAvatar: "/placeholder.svg?height=32&width=32",
    building: "Innovation Tower",
    opportunitySpaceId: "os2",
  },
  {
    id: "3",
    type: "email",
    title: "LOI Sent - Innovation Tower",
    description: "Competitive LOI submitted for Suite 1205-1210 with aggressive terms: $32.50/SF, 6 months free rent, $55/SF TI allowance",
    date: "2024-01-12T09:30:00",
    user: "John Smith", 
    userAvatar: "/placeholder.svg?height=32&width=32",
    building: "Innovation Tower",
    opportunitySpaceId: "os2",
  },
  {
    id: "4",
    type: "email",
    title: "LOI Sent - Cobblestone",
    description: "Initial LOI sent for Suites 901 & 902 combination. Terms: $36/SF, 4 months free rent, 5+5 year term structure",
    date: "2024-01-10T11:20:00",
    user: "John Smith",
    userAvatar: "/placeholder.svg?height=32&width=32", 
    building: "Cobblestone Collaborative",
    opportunitySpaceId: "os1",
  },
  {
    id: "5",
    type: "call",
    title: "Financial Qualification Call",
    description: "Deep dive on EcoVolt's financial capacity with CFO David Park. Confirmed ability to support $1.25M annual commitment across both locations.",
    date: "2024-01-09T15:30:00",
    user: "John Smith",
    userAvatar: "/placeholder.svg?height=32&width=32",
    building: "Both Properties",
    opportunitySpaceId: null,
  },
  {
    id: "6",
    type: "tour",
    title: "Innovation Tower Lab Tour",
    description: "Technical tour focused on lab infrastructure and R&D capabilities. EcoVolt's technical team impressed with existing lab setup.",
    date: "2024-01-08T10:00:00",
    user: "Jane Wilson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    building: "Innovation Tower", 
    opportunitySpaceId: "os2",
  },
  {
    id: "7",
    type: "call",
    title: "Initial Discovery Call",
    description: "Comprehensive needs analysis with Sarah Chen. Identified requirement for two distinct locations: executive offices + R&D facility.",
    date: "2024-01-05T14:00:00",
    user: "John Smith",
    userAvatar: "/placeholder.svg?height=32&width=32",
    building: "Both Properties",
    opportunitySpaceId: null,
  },
  {
    id: "8",
    type: "note",
    title: "Multi-Location Opportunity Created", 
    description: "Complex opportunity created from inbound inquiry. EcoVolt seeking 25,000+ SF across Austin for expansion.",
    date: "2024-01-05T09:15:00",
    user: "System",
    userAvatar: "/placeholder.svg?height=32&width=32",
    building: "Multiple Properties",
    opportunitySpaceId: null,
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
    case "alert":
      return <Star className="h-4 w-4" />
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
    case "alert":
      return "bg-orange-100 text-orange-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

// Mock opportunity data with enhanced object model
const mockOpportunity = {
  id: "1",
  name: "EcoVolt Multi-Location Expansion",
  stage: "QUALIFIED", // Overall opportunity stage (system_stage)
  status: "Active",
  company: {
    name: "EcoVolt Energy Solutions",
    logo: "/placeholder.svg?height=64&width=64",
    industry: "Clean Energy Technology",
    size: "500+ employees",
    creditRating: "A+",
    website: "ecovolt.com",
    headquarterLocation: "Austin, TX",
    totalEmployees: 847,
    annualRevenue: "$125M+",
  },
  // Multiple spaces per opportunity (OpportunitySpace junction concept)
  opportunitySpaces: [
    {
      id: "os1",
      stage: "QUALIFIED", // Individual stage for this space (system_stage)
      reservationStatus: "available", // available, reserved, competing
      competingOpportunities: ["opp-45", "opp-67"], // Other opportunities considering this space
      lastUpdated: "2024-01-15T10:30:00",
      stageHistory: [
        { stage: "NEW", date: "2024-01-05T09:15:00", user: "John Smith" },
        { stage: "QUALIFIED", date: "2024-01-08T14:30:00", user: "John Smith" },
      ],
      building: {
        id: "bldg-1",
        name: "Cobblestone Collaborative",
        image: "/placeholder.svg?height=400&width=600",
        address: "1200 Tech Blvd, Austin, TX 78701",
        class: "Class A+",
        yearBuilt: "2019",
        totalRSF: "450,000 SF",
        floors: 12,
        parking: "1:250 ratio",
        amenities: ["Fitness Center", "Conference Center", "Food Hall", "Rooftop Terrace"],
      },
      spaces: [
        {
          id: "space-901",
          suiteNumber: "Suite 901",
          floor: "9th Floor",
          rsf: "8,475 SF",
          usableRatio: "85%",
          windowLine: "Corner unit with city views",
          buildOut: "Existing buildout suitable",
        },
        {
          id: "space-902", 
          suiteNumber: "Suite 902",
          floor: "9th Floor", 
          rsf: "4,000 SF",
          usableRatio: "88%",
          windowLine: "Interior exposure",
          buildOut: "Minor modifications needed",
        }
      ],
      totalSF: "12,475 SF",
      leaseTerms: {
        leaseType: "Full Service Gross",
        proposedTerm: "5 years + 5 year option",
        baseRate: "$36.00/SF/year",
        escalations: "3% annually",
        freeRent: "4 months",
        tiAllowance: "$45/SF",
      },
    },
    {
      id: "os2", 
      stage: "NEGOTIATING", // Different stage for this space
      reservationStatus: "competing", // This space has competition
      competingOpportunities: ["opp-23", "opp-89"],
      lastUpdated: "2024-01-12T14:20:00",
      stageHistory: [
        { stage: "NEW", date: "2024-01-05T09:15:00", user: "John Smith" },
        { stage: "QUALIFIED", date: "2024-01-06T11:00:00", user: "John Smith" },
        { stage: "NEGOTIATING", date: "2024-01-12T14:20:00", user: "John Smith" },
      ],
      building: {
        id: "bldg-2",
        name: "Innovation Tower",
        image: "/placeholder.svg?height=400&width=600", 
        address: "500 Innovation Way, Austin, TX 78701",
        class: "Class A",
        yearBuilt: "2020",
        totalRSF: "380,000 SF", 
        floors: 18,
        parking: "1:200 ratio",
        amenities: ["Lab Space", "Loading Dock", "24/7 Access", "Bike Storage"],
      },
      spaces: [
        {
          id: "space-1205",
          suiteNumber: "Suite 1205-1210", 
          floor: "12th Floor",
          rsf: "15,000 SF",
          usableRatio: "90%",
          windowLine: "Panoramic city views",
          buildOut: "Shell condition - full buildout required",
        }
      ],
      totalSF: "15,000 SF", 
      leaseTerms: {
        leaseType: "Triple Net",
        proposedTerm: "7 years",
        baseRate: "$32.50/SF/year", 
        escalations: "2.5% annually",
        freeRent: "6 months",
        tiAllowance: "$55/SF",
      },
    }
  ],
  // Calculated totals across all spaces
  totalSF: "27,475 SF",
  expectedValue: "$1,250,000", // Combined annual rent
  dates: {
    targetClose: "2024-02-15",
    leaseStart: "2024-03-01", 
    leaseExpiration: "2029-02-28",
    created: "2024-01-05",
    lastActivity: "2024-01-15T10:30:00",
  },
  contacts: [
    {
      id: "1",
      name: "Sarah Chen", 
      title: "VP Real Estate & Facilities",
      email: "sarah.chen@ecovolt.com",
      phone: "(512) 555-0123",
      avatar: "/placeholder.svg?height=40&width=40",
      isPrimary: true,
      company: "EcoVolt Energy Solutions",
      decisionMaker: true,
    },
    {
      id: "2",
      name: "David Park",
      title: "Chief Financial Officer", 
      email: "david.park@ecovolt.com",
      phone: "(512) 555-0124",
      avatar: "/placeholder.svg?height=40&width=40", 
      isPrimary: false,
      company: "EcoVolt Energy Solutions",
      decisionMaker: true,
    },
    {
      id: "3",
      name: "Jennifer Martinez",
      title: "Tenant Representative", 
      email: "jennifer@cretx.com",
      phone: "(512) 555-0199",
      avatar: "/placeholder.svg?height=40&width=40",
      isPrimary: false, 
      company: "CRE Texas Partners",
      decisionMaker: false,
      role: "tenant_rep",
    }
  ],
  // Enhanced notes with space-specific information
  notes: `EcoVolt is looking to consolidate and expand their Austin operations across two premier locations. 

PRIMARY LOCATION (Cobblestone): Executive offices and main operations - Suite 901 & 902 combination provides ideal layout for their growing team.

SECONDARY LOCATION (Innovation Tower): R&D and lab facilities - Suite 1205-1210 offers the lab-ready infrastructure they need.

COMPETITIVE SITUATION: Innovation Tower space is being pursued by 2 other tenants. EcoVolt is the preferred tenant but needs to move quickly on LOI.

CREDIT PROFILE: Excellent - Series C funded, $125M+ revenue, strong growth trajectory in clean energy sector.`,
  
  // Enhanced attachments with space-specific docs
  attachments: [
    { name: "LOI_EcoVolt_Cobblestone_Suites901-902.pdf", type: "LOI", date: "2024-01-10", building: "Cobblestone Collaborative" },
    { name: "LOI_EcoVolt_Innovation_Suite1205-1210.pdf", type: "LOI", date: "2024-01-12", building: "Innovation Tower" },
    { name: "EcoVolt_Financial_Statements_2023.pdf", type: "Financial", date: "2024-01-08", building: "Both" },
    { name: "Cobblestone_Floor_Plans_Level9.pdf", type: "Floor Plan", date: "2024-01-05", building: "Cobblestone Collaborative" },
    { name: "Innovation_Lab_Specifications.pdf", type: "Building Specs", date: "2024-01-06", building: "Innovation Tower" },
    { name: "EcoVolt_Space_Program_Requirements.pdf", type: "Requirements", date: "2024-01-05", building: "Both" },
  ],
}

export default function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [isEditing, setIsEditing] = useState(false)
  const [opportunity, setOpportunity] = useState(mockOpportunity)
  const [opportunityId, setOpportunityId] = useState<string>("")

  useEffect(() => {
    params.then(({ id }) => setOpportunityId(id))
  }, [params])

  // Function to handle stage changes
  const handleStageChange = (opportunitySpaceId: string, newStage: string) => {
    setOpportunity(prev => ({
      ...prev,
      opportunitySpaces: prev.opportunitySpaces.map(oppSpace => 
        oppSpace.id === opportunitySpaceId 
          ? {
              ...oppSpace,
              stage: newStage,
              lastUpdated: new Date().toISOString(),
              stageHistory: [
                ...oppSpace.stageHistory,
                { stage: newStage, date: new Date().toISOString(), user: "Current User" }
              ]
            }
          : oppSpace
      )
    }))
  }

  // Function to get stage configuration
  const getStageConfig = (systemStage: string) => {
    return SYSTEM_STAGES[systemStage as keyof typeof SYSTEM_STAGES] || SYSTEM_STAGES.NEW
  }

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
            <Badge variant="outline" className={getStageConfig(opportunity.stage).color}>
              {customerStageConfig[opportunity.stage as keyof typeof customerStageConfig]?.display_name || getStageConfig(opportunity.stage).default_display}
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
                    src={opportunity.opportunitySpaces[0].building.image || "/placeholder.svg"}
                    alt={opportunity.opportunitySpaces[0].building.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold">{opportunity.opportunitySpaces[0].building.name}</h2>
                    <p className="text-white/90 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {opportunity.opportunitySpaces[0].building.address}
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
                      <p className="font-semibold text-lg">{opportunity.totalSF}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Suite:</span>
                      <p className="font-medium">{opportunity.opportunitySpaces[0].spaces.map(space => space.suiteNumber).join(", ")}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Floor:</span>
                      <p className="font-medium">{opportunity.opportunitySpaces[0].spaces[0].floor}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Lease Type:</span>
                      <p className="font-medium">{opportunity.opportunitySpaces[0].leaseTerms.leaseType}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Rate:</span>
                      <p className="font-medium">{opportunity.opportunitySpaces[0].leaseTerms.baseRate}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Term:</span>
                      <p className="font-medium">{opportunity.opportunitySpaces[0].leaseTerms.proposedTerm}</p>
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

            {/* Competitive Intelligence & Space Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Square className="h-5 w-5 mr-2 text-blue-600" />
                  Space Portfolio & Competition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {opportunity.opportunitySpaces.map((oppSpace, index) => (
                  <div key={oppSpace.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{oppSpace.building.name}</h4>
                        <p className="text-sm text-gray-600">{oppSpace.totalSF} • {oppSpace.spaces.map((s: any) => s.suiteNumber).join(", ")}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select 
                          value={oppSpace.stage} 
                          onValueChange={(value) => handleStageChange(oppSpace.id, value)}
                        >
                          <SelectTrigger className={cn(
                            "w-40",
                            getStageConfig(oppSpace.stage).color
                          )}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(SYSTEM_STAGES)
                              .sort((a, b) => a.order - b.order)
                              .map((stage) => (
                                <SelectItem key={stage.system_stage} value={stage.system_stage}>
                                  <div className="flex items-center space-x-2">
                                    <div className={cn("w-2 h-2 rounded-full", 
                                      stage.system_stage === "NEW" ? "bg-blue-500" :
                                      stage.system_stage === "QUALIFIED" ? "bg-purple-500" :
                                      stage.system_stage === "NEGOTIATING" ? "bg-yellow-500" :
                                      stage.system_stage === "LEASE_DRAFTING" ? "bg-orange-500" :
                                      stage.system_stage === "CLOSED_WON" ? "bg-green-500" : "bg-gray-500"
                                    )} />
                                    <span>{customerStageConfig[stage.system_stage as keyof typeof customerStageConfig]?.display_name || stage.default_display}</span>
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {/* Competition Warning */}
                    {oppSpace.reservationStatus === "competing" && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                          <span className="text-sm font-medium text-yellow-800">
                            Competitive Situation: {oppSpace.competingOpportunities.length} other opportunities considering this space
                          </span>
                        </div>
                        <p className="text-xs text-yellow-700 mt-1">
                          Last updated: {new Date(oppSpace.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    
                    {/* Space Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Lease Type:</span>
                        <p className="font-medium">{oppSpace.leaseTerms.leaseType}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Base Rate:</span>
                        <p className="font-medium">{oppSpace.leaseTerms.baseRate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Term:</span>
                        <p className="font-medium">{oppSpace.leaseTerms.proposedTerm}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">TI Allowance:</span>
                        <p className="font-medium">{oppSpace.leaseTerms.tiAllowance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  Deal Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    defaultValue={opportunity.notes}
                    className="min-h-[150px]"
                    placeholder="Add notes about this opportunity..."
                  />
                ) : (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">{opportunity.notes}</div>
                )}
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Documents & Attachments
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
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded border">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm">{attachment.name}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{attachment.type}</span>
                            <span>•</span>
                            <span>{attachment.building}</span>
                            <span>•</span>
                            <span>{attachment.date}</span>
                          </div>
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
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center text-xs text-gray-500">
                            <Avatar className="h-4 w-4 mr-1">
                              <AvatarImage src={activity.userAvatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">{activity.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {activity.user}
                          </div>
                          {activity.building && (
                            <div className="flex items-center text-xs text-gray-500">
                              <Building2 className="h-3 w-3 mr-1" />
                              {activity.building}
                            </div>
                          )}
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
