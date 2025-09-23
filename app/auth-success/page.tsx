"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuthSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to coming soon page
    router.replace("/coming-soon")
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-400">Taking you to our coming soon page</p>
      </div>
    </div>
  )
}
