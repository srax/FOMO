"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Star, Zap, Crown, Trophy } from "lucide-react"

const leaderboard = [
  { rank: 1, username: "@fomo_king", score: 1000 },
  { rank: 2, username: "@fomo_queen", score: 950 },
  { rank: 3, username: "@fomo_prince", score: 900 },
  { rank: 4, username: "@fomo_knight", score: 850 },
  { rank: 5, username: "@fomo_wizard", score: 800 },
  { rank: 6, username: "@fomo_jester", score: 750 },
  { rank: 7, username: "@fomo_archer", score: 700 },
  { rank: 8, username: "@fomo_alchemist", score: 650 },
]

const competitions = [
  {
    name: "Weekly $FOMO Challenge",
    reward: 5000,
    isActive: true,
    endTime: new Date("2023-05-10T23:59:59"),
  },
  {
    name: "Weekly $FOMO Challenge",
    reward: 1500,
    isActive: false,
    endTime: new Date("2023-05-03T23:59:59"),
  },
  {
    name: "Weekly $FOMO Challenge",
    reward: 2500,
    isActive: false,
    endTime: new Date("2023-04-26T23:59:59"),
  },
  {
    name: "Weekly $FOMO Challenge",
    reward: 3000,
    isActive: false,
    endTime: new Date("2023-04-19T23:59:59"),
  },
]

export function LeaderboardsCompetitions() {
  const [showTime, setShowTime] = useState(false)

  const toggleTimeDisplay = () => {
    setShowTime(!showTime)
  }

  return (
    <div className="container mx-auto px-6 py-12 bg-gradient-to-br from-[#0A0A0A] to-[#141414]">
      <h1 className="text-3xl font-bold text-center mb-12 text-white">Leaderboards & Competitions</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-[#1A1A1A] border-2 border-[#2A2A2A] shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#7C3AED]/30">
          <CardHeader className="bg-[#202020] p-6">
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Trophy className="mr-3 text-[#7C3AED]" />
              Top Engaging Users
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <ul className="space-y-4">
                {leaderboard.map((user) => (
                  <li
                    key={user.rank}
                    className="flex justify-between items-center p-4 bg-[#242424] rounded-xl border border-[#2A2A2A] transition-all duration-300 hover:border-[#7C3AED]/30 hover:bg-[#2A2A2A]"
                  >
                    <div className="flex items-center">
                      <span className="font-bold text-[#9D6CFA] mr-3 w-6 text-center">
                        {user.rank === 1 ? <Crown className="w-6 h-6 text-yellow-500" /> : `#${user.rank}`}
                      </span>
                      <span className="text-gray-300">{user.username}</span>
                    </div>
                    <span className="font-semibold text-[#7C3AED]">{user.score} pts</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A1A] border-2 border-[#2A2A2A] shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#7C3AED]/30">
          <CardHeader className="bg-[#202020] p-6">
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Zap className="mr-3 text-[#7C3AED]" />
              Active Competition
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-6">
                {competitions.map((competition, index) => (
                  <div
                    key={index}
                    className="p-6 bg-[#242424] rounded-xl border border-[#2A2A2A] transition-all duration-300 hover:border-[#7C3AED]/30 hover:bg-[#2A2A2A]"
                  >
                    <h3 className="text-2xl font-bold text-[#9D6CFA] mb-6">{competition.name}</h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <Star className="text-yellow-500 mr-3" />
                        <span className="text-xl text-gray-300">{competition.reward} $FOMO reward</span>
                      </div>
                      <Button
                        variant="outline"
                        className={`px-6 py-3 rounded-xl ${
                          competition.isActive
                            ? "bg-[#1A1A1A] text-[#9D6CFA] border border-[#7C3AED]/20 hover:bg-[#7C3AED] hover:text-white transition-all duration-300"
                            : "bg-[#1A1A1A] text-gray-500 border border-gray-700 cursor-not-allowed"
                        }`}
                        onClick={competition.isActive ? toggleTimeDisplay : undefined}
                        disabled={!competition.isActive}
                      >
                        <Clock className="mr-2" />
                        {competition.isActive ? (showTime ? "4 hours left" : "Show time left") : "Ended"}
                      </Button>
                    </div>
                    <Button
                      className={`w-full py-2 rounded-xl text-lg font-semibold ${
                        competition.isActive
                          ? "bg-[#7C3AED] text-white hover:bg-[#9D6CFA] transition-all duration-300"
                          : "bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!competition.isActive}
                    >
                      {competition.isActive ? "Active Competition" : "Ended"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

