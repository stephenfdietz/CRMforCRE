"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { OverviewTab } from "./tabs/overview-tab"
import { LeaseDocsTab } from "./tabs/lease-docs-tab"
import { ContactsTab } from "./tabs/contacts-tab"
import { TenantHealthTab } from "./tabs/tenant-health-tab"
import { AppConfigTab } from "./tabs/app-config-tab"
import { ActivityTab } from "./tabs/activity-tab"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GlobalSearch } from "./global-search"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Edit } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const tabs = [
  { id: "overview", name: "Overview" },
  { id: "lease-docs", name: "Lease & Docs" },
  { id: "contacts", name: "Contacts" },
  { id: "tenant-health", name: "Tenant Health" },
  { id: "app-configuration", name: "App Configuration" },
  { id: "activity", name: "Activity" },
]

interface TenantDetailProps {
  tenantId?: string
}

export function TenantDetail({ tenantId }: TenantDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedBuildings, setSelectedBuildings] = useState<string[]>(["all"])

  const buildings = [
    { id: "all", name: "All Buildings" },
    { id: "cobblestone", name: "Cobblestone Collaborative" },
    { id: "metro-tower", name: "Metro Tower" },
    { id: "innovation-hub", name: "Innovation Hub" },
  ]

  const renderTabContent = () => {
    const commonProps = { selectedBuildings }

    switch (activeTab) {
      case "overview":
        return <OverviewTab {...commonProps} />
      case "lease-docs":
        return <LeaseDocsTab {...commonProps} />
      case "contacts":
        return <ContactsTab {...commonProps} />
      case "tenant-health":
        return <TenantHealthTab {...commonProps} />
      case "app-configuration":
        return <AppConfigTab {...commonProps} />
      case "activity":
        return <ActivityTab {...commonProps} />
      default:
        return <OverviewTab {...commonProps} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link href="/tenants">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>

              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback className="bg-green-100 text-green-700">EV</AvatarFallback>
                </Avatar>

                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">EcoVolt Energy Solutions</h1>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Cobblestone Collaborative</span>
                    <span>•</span>
                    <span>Floor 9, Floor 8 - Suite 901, Suite 801</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <GlobalSearch />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by Building:</label>
            <Select value={selectedBuildings[0]} onValueChange={(value) => setSelectedBuildings([value])}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {buildings.map((building) => (
                  <SelectItem key={building.id} value={building.id}>
                    {building.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 overflow-auto">{renderTabContent()}</div>
      </div>
    </div>
  )
}
