"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

interface ObjectTemplateProps {
  objectType: string
  objectId: string
  objectName: string
  data: any
}

export function ObjectTemplate({ objectType, objectId, objectName, data }: ObjectTemplateProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{objectName}</h1>
          <p className="text-gray-500">{objectType} • ID: {objectId}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Edit</Button>
          <Button>Actions</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="related">Related</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="overview" className="m-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(data.fields || {}).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-sm text-gray-500">{key}</div>
                          <div className="font-medium">{String(value)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(data.activities || []).slice(0, 3).map((activity: any, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="text-sm text-gray-500">{activity.date}</div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.title}</p>
                            <p className="text-sm text-gray-600">{activity.description}</p>
                          </div>
                        </div>
                      ))}
                      {(!data.activities || data.activities.length === 0) && (
                        <p className="text-sm text-gray-500">No recent activity</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - 1/3 width */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(data.stats || {}).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-sm text-gray-500">{key}</div>
                          <div className="text-lg font-semibold">{String(value)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Transaction history will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Notes & Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Notes and comments will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Timeline events will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="related" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Related Objects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Related objects will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
