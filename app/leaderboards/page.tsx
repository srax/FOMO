import { LeaderboardsCompetitions } from "@/components/LeaderboardsCompetitions"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LeaderboardsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link 
            href="/"
            className="flex items-center text-[#9D6CFA] hover:text-[#7C3AED] transition-colors duration-300"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
        <LeaderboardsCompetitions />
      </div>
    </div>
  )
}

