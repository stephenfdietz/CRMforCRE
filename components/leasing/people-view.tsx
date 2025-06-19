"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Building2, Upload, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock people data matching the Figma exactly
const mockPeople = [
  {
    id: "1",
    name: "Dennis Callis", 
    email: "rodger913@aol.com",
    company: "ACME",
    building: ["building1"],
    buildingNames: ["Innovation Tower"],
    type: ["Tenant"],
    tags: ["VIP"],
    status: "Invited",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2", 
    name: "Kimberly Mastrangelo",
    email: "stephanienicol@outlook.com", 
    company: "Segment",
    building: ["building2"],
    buildingNames: ["Metro Business Center"],
    type: ["Contact", "Tenant"],
    tags: ["VIP"],
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Corina McCoy",
    email: "judith403@gmail.com",
    company: "Leapyear", 
    building: ["building1"],
    buildingNames: ["Innovation Tower"],
    type: ["Vendor"],
    tags: ["Decision maker"],
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Jerry Helfer",
    email: "j.jones@outlook.com",
    company: "ContrastAI",
    building: ["building2"],
    buildingNames: ["Metro Business Center"], 
    type: ["Contact", "Visitor"],
    tags: [],
    status: "Pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Rodger Struck",
    email: "dennis416@gmail.com",
    company: "Landlord Inc.",
    building: ["building1", "building2", "building3", "building4", "building5"],
    buildingNames: ["Innovation Tower", "Metro Center", "Creative Commons", "Research Park", "Eco Building"],
    type: ["Staff"],
    tags: [],
    status: "Active", 
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Iva Ryan",
    email: "b.b.lawlor@outlook.com",
    company: "Landlord Inc.",
    building: ["building1", "building2"],
    buildingNames: ["Innovation Tower", "Metro Center"],
    type: ["Tenant"],
    tags: [],
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40", 
  },
  {
    id: "7",
    name: "Bradley Lawlor",
    email: "f.j.swann@aol.com",
    company: "ACME",
    building: ["building1", "building2", "building3"],
    buildingNames: ["Innovation Tower", "Metro Center", "Creative Commons"],
    type: ["Tenant"],
    tags: ["Point of contact"],
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
    isAdmin: true,
  },
  {
    id: "8", 
    name: "Patricia Sanders",
    email: "eddie_lake@gmail.com",
    company: "Leapyear",
    building: ["building1"],
    buildingNames: ["Innovation Tower"],
    type: ["Tenant"],
    tags: ["Executive"],
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "9",
    name: "Kenneth Allen", 
    email: "k.r.mastrangelo@outlook.com",
    company: "Landlord Inc.",
    building: ["building1", "building2", "building3", "building4", "building5"],
    buildingNames: ["Innovation Tower", "Metro Center", "Creative Commons", "Research Park", "Eco Building"],
    type: ["Staff"],
    tags: [],
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const getStatusDot = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-500"
    case "Invited":
      return "bg-red-500"
    case "Pending":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

const BuildingIcons = ({ buildings, buildingNames }: { buildings: string[]; buildingNames: string[] }) => {
  if (buildings.length === 1) {
    return (
      <div className="flex items-center">
        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
          <Building2 className="w-3 h-3 text-blue-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-1">
      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
        <Building2 className="w-3 h-3 text-blue-600" />
      </div>
      <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
        <Building2 className="w-3 h-3 text-gray-600" />
      </div>
      {buildings.length > 2 && (
        <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
          <span className="text-xs text-gray-600 font-medium">+{buildings.length - 2}</span>
        </div>
      )}
    </div>
  )
}

export function PeopleView() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [companyFilter, setCompanyFilter] = useState<string>("all")
  const [buildingFilter, setBuildingFilter] = useState<string>("all")
  const [tagsFilter, setTagsFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  // Get unique values for filters
  const companies = Array.from(new Set(mockPeople.map(p => p.company))).sort()
  const buildings = Array.from(new Set(mockPeople.flatMap(p => p.buildingNames))).sort()
  const tags = Array.from(new Set(mockPeople.flatMap(p => p.tags))).sort()
  const statuses = Array.from(new Set(mockPeople.map(p => p.status))).sort()

  // Filter people based on tab and filters
  const filteredPeople = mockPeople.filter(person => {
    // Tab filtering
    if (activeTab !== "all") {
      if (activeTab === "contacts" && !person.type.includes("Contact")) return false
      if (activeTab === "tenants" && !person.type.includes("Tenant")) return false  
      if (activeTab === "staff" && !person.type.includes("Staff")) return false
      if (activeTab === "vendors" && !person.type.includes("Vendor")) return false
      if (activeTab === "visitors" && !person.type.includes("Visitor")) return false
    }

    // Search filtering
    if (searchQuery && !person.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !person.email.toLowerCase().includes(searchQuery.toLowerCase())) return false

    // Company filter
    if (companyFilter && companyFilter !== "all" && person.company !== companyFilter) return false
    
    // Building filter  
    if (buildingFilter && buildingFilter !== "all" && !person.buildingNames.includes(buildingFilter)) return false

    // Tags filter
    if (tagsFilter && tagsFilter !== "all" && !person.tags.includes(tagsFilter)) return false

    // Status filter
    if (statusFilter && statusFilter !== "all" && person.status !== statusFilter) return false

    return true
  })

  const getTabCount = (tab: string) => {
    if (tab === "all") return mockPeople.length
    if (tab === "contacts") return mockPeople.filter(p => p.type.includes("Contact")).length
    if (tab === "tenants") return mockPeople.filter(p => p.type.includes("Tenant")).length
    if (tab === "staff") return mockPeople.filter(p => p.type.includes("Staff")).length  
    if (tab === "vendors") return mockPeople.filter(p => p.type.includes("Vendor")).length
    if (tab === "visitors") return mockPeople.filter(p => p.type.includes("Visitor")).length
    return 0
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">People</h1>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Bulk upload
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add people
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all" className="relative">
            All people
            <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
              {getTabCount("all")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="contacts" className="relative">
            Contacts  
            <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
              {getTabCount("contacts")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="tenants" className="relative">
            Tenants
            <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
              {getTabCount("tenants")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="staff" className="relative">
            Staff
            <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
              {getTabCount("staff")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="vendors" className="relative">
            Vendors
            <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
              {getTabCount("vendors")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="visitors" className="relative">
            Visitors
            <Badge variant="secondary" className="ml-2 h-5 px-2 text-xs">
              {getTabCount("visitors")}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or email"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companies.map(company => (
                <SelectItem key={company} value={company}>{company}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={buildingFilter} onValueChange={setBuildingFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Building" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Buildings</SelectItem>
              {buildings.map(building => (
                <SelectItem key={building} value={building}>{building}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={tagsFilter} onValueChange={setTagsFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {tags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Data Table */}
        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Building</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPeople.map((person) => (
                    <TableRow key={person.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={person.avatar} />
                            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                              {person.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-blue-600">{person.name}</span>
                              {person.isAdmin && (
                                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                                  Admin
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{person.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{person.company}</span>
                      </TableCell>
                      <TableCell>
                        <BuildingIcons buildings={person.building} buildingNames={person.buildingNames} />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {person.type.map((type, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {person.tags.map((tag, index) => (
                            <Badge key={index} className="text-xs bg-blue-100 text-blue-800">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={cn("w-2 h-2 rounded-full", getStatusDot(person.status))} />
                          <span className="text-sm font-medium">{person.status}</span>
                          {person.status === "Pending" && (
                            <Button size="sm" variant="outline" className="ml-2">
                              Invite
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 