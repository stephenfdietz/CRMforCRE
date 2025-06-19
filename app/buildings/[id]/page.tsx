import { BuildingDetail } from "@/components/buildings/building-detail"

interface BuildingPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function BuildingPage({ params }: BuildingPageProps) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-gray-50">
      <BuildingDetail buildingId={id} />
    </div>
  )
}
