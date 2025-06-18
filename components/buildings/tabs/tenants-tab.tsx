"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Users,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

interface BuildingType {
  id: string
  name: string
  address: string
  type: string
  class: string
  yearBuilt: number
  rsf: number
  floors: number
  occupancyRate: number
  image?: string
}

interface TenantsTabProps {
  building: BuildingType
}

export function TenantsTab({ building }: TenantsTabProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock tenant data for this building
  const tenants = [
    {
      id: "1",
      name: "TechCorp Solutions",
      contact: "Sarah Johnson",
      email: "sarah@techcorp.com",
      phone: "(555) 123-4567",
      suite: "1201",
      floor: 12,
      rsf: 15000,
      employees: 45,
      industry: "Technology",
      leaseStart: "2022-01-01",
      leaseEnd: "2027-12-31",
      monthlyRent: 45000,
      status: "Active",
      renewalStatus: "On Track",
    },
    {
      id: "2",
      name: "Creative Design Studio",
      contact: "Mike Chen",
      email: "mike@creativestudio.com",
      phone: "(555) 234-5678",
      suite: "805",
      floor: 8,
      rsf: 8500,
      employees: 22,
      industry: "Design",
      leaseStart: "2021-06-01",
      leaseEnd: "2024-05-31",
      monthlyRent: 25500,
      status: "Active",
      renewalStatus: "Expiring Soon",
    },
    {
      id: "3",
      name: "Financial Advisors Group",
      contact: "Lisa Rodriguez",
      email: "lisa@faggroup.com",
      phone: "(555) 345-6789",
      suite: "1015",
      floor: 10,
      rsf: 12000,
      employees: 35,
      industry: "Finance",
      leaseStart: "2020-03-01",
      leaseEnd: "2025-02-28",
      monthlyRent: 36000,
      status: "Active",
      renewalStatus: "Under Review",
    },
    {
      id: "4",
      name: "Marketing Innovations",
      contact: "David Park",
      email: "david@marketinginnovations.com",
      phone: "(555) 456-7890",
      suite: "602",
      floor: 6,
      rsf: 6000,
      employees: 18,
      industry: "Marketing",
      leaseStart: "2023-09-01",
      leaseEnd: "2026-08-31",
      monthlyRent: 18000,
      status: "Active",
      renewalStatus: "On Track",
    },
  ]

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.suite.includes(searchTerm),
  )

  const totalTenants = tenants.length
  const totalRSF = tenants.reduce((sum, tenant) => sum + tenant.rsf, 0)
  const totalMonthlyRent = tenants.reduce((sum, tenant) => sum + tenant.monthlyRent, 0)
  const expiringLeases = tenants.filter((tenant) => tenant.renewalStatus === "Expiring Soon").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-800"
      case "Expiring Soon":
        return "bg-red-100 text-red-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "On Track":
        return <CheckCircle className="h-4 w-4" />
      case "Expiring Soon":
        return <AlertTriangle className="h-4 w-4" />
      case "Under Review":
        return <Clock className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tenants</p>
                <p className="text-2xl font-bold text-gray-900">{totalTenants}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Leased RSF</p>
                <p className="text-2xl font-bold text-gray-900">{totalRSF.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Rent</p>
                <p className="text-2xl font-bold text-gray-900">${totalMonthlyRent.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">{expiringLeases}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tenants, contacts, or suites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Add Tenant</Button>
      </div>

      {/* Tenants List */}
      <div className="grid gap-4">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {tenant.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
                      <Badge variant="outline">{tenant.industry}</Badge>
                      <Badge className={getStatusColor(tenant.renewalStatus)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(tenant.renewalStatus)}
                          <span>{tenant.renewalStatus}</span>
                        </div>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>
                          Suite {tenant.suite} (Floor {tenant.floor})
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{tenant.rsf.toLocaleString()} RSF</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{tenant.employees} employees</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>${tenant.monthlyRent.toLocaleString()}/month</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{tenant.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{tenant.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Lease: {new Date(tenant.leaseStart).toLocaleDateString()} -{" "}
                          {new Date(tenant.leaseEnd).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
