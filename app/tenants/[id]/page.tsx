import { TenantDetail } from "@/components/tenant-detail"

interface TenantPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TenantPage({ params }: TenantPageProps) {
  const { id } = await params
  return <TenantDetail tenantId={id} />
}
