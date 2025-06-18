import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Settings, Smartphone, Wifi, CreditCard, Calendar } from "lucide-react"

interface AppConfigTabProps {
  selectedBuildings: string[]
}

export function AppConfigTab({ selectedBuildings }: AppConfigTabProps) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* App Access & Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              App Access & Permissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Mobile App Access</div>
                  <div className="text-sm text-gray-500">Allow employees to use HqO mobile app</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Building Access</div>
                  <div className="text-sm text-gray-500">Digital key and access card integration</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Visitor Management</div>
                  <div className="text-sm text-gray-500">Allow visitor invitations and management</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Amenity Booking</div>
                  <div className="text-sm text-gray-500">Conference rooms and amenity reservations</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Feature Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Service Requests</div>
                  <div className="text-sm text-gray-500">Maintenance and facility requests</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Event Notifications</div>
                  <div className="text-sm text-gray-500">Building events and announcements</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Parking Management</div>
                  <div className="text-sm text-gray-500">Parking spot reservations</div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Food Ordering</div>
                  <div className="text-sm text-gray-500">In-app food and beverage ordering</div>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wifi className="h-5 w-5 mr-2" />
              Integration Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Access Control System</div>
                  <div className="text-sm text-gray-500">HID Global - Connected</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">HVAC System</div>
                  <div className="text-sm text-gray-500">Johnson Controls - Connected</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Visitor Management</div>
                  <div className="text-sm text-gray-500">Envoy - Not Connected</div>
                </div>
                <Badge variant="secondary">Inactive</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Conference Room Booking</div>
                  <div className="text-sm text-gray-500">Robin - Connected</div>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing & Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Billing & Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Users</span>
                <span className="font-medium">89/157</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Monthly App Sessions</span>
                <span className="font-medium">1,247</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Service Requests (30 days)</span>
                <span className="font-medium">23</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Amenity Bookings (30 days)</span>
                <span className="font-medium">156</span>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Usage Reports
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
