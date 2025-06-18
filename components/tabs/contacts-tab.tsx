import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ExternalLink, FileText } from "lucide-react"

interface ContactsTabProps {
  selectedBuildings: string[]
}

export function ContactsTab({ selectedBuildings }: ContactsTabProps) {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-700">AM</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Alex Morgan</h3>
                  <p className="text-blue-600">amorgan@ecovoltenergy.com</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <span>CEO</span>
                    <span>•</span>
                    <span>Executive Team</span>
                    <span>•</span>
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Primary contact for both buildings • Last contact: 2 days ago
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Notes
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View profile
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-green-100 text-green-700">JL</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Jordan Lee</h3>
                  <p className="text-blue-600">jlee@ecovoltenergy.com</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <span>CFO</span>
                    <span>•</span>
                    <span>Finance</span>
                    <span>•</span>
                    <span>(555) 123-4568</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Lease contact for Suite 901 • Last contact: 1 week ago
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Notes
                  <Badge variant="secondary" className="ml-2">
                    3
                  </Badge>
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View profile
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-purple-100 text-purple-700">TK</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Taylor Kim</h3>
                  <p className="text-blue-600">kim@ecovoltenergy.com</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <span>Operations Manager</span>
                    <span>•</span>
                    <span>Operations</span>
                    <span>•</span>
                    <span>(555) 123-4569</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Facilities contact for Suite 801 • Last contact: 3 days ago
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Notes
                  <Badge variant="secondary" className="ml-2">
                    1
                  </Badge>
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View profile
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-orange-100 text-orange-700">SM</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Sarah Martinez</h3>
                  <p className="text-blue-600">smartinez@ecovoltenergy.com</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <span>Head of Engineering</span>
                    <span>•</span>
                    <span>Engineering</span>
                    <span>•</span>
                    <span>(555) 123-4570</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Technical contact • Last contact: 1 day ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Notes
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View profile
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-red-100 text-red-700">MC</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Michael Chen</h3>
                  <p className="text-blue-600">mchen@ecovoltenergy.com</p>
                  <p className="text-sm text-gray-500">Business Development</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Notes
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View profile
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button variant="link" className="text-blue-600">
              View all users
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
