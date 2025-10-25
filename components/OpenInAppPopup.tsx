"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth/AuthProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Loader2, X } from "lucide-react"

export function OpenInAppPopup() {
  const searchParams = useSearchParams()
  const { user, session } = useAuth()
  const [showPopup, setShowPopup] = useState(false)
  const [deepLinkAttempted, setDeepLinkAttempted] = useState(false)

  const source = searchParams.get('source')
  const authenticated = searchParams.get('authenticated')
  const isFromApp = source === 'app' && authenticated === 'true'

  useEffect(() => {
    // Show popup if user came from app and is authenticated
    if (isFromApp && user && session) {
      setShowPopup(true)
    }
  }, [isFromApp, user, session])

  const handleOpenApp = async () => {
    if (!session?.access_token || !user) {
      console.error('No access token or user data available')
      return
    }

    try {
      setDeepLinkAttempted(true)

      // Create user data object
      const userData = {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.user_metadata?.name,
        firstName: user.user_metadata?.given_name,
        lastName: user.user_metadata?.family_name,
        avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture
      }

      // Create deep link URL with authentication tokens and user data
      const token = session.access_token
      const refreshToken = session.refresh_token
      const deepLinkUrl = `hintify://auth?token=${encodeURIComponent(token)}&refresh_token=${encodeURIComponent(refreshToken || '')}&user=${encodeURIComponent(JSON.stringify(userData))}`

      console.log('🔗 Opening deep link with tokens and user data:', {
        hasToken: !!token,
        hasRefreshToken: !!refreshToken,
        hasUserData: !!userData.id,
        userEmail: userData.email
      })

      // Attempt to open the deep link
      window.location.href = deepLinkUrl

      // Hide popup after a delay
      setTimeout(() => {
        setDeepLinkAttempted(false)
        setShowPopup(false)
      }, 3000)

    } catch (error) {
      console.error('❌ Error opening app:', error)
      setDeepLinkAttempted(false)
    }
  }

  if (!showPopup) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={() => setShowPopup(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardHeader className="text-center">
          <CardTitle className="text-white text-2xl">
            Authentication Successful!
          </CardTitle>
          <CardDescription className="text-gray-400">
            Welcome back, {user?.user_metadata?.full_name || user?.email}!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center text-gray-300">
            <p className="mb-4">
              You have successfully signed in to Hintify. Click the button below to open the desktop app.
            </p>
          </div>

          <Button
            onClick={handleOpenApp}
            disabled={deepLinkAttempted}
            className="group relative w-full overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 text-lg shadow-2xl border-0 transition-all duration-300 hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {/* Glass morphism overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" />

            {/* Content */}
            <div className="relative flex items-center justify-center">
              {deepLinkAttempted ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  <span className="font-extrabold tracking-wide">Opening App...</span>
                </>
              ) : (
                <>
                  <ExternalLink className="mr-3 h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span className="font-extrabold tracking-wide">Open Hintify App</span>
                </>
              )}
            </div>

            {/* Shine effect - only when not disabled */}
            {!deepLinkAttempted && (
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              If the app doesn't open automatically, make sure Hintify is installed on your computer.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

