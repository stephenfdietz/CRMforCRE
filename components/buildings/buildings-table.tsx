"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { GlobalSearch } from "@/components/global-search"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Filter, MapPin, Building2, Users, DollarSign } from "lucide-react"
import Link from "next/link"

const buildingTypes = [
  { value: "all", label: "All Asset Types" },
  { value: "office", label: "Office" },
  { value: "multifamily", label: "Multifamily" },
  { value: "retail", label: "Retail" },
  { value: "industrial", label: "Industrial" },
  { value: "warehouse", label: "Warehouse" },
  { value: "data-center", label: "Data Center" },
  { value: "medical", label: "Medical" },
  { value: "lab", label: "Lab/R&D" },
  { value: "hospitality", label: "Hospitality" },
  { value: "mixed-use", label: "Mixed Use" },
  { value: "land", label: "Land" },
  { value: "specialty", label: "Specialty" },
]

const buildingClasses = [
  { value: "all", label: "All Classes" },
  { value: "class-a", label: "Class A" },
  { value: "class-b", label: "Class B" },
  { value: "class-c", label: "Class C" },
]

const statuses = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "under-construction", label: "Under Construction" },
  { value: "renovation", label: "Renovation" },
  { value: "disposition", label: "Disposition" },
  { value: "inactive", label: "Inactive" },
]

const mockBuildings = [
  {
    id: "1",
    name: "Cobblestone Collaborative",
    address: "123 Innovation Drive, San Francisco, CA 94105",
    type: "office",
    class: "class-a",
    yearBuilt: 2018,
    rsf: 450000,
    floors: 12,
    occupancyRate: 92,
    tenantCount: 15,
    monthlyRent: 1250000,
    noi: 12500000,
    capRate: 4.2,
    status: "active",
    portfolio: "Core Portfolio",
    owner: "Quantum City Investments",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Metro Tower",
    address: "456 Business Blvd, San Francisco, CA 94102",
    type: "office",
    class: "class-a",
    yearBuilt: 2020,
    rsf: 380000,
    floors: 18,
    occupancyRate: 88,
    tenantCount: 12,
    monthlyRent: 1100000,
    noi: 11200000,
    capRate: 4.5,
    status: "active",
    portfolio: "Core Portfolio",
    owner: "Quantum City Investments",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Innovation Hub",
    address: "789 Tech Way, Palo Alto, CA 94301",
    type: "lab",
    class: "class-a",
    yearBuilt: 2019,
    rsf: 280000,
    floors: 8,
    occupancyRate: 95,
    tenantCount: 8,
    monthlyRent: 950000,
    noi: 9800000,
    capRate: 4.8,
    status: "active",
    portfolio: "Growth Portfolio",
    owner: "Quantum City Investments",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Bay Area Data Center",
    address: "321 Server Street, Fremont, CA 94538",
    type: "data-center",
    class: "class-a",
    yearBuilt: 2021,
    rsf: 150000,
    floors: 3,
    occupancyRate: 78,
    tenantCount: 5,
    monthlyRent: 800000,
    noi: 8200000,
    capRate: 5.2,
    status: "active",
    portfolio: "Specialty Portfolio",
    owner: "Quantum City Investments",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Sunset Apartments",
    address: "654 Residential Ave, San Francisco, CA 94122",
    type: "multifamily",
    class: "class-b",
    yearBuilt: 2015,
    rsf: 320000,
    floors: 6,
    occupancyRate: 96,
    tenantCount: 180,
    monthlyRent: 720000,
    noi: 7500000,
    capRate: 3.8,
    status: "active",
    portfolio: "Residential Portfolio",
    owner: "Quantum City Investments",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Industrial Park West",
    address: "987 Manufacturing Rd, Oakland, CA 94607",
    type: "industrial",
    class: "class-b",
    yearBuilt: 2010,
    rsf: 500000,
    floors: 2,
    occupancyRate: 85,
    tenantCount: 6,
    monthlyRent: 420000,
    noi: 4800000,
    capRate: 6.2,
    status: "active",
    portfolio: "Industrial Portfolio",
    owner: "Quantum City Investments",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function BuildingsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredBuildings = mockBuildings.filter((building) => {
    const matchesSearch =
      building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      building.owner.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedType === "all" || building.type === selectedType
    const matchesClass = selectedClass === "all" || building.class === selectedClass
    const matchesStatus = selectedStatus === "all" || building.status === selectedStatus

    return matchesSearch && matchesType && matchesClass && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "under-construction":
        return <Badge className="bg-blue-100 text-blue-800">Under Construction</Badge>
      case "renovation":
        return <Badge className="bg-yellow-100 text-yellow-800">Renovation</Badge>
      case "disposition":
        return <Badge className="bg-orange-100 text-orange-800">Disposition</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    const typeLabels: { [key: string]: string } = {
      office: "Office",
      multifamily: "Multifamily",
      retail: "Retail",
      industrial: "Industrial",
      warehouse: "Warehouse",
      "data-center": "Data Center",
      medical: "Medical",
      lab: "Lab/R&D",
      hospitality: "Hospitality",
      "mixed-use": "Mixed Use",
      land: "Land",
      specialty: "Specialty",
    }
    return <Badge variant="outline">{typeLabels[type] || type}</Badge>
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Buildings</h1>
              <p className="text-sm text-gray-500">Manage your real estate portfolio</p>
            </div>
            <div className="flex items-center space-x-4">
              <GlobalSearch />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Building
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by building, address, or owner..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                {buildingTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                {buildingClasses.map((cls) => (
                  <SelectItem key={cls.value} value={cls.value}>
                    {cls.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Buildings</p>
                    <p className="text-2xl font-bold">{filteredBuildings.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <MapPin className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total RSF</p>
                    <p className="text-2xl font-bold">
                      {formatNumber(filteredBuildings.reduce((sum, b) => sum + b.rsf, 0))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Avg Occupancy</p>
                    <p className="text-2xl font-bold">
                      {Math.round(
                        filteredBuildings.reduce((sum, b) => sum + b.occupancyRate, 0) / filteredBuildings.length,
                      )}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total NOI</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(filteredBuildings.reduce((sum, b) => sum + b.noi, 0))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Buildings Table */}
        <div className="flex-1 overflow-auto px-6 pb-6">
          <Card>
            <CardHeader>
              <CardTitle>All Buildings ({filteredBuildings.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Building</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>RSF</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Tenants</TableHead>
                    <TableHead>Monthly Rent</TableHead>
                    <TableHead>NOI</TableHead>
                    <TableHead>Cap Rate</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBuildings.map((building) => (
                    <TableRow key={building.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>
                        <Link href={`/buildings/${building.id}`} className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={building.image || "/placeholder.svg"} />
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {building.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-blue-600 hover:text-blue-800">{building.name}</div>
                            <div className="text-sm text-gray-500">{building.address}</div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>{getTypeBadge(building.type)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {building.class === "class-a"
                            ? "Class A"
                            : building.class === "class-b"
                              ? "Class B"
                              : "Class C"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatNumber(building.rsf)} SF</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="mr-2">{building.occupancyRate}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${building.occupancyRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{building.tenantCount}</TableCell>
                      <TableCell>{formatCurrency(building.monthlyRent)}</TableCell>
                      <TableCell>{formatCurrency(building.noi)}</TableCell>
                      <TableCell>{building.capRate}%</TableCell>
                      <TableCell>{getStatusBadge(building.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
