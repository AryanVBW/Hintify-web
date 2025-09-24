"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth/AuthProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ExternalLink, Loader2 } from "lucide-react"

export default function AuthSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, session, loading } = useAuth()
  const [deepLinkAttempted, setDeepLinkAttempted] = useState(false)

  const source = searchParams.get('source')
  const isFromApp = source === 'app'

  useEffect(() => {
    // If not from app, redirect to coming soon
    if (!isFromApp) {
      router.replace("/coming-soon")
      return
    }
  }, [isFromApp, router])

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

      // Create deep link URL with authentication tokens and user data (consistent with sign-in page)
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

      // Show success message after a delay
      setTimeout(() => {
        setDeepLinkAttempted(false)
      }, 3000)

    } catch (error) {
      console.error('❌ Error opening app:', error)
      setDeepLinkAttempted(false)
    }
  }

  if (!isFromApp) {
    return null // Will redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p className="text-gray-400">Checking authentication status</p>
        </div>
      </div>
    )
  }

  if (!user || !session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Authentication Required</CardTitle>
            <CardDescription className="text-gray-400">
              Please sign in to continue to the app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push('/')}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              Go to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-400" />
          </div>
          <CardTitle className="text-white text-2xl">
            {fromApp ? 'Authentication Successful!' : 'Welcome to Hintify!'}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {fromApp
              ? `Welcome back, ${user.user_metadata?.full_name || user.email}!`
              : `Hello, ${user.user_metadata?.full_name || user.email}! You're now signed in.`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-gray-300">
            <p className="mb-4">
              {fromApp
                ? 'You have successfully signed in to Hintify. Click the button below to open the desktop app.'
                : 'You are now signed in to Hintify! You can continue using the website or download the desktop app.'
              }
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
            <p className="text-sm text-gray-500 mb-2">
              If the app doesn't open automatically, make sure Hintify is installed on your computer.
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-white"
            >
              Back to Website
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
