"use client"

import {
  Building2,
  Users,
  Truck,
  UserCheck,
  CreditCard,
  BarChart3,
  FileText,
  MessageSquare,
  Calendar,
  Wrench,
  Zap,
  Settings,
  Database,
  Layout,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "My CRM", href: "#", icon: Building2 },
  { name: "Buildings", href: "/buildings", icon: Building2 },
  { name: "Tenants", href: "/tenants", icon: Users },
  { name: "Leasing", href: "/leasing", icon: FileText },
  { name: "Vendors", href: "#", icon: Truck, badge: "NEW" },
  { name: "People", href: "/leasing/people", icon: UserCheck },
  { name: "Transactions", href: "#", icon: CreditCard, badge: "NEW" },
  { name: "Discounts", href: "#", icon: BarChart3 },
  { name: "Analytics", href: "#", icon: BarChart3 },
]

const adminNavigation = [
  { name: "Object Configuration", href: "/admin", icon: Settings },
  { name: "Attribute Library", href: "/admin/attributes", icon: Database },
  { name: "Page Templates", href: "/admin/templates", icon: Layout },
]

const contentSections = [
  { name: "Content", href: "#", icon: FileText },
  { name: "Communications", href: "#", icon: MessageSquare },
  { name: "Surveys", href: "#", icon: FileText },
  { name: "Events", href: "#", icon: Calendar },
  { name: "Services Booking", href: "#", icon: Wrench },
  { name: "Amenity Posts", href: "#", icon: Zap },
  { name: "Theme", href: "#", icon: Settings },
  { name: "Utility Buttons", href: "#", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 items-center px-6">
        <div className="text-2xl font-bold text-red-500">HqO</div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isCurrent = pathname === item.href || (item.href !== "#" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                isCurrent ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
              {item.badge && (
                <span className="ml-auto inline-block px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}

        <div className="pt-6">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Content Management
          </div>
          {contentSections.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="pt-6">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Administration</div>
          {adminNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
