"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BuildingIcon,
  Users,
  Calendar,
  FileText,
  Download,
  CheckCircle,
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

interface FinancialsTabProps {
  building: Building
}

export function FinancialsTab({ building }: FinancialsTabProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("current")

  // Mock financial data
  const rentRoll = [
    {
      tenant: "TechCorp Solutions",
      suite: "1201",
      rsf: 15000,
      rentPSF: 36,
      monthlyRent: 45000,
      annualRent: 540000,
      leaseEnd: "2027-12-31",
      status: "Current",
    },
    {
      tenant: "Creative Design Studio",
      suite: "805",
      rsf: 8500,
      rentPSF: 36,
      monthlyRent: 25500,
      annualRent: 306000,
      leaseEnd: "2024-05-31",
      status: "Current",
    },
    {
      tenant: "Financial Advisors Group",
      suite: "1015",
      rsf: 12000,
      rentPSF: 36,
      monthlyRent: 36000,
      annualRent: 432000,
      leaseEnd: "2025-02-28",
      status: "Current",
    },
    {
      tenant: "Marketing Innovations",
      suite: "602",
      rsf: 6000,
      rentPSF: 36,
      monthlyRent: 18000,
      annualRent: 216000,
      leaseEnd: "2026-08-31",
      status: "Current",
    },
  ]

  const expenses = [
    { category: "Property Management", monthly: 15000, annual: 180000, budgeted: 175000 },
    { category: "Utilities", monthly: 25000, annual: 300000, budgeted: 320000 },
    { category: "Maintenance & Repairs", monthly: 12000, annual: 144000, budgeted: 150000 },
    { category: "Insurance", monthly: 8000, annual: 96000, budgeted: 100000 },
    { category: "Property Taxes", monthly: 18000, annual: 216000, budgeted: 210000 },
    { category: "Security", monthly: 6000, annual: 72000, budgeted: 75000 },
    { category: "Landscaping", monthly: 3000, annual: 36000, budgeted: 40000 },
  ]

  const totalMonthlyRent = rentRoll.reduce((sum, tenant) => sum + tenant.monthlyRent, 0)
  const totalAnnualRent = rentRoll.reduce((sum, tenant) => sum + tenant.annualRent, 0)
  const totalMonthlyExpenses = expenses.reduce((sum, expense) => sum + expense.monthly, 0)
  const totalAnnualExpenses = expenses.reduce((sum, expense) => sum + expense.annual, 0)
  const monthlyNOI = totalMonthlyRent - totalMonthlyExpenses
  const annualNOI = totalAnnualRent - totalAnnualExpenses

  const getVarianceColor = (actual: number, budgeted: number) => {
    const variance = ((actual - budgeted) / budgeted) * 100
    if (variance > 5) return "text-red-600"
    if (variance < -5) return "text-green-600"
    return "text-gray-600"
  }

  const getVarianceIcon = (actual: number, budgeted: number) => {
    const variance = ((actual - budgeted) / budgeted) * 100
    if (variance > 5) return <TrendingUp className="h-4 w-4 text-red-600" />
    if (variance < -5) return <TrendingDown className="h-4 w-4 text-green-600" />
    return <CheckCircle className="h-4 w-4 text-gray-600" />
  }

  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rentroll">Rent Roll</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${totalMonthlyRent.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BuildingIcon className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
                    <p className="text-2xl font-bold text-gray-900">${totalMonthlyExpenses.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Monthly NOI</p>
                    <p className="text-2xl font-bold text-gray-900">${monthlyNOI.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{building.occupancyRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Financial performance chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rentroll" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Current Rent Roll</h3>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Rent Roll
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tenant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Suite
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        RSF
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rent/SF
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monthly Rent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Annual Rent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lease End
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rentRoll.map((tenant, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {tenant.tenant}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.suite}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tenant.rsf.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tenant.rentPSF}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${tenant.monthlyRent.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${tenant.annualRent.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(tenant.leaseEnd).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-green-100 text-green-800">{tenant.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Operating Expenses</h3>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Expenses
            </Button>
          </div>

          <div className="grid gap-4">
            {expenses.map((expense, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{expense.category}</h4>
                      <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Monthly</p>
                          <p className="font-medium">${expense.monthly.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Annual</p>
                          <p className="font-medium">${expense.annual.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Budgeted</p>
                          <p className="font-medium">${expense.budgeted.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getVarianceIcon(expense.annual, expense.budgeted)}
                      <span className={`text-sm font-medium ${getVarianceColor(expense.annual, expense.budgeted)}`}>
                        {(((expense.annual - expense.budgeted) / expense.budgeted) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={(expense.annual / expense.budgeted) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Financial Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Monthly P&L Statement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Annual Budget Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Cash Flow Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Variance Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Scheduled Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Monthly Financial Summary</p>
                    <p className="text-sm text-gray-600">Next: March 1, 2024</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Quarterly NOI Report</p>
                    <p className="text-sm text-gray-600">Next: April 1, 2024</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Annual Budget Review</p>
                    <p className="text-sm text-gray-600">Next: January 1, 2025</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
