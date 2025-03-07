import Link from "next/link"
import { Home, Award, Users } from "lucide-react"

export function Sidebar() {
  return (
    <div className="bg-[#0A0A0A] text-gray-300 w-56 space-y-1 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link
          href="/"
          className="block py-3 px-4 rounded-lg transition-all duration-200 hover:bg-[#1A1A1A] hover:text-[#9D6CFA] group relative overflow-hidden"
        >
          <div className="relative z-10 flex items-center">
            <Home className="inline-block mr-3 w-5 h-5 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6" />
            <span className="text-sm font-medium transition-transform duration-300 group-hover:translate-x-1">
              Dashboard
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#9D6CFA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div className="absolute left-0 top-0 h-full w-1 bg-[#9D6CFA] transform -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </Link>

        <Link
          href="/leaderboards"
          className="block py-3 px-4 rounded-lg transition-all duration-200 hover:bg-[#1A1A1A] hover:text-[#9D6CFA] group relative overflow-hidden mt-1"
        >
          <div className="relative z-10 flex items-center">
            <Award className="inline-block mr-3 w-5 h-5 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6" />
            <span className="text-sm font-medium transition-transform duration-300 group-hover:translate-x-1">
              Leaderboards
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#9D6CFA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div className="absolute left-0 top-0 h-full w-1 bg-[#9D6CFA] transform -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </Link>

        <Link
          href="/referrals"
          className="block py-3 px-4 rounded-lg transition-all duration-200 hover:bg-[#1A1A1A] hover:text-[#9D6CFA] group relative overflow-hidden mt-1"
        >
          <div className="relative z-10 flex items-center">
            <Users className="inline-block mr-3 w-5 h-5 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6" />
            <span className="text-sm font-medium transition-transform duration-300 group-hover:translate-x-1">
              Referrals
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#9D6CFA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div className="absolute left-0 top-0 h-full w-1 bg-[#9D6CFA] transform -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </Link>
      </nav>
    </div>
  )
}

