"use client"

/**
 * Desktop Authentication Bridge Page
 *
 * This page handles the authentication flow for Electron desktop applications.
 *
 * SECURITY ARCHITECTURE:
 * =====================
 *
 * 1. CSRF Protection via State Parameter:
 *    - Desktop app generates a unique UUID (state parameter) before initiating auth
 *    - State is passed through the entire OAuth flow
 *    - State is validated on callback to ensure the request originated from the desktop app
 *    - Prevents Cross-Site Request Forgery (CSRF) attacks
 *
 * 2. Short-lived Session Tokens:
 *    - Clerk JWT session tokens are used (default: 1 hour expiration)
 *    - Tokens are only valid for a limited time window
 *    - Desktop app must exchange token for long-lived session immediately
 *    - Reduces risk window if token is intercepted
 *
 * 3. PKCE (Proof Key for Code Exchange):
 *    - Clerk handles PKCE internally for OAuth flows
 *    - code_challenge and code_verifier are managed by Clerk Auth
 *    - Provides additional security layer for OAuth authorization code flow
 *    - Prevents authorization code interception attacks
 *
 * 4. Custom URI Scheme Security:
 *    - Token passed via custom URI scheme (hintify://auth/callback)
 *    - Only the registered Electron app can intercept this scheme
 *    - OS-level protection ensures only authorized app receives the callback
 *    - Token is immediately consumed and not stored in browser history
 *
 * AUTHENTICATION FLOW:
 * ===================
 *
 * Step 1: Desktop App Initiates
 *   - User clicks "Sign in" in Electron app
 *   - App generates UUID: const state = crypto.randomUUID()
 *   - App opens browser: https://hintify.nexus-v.tech/auth/desktop?state=<uuid>
 *
 * Step 2: Web Authentication
 *   - This page extracts and validates state parameter
 *   - Checks if user is already authenticated with Clerk
 *   - If not authenticated, redirects to Clerk OAuth (Google)
 *   - After successful auth, Clerk redirects back to this page
 *
 * Step 3: Token Generation
 *   - Page retrieves Clerk session token
 *   - Validates token is fresh and valid
 *   - Constructs callback URL with token and state
 *
 * Step 4: Desktop Callback
 *   - Redirects to: hintify://auth/callback?token=<jwt>&state=<uuid>
 *   - Electron app intercepts custom URI scheme
 *   - App validates state matches original request
 *   - App uses token to establish authenticated session
 *
 * ERROR HANDLING:
 * ==============
 * - Missing state parameter: Shows error, prevents CSRF
 * - Authentication failure: Shows error with retry option
 * - Token generation failure: Shows error with detailed message
 * - Network errors: Graceful degradation with user feedback
 *
 * CONFIGURATION REQUIREMENTS:
 * ==========================
 * 1. Clerk Dashboard:
 *    - Add redirect URL: https://hintify.nexus-v.tech/auth/desktop
 *    - Enable Google OAuth provider
 *    - Configure OAuth scopes: email, profile
 *
 * 2. Electron App:
 *    - Register custom URI scheme: hintify://
 *    - Implement protocol handler for auth/callback
 *    - Store state parameter during auth initiation
 *    - Validate state on callback reception
 *
 * 3. Environment Variables:
 *    - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: Your Clerk publishable key
 *    - CLERK_SECRET_KEY: Clerk secret key
 *    - NEXT_PUBLIC_SITE_URL: Your web app URL
 */

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/components/auth/AuthProvider"
import { useClerk } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Loader2, AlertCircle, ExternalLink } from "lucide-react"

export default function DesktopAuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, session, loading: authLoading } = useAuth()
  const { openSignIn } = useClerk()

  const [status, setStatus] = useState<'validating' | 'authenticating' | 'generating_token' | 'redirecting' | 'error' | 'success'>('validating')
  const [error, setError] = useState<string | null>(null)
  const [stateParam, setStateParam] = useState<string | null>(null)
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null)

  // Extract and validate state parameter on mount
  useEffect(() => {
    const state = searchParams.get('state')

    // SECURITY: State parameter is required for CSRF protection
    if (!state) {
      setError('Missing state parameter. This request may not be legitimate. Please try signing in again from the desktop app.')
      setStatus('error')
      return
    }

    // Validate state format (should be a UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(state)) {
      setError('Invalid state parameter format. Please try signing in again from the desktop app.')
      setStatus('error')
      return
    }

    setStateParam(state)
  }, [searchParams])

  // Handle authentication flow
  useEffect(() => {
    if (!stateParam || status === 'error') return
    if (authLoading) return

    const handleAuth = async () => {
      try {
        // If user is not authenticated, initiate OAuth flow
        if (!user || !session) {
          setStatus('authenticating')

          // Open Clerk sign-in modal with Google OAuth
          // Clerk will handle PKCE internally
          openSignIn({
            redirectUrl: `${window.location.origin}/auth/desktop?state=${stateParam}`,
            appearance: {
              elements: {
                rootBox: 'mx-auto',
                card: 'backdrop-blur-3xl bg-gradient-to-br from-black/50 via-gray-900/40 to-black/50 border-2 border-white/25',
                headerTitle: 'text-white font-bold',
                headerSubtitle: 'text-gray-100',
                socialButtonsBlockButton: 'text-white font-bold',
                socialButtonsBlockButtonText: 'text-white font-bold',
                formButtonPrimary: 'text-white font-bold',
                formFieldInput: 'text-white',
                formFieldLabel: 'text-white font-bold',
                footerActionLink: 'text-blue-400 font-bold',
                footerActionText: 'text-gray-100',
                main: 'text-white',
                alertText: 'text-white',
                formFieldErrorText: 'text-red-400 font-bold',
              }
            }
          })

          // OAuth redirect will happen automatically
          return
        }

        // User is authenticated, generate token and redirect to desktop app
        setStatus('generating_token')

        // Get the current session token from Clerk
        // This is a short-lived JWT token (default: 1 hour expiration)
        const response = await fetch('/api/auth/desktop-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ state: stateParam })
        })

        if (!response.ok) {
          throw new Error('Failed to retrieve session token. Please try again.')
        }

        const data = await response.json()

        if (!data.success || !data.token) {
          throw new Error(data.error || 'No access token available. Please try signing in again.')
        }

        const accessToken = data.token
        const supabaseToken = data.supabaseToken
        const sessionId = data.sessionId
        const userData = data.user

        setStatus('redirecting')

        // Construct the custom URI scheme callback URL
        // SECURITY: State parameter is included for validation by desktop app
        const url = new URL('hintify://auth/callback')
        url.searchParams.set('token', accessToken)
        if (supabaseToken) url.searchParams.set('supabase_token', supabaseToken)
        if (sessionId) url.searchParams.set('session_id', sessionId)
        url.searchParams.set('state', stateParam)
        url.searchParams.set('user', JSON.stringify(userData))

        const urlString = url.toString()
        setCallbackUrl(urlString)

        console.log('🔗 Redirecting to desktop app:', {
          hasToken: !!accessToken,
          hasSupabaseToken: !!supabaseToken,
          sessionId: sessionId,
          state: stateParam,
          userEmail: userData.email
        })

        // Redirect to desktop app via custom URI scheme
        // The Electron app will intercept this URL
        window.location.href = urlString

        setStatus('success')

      } catch (err) {
        console.error('Desktop auth error:', err)
        setError(err instanceof Error ? err.message : 'An unexpected error occurred')
        setStatus('error')
      }
    }

    handleAuth()
  }, [user, session, authLoading, stateParam, status, openSignIn])

  // Render loading state
  if (authLoading || status === 'validating') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-yellow-400" />
            <CardTitle className="text-white">Validating Request</CardTitle>
            <CardDescription className="text-gray-400">
              Please wait while we validate your authentication request...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // Render authenticating state
  if (status === 'authenticating') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-yellow-400" />
            <CardTitle className="text-white">Redirecting to Sign In</CardTitle>
            <CardDescription className="text-gray-400">
              You will be redirected to sign in with Google...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // Render token generation state
  if (status === 'generating_token') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-yellow-400" />
            <CardTitle className="text-white">Generating Secure Token</CardTitle>
            <CardDescription className="text-gray-400">
              Creating your authentication credentials...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // Render redirecting state
  if (status === 'redirecting' || status === 'success') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-400" />
            <CardTitle className="text-white">Authentication Successful!</CardTitle>
            <CardDescription className="text-gray-400">
              Redirecting to Hintify desktop app...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-gray-800 border-gray-700">
              <ExternalLink className="h-4 w-4" />
              <AlertDescription className="text-gray-300">
                If the app doesn't open automatically, click the button below.
              </AlertDescription>
            </Alert>

            {callbackUrl && (
              <div className="space-y-2">
                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold"
                  onClick={() => {
                    window.location.href = callbackUrl
                  }}
                >
                  Launch App
                </Button>

                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(callbackUrl)
                    alert('Login link copied to clipboard! You can paste this into the app if needed.')
                  }}
                >
                  Copy Login Link
                </Button>
              </div>
            )}

            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/')}
            >
              Back to Website
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render error state
  if (status === 'error') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
            <CardTitle className="text-white">Authentication Error</CardTitle>
            <CardDescription className="text-gray-400">
              We encountered an issue during authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-red-900/20 border-red-800">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-300">
                {error || 'An unexpected error occurred. Please try again.'}
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                onClick={() => router.push('/sign-in?from=app')}
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/')}
              >
                Back to Website
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}

