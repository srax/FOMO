"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, LogOut } from "lucide-react"
import Image from "next/image"
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { BalanceBar } from "@/components/BalanceBar"
import { DynamicBalanceAnimation } from "@/components/DynamicBalanceAnimation"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

// For development, using Solana's devnet. In production, use mainnet-beta with a proper RPC provider
const SOLANA_RPC_ENDPOINT = "replace this with your own rpc endpoint"
const connection = new Connection(SOLANA_RPC_ENDPOINT, {
  commitment: "confirmed",
  wsEndpoint: "replace this with your own ws endpoint"
})

// FOMO token mint address
const FOMO_TOKEN_MINT = "FNA9kZSz2muqp8ZcKt31YNb2gTzzj9mnpNPeGiJKpump"

export function Header() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [solBalance, setSolBalance] = useState<number | null>(null)
  const [fomoBalance, setFomoBalance] = useState<number | null>(null)
  const [previousFomoBalance, setPreviousFomoBalance] = useState<number>(0)
  const [isLoadingBalances, setIsLoadingBalances] = useState(false)

  const getFomoBalance = async (publicKey: string) => {
    try {
      const ownerPublicKey = new PublicKey(publicKey)
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerPublicKey, {
        programId: TOKEN_PROGRAM_ID
      })

      const fomoAccount = tokenAccounts.value.find(
        account => account.account.data.parsed.info.mint === FOMO_TOKEN_MINT
      )

      if (fomoAccount) {
        const balance = Number(fomoAccount.account.data.parsed.info.tokenAmount.amount) / 
                       Math.pow(10, fomoAccount.account.data.parsed.info.tokenAmount.decimals)
        console.log("FOMO balance:", balance)
        setPreviousFomoBalance(fomoBalance || 0)
        setFomoBalance(balance)
      } else {
        console.log("No FOMO token account found, setting balance to 0")
        setPreviousFomoBalance(fomoBalance || 0)
        setFomoBalance(0)
      }
    } catch (error) {
      console.error("Error fetching FOMO balance:", error)
      setPreviousFomoBalance(fomoBalance || 0)
      setFomoBalance(0)
    }
  }

  const getSolBalance = async (publicKey: string) => {
    try {
      console.log("Fetching SOL balance for:", publicKey)
      const balance = await connection.getBalance(new PublicKey(publicKey))
      console.log("Raw balance (in lamports):", balance)
      const solBalance = balance / LAMPORTS_PER_SOL
      console.log("Converted SOL balance:", solBalance)
      setSolBalance(solBalance)
    } catch (error) {
      console.error("Error in getBalance:", error)
      setSolBalance(0)
    }
  }

  const updateBalances = async (publicKey: string) => {
    setIsLoadingBalances(true)
    try {
      await Promise.all([
        getSolBalance(publicKey),
        getFomoBalance(publicKey)
      ])
    } catch (error) {
      console.error("Error updating balances:", error)
    } finally {
      setIsLoadingBalances(false)
    }
  }

  const connectWallet = async () => {
    try {
      const { solana } = window as any
      
      if (!solana?.isPhantom) {
        alert("Please install Phantom wallet!")
        window.open("https://phantom.app/", "_blank")
        return
      }

      const network = await solana.provider?.connection?.rpcEndpoint
      console.log("Wallet connected to network:", network)

      const response = await solana.connect()
      const publicKey = response.publicKey.toString()
      console.log("Connected to wallet:", publicKey)
      setWalletAddress(publicKey)

      await updateBalances(publicKey)
      
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  const disconnectWallet = async () => {
    try {
      const { solana } = window as any
      if (solana) {
        await solana.disconnect()
        setWalletAddress(null)
        setSolBalance(null)
        setFomoBalance(null)
      }
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
    }
  }

  // Update balances periodically when wallet is connected
  useEffect(() => {
    if (!walletAddress) return

    // Initial balance fetch
    updateBalances(walletAddress)

    const intervalId = setInterval(() => {
      updateBalances(walletAddress)
    }, 30000) // Update every 30 seconds

    return () => clearInterval(intervalId)
  }, [walletAddress])

  return (
    <header className="bg-[#0F0F0F] shadow-lg border-b border-[#1A1A1A] py-4">
      <div className="flex items-center justify-between">
        <div className="relative w-56 h-20 ml-[-38px]">
          <Image
            src="/fomo.jpg"
            alt="$FOMO"
            fill
            className="object-contain rounded-3xl"
            priority
          />
        </div>
        <div className="flex items-center space-x-4 pr-6">
          {walletAddress ? (
            <div className="flex items-center gap-4 animate-in fade-in duration-500">
              <div className="flex gap-2">
                <div className="bg-[#1A1A1A] rounded-2xl px-6 py-3 flex items-center gap-4 hover:bg-[#252525] transition-all duration-500 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] cursor-default group transform hover:scale-[1.02]">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">FOMO Balance</span>
                    <span className="text-[#7C3AED] font-semibold text-lg group-hover:text-[#9D6CFA] transition-colors duration-300">
                      {isLoadingBalances ? (
                        <span className="animate-pulse">Loading...</span>
                      ) : (
                        <>
                          {fomoBalance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'} 
                          <span className="text-sm ml-1">FOMO</span>
                        </>
                      )}
                    </span>
                  </div>
                  <DynamicBalanceAnimation
                    balance={fomoBalance || 0}
                    previousBalance={previousFomoBalance}
                    isLoading={isLoadingBalances}
                  />
                </div>

                <div className="bg-[#1A1A1A] rounded-2xl px-6 py-3 flex items-center gap-2 hover:bg-[#252525] transition-all duration-500 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] cursor-default group transform hover:scale-[1.02]">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">SOL Balance</span>
                    <span className="text-[#7C3AED] font-semibold text-lg group-hover:text-[#9D6CFA] transition-colors duration-300">
                      {isLoadingBalances ? (
                        <span className="animate-pulse">Loading...</span>
                      ) : (
                        <>
                          {solBalance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'} 
                          <span className="text-sm ml-1">SOL</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={disconnectWallet}
                className="bg-[#1A1A1A] hover:bg-[#252525] text-[#7C3AED] px-6 py-3 rounded-2xl flex items-center gap-3 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-500 transform hover:scale-[1.02]"
              >
                <span>{`${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}</span>
                <LogOut className="w-4 h-4 group-hover:text-[#9D6CFA] transition-colors duration-300" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={connectWallet}
              className="bg-[#7C3AED] text-white hover:bg-[#9D6CFA] transition-all duration-500 shadow-[0_0_10px_rgba(124,58,237,0.3)] transform hover:scale-[1.02] px-6 py-3 rounded-2xl"
            >
              Connect Phantom Wallet
            </Button>
          )}

          <Button
            onClick={() => alert("Verify Twitter Handle")}
            className="bg-[#7C3AED] text-white hover:bg-[#9D6CFA] transition-all duration-500 shadow-[0_0_10px_rgba(124,58,237,0.3)] transform hover:scale-[1.02] px-6 py-3 rounded-2xl"
          >
            Verify Twitter Handle
          </Button>
          <Button
            variant="outline"
            className="bg-[#141414] text-[#7C3AED] border border-[#7C3AED]/20 hover:bg-[#7C3AED] hover:text-white transition-all duration-300 p-2 hover:-translate-y-1 rounded-2xl"
          >
            <Bell className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  )
}

