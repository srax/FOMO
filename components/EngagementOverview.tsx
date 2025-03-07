"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export function EngagementOverview() {
  const [points, setPoints] = useState(750)

  const stats = [
    { label: "Total Tweets", value: "1,234" },
    { label: "Total Likes", value: "5,678" },
    { label: "Total Retweets", value: "910" },
    { label: "Total Views", value: "11,121" },
  ]

  return (
    <Card className="bg-[#141414] border-[#1A1A1A] shadow-lg">
      <CardHeader>
        <CardTitle className="text-white relative">
          <span className="relative">
            Engagement Overview
            <div className="absolute -bottom-2 left-0 w-1/3 h-[2px] bg-[#7C3AED]"></div>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="bg-[#1A1A1A] rounded-xl p-6 mb-6 relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#7C3AED] opacity-10"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <h2 className="text-xl font-bold text-gray-300 mb-2 relative z-10">FOMO Points</h2>
          <motion.p
            className="text-4xl font-bold text-[#7C3AED] relative z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
          >
            {points.toLocaleString()}
          </motion.p>
          <p className="text-sm text-gray-500 mt-2 relative z-10">out of 1,000 max</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="bg-[#1A1A1A] p-4 rounded-xl border border-[#2A2A2A] hover:border-[#7C3AED]/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {stat.label}
              </h4>
              <p className="text-2xl font-semibold text-[#7C3AED] group-hover:text-[#9D6CFA] transition-colors duration-300">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

