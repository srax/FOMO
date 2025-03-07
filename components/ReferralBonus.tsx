"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ReferralStats {
  referralCode: string | null
  totalReferrals: number
  rewardsEarned: number
}

export function ReferralBonus({ walletAddress }: { walletAddress: string | null }) {
  const { toast } = useToast()
  const [stats, setStats] = useState<ReferralStats>({
    referralCode: null,
    totalReferrals: 0,
    rewardsEarned: 0
  })
  const [isLoading, setIsLoading] = useState(false)

  const referralLink = stats.referralCode 
    ? `${window.location.origin}/ref/${stats.referralCode}`
    : null

  useEffect(() => {
    if (walletAddress) {
      fetchReferralStats()
    }
  }, [walletAddress])

  const fetchReferralStats = async () => {
    try {
      const response = await fetch(`/api/referral/stats/${walletAddress}`)
      const data = await response.json()
      setStats(data)
      
      // If no referral code exists, generate one
      if (!data.referralCode) {
        generateReferralCode()
      }
    } catch (error) {
      console.error('Error fetching referral stats:', error)
      toast({
        title: "Error",
        description: "Failed to fetch referral stats",
        variant: "destructive"
      })
    }
  }

  const generateReferralCode = async () => {
    if (!walletAddress) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/referral/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ walletAddress })
      })
      
      const data = await response.json()
      setStats(prev => ({ ...prev, referralCode: data.referralCode }))
    } catch (error) {
      console.error('Error generating referral code:', error)
      toast({
        title: "Error",
        description: "Failed to generate referral code",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!referralLink) return
    
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        toast({
          title: "Success",
          description: "Referral link copied to clipboard",
        })
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
        toast({
          title: "Error",
          description: "Failed to copy referral link",
          variant: "destructive"
        })
      })
  }

  if (!walletAddress) {
    return (
      <div className="bg-[#141414] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[#7C3AED] mb-6">Referral Bonus</h2>
        <p className="text-gray-400">Connect your wallet to view and share your referral link.</p>
      </div>
    )
  }

  return (
    <div className="bg-[#141414] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#7C3AED] mb-6">Referral Bonus</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-300">Your Referral Link</h3>
        <div className="flex items-center">
          <input
            type="text"
            value={referralLink || "Generating..."}
            readOnly
            className="flex-grow p-2 bg-[#1A1A1A] text-gray-300 border border-[#1A1A1A] rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
          />
          <Button
            onClick={copyToClipboard}
            disabled={!referralLink || isLoading}
            className="bg-[#7C3AED] hover:bg-[#9D6CFA] text-white p-2 rounded-r-lg transition-colors duration-300 disabled:opacity-50"
          >
            <Copy className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-300">Referrals</h3>
        <p className="text-3xl font-bold text-[#7C3AED]">{stats.totalReferrals}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-[#7C3AED] uppercase">Rewards Earned</h3>
        <p className="text-3xl font-bold text-[#7C3AED]">{stats.rewardsEarned} FOMO</p>
        <p className="text-sm text-gray-400 mt-2">
          Next tier: {stats.totalReferrals < 5 ? "5" : stats.totalReferrals < 10 ? "10" : "25"} referrals
        </p>
      </div>
    </div>
  )
}

