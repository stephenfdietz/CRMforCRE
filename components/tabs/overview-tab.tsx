import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, TrendingUp, Users, Calendar, Activity } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface OverviewTabProps {
  selectedBuildings: string[]
}

export function OverviewTab({ selectedBuildings }: OverviewTabProps) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-sm text-gray-500">Industry</span>
                  <div className="font-medium">Renewable Energy</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Founded</span>
                  <div className="font-medium">2018</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Company Size</span>
                  <div className="font-medium">157 Employees</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Annual Revenue</span>
                  <div className="font-medium">$25M - $50M</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Headquarters</span>
                  <div className="font-medium">San Francisco, CA</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Legal Entity</span>
                  <div className="font-medium">Delaware C-Corp</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Credit Rating</span>
                  <div className="font-medium">A-</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Parent Company</span>
                  <div className="font-medium">Independent</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Public/Private</span>
                  <div className="font-medium">Private</div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Website</span>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                    https://www.ecovolt.io
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Company Description</h4>
                  <p className="text-sm text-gray-600">
                    EcoVolt Energy Solutions innovates in the Renewable Electricity industry, focusing on sustainable
                    energy generation and storage from wind, solar, and more. We aim to provide clean electricity,
                    reduce carbon footprints, and promote energy independence, driving the transition to a sustainable
                    energy future.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lease Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Lease Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold">27,475</div>
                  <div className="text-sm text-gray-500">Total Square feet</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">05/31/2029</div>
                  <div className="text-sm text-gray-500">Next expiration</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-gray-500">Active leases</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">$890K</div>
                  <div className="text-sm text-gray-500">Annual rent</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Company News */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Recent Company News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium">EcoVolt Secures $50M Series B Funding</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Company announces major funding round to expand renewable energy operations across the West Coast.
                  </p>
                  <span className="text-xs text-gray-400">2 days ago</span>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">New Solar Installation Partnership</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Strategic partnership with SolarTech Inc. to accelerate commercial solar deployments.
                  </p>
                  <span className="text-xs text-gray-400">1 week ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Lease Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Key Lease Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Lease Type</span>
                  <div className="font-medium">Triple Net (NNN)</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Base Rent</span>
                  <div className="font-medium">$32.50 per sq ft</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Escalations</span>
                  <div className="font-medium">3% annually</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Security Deposit</span>
                  <div className="font-medium">$125,000</div>
                </div>
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
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">Alex Morgan</div>
                    <div className="text-xs text-gray-500">CEO</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">Jordan Lee</div>
                    <div className="text-xs text-gray-500">CFO</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>TK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">Taylor Kim</div>
                    <div className="text-xs text-gray-500">Operations Manager</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tenant Health Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Tenant Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Payment History</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Excellent
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lease Compliance</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Good
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Communication</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Average
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Overall Score</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    8.5/10
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Activity Summary (30 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Access Card Uses</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">App Logins</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Service Requests</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Event Attendance</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
