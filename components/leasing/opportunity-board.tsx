"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Table, Calendar, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { KanbanView } from "./kanban-view"
import { TableView } from "./table-view"
import { CalendarView } from "./calendar-view"
import { useOpportunities } from "@/hooks/use-opportunities"

type ViewType = "kanban" | "table" | "calendar"

export function OpportunityBoard() {
  const [currentView, setCurrentView] = useState<ViewType>("kanban")
  const { resetOpportunities } = useOpportunities()

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Opportunity Board</h1>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={resetOpportunities}
            className="text-gray-600 hover:text-gray-900"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Demo Data
          </Button>
          
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView("kanban")}
              className={cn(
                "px-3 py-2",
                currentView === "kanban" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900",
              )}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Kanban
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView("table")}
              className={cn(
                "px-3 py-2",
                currentView === "table" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900",
              )}
            >
              <Table className="h-4 w-4 mr-2" />
              Table
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView("calendar")}
              className={cn(
                "px-3 py-2",
                currentView === "calendar" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900",
              )}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </Button>
          </div>
        </div>
      </div>

      {currentView === "kanban" && <KanbanView />}
      {currentView === "table" && <TableView />}
      {currentView === "calendar" && <CalendarView />}
    </div>
  )
}
