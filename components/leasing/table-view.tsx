"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Search, ArrowUpDown, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useOpportunities } from "@/hooks/use-opportunities"

// System stage definitions
const SYSTEM_STAGES = {
  NEW: { label: "Prospect", color: "bg-blue-100 text-blue-800" },
  QUALIFIED: { label: "Qualified Lead", color: "bg-purple-100 text-purple-800" },
  NEGOTIATING: { label: "Hot Pursuit", color: "bg-yellow-100 text-yellow-800" },
  LEASE_DRAFTING: { label: "Legal Review", color: "bg-orange-100 text-orange-800" },
  CLOSED_WON: { label: "Deal Closed", color: "bg-green-100 text-green-800" },
  CLOSED_LOST: { label: "Lost Deal", color: "bg-gray-100 text-gray-800" },
}

// Mock data removed - now using shared hook

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
  const { opportunities, updateOpportunityStage } = useOpportunities()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  
  const filteredOpportunities = opportunities.filter((opportunity: any) =>
    opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opportunity.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opportunity.primaryBuilding_name.toLowerCase().includes(searchQuery.toLowerCase())
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
                <TableCell className="text-sm text-gray-600">{opportunity.primaryBuilding_name}</TableCell>
                <TableCell className="font-medium">{opportunity.totalSF}</TableCell>
                <TableCell>
                  <Select 
                    value={opportunity.stage} 
                    onValueChange={(value) => updateOpportunityStage(opportunity.id, value)}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW">Prospect</SelectItem>
                      <SelectItem value="QUALIFIED">Qualified Lead</SelectItem>
                      <SelectItem value="NEGOTIATING">Hot Pursuit</SelectItem>
                      <SelectItem value="LEASE_DRAFTING">Legal Review</SelectItem>
                      <SelectItem value="CLOSED_WON">Deal Closed</SelectItem>
                      <SelectItem value="CLOSED_LOST">Lost Deal</SelectItem>
                    </SelectContent>
                  </Select>
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
                <TableCell className="font-semibold">{formatCurrency(opportunity.expectedValue_number)}</TableCell>
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
