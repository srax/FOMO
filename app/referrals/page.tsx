import { ReferralBonus } from "@/components/ReferralBonus"

export default function ReferralsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#9D6CFA]">Referral Program</h1>
      <div className="max-w-2xl mx-auto">
        <ReferralBonus />
      </div>
    </div>
  )
}

