"use client"

import { useState, useEffect, useCallback } from "react"

// Shared opportunity data that will be used across all components
const initialOpportunities = [
  {
    id: "1",
    name: "EcoVolt Multi-Location Expansion",
    stage: "QUALIFIED",
    company: {
      name: "EcoVolt Energy Solutions",
      logo: "/placeholder.svg?height=32&width=32",
      industry: "Clean Energy Technology",
      size: "500+ employees",
    },
    primaryBuilding: {
      name: "Cobblestone Collaborative",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop&crop=entropy",
      address: "1200 Tech Blvd, Austin",
    },
    totalSF: "27,475 SF",
    spaceCount: 2,
    targetCloseDate: "2024-02-15",
    status: "active",
    expectedValue: "$1,250,000",
    competitionLevel: "medium",
    contacts: [
      {
        name: "Sarah Chen",
        title: "VP Real Estate",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SC",
      },
      {
        name: "David Park",
        title: "CFO",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DP",
      },
    ],
    // Table view specific fields
    primaryBuilding_name: "Cobblestone Collaborative + 1 more",
    primaryContact: {
      name: "Sarah Chen",
      title: "VP Real Estate & Facilities",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    nextActionDate: "2024-01-18",
    lastActivityDate: "2024-01-15",
    expectedValue_number: 1250000,
  },
  {
    id: "2",
    name: "TechFlow HQ Consolidation",
    stage: "NEGOTIATING",
    company: {
      name: "TechFlow Solutions",
      logo: "/placeholder.svg?height=32&width=32",
      industry: "Software",
      size: "200+ employees",
    },
    primaryBuilding: {
      name: "Innovation Tower",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&h=200&fit=crop&crop=entropy",
      address: "500 Innovation Way, Austin",
    },
    totalSF: "18,200 SF",
    spaceCount: 1,
    targetCloseDate: "2024-01-28",
    status: "active",
    expectedValue: "$650,000",
    competitionLevel: "high",
    contacts: [
      {
        name: "Mike Rodriguez",
        title: "Facilities Manager",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MR",
      },
    ],
    primaryBuilding_name: "Innovation Tower",
    primaryContact: {
      name: "Mike Rodriguez",
      title: "Facilities Manager",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    nextActionDate: "2024-01-20",
    lastActivityDate: "2024-01-16",
    expectedValue_number: 650000,
  },
  {
    id: "3",
    name: "DataCore Systems Expansion",
    stage: "LEASE_DRAFTING",
    company: {
      name: "DataCore Systems",
      logo: "/placeholder.svg?height=32&width=32",
      industry: "Data Analytics",
      size: "1000+ employees",
    },
    primaryBuilding: {
      name: "Metro Business Center",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop&crop=entropy",
      address: "800 Metro Plaza, Austin",
    },
    totalSF: "25,000 SF",
    spaceCount: 1,
    targetCloseDate: "2024-01-25",
    status: "active",
    expectedValue: "$825,000",
    competitionLevel: "none",
    contacts: [
      {
        name: "Jennifer Park",
        title: "COO",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JP",
      },
    ],
    primaryBuilding_name: "Metro Business Center",
    primaryContact: {
      name: "Jennifer Park",
      title: "COO",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    nextActionDate: "2024-01-25",
    lastActivityDate: "2024-01-18",
    expectedValue_number: 825000,
  },
  {
    id: "4",
    name: "StartupX Growth Space",
    stage: "CLOSED_LOST",
    company: {
      name: "StartupX",
      logo: "/placeholder.svg?height=32&width=32",
      industry: "FinTech",
      size: "50+ employees",
    },
    primaryBuilding: {
      name: "Creative Commons",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop&crop=entropy",
      address: "300 Creative Ave, Austin",
    },
    totalSF: "3,000 SF",
    spaceCount: 1,
    targetCloseDate: "2024-01-10",
    status: "lost",
    expectedValue: "$108,000",
    competitionLevel: "none",
    contacts: [
      {
        name: "Alex Thompson",
        title: "CEO",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AT",
      },
    ],
    primaryBuilding_name: "Creative Commons",
    primaryContact: {
      name: "Alex Thompson",
      title: "CEO",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    nextActionDate: "2024-01-10",
    lastActivityDate: "2024-01-10",
    expectedValue_number: 108000,
  },
  {
    id: "5",
    name: "GreenTech Renewal",
    stage: "NEW",
    company: {
      name: "GreenTech Innovations",
      logo: "/placeholder.svg?height=32&width=32",
      industry: "Clean Technology",
      size: "150+ employees",
    },
    primaryBuilding: {
      name: "Eco Building",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop&crop=entropy",
      address: "400 Green Way, Austin",
    },
    totalSF: "12,000 SF",
    spaceCount: 1,
    targetCloseDate: "2024-03-01",
    status: "active",
    expectedValue: "$420,000",
    competitionLevel: "low",
    contacts: [
      {
        name: "David Kim",
        title: "Operations Director",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DK",
      },
    ],
    primaryBuilding_name: "Eco Building",
    primaryContact: {
      name: "David Kim",
      title: "Operations Director",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    nextActionDate: "2024-01-22",
    lastActivityDate: "2024-01-19",
    expectedValue_number: 420000,
  },
  {
    id: "6",
    name: "BioLab Research Facility",
    stage: "CLOSED_WON",
    company: {
      name: "BioLab Sciences",
      logo: "/placeholder.svg?height=32&width=32",
      industry: "Biotechnology",
      size: "300+ employees",
    },
    primaryBuilding: {
      name: "Research Park",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop&crop=entropy",
      address: "600 Science Dr, Austin",
    },
    totalSF: "35,000 SF",
    spaceCount: 1,
    targetCloseDate: "2024-01-18",
    status: "won",
    expectedValue: "$1,575,000",
    competitionLevel: "none",
    contacts: [
      {
        name: "Dr. Lisa Wang",
        title: "Facilities Director",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "LW",
      },
    ],
    primaryBuilding_name: "Research Park",
    primaryContact: {
      name: "Dr. Lisa Wang",
      title: "Facilities Director",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    nextActionDate: "2024-01-18",
    lastActivityDate: "2024-01-18",
    expectedValue_number: 1575000,
  },
]

const STORAGE_KEY = "crm-opportunities"

export function useOpportunities() {
  const [opportunities, setOpportunities] = useState(initialOpportunities)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedData = JSON.parse(stored)
        setOpportunities(parsedData)
      }
    } catch (error) {
      console.error("Failed to load opportunities from localStorage:", error)
    }
  }, [])

  // Save to localStorage whenever opportunities change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities))
    } catch (error) {
      console.error("Failed to save opportunities to localStorage:", error)
    }
  }, [opportunities])

  // Update opportunity stage
  const updateOpportunityStage = useCallback((opportunityId: string, newStage: string) => {
    setOpportunities(prev => prev.map(opp => 
      opp.id === opportunityId 
        ? { ...opp, stage: newStage }
        : opp
    ))
  }, [])

  // Get opportunities by stage (for kanban view)
  const getOpportunitiesByStage = useCallback((stageId: string) => {
    return opportunities.filter(opp => opp.stage === stageId)
  }, [opportunities])

  // Reset to initial data (for testing/demo purposes)
  const resetOpportunities = useCallback(() => {
    setOpportunities(initialOpportunities)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    opportunities,
    updateOpportunityStage,
    getOpportunitiesByStage,
    resetOpportunities,
  }
} 