"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Search, ArrowUpDown, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data (same as kanban view)
const mockOpportunities = [
  {
    id: "1",
    name: "Suite 901 – EcoVolt – 12.5K SF",
    company: { name: "EcoVolt Energy", logo: "/placeholder.svg?height=32&width=32" },
    squareFootage: "12,475 SF",
    building: "Cobblestone Collaborative",
    primaryContact: {
      name: "Sarah Chen",
      title: "VP Real Estate",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    stage: "PROSPECT",
    nextActionDate: "2024-01-15",
    lastActivityDate: "2024-01-10",
    status: "active",
    expectedValue: 450000,
  },
  {
    id: "2",
    name: "Floor 3 – TechFlow – 8.2K SF",
    company: { name: "TechFlow Solutions", logo: "/placeholder.svg?height=32&width=32" },
    squareFootage: "8,200 SF",
    building: "Innovation Tower",
    primaryContact: {
      name: "Mike Rodriguez",
      title: "Facilities Manager",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    stage: "NEGOTIATE",
    nextActionDate: "2024-01-12",
    lastActivityDate: "2024-01-09",
    status: "active",
    expectedValue: 295000,
  },
  {
    id: "3",
    name: "Suite 1205 – DataCore – 15K SF",
    company: { name: "DataCore Systems", logo: "/placeholder.svg?height=32&width=32" },
    squareFootage: "15,000 SF",
    building: "Metro Business Center",
    primaryContact: {
      name: "Jennifer Park",
      title: "COO",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    stage: "CLOSED_WON",
    nextActionDate: "2024-01-20",
    lastActivityDate: "2024-01-08",
    status: "won",
    expectedValue: 540000,
  },
  {
    id: "4",
    name: "Suite 450 – StartupX – 3K SF",
    company: { name: "StartupX", logo: "/placeholder.svg?height=32&width=32" },
    squareFootage: "3,000 SF",
    building: "Creative Commons",
    primaryContact: {
      name: "Alex Thompson",
      title: "CEO",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    stage: "CLOSED_LOST",
    nextActionDate: "2024-01-08",
    lastActivityDate: "2024-01-05",
    status: "lost",
    expectedValue: 108000,
  },
]

const stageLabels = {
  PROSPECT: { label: "Prospect", color: "bg-blue-500" },
  NEGOTIATE: { label: "Negotiate", color: "bg-yellow-500" },
  CLOSED_WON: { label: "Closed – Won", color: "bg-green-500" },
  CLOSED_LOST: { label: "Closed – Lost", color: "bg-red-500" },
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <Circle className="h-3 w-3 fill-green-500 text-green-500" />
    case "stalled":
      return <Circle className="h-3 w-3 fill-red-500 text-red-500" />
    case "follow-up":
      return <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />
    case "won":
      return <Circle className="h-3 w-3 fill-green-500 text-green-500" />
    case "lost":
      return <Circle className="h-3 w-3 fill-gray-400 text-gray-400" />
    default:
      return <Circle className="h-3 w-3 fill-gray-400 text-gray-400" />
  }
}

export function TableView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const filteredOpportunities = mockOpportunities.filter(
    (opp) =>
      opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.building.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" size="sm" onClick={() => handleSort("name")} className="h-auto p-0 font-medium">
                Opportunity Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("company")}
                className="h-auto p-0 font-medium"
              >
                Company
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Space/Building</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("squareFootage")}
                className="h-auto p-0 font-medium"
              >
                SF
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("expectedValue")}
                className="h-auto p-0 font-medium"
              >
                Expected Value
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Primary Contact</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead>Next Action</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOpportunities.map((opportunity) => (
            <TableRow key={opportunity.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{opportunity.name}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={opportunity.company.logo || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{opportunity.company.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{opportunity.company.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div className="font-medium">{opportunity.building}</div>
                </div>
              </TableCell>
              <TableCell>{opportunity.squareFootage}</TableCell>
              <TableCell>${opportunity.expectedValue.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      stageLabels[opportunity.stage as keyof typeof stageLabels].color,
                    )}
                  />
                  <span className="text-sm">{stageLabels[opportunity.stage as keyof typeof stageLabels].label}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={opportunity.primaryContact.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {opportunity.primaryContact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-medium">{opportunity.primaryContact.name}</div>
                    <div className="text-gray-500 text-xs">{opportunity.primaryContact.title}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {new Date(opportunity.lastActivityDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {new Date(opportunity.nextActionDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{getStatusIcon(opportunity.status)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
