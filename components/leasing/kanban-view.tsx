"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Calendar, Users, Square } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useOpportunities } from "@/hooks/use-opportunities"

// System stage definitions - should match the main app
const SYSTEM_STAGES = {
  NEW: {
    system_stage: "NEW",
    default_display: "Prospect", 
    color: "border-blue-200 bg-blue-50",
    dot_color: "bg-blue-500",
    order: 1,
  },
  QUALIFIED: {
    system_stage: "QUALIFIED", 
    default_display: "Qualified",
    color: "border-purple-200 bg-purple-50", 
    dot_color: "bg-purple-500",
    order: 2,
  },
  NEGOTIATING: {
    system_stage: "NEGOTIATING",
    default_display: "Negotiating",
    color: "border-yellow-200 bg-yellow-50",
    dot_color: "bg-yellow-500",
    order: 3,
  },
  LEASE_DRAFTING: {
    system_stage: "LEASE_DRAFTING",
    default_display: "Lease Review", 
    color: "border-orange-200 bg-orange-50",
    dot_color: "bg-orange-500",
    order: 4,
  },
  CLOSED_WON: {
    system_stage: "CLOSED_WON",
    default_display: "Closed - Won",
    color: "border-green-200 bg-green-50", 
    dot_color: "bg-green-500",
    order: 5,
  },
  CLOSED_LOST: {
    system_stage: "CLOSED_LOST", 
    default_display: "Closed - Lost",
    color: "border-gray-200 bg-gray-50",
    dot_color: "bg-gray-400",
    order: 6,
  },
}

// Customer-specific stage customization
const customerStageConfig = {
  NEW: { display_name: "Prospect", system_stage: "NEW" },
  QUALIFIED: { display_name: "Qualified Lead", system_stage: "QUALIFIED" },
  NEGOTIATING: { display_name: "Hot Pursuit", system_stage: "NEGOTIATING" },
  LEASE_DRAFTING: { display_name: "Legal Review", system_stage: "LEASE_DRAFTING" },
  CLOSED_WON: { display_name: "Deal Closed", system_stage: "CLOSED_WON" },
  CLOSED_LOST: { display_name: "Lost Deal", system_stage: "CLOSED_LOST" },
}

// Mock data removed - now using shared hook

const getCompetitionBadge = (level: string) => {
  switch (level) {
    case "high":
      return <Badge variant="destructive" className="text-xs">High Competition</Badge>
    case "medium":
      return <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">Competition</Badge>
    case "low":
      return <Badge variant="outline" className="text-xs">Low Competition</Badge>
    default:
      return null
  }
}

export function KanbanView() {
  const { opportunities, updateOpportunityStage, getOpportunitiesByStage } = useOpportunities()

  // Convert SYSTEM_STAGES to array and sort by order
  const stages = Object.values(SYSTEM_STAGES).sort((a, b) => a.order - b.order)

  return (
    <div className="flex space-x-6 overflow-x-auto pb-6">
      {stages.map((stage) => (
        <div key={stage.system_stage} className="flex-shrink-0 w-80">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className={cn("w-3 h-3 rounded-full", stage.dot_color)} />
                <h3 className="font-medium text-gray-900">
                  {customerStageConfig[stage.system_stage as keyof typeof customerStageConfig]?.display_name || stage.default_display}
                </h3>
                <Badge variant="secondary" className="ml-auto">
                  {getOpportunitiesByStage(stage.system_stage).length}
                </Badge>
              </div>
            </div>

            <div className="p-4 space-y-4 min-h-[500px]">
              {getOpportunitiesByStage(stage.system_stage).map((opportunity) => (
                <Link key={opportunity.id} href={`/leasing/opportunities/${opportunity.id}`}>
                  <Card className={cn("cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4", stage.color)}>
                    <CardContent className="p-0">
                      {/* Building Image Header */}
                      <div className="relative h-32 bg-gray-100 rounded-t-lg overflow-hidden">
                        <img
                          src={opportunity.primaryBuilding.image || "/placeholder.svg"}
                          alt={opportunity.primaryBuilding.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 space-y-1">
                          <Select 
                            value={opportunity.stage} 
                            onValueChange={(value) => updateOpportunityStage(opportunity.id, value)}
                          >
                            <SelectTrigger className="w-32 h-6 text-xs bg-white/90 border-white/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(SYSTEM_STAGES)
                                .sort((a, b) => a.order - b.order)
                                .map((stage) => (
                                  <SelectItem key={stage.system_stage} value={stage.system_stage}>
                                    <div className="flex items-center space-x-2">
                                      <div className={cn("w-2 h-2 rounded-full", stage.dot_color)} />
                                      <span>{customerStageConfig[stage.system_stage as keyof typeof customerStageConfig]?.display_name || stage.default_display}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          {getCompetitionBadge(opportunity.competitionLevel)}
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
                            <span className="font-medium">{opportunity.primaryBuilding.name}</span>
                            {opportunity.spaceCount > 1 && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                +{opportunity.spaceCount - 1} more
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Square className="h-4 w-4 mr-2 text-blue-600" />
                            <span>{opportunity.totalSF} total</span>
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
