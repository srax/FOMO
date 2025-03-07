"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const tweets = [
  { id: 1, content: "Just bought some $FOMO!", date: "2023-05-01", likes: 50, retweets: 20, views: 1000 },
  { id: 2, content: "$FOMO to the moon!", date: "2023-05-02", likes: 100, retweets: 30, views: 2000 },
  { id: 3, content: "Loving my $FOMO gains", date: "2023-05-03", likes: 75, retweets: 25, views: 1500 },
  { id: 4, content: "FOMO is the future of social trading", date: "2023-05-04", likes: 120, retweets: 45, views: 2500 },
  { id: 5, content: "Great community at $FOMO", date: "2023-05-05", likes: 90, retweets: 35, views: 1800 },
  { id: 6, content: "Best decision: joining $FOMO", date: "2023-05-06", likes: 150, retweets: 60, views: 3000 },
  { id: 7, content: "$FOMO's growth is incredible", date: "2023-05-07", likes: 200, retweets: 80, views: 4000 },
  { id: 8, content: "Another milestone for $FOMO", date: "2023-05-08", likes: 180, retweets: 70, views: 3500 },
]

export function DetailedEngagementStats() {
  const [date, setDate] = useState<Date>()

  return (
    <Card className="bg-[#141414] border-[#1A1A1A] shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white relative">
          <span className="relative">
            Detailed Engagement Stats
            <div className="absolute -bottom-2 left-0 w-1/3 h-[2px] bg-[#7C3AED]"></div>
          </span>
        </CardTitle>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-[#141414] border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#9D6CFA] transition-all duration-300"
            >
              <CalendarIcon className="w-5 h-5 text-[#7C3AED]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#1A1A1A] border-[#2A2A2A]">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="bg-[#1A1A1A] text-white"
              classNames={{
                head_cell: "text-[#7C3AED] font-medium",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#7C3AED] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                day_selected: "bg-[#7C3AED] text-white hover:bg-[#9D6CFA] hover:text-white focus:bg-[#7C3AED] focus:text-white",
                day_today: "bg-[#2A2A2A] text-white",
                day_outside: "text-gray-500 opacity-50",
                day_disabled: "text-gray-500 opacity-50",
                day_range_middle: "aria-selected:bg-[#1A1A1A] aria-selected:text-white",
                day_hidden: "invisible",
              }}
            />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-4">
            {tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="bg-[#242424] p-4 rounded-xl border border-[#2A2A2A] hover:border-[#7C3AED]/30 transition-all duration-300 hover:bg-[#2A2A2A] group"
              >
                <p className="font-medium text-gray-300 group-hover:text-white transition-colors duration-300">{tweet.content}</p>
                <p className="text-sm text-gray-500 mt-2">{tweet.date}</p>
                <div className="flex space-x-6 mt-3 text-[#7C3AED]">
                  <span className="flex items-center group-hover:text-[#9D6CFA] transition-colors duration-300">
                    <span className="font-semibold">{tweet.likes}</span>
                    <span className="text-gray-400 ml-1">likes</span>
                  </span>
                  <span className="flex items-center group-hover:text-[#9D6CFA] transition-colors duration-300">
                    <span className="font-semibold">{tweet.retweets}</span>
                    <span className="text-gray-400 ml-1">retweets</span>
                  </span>
                  <span className="flex items-center group-hover:text-[#9D6CFA] transition-colors duration-300">
                    <span className="font-semibold">{tweet.views}</span>
                    <span className="text-gray-400 ml-1">views</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

