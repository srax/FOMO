"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface BalanceBarProps {
  balance: number
  maxBalance?: number
  isLoading?: boolean
}

export function BalanceBar({ balance, maxBalance = 10000, isLoading = false }: BalanceBarProps) {
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const calculatedPercentage = Math.min((balance / maxBalance) * 100, 100)
    setPercentage(calculatedPercentage)
  }, [balance, maxBalance])

  return (
    <div className="relative h-full w-1 bg-[#1A1A1A] rounded-full overflow-hidden">
      {isLoading ? (
        <motion.div
          className="absolute bottom-0 w-full bg-gradient-to-t from-[#7C3AED] to-[#9D6CFA]"
          animate={{
            height: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ) : (
        <motion.div
          className="absolute bottom-0 w-full bg-gradient-to-t from-[#7C3AED] to-[#9D6CFA]"
          initial={{ height: "0%" }}
          animate={{ height: `${percentage}%` }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        />
      )}
    </div>
  )
} 