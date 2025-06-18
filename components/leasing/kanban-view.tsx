"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, Users, Square } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Enhanced mock data with building images and more details
const mockOpportunities = [
  {
    id: "1",
    name: "EcoVolt Expansion – Suite 901",
    company: {
      name: "EcoVolt Energy",
      logo: "/placeholder.svg?height=32&width=32",
      industry: "Clean Energy",
      size: "500+ employees",
    },
    building: {
      name: "Cobblestone Collaborative",
      image: "/placeholder.svg?height=200&width=300",
      address: "1200 Tech Blvd",
    },
    squareFootage: "12,475 SF",
    suiteInfo: "Suite 901, Floor 9",
    stage: "PROSPECT",
    targetCloseDate: "2024-02-15",
    status: "active",
    expectedValue: "$450,000",
    contacts: [
      {
        name: "Sarah Chen",
        title: "VP Real Estate",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SC",
      },
      {
        name: "David Park",
        title: "CFO",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DP",
      },
    ],
  },
  {
    id: "2",
    name: "TechFlow HQ Relocation – Floor 3",
    company: {
      name: "TechFlow Solutions",
      logo: "/placeholder.svg?height=32&width=32",
      industry: "Software",
      size: "200+ employees",
    },
    building: {
      name: "Innovation Tower",
      image: "/placeholder.svg?height=200&width=300",
      address: "500 Innovation Way",
    },
    squareFootage: "8,200 SF",
    suiteInfo: "Entire Floor 3",
    stage: "NEGOTIATE",
    targetCloseDate: "2024-01-28",
    status: "active",
    expectedValue: "$295,000",
    contacts: [
      {
        name: "Mike Rodriguez",
        title: "Facilities Manager",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MR",
      },
    ],
  },
  {
    id: "3",
    name: "DataCore Systems – Suite 1205",
    company: {
      name: "DataCore Systems",
      logo: "/placeholder.svg?height=32&width=32",
      industry: "Data Analytics",
      size: "1000+ employees",
    },
    building: {
      name: "Metro Business Center",
      image: "/placeholder.svg?height=200&width=300",
      address: "800 Metro Plaza",
    },
    squareFootage: "15,000 SF",
    suiteInfo: "Suite 1205-1210",
    stage: "CLOSED_WON",
    targetCloseDate: "2024-01-15",
    status: "won",
    expectedValue: "$540,000",
    contacts: [
      {
        name: "Jennifer Park",
        title: "COO",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JP",
      },
      {
        name: "Robert Kim",
        title: "Legal Counsel",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "RK",
      },
    ],
  },
  {
    id: "4",
    name: "StartupX Growth Space – Suite 450",
    company: {
      name: "StartupX",
      logo: "/placeholder.svg?height=32&width=32",
      industry: "FinTech",
      size: "50+ employees",
    },
    building: {
      name: "Creative Commons",
      image: "/placeholder.svg?height=200&width=300",
      address: "300 Creative Ave",
    },
    squareFootage: "3,000 SF",
    suiteInfo: "Suite 450",
    stage: "CLOSED_LOST",
    targetCloseDate: "2024-01-10",
    status: "lost",
    expectedValue: "$108,000",
    contacts: [
      {
        name: "Alex Thompson",
        title: "CEO",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AT",
      },
    ],
  },
]

const stages = [
  { id: "PROSPECT", label: "Prospect", color: "border-blue-200 bg-blue-50" },
  { id: "NEGOTIATE", label: "Negotiate", color: "border-yellow-200 bg-yellow-50" },
  { id: "CLOSED_WON", label: "Closed – Won", color: "border-green-200 bg-green-50" },
  { id: "CLOSED_LOST", label: "Closed – Lost", color: "border-gray-200 bg-gray-50" },
]

const getStageColor = (stageId: string) => {
  const stage = stages.find((s) => s.id === stageId)
  return stage?.color || "border-gray-200 bg-gray-50"
}

export function KanbanView() {
  const [opportunities] = useState(mockOpportunities)

  const getOpportunitiesByStage = (stageId: string) => {
    return opportunities.filter((opp) => opp.stage === stageId)
  }

  return (
    <div className="flex space-x-6 overflow-x-auto pb-6">
      {stages.map((stage) => (
        <div key={stage.id} className="flex-shrink-0 w-80">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full",
                    stage.id === "PROSPECT"
                      ? "bg-blue-500"
                      : stage.id === "NEGOTIATE"
                        ? "bg-yellow-500"
                        : stage.id === "CLOSED_WON"
                          ? "bg-green-500"
                          : "bg-gray-400",
                  )}
                />
                <h3 className="font-medium text-gray-900">{stage.label}</h3>
                <Badge variant="secondary" className="ml-auto">
                  {getOpportunitiesByStage(stage.id).length}
                </Badge>
              </div>
            </div>

            <div className="p-4 space-y-4 min-h-[500px]">
              {getOpportunitiesByStage(stage.id).map((opportunity) => (
                <Link key={opportunity.id} href={`/leasing/opportunities/${opportunity.id}`}>
                  <Card
                    className={cn(
                      "cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4",
                      getStageColor(opportunity.stage),
                    )}
                  >
                    <CardContent className="p-0">
                      {/* Building Image Header */}
                      <div className="relative h-32 bg-gray-100 rounded-t-lg overflow-hidden">
                        <img
                          src={opportunity.building.image || "/placeholder.svg"}
                          alt={opportunity.building.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
                            {stage.label}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4">
                        {/* Opportunity Name */}
                        <h4 className="font-semibold text-gray-900 mb-2 leading-tight">{opportunity.name}</h4>

                        {/* Company */}
                        <div className="flex items-center space-x-2 mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={opportunity.company.logo || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                              {opportunity.company.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-gray-700">{opportunity.company.name}</span>
                        </div>

                        {/* Space Info */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Building2 className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="font-medium">{opportunity.building.name}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Square className="h-4 w-4 mr-2 text-blue-600" />
                            <span>
                              {opportunity.squareFootage} • {opportunity.suiteInfo}
                            </span>
                          </div>
                        </div>

                        {/* Contacts */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-gray-400 mr-1" />
                            <div className="flex -space-x-1">
                              {opportunity.contacts.slice(0, 3).map((contact, index) => (
                                <Avatar key={index} className="h-6 w-6 border-2 border-white">
                                  <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                                    {contact.initials}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {opportunity.contacts.length > 3 && (
                                <div className="h-6 w-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                                  <span className="text-xs text-gray-600">+{opportunity.contacts.length - 3}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-sm font-semibold text-gray-900">{opportunity.expectedValue}</div>
                        </div>

                        {/* Target Close Date */}
                        <div className="flex items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Target Close: {new Date(opportunity.targetCloseDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
