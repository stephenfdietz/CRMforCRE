"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { GlobalSearch } from "@/components/global-search"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, Edit, MapPin } from "lucide-react"
import { OverviewTab } from "./tabs/overview-tab"
import { SpaceTab } from "./tabs/space-tab"
import { AmenitiesTab } from "./tabs/amenities-tab"
import { TenantsTab } from "./tabs/tenants-tab"
import { SystemsTab } from "./tabs/systems-tab"
import { FinancialsTab } from "./tabs/financials-tab"
import Link from "next/link"

const tabs = [
  { id: "overview", name: "Overview" },
  { id: "space", name: "Space" },
  { id: "amenities", name: "Amenities" },
  { id: "tenants", name: "Tenants" },
  { id: "systems", name: "Systems" },
  { id: "financials", name: "Financials" },
  { id: "compliance", name: "Compliance & Documents" },
  { id: "activity", name: "Activity & Timeline" },
]

interface BuildingDetailProps {
  buildingId: string
}

// Add this placeholder component before the main component
function PlaceholderTab({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  )
}

export function BuildingDetail({ buildingId }: BuildingDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock building data - in real app this would come from API
  const building = {
    id: buildingId,
    name: "Cobblestone Collaborative",
    address: "123 Innovation Drive, San Francisco, CA 94105",
    type: "Office",
    class: "Class A",
    yearBuilt: 2018,
    rsf: 450000,
    floors: 12,
    occupancyRate: 92,
    image: "/placeholder.svg?height=48&width=48",
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab building={building} />
      case "space":
        return <SpaceTab building={building} />
      case "amenities":
        return <AmenitiesTab building={building} />
      case "tenants":
        return <TenantsTab building={building} />
      case "systems":
        return <SystemsTab building={building} />
      case "financials":
        return <FinancialsTab building={building} />
      case "compliance":
        return (
          <PlaceholderTab
            title="Compliance & Documents"
            description="Insurance, permits, and compliance tracking coming soon"
          />
        )
      case "activity":
        return (
          <PlaceholderTab title="Activity & Timeline" description="Building activity feed and timeline coming soon" />
        )
      default:
        return <OverviewTab building={building} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link href="/buildings">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>

              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={building.image || "/placeholder.svg"} />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {building.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">{building.name}</h1>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{building.address}</span>
                    <span>•</span>
                    <span>{building.type}</span>
                    <span>•</span>
                    <span>{building.class}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <GlobalSearch />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Building
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
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

        {/* Tab Content */}
        <div className="flex-1 overflow-auto">{renderTabContent()}</div>
      </div>
    </div>
  )
}
