"use client"

import type React from "react"

const LoadingBar: React.FC = () => {
  return (
    <div className="w-full h-3 bg-[#1A1A1A] rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-[#7C3AED] to-[#9D6CFA] rounded-full"
        style={{ width: '75%' }}
      />
    </div>
  )
}

export default LoadingBar

