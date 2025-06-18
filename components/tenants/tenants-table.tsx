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
import { Search, Plus, Filter, Users, Building2, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"

const tenantTypes = [
  { value: "all", label: "All Tenant Types" },
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "legal", label: "Legal" },
  { value: "consulting", label: "Consulting" },
  { value: "marketing", label: "Marketing" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail" },
  { value: "other", label: "Other" },
]

const leaseStatuses = [
  { value: "all", label: "All Lease Statuses" },
  { value: "active", label: "Active" },
  { value: "expiring-soon", label: "Expiring Soon" },
  { value: "expired", label: "Expired" },
  { value: "pending", label: "Pending" },
  { value: "terminated", label: "Terminated" },
]

const buildings = [
  { value: "all", label: "All Buildings" },
  { value: "cobblestone", label: "Cobblestone Collaborative" },
  { value: "metro-tower", label: "Metro Tower" },
  { value: "innovation-hub", label: "Innovation Hub" },
  { value: "bay-area-data", label: "Bay Area Data Center" },
  { value: "sunset-apartments", label: "Sunset Apartments" },
  { value: "industrial-park", label: "Industrial Park West" },
]

const mockTenants = [
  {
    id: "1",
    name: "EcoVolt Energy Solutions",
    industry: "technology",
    building: "Cobblestone Collaborative",
    buildingId: "cobblestone",
    suite: "Suite 901, Suite 801",
    floor: "Floor 9, Floor 8",
    rsf: 12500,
    leaseStart: "2022-01-15",
    leaseEnd: "2027-01-14",
    monthlyRent: 62500,
    annualRent: 750000,
    leaseStatus: "active",
    employeeCount: 85,
    contactName: "Sarah Chen",
    contactEmail: "sarah.chen@ecovolt.com",
    contactPhone: "(555) 123-4567",
    image: "/placeholder.svg?height=40&width=40",
    daysUntilExpiry: 1095,
  },
  {
    id: "2",
    name: "Quantum Analytics",
    industry: "finance",
    building: "Metro Tower",
    buildingId: "metro-tower",
    suite: "Suite 1205",
    floor: "Floor 12",
    rsf: 8500,
    leaseStart: "2023-03-01",
    leaseEnd: "2028-02-29",
    monthlyRent: 42500,
    annualRent: 510000,
    leaseStatus: "active",
    employeeCount: 45,
    contactName: "Michael Rodriguez",
    contactEmail: "m.rodriguez@quantumanalytics.com",
    contactPhone: "(555) 234-5678",
    image: "/placeholder.svg?height=40&width=40",
    daysUntilExpiry: 1460,
  },
  {
    id: "3",
    name: "BioTech Innovations",
    industry: "healthcare",
    building: "Innovation Hub",
    buildingId: "innovation-hub",
    suite: "Suite 301-305",
    floor: "Floor 3",
    rsf: 15000,
    leaseStart: "2021-06-01",
    leaseEnd: "2024-05-31",
    monthlyRent: 75000,
    annualRent: 900000,
    leaseStatus: "expiring-soon",
    employeeCount: 120,
    contactName: "Dr. Emily Watson",
    contactEmail: "e.watson@biotechinnovations.com",
    contactPhone: "(555) 345-6789",
    image: "/placeholder.svg?height=40&width=40",
    daysUntilExpiry: 180,
  },
  {
    id: "4",
    name: "Legal Partners LLC",
    industry: "legal",
    building: "Metro Tower",
    buildingId: "metro-tower",
    suite: "Suite 1801-1803",
    floor: "Floor 18",
    rsf: 6500,
    leaseStart: "2022-09-01",
    leaseEnd: "2025-08-31",
    monthlyRent: 32500,
    annualRent: 390000,
    leaseStatus: "active",
    employeeCount: 25,
    contactName: "James Thompson",
    contactEmail: "j.thompson@legalpartners.com",
    contactPhone: "(555) 456-7890",
    image: "/placeholder.svg?height=40&width=40",
    daysUntilExpiry: 730,
  },
  {
    id: "5",
    name: "Creative Marketing Co",
    industry: "marketing",
    building: "Cobblestone Collaborative",
    buildingId: "cobblestone",
    suite: "Suite 501",
    floor: "Floor 5",
    rsf: 4500,
    leaseStart: "2023-01-01",
    leaseEnd: "2026-12-31",
    monthlyRent: 22500,
    annualRent: 270000,
    leaseStatus: "active",
    employeeCount: 30,
    contactName: "Lisa Park",
    contactEmail: "l.park@creativemarketing.com",
    contactPhone: "(555) 567-8901",
    image: "/placeholder.svg?height=40&width=40",
    daysUntilExpiry: 1095,
  },
  {
    id: "6",
    name: "DataFlow Systems",
    industry: "technology",
    building: "Bay Area Data Center",
    buildingId: "bay-area-data",
    suite: "Suite 101-102",
    floor: "Floor 1",
    rsf: 20000,
    leaseStart: "2023-07-01",
    leaseEnd: "2033-06-30",
    monthlyRent: 100000,
    annualRent: 1200000,
    leaseStatus: "active",
    employeeCount: 75,
    contactName: "Robert Kim",
    contactEmail: "r.kim@dataflowsystems.com",
    contactPhone: "(555) 678-9012",
    image: "/placeholder.svg?height=40&width=40",
    daysUntilExpiry: 3650,
  },
]

export function TenantsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedBuilding, setSelectedBuilding] = useState("all")

  const filteredTenants = mockTenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.suite.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedType === "all" || tenant.industry === selectedType
    const matchesStatus = selectedStatus === "all" || tenant.leaseStatus === selectedStatus
    const matchesBuilding = selectedBuilding === "all" || tenant.buildingId === selectedBuilding

    return matchesSearch && matchesType && matchesStatus && matchesBuilding
  })

  const getStatusBadge = (status: string, daysUntilExpiry: number) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "expiring-soon":
        return <Badge className="bg-yellow-100 text-yellow-800">Expiring in {daysUntilExpiry} days</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>
      case "terminated":
        return <Badge variant="secondary">Terminated</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getIndustryBadge = (industry: string) => {
    const industryLabels: { [key: string]: string } = {
      technology: "Technology",
      finance: "Finance",
      healthcare: "Healthcare",
      legal: "Legal",
      consulting: "Consulting",
      marketing: "Marketing",
      manufacturing: "Manufacturing",
      retail: "Retail",
      other: "Other",
    }
    return <Badge variant="outline">{industryLabels[industry] || industry}</Badge>
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate summary statistics
  const totalTenants = filteredTenants.length
  const totalRSF = filteredTenants.reduce((sum, tenant) => sum + tenant.rsf, 0)
  const totalAnnualRent = filteredTenants.reduce((sum, tenant) => sum + tenant.annualRent, 0)
  const expiringTenants = filteredTenants.filter((tenant) => tenant.leaseStatus === "expiring-soon").length

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Tenants</h1>
              <p className="text-sm text-gray-500">Manage your tenant relationships and leases</p>
            </div>
            <div className="flex items-center space-x-4">
              <GlobalSearch />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Tenant
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by tenant, building, contact, or suite..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Building" />
              </SelectTrigger>
              <SelectContent>
                {buildings.map((building) => (
                  <SelectItem key={building.value} value={building.value}>
                    {building.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                {tenantTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Lease Status" />
              </SelectTrigger>
              <SelectContent>
                {leaseStatuses.map((status) => (
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
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Tenants</p>
                    <p className="text-2xl font-bold">{totalTenants}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Building2 className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Leased RSF</p>
                    <p className="text-2xl font-bold">{formatNumber(totalRSF)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Annual Rent</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalAnnualRent)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
                    <p className="text-2xl font-bold">{expiringTenants}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tenants Table */}
        <div className="flex-1 overflow-auto px-6 pb-6">
          <Card>
            <CardHeader>
              <CardTitle>All Tenants ({filteredTenants.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Building & Suite</TableHead>
                    <TableHead>RSF</TableHead>
                    <TableHead>Lease Period</TableHead>
                    <TableHead>Monthly Rent</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTenants.map((tenant) => (
                    <TableRow key={tenant.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>
                        <Link href={`/tenants/${tenant.id}`} className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={tenant.image || "/placeholder.svg"} />
                            <AvatarFallback className="bg-green-100 text-green-700">
                              {tenant.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-blue-600 hover:text-blue-800">{tenant.name}</div>
                            <div className="text-sm text-gray-500">{tenant.contactName}</div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>{getIndustryBadge(tenant.industry)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{tenant.building}</div>
                          <div className="text-sm text-gray-500">{tenant.suite}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatNumber(tenant.rsf)} SF</TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{formatDate(tenant.leaseStart)}</div>
                          <div className="text-sm text-gray-500">to {formatDate(tenant.leaseEnd)}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(tenant.monthlyRent)}</TableCell>
                      <TableCell>{tenant.employeeCount}</TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{tenant.contactName}</div>
                          <div className="text-sm text-gray-500">{tenant.contactEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(tenant.leaseStatus, tenant.daysUntilExpiry)}</TableCell>
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
