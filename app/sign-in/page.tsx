'use client'

import React, { useState, useEffect } from 'react'
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Globe, ExternalLink, CheckCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import Hyperspeed from '@/components/Hyperspeed'
import { useAuth } from '@/components/auth/AuthProvider'

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showAlreadySignedIn, setShowAlreadySignedIn] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const fromApp = searchParams.get('source') === 'app'
  const { user, session, loading: authLoading } = useAuth()

  // Smart redirect logic for already authenticated users
  useEffect(() => {
    if (!authLoading && user && session) {
      if (fromApp) {
        // User is already signed in and came from app - show "Open App" option
        setShowAlreadySignedIn(true)
      } else {
        // User is already signed in and came from web - redirect to dashboard
        router.push('/')
      }
    }
  }, [user, session, authLoading, fromApp, router])

  useEffect(() => {
    // Clear any previous errors when component mounts
    setError(null)
    setSuccess(null)
  }, [])

  const handleOpenApp = () => {
    try {
      // Create deep link with user session data
      const token = session?.access_token
      const refreshToken = session?.refresh_token
      const userData = {
        id: user?.id,
        email: user?.email,
        name: user?.user_metadata?.full_name || user?.user_metadata?.name,
        firstName: user?.user_metadata?.given_name,
        lastName: user?.user_metadata?.family_name,
        avatar: user?.user_metadata?.avatar_url || user?.user_metadata?.picture
      }

      const deepLinkUrl = `hintify://auth?token=${encodeURIComponent(token || '')}&refresh_token=${encodeURIComponent(refreshToken || '')}&user=${encodeURIComponent(JSON.stringify(userData))}`

      console.log('🔗 Opening app with deep link...')
      window.location.href = deepLinkUrl

      setSuccess('Opening Hintify app...')
    } catch (error) {
      console.error('❌ Failed to open app:', error)
      setError('Failed to open the desktop app. Please make sure Hintify is installed.')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError(null)
      await signInWithGoogle(fromApp)
      // Redirect will be handled by Supabase
    } catch (error: any) {
      console.error('Google sign in error:', error)
      setError(error.message || 'Failed to sign in with Google')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const { user } = await signInWithEmail(email, password)
      
      if (user) {
        setSuccess('Successfully signed in!')
        // Redirect to auth-success page
        router.push(`/auth-success?source=${fromApp ? 'app' : 'web'}`)
      }
    } catch (error: any) {
      console.error('Email sign in error:', error)
      setError(error.message || 'Failed to sign in with email')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const { user } = await signUpWithEmail(email, password, fromApp)

      if (user) {
        setSuccess('Account created successfully! Please check your email to verify your account.')
      }
    } catch (error: any) {
      console.error('Email sign up error:', error)
      setError(error.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 z-0">
          <Hyperspeed />
        </div>
        <Card className="w-full max-w-md relative z-10 backdrop-blur-xl bg-black/30 border-white/10 shadow-2xl">
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show "Open App" interface for already signed-in users from app
  if (showAlreadySignedIn && user) {
    return (
      <div className="min-h-screen bg-gray-950 relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 z-0">
          <Hyperspeed />
        </div>
        <Card className="w-full max-w-md relative z-10 backdrop-blur-xl bg-black/30 border-white/10 shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <CheckCircle className="h-16 w-16 text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Welcome back!
            </CardTitle>
            <CardDescription className="text-gray-300">
              You're already signed in as {user.user_metadata?.full_name || user.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-900/50 border-red-500/50 text-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="bg-green-900/50 border-green-500/50 text-green-200">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <div className="text-center text-gray-300 mb-4">
              <p>Click below to open the Hintify desktop app</p>
            </div>
            <Button
              onClick={handleOpenApp}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Open Hintify App
            </Button>
            <Button
              onClick={() => setShowAlreadySignedIn(false)}
              variant="ghost"
              className="w-full text-gray-400 hover:text-white hover:bg-white/10"
            >
              Sign in with different account
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden flex items-center justify-center p-4">
      {/* Hyperspeed Background */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed />
      </div>

      {/* Enhanced Glass Morphism Card with Dark Theme */}
      <Card className="w-full max-w-md relative z-10 backdrop-blur-xl bg-black/30 border-white/10 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white mb-2">
            {fromApp ? 'Sign in to Hintify' : 'Welcome to Hintify'}
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            {fromApp
              ? 'Continue to your desktop app'
              : 'Choose your sign-in method'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="bg-red-900/50 border-red-500/50 text-red-200">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-900/50 border-green-500/50 text-green-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Primary Google Sign In Button - More Prominent */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 text-lg shadow-lg border-0"
            size="lg"
          >
            {loading ? (
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            ) : (
              <Globe className="mr-3 h-5 w-5" />
            )}
            Continue with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-950/80 px-4 text-gray-400 backdrop-blur-sm">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Simplified Email Sign In/Up Tabs */}
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 backdrop-blur-sm border border-white/10">
              <TabsTrigger
                value="signin"
                className="text-gray-300 data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:shadow-sm font-medium"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="text-gray-300 data-[state=active]:bg-white/15 data-[state=active]:text-white data-[state=active]:shadow-sm font-medium"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-5 mt-6">
              <form onSubmit={handleEmailSignIn} className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="signin-email" className="text-white font-medium">Email Address</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 backdrop-blur-sm focus:bg-white/10 focus:border-white/40 focus:ring-2 focus:ring-blue-500/50 h-12 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="signin-password" className="text-white font-medium">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 backdrop-blur-sm focus:bg-white/10 focus:border-white/40 focus:ring-2 focus:ring-blue-500/50 h-12 text-base"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 text-base shadow-lg border-0"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Mail className="mr-2 h-5 w-5" />
                  )}
                  Sign In with Email
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-5 mt-6">
              <form onSubmit={handleEmailSignUp} className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="signup-email" className="text-white font-medium">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 backdrop-blur-sm focus:bg-white/10 focus:border-white/40 focus:ring-2 focus:ring-purple-500/50 h-12 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="signup-password" className="text-white font-medium">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                    minLength={6}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 backdrop-blur-sm focus:bg-white/10 focus:border-white/40 focus:ring-2 focus:ring-purple-500/50 h-12 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="confirm-password" className="text-white font-medium">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 backdrop-blur-sm focus:bg-white/10 focus:border-white/40 focus:ring-2 focus:ring-purple-500/50 h-12 text-base"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 text-base shadow-lg border-0"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Mail className="mr-2 h-5 w-5" />
                  )}
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {fromApp && (
            <div className="text-center text-sm text-gray-400 bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="font-medium">🖥️ Desktop App Integration</p>
              <p className="text-xs mt-1">After signing in, you'll be redirected back to the Hintify app</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
