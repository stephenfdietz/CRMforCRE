"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Thermometer,
  Zap,
  Shield,
  Flame,
  ArrowUpDown,
  Wifi,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Wrench,
  Calendar,
  Phone,
  Mail,
} from "lucide-react"

interface Building {
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

interface SystemsTabProps {
  building: Building
}

export function SystemsTab({ building }: SystemsTabProps) {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null)

  // Mock systems data
  const systems = [
    {
      id: "hvac",
      name: "HVAC System",
      icon: <Thermometer className="h-6 w-6" />,
      status: "Operational",
      health: 92,
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-04-15",
      vendor: "Climate Control Pro",
      vendorPhone: "(555) 123-4567",
      vendorEmail: "service@climatecontrolpro.com",
      components: [
        { name: "Chiller Unit 1", status: "Operational", health: 95 },
        { name: "Chiller Unit 2", status: "Operational", health: 89 },
        { name: "Air Handlers", status: "Operational", health: 92 },
        { name: "Cooling Towers", status: "Maintenance Required", health: 78 },
      ],
    },
    {
      id: "electrical",
      name: "Electrical System",
      icon: <Zap className="h-6 w-6" />,
      status: "Operational",
      health: 88,
      lastMaintenance: "2024-02-01",
      nextMaintenance: "2024-05-01",
      vendor: "PowerTech Solutions",
      vendorPhone: "(555) 234-5678",
      vendorEmail: "support@powertech.com",
      components: [
        { name: "Main Transformer", status: "Operational", health: 90 },
        { name: "Emergency Generator", status: "Operational", health: 85 },
        { name: "UPS Systems", status: "Operational", health: 88 },
        { name: "Distribution Panels", status: "Operational", health: 92 },
      ],
    },
    {
      id: "security",
      name: "Security System",
      icon: <Shield className="h-6 w-6" />,
      status: "Operational",
      health: 96,
      lastMaintenance: "2024-01-30",
      nextMaintenance: "2024-04-30",
      vendor: "SecureGuard Systems",
      vendorPhone: "(555) 345-6789",
      vendorEmail: "service@secureguard.com",
      components: [
        { name: "Access Control", status: "Operational", health: 98 },
        { name: "CCTV System", status: "Operational", health: 94 },
        { name: "Intrusion Detection", status: "Operational", health: 96 },
        { name: "Visitor Management", status: "Operational", health: 95 },
      ],
    },
    {
      id: "fire",
      name: "Fire Safety",
      icon: <Flame className="h-6 w-6" />,
      status: "Critical",
      health: 65,
      lastMaintenance: "2023-12-15",
      nextMaintenance: "2024-03-15",
      vendor: "Fire Safety Corp",
      vendorPhone: "(555) 456-7890",
      vendorEmail: "emergency@firesafety.com",
      components: [
        { name: "Sprinkler System", status: "Maintenance Required", health: 70 },
        { name: "Fire Alarms", status: "Operational", health: 85 },
        { name: "Emergency Lighting", status: "Critical", health: 45 },
        { name: "Fire Pumps", status: "Operational", health: 80 },
      ],
    },
    {
      id: "elevators",
      name: "Elevator System",
      icon: <ArrowUpDown className="h-6 w-6" />,
      status: "Maintenance Required",
      health: 75,
      lastMaintenance: "2024-01-20",
      nextMaintenance: "2024-03-20",
      vendor: "Vertical Transport Inc",
      vendorPhone: "(555) 567-8901",
      vendorEmail: "service@verticaltransport.com",
      components: [
        { name: "Elevator A", status: "Operational", health: 82 },
        { name: "Elevator B", status: "Maintenance Required", health: 68 },
        { name: "Elevator C", status: "Operational", health: 75 },
        { name: "Freight Elevator", status: "Operational", health: 78 },
      ],
    },
    {
      id: "network",
      name: "IT/Network",
      icon: <Wifi className="h-6 w-6" />,
      status: "Operational",
      health: 94,
      lastMaintenance: "2024-02-10",
      nextMaintenance: "2024-05-10",
      vendor: "NetWork Solutions",
      vendorPhone: "(555) 678-9012",
      vendorEmail: "support@networksolutions.com",
      components: [
        { name: "Core Network", status: "Operational", health: 96 },
        { name: "WiFi Infrastructure", status: "Operational", health: 92 },
        { name: "Fiber Backbone", status: "Operational", health: 94 },
        { name: "Telecom Systems", status: "Operational", health: 90 },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-green-100 text-green-800"
      case "Maintenance Required":
        return "bg-yellow-100 text-yellow-800"
      case "Critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Operational":
        return <CheckCircle className="h-4 w-4" />
      case "Maintenance Required":
        return <AlertTriangle className="h-4 w-4" />
      case "Critical":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-600"
    if (health >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const upcomingMaintenance = systems.filter((system) => {
    const nextDate = new Date(system.nextMaintenance)
    const today = new Date()
    const daysUntil = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
    return daysUntil <= 30
  })

  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* System Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systems.map((system) => (
              <Card
                key={system.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedSystem(system.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">{system.icon}</div>
                      <CardTitle className="text-lg">{system.name}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(system.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(system.status)}
                        <span>{system.status}</span>
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">System Health</span>
                        <span className={`text-sm font-medium ${getHealthColor(system.health)}`}>{system.health}%</span>
                      </div>
                      <Progress value={system.health} className="h-2" />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Last Maintenance: {new Date(system.lastMaintenance).toLocaleDateString()}</p>
                      <p>Next Maintenance: {new Date(system.nextMaintenance).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* System Details */}
          {selectedSystem && (
            <Card>
              <CardHeader>
                <CardTitle>{systems.find((s) => s.id === selectedSystem)?.name} - Component Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {systems
                    .find((s) => s.id === selectedSystem)
                    ?.components.map((component, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{component.name}</p>
                          <Badge size="sm" className={getStatusColor(component.status)}>
                            {component.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${getHealthColor(component.health)}`}>{component.health}%</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Maintenance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMaintenance.map((system) => {
                  const nextDate = new Date(system.nextMaintenance)
                  const today = new Date()
                  const daysUntil = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 3600 * 24))

                  return (
                    <div key={system.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">{system.icon}</div>
                        <div>
                          <p className="font-medium">{system.name}</p>
                          <p className="text-sm text-gray-600">
                            Due: {nextDate.toLocaleDateString()} ({daysUntil} days)
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Wrench className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Vendor
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-6">
          <div className="grid gap-4">
            {systems.map((system) => (
              <Card key={system.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">{system.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold">{system.name}</h3>
                        <p className="text-gray-600 font-medium">{system.vendor}</p>
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span>{system.vendorPhone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>{system.vendorEmail}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
