"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Search, ArrowUpDown, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// System stage definitions
const SYSTEM_STAGES = {
  NEW: { label: "Prospect", color: "bg-blue-100 text-blue-800" },
  QUALIFIED: { label: "Qualified Lead", color: "bg-purple-100 text-purple-800" },
  NEGOTIATING: { label: "Hot Pursuit", color: "bg-yellow-100 text-yellow-800" },
  LEASE_DRAFTING: { label: "Legal Review", color: "bg-orange-100 text-orange-800" },
  CLOSED_WON: { label: "Deal Closed", color: "bg-green-100 text-green-800" },
  CLOSED_LOST: { label: "Lost Deal", color: "bg-gray-100 text-gray-800" },
}

// Mock data (updated to match kanban view)
const mockOpportunities = [
  {
    id: "1",
    name: "EcoVolt Multi-Location Expansion",
    company: { name: "EcoVolt Energy Solutions", logo: "/placeholder.svg?height=32&width=32" },
    totalSF: "27,475 SF",
    primaryBuilding: "Cobblestone Collaborative + 1 more",
    primaryContact: {
      name: "Sarah Chen",
      title: "VP Real Estate & Facilities",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    stage: "QUALIFIED",
    nextActionDate: "2024-01-18",
    lastActivityDate: "2024-01-15",
    status: "active",
    expectedValue: 1250000,
    competitionLevel: "medium",
  },
  {
    id: "2",
    name: "TechFlow HQ Consolidation",
    company: { name: "TechFlow Solutions", logo: "/placeholder.svg?height=32&width=32" },
    totalSF: "18,200 SF",
    primaryBuilding: "Innovation Tower",
    primaryContact: {
      name: "Mike Rodriguez",
      title: "Facilities Manager",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    stage: "NEGOTIATING",
    nextActionDate: "2024-01-20",
    lastActivityDate: "2024-01-16",
    status: "active",
    expectedValue: 650000,
    competitionLevel: "high",
  },
  {
    id: "3",
    name: "DataCore Systems Expansion",
    company: { name: "DataCore Systems", logo: "/placeholder.svg?height=32&width=32" },
    totalSF: "25,000 SF",
    primaryBuilding: "Metro Business Center",
    primaryContact: {
      name: "Jennifer Park",
      title: "COO",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    stage: "LEASE_DRAFTING",
    nextActionDate: "2024-01-25",
    lastActivityDate: "2024-01-18",
    status: "active",
    expectedValue: 825000,
    competitionLevel: "none",
  },
  {
    id: "4",
    name: "StartupX Growth Space",
    company: { name: "StartupX", logo: "/placeholder.svg?height=32&width=32" },
    totalSF: "3,000 SF",
    primaryBuilding: "Creative Commons",
    primaryContact: {
      name: "Alex Thompson",
      title: "CEO",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    stage: "CLOSED_LOST",
    nextActionDate: "2024-01-10",
    lastActivityDate: "2024-01-10",
    status: "lost",
    expectedValue: 108000,
    competitionLevel: "none",
  },
  {
    id: "5",
    name: "GreenTech Renewal",
    company: { name: "GreenTech Innovations", logo: "/placeholder.svg?height=32&width=32" },
    totalSF: "12,000 SF",
    primaryBuilding: "Eco Building",
    primaryContact: {
      name: "David Kim",
      title: "Operations Director",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    stage: "NEW",
    nextActionDate: "2024-01-22",
    lastActivityDate: "2024-01-19",
    status: "active",
    expectedValue: 420000,
    competitionLevel: "low",
  },
  {
    id: "6",
    name: "BioLab Research Facility",
    company: { name: "BioLab Sciences", logo: "/placeholder.svg?height=32&width=32" },
    totalSF: "35,000 SF",
    primaryBuilding: "Research Park",
    primaryContact: {
      name: "Dr. Lisa Wang",
      title: "Facilities Director",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    stage: "CLOSED_WON",
    nextActionDate: "2024-01-18",
    lastActivityDate: "2024-01-18",
    status: "won",
    expectedValue: 1575000,
    competitionLevel: "none",
  },
]

const getCompetitionIndicator = (level: string) => {
  switch (level) {
    case "high":
      return <Circle className="h-2 w-2 fill-red-500 text-red-500" />
    case "medium":
      return <Circle className="h-2 w-2 fill-yellow-500 text-yellow-500" />
    case "low":
      return <Circle className="h-2 w-2 fill-blue-500 text-blue-500" />
    default:
      return <Circle className="h-2 w-2 fill-gray-300 text-gray-300" />
  }
}

export function TableView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  
  const filteredOpportunities = mockOpportunities.filter((opportunity) =>
    opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opportunity.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opportunity.primaryBuilding.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search opportunities..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Opportunity</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Building</TableHead>
              <TableHead>Square Footage</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Competition</TableHead>
              <TableHead>Primary Contact</TableHead>
              <TableHead>Expected Value</TableHead>
              <TableHead>Next Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOpportunities.map((opportunity) => (
              <TableRow key={opportunity.id} className="cursor-pointer hover:bg-gray-50">
                <TableCell>
                  <div className="font-medium text-blue-600 hover:text-blue-800">
                    <Link href={`/leasing/opportunities/${opportunity.id}`}>
                      {opportunity.name}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={opportunity.company.logo || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                        {opportunity.company.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{opportunity.company.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{opportunity.primaryBuilding}</TableCell>
                <TableCell className="font-medium">{opportunity.totalSF}</TableCell>
                <TableCell>
                  <Badge className={SYSTEM_STAGES[opportunity.stage as keyof typeof SYSTEM_STAGES]?.color || "bg-gray-100 text-gray-800"}>
                    {SYSTEM_STAGES[opportunity.stage as keyof typeof SYSTEM_STAGES]?.label || opportunity.stage}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    {getCompetitionIndicator(opportunity.competitionLevel)}
                    <span className="text-xs text-gray-500 capitalize">{opportunity.competitionLevel}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={opportunity.primaryContact.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                        {opportunity.primaryContact.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{opportunity.primaryContact.name}</div>
                      <div className="text-xs text-gray-500">{opportunity.primaryContact.title}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{formatCurrency(opportunity.expectedValue)}</TableCell>
                <TableCell className="text-sm text-gray-600">
                  {new Date(opportunity.nextActionDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
