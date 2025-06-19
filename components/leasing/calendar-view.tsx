"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Building2 } from "lucide-react"

export function CalendarView() {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Calendar View</h3>
          <p className="text-gray-600 mb-6">
            Advanced calendar features for tracking opportunity milestones, property tours, and lease deadlines.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center justify-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>Event scheduling & reminders</span>
            </div>
            <div className="flex items-center justify-center">
              <Building2 className="h-4 w-4 mr-2" />
              <span>Property tour coordination</span>
            </div>
            <div className="flex items-center justify-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Lease milestone tracking</span>
            </div>
          </div>
          <div className="mt-8 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
            Coming Soon
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
