import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Users, TrendingUp, Phone, ExternalLink } from "lucide-react"

interface OverviewTabProps {
  building: any
}

export function OverviewTab({ building }: OverviewTabProps) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Building Information */}
          <Card>
            <CardHeader>
              <CardTitle>Building Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-sm text-gray-500">Building Name</span>
                  <div className="font-medium">Cobblestone Collaborative</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Asset Type</span>
                  <div className="font-medium">Office</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Class</span>
                  <div className="font-medium">Class A</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Year Built</span>
                  <div className="font-medium">2018</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Last Renovation</span>
                  <div className="font-medium">2022</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Square Footage (RSF)</span>
                  <div className="font-medium">450,000 SF</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Usable Square Footage</span>
                  <div className="font-medium">405,000 SF</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Number of Floors</span>
                  <div className="font-medium">12</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Submarket</span>
                  <div className="font-medium">SOMA</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">MSA</span>
                  <div className="font-medium">San Francisco Bay Area</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Owner Entity</span>
                  <div className="font-medium">Quantum City Investments</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Property Management</span>
                  <div className="font-medium">Cobblestone Properties LLC</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold">$125M</div>
                  <div className="text-sm text-gray-500">Purchase Price</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">$145M</div>
                  <div className="text-sm text-gray-500">Current Market Value</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">$12.5M</div>
                  <div className="text-sm text-gray-500">NOI (TTM)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">4.2%</div>
                  <div className="text-sm text-gray-500">Cap Rate</div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Acquisition Date</span>
                    <div className="font-medium">January 15, 2020</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Occupancy Rate</span>
                    <div className="font-medium">92%</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Monthly Rent Roll</span>
                    <div className="font-medium">$1,250,000</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operating Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Operating Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">96%</div>
                  <div className="text-sm text-gray-500">Tenant Retention</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">8.2</div>
                  <div className="text-sm text-gray-500">Building Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-sm text-gray-500">Active Tenants</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">$32.50</div>
                  <div className="text-sm text-gray-500">Avg Rent/SF</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Access */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Location & Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-500">Full Address</span>
                  <div className="font-medium">123 Innovation Drive, San Francisco, CA 94105</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Transit Access</span>
                  <div className="font-medium">Montgomery BART (0.3 mi)</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Parking Spaces</span>
                  <div className="font-medium">180 spaces</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Bike Storage</span>
                  <div className="font-medium">50 spaces</div>
                </div>
              </div>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Map View</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Key Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Key Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700">SM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">Sarah Mitchell</div>
                    <div className="text-sm text-gray-500">Asset Manager</div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                      <Phone className="h-3 w-3" />
                      <span>(555) 123-4567</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-green-100 text-green-700">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">John Davis</div>
                    <div className="text-sm text-gray-500">Property Manager</div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                      <Phone className="h-3 w-3" />
                      <span>(555) 123-4568</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-purple-100 text-purple-700">MR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">Mike Rodriguez</div>
                    <div className="text-sm text-gray-500">Chief Engineer</div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                      <Phone className="h-3 w-3" />
                      <span>(555) 123-4569</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leasing Status */}
          <Card>
            <CardHeader>
              <CardTitle>Leasing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Available Space</span>
                  <span className="font-medium">36,000 SF</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Listings</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Leases Expiring (12mo)</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tours Scheduled</span>
                  <span className="font-medium">5</span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                View Leasing Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Building Score */}
          <Card>
            <CardHeader>
              <CardTitle>Building Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Occupancy</span>
                  <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tenant Engagement</span>
                  <Badge className="bg-green-100 text-green-800">High</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Financial Performance</span>
                  <Badge className="bg-green-100 text-green-800">Strong</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Risk Assessment</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Low</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Overall Score</span>
                  <Badge className="bg-green-100 text-green-800">8.2/10</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nearby HqO Buildings */}
          <Card>
            <CardHeader>
              <CardTitle>Nearby HqO Buildings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Metro Tower</div>
                    <div className="text-xs text-gray-500">0.8 miles</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Innovation Hub</div>
                    <div className="text-xs text-gray-500">2.1 miles</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
