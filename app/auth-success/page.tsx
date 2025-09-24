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
    if (!session?.access_token) {
      console.error('No access token available')
      return
    }

    try {
      setDeepLinkAttempted(true)

      // Create deep link URL with authentication tokens
      const deepLinkUrl = new URL('hintify://auth')
      deepLinkUrl.searchParams.set('access_token', session.access_token)
      deepLinkUrl.searchParams.set('refresh_token', session.refresh_token || '')
      deepLinkUrl.searchParams.set('expires_in', String(session.expires_in || 3600))
      deepLinkUrl.searchParams.set('token_type', 'bearer')

      console.log('Opening deep link:', deepLinkUrl.toString())

      // Attempt to open the deep link
      window.location.href = deepLinkUrl.toString()

      // Show success message after a delay
      setTimeout(() => {
        setDeepLinkAttempted(false)
      }, 3000)

    } catch (error) {
      console.error('Error opening app:', error)
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
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
          >
            {deepLinkAttempted ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Opening App...
              </>
            ) : (
              <>
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Hintify App
              </>
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
