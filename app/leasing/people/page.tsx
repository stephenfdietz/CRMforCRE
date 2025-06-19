import { LeasingLayout } from "@/components/leasing/leasing-layout"
import { PeopleView } from "@/components/leasing/people-view"

export default function LeasingPeoplePage() {
  return (
    <LeasingLayout>
      <div className="p-6">
        <PeopleView />
      </div>
    </LeasingLayout>
  )
}
