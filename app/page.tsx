import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { UserConnectionPanel } from "@/components/UserConnectionPanel"
import { EngagementOverview } from "@/components/EngagementOverview"
import { DetailedEngagementStats } from "@/components/DetailedEngagementStats"

export default function Home() {
  return (
    <div className="flex h-screen bg-[#0A0A0A]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#111111]">
          <div className="container mx-auto pl-4 pr-6 py-8">
            <div className="grid grid-cols-1 gap-6 mb-6">
              <UserConnectionPanel />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <EngagementOverview />
              <DetailedEngagementStats />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

