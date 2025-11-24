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
    // If not from app, redirect to home page
    if (!isFromApp) {
      router.replace("/")
      return
    }
  }, [isFromApp, router])

  const handleOpenApp = async () => {
    if (!user) {
      console.error('No user data available')
      return
    }

    try {
      setDeepLinkAttempted(true)

      // Fetch Clerk session token from API
      console.log('🔑 Fetching Clerk session token...')
      const response = await fetch('/api/auth/desktop-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      })

      if (!response.ok) {
        throw new Error('Failed to retrieve session token')
      }

      const data = await response.json()

      if (!data.success || !data.token) {
        throw new Error(data.error || 'No access token available')
      }

      const accessToken = data.token
      const supabaseToken = data.supabaseToken
      const sessionId = data.sessionId
      const userData = data.user

      // Create deep link URL with Clerk authentication token
      // Using hintify://auth/callback format for Clerk (without state since this is from website, not OAuth flow)
      const deepLinkUrl = new URL('hintify://auth/callback')
      deepLinkUrl.searchParams.set('token', accessToken)
      if (supabaseToken) deepLinkUrl.searchParams.set('supabase_token', supabaseToken)
      if (sessionId) deepLinkUrl.searchParams.set('session_id', sessionId)
      deepLinkUrl.searchParams.set('user', JSON.stringify(userData))

      const deepLinkString = deepLinkUrl.toString()

      console.log('🔗 Opening deep link with Clerk token:', {
        hasToken: !!accessToken,
        hasUserData: !!userData.id,
        userEmail: userData.email
      })

      // Attempt to open the deep link
      window.location.href = deepLinkString

      // Show success message after a delay
      setTimeout(() => {
        setDeepLinkAttempted(false)
      }, 3000)

    } catch (error) {
      console.error('❌ Error opening app:', error)
      setDeepLinkAttempted(false)
      alert('Failed to open app. Please make sure Hintify is installed.')
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
            {isFromApp ? 'Authentication Successful!' : 'Welcome to Hintify!'}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {isFromApp
              ? `Welcome back, ${user.user_metadata?.full_name || user.email}!`
              : `Hello, ${user.user_metadata?.full_name || user.email}! You're now signed in.`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-gray-300">
            <p className="mb-4">
              {isFromApp
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
