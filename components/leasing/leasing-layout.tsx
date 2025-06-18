"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const leasingNavigation = [
  { name: "Opportunity Board", href: "/leasing" },
  { name: "Companies", href: "/leasing/companies" },
  { name: "People", href: "/leasing/people" },
  { name: "Leases", href: "/leasing/leases" },
  { name: "Activity Log", href: "/leasing/activity" },
  { name: "Reports", href: "/leasing/reports" },
]

interface LeasingLayoutProps {
  children: React.ReactNode
}

export function LeasingLayout({ children }: LeasingLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Leasing</h1>
            <nav className="flex space-x-8">
              {leasingNavigation.map((item) => {
                const isCurrent = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "pb-2 px-1 border-b-2 font-medium text-sm",
                      isCurrent
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
