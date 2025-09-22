"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink, Smartphone, Download } from "lucide-react"

export default function AuthSuccessPage() {
  const { user, isLoaded } = useUser()
  const searchParams = useSearchParams()
  const [source, setSource] = useState<string>("")
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [showAppLink, setShowAppLink] = useState(false)

  useEffect(() => {
    const sourceParam = searchParams.get("source")
    setSource(sourceParam || "")
    
    // Show app link if coming from the app
    if (sourceParam === "app") {
      setShowAppLink(true)
      
      // Automatically open app after user data loads (with slight delay for user feedback)
      if (user && isLoaded) {
        console.log("Auto-redirecting to app for authenticated user...")
        setTimeout(() => {
          handleOpenApp()
        }, 2000) // 2 second delay to show success message
      }
    }
  }, [searchParams, user, isLoaded])

  const handleOpenApp = () => {
    if (!user) return
    
    setIsRedirecting(true)
    
    // Create comprehensive deep link with all available user data and enhanced security
    const deepLinkParams = new URLSearchParams()
    
    // Primary identifiers
    if (user.id) deepLinkParams.set('userId', user.id)
    if (user.primaryEmailAddress?.emailAddress) deepLinkParams.set('email', user.primaryEmailAddress.emailAddress)
    
    // Name variations for better display in app
    if (user.fullName) deepLinkParams.set('name', user.fullName)
    if (user.firstName) deepLinkParams.set('firstName', user.firstName)
    if (user.lastName) deepLinkParams.set('lastName', user.lastName)
    
    // Profile image with fallbacks
    if (user.imageUrl) deepLinkParams.set('imageUrl', user.imageUrl)
    if (user.profileImageUrl) deepLinkParams.set('profileImageUrl', user.profileImageUrl)
    
    // Additional metadata for enhanced user experience
    if (user.username) deepLinkParams.set('username', user.username)
    
    // Authentication provider info
    deepLinkParams.set('provider', 'clerk')
    deepLinkParams.set('authMethod', 'website_transfer')
    
    // Session info for security
    deepLinkParams.set('timestamp', Date.now().toString())
    deepLinkParams.set('sessionId', crypto.randomUUID())
    deepLinkParams.set('source', 'hintify_website')
    
    // Account creation and verification status
    if (user.createdAt) deepLinkParams.set('accountCreatedAt', user.createdAt.toString())
    if (user.lastSignInAt) deepLinkParams.set('lastSignInAt', user.lastSignInAt?.toString() || '')
    if (user.emailAddresses?.[0]?.verification?.status) {
      deepLinkParams.set('emailVerified', user.emailAddresses[0].verification.status === 'verified' ? 'true' : 'false')
    }
    
    // User preferences and settings (if available)
    if (user.publicMetadata) {
      try {
        deepLinkParams.set('userPreferences', JSON.stringify(user.publicMetadata))
      } catch (e) {
        console.warn('Failed to serialize user preferences:', e)
      }
    }
    
    const deepLinkUrl = `hintify://auth-success?${deepLinkParams.toString()}`
    
    console.log("🚀 Opening app with enhanced account transfer:", {
      userId: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      fullName: user.fullName,
      provider: 'clerk',
      accountCreated: user.createdAt,
      lastSignIn: user.lastSignInAt,
      transferMethod: 'secure_deep_link'
    })
    
    // Attempt to open the app with the account details
    try {
      window.location.href = deepLinkUrl
      
      // Provide user feedback
      setTimeout(() => {
        console.log("📱 App should have opened with your account details")
      }, 1000)
      
    } catch (error) {
      console.error('Failed to open app:', error)
      setIsRedirecting(false)
    }
    
    // Reset redirecting state after a delay
    setTimeout(() => {
      setIsRedirecting(false)
    }, 4000)
  }

  const handleDownloadApp = () => {
    // Redirect to app download page or show download options
    window.open("https://github.com/AryanVBW/Hintify/releases", "_blank")
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-black/80 backdrop-blur-sm border-white/10 max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Authentication Required</h1>
            <p className="text-gray-300 mb-6">Please sign in to continue.</p>
            <Button
              onClick={() => window.location.href = "/"}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
            >
              Go to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-400/20 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome to Hintify, {user.firstName || "there"}!
            </h1>
            <p className="text-xl text-gray-300">
              You've successfully signed in to your account.
            </p>
          </div>

          {/* User Info Card */}
          <Card className="bg-black/60 backdrop-blur-sm border-white/10 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                {user.imageUrl && (
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                    className="w-16 h-16 rounded-full border-2 border-white/20"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {user.fullName || user.firstName}
                  </h3>
                  <p className="text-gray-300">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Cards */}
          <div className="grid gap-6">
            {showAppLink && (
              <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-400/20 rounded-lg">
                        <Smartphone className="h-6 w-6 text-yellow-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Transfer Account to App
                      </h3>
                      <p className="text-gray-300 mb-4">
                        Your account details will be securely transferred to the Hintify SnapAssist AI app. You'll be automatically logged in with the same account and can access all your synced data.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          onClick={handleOpenApp}
                          disabled={isRedirecting}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold flex items-center gap-2"
                        >
                          {isRedirecting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                              Opening App...
                            </>
                          ) : (
                            <>
                              <ExternalLink className="h-4 w-4" />
                              Open Hintify App (Auto-Login)
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={handleDownloadApp}
                          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold border-0"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download App
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-black/60 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-400/20 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Explore Your Dashboard
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Track your learning progress, view your question history, and see how your thinking skills are improving over time.
                    </p>
                    <Button
                      onClick={() => window.location.href = "/dashboard"}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold border-0"
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {!showAppLink && (
              <Card className="bg-black/60 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-green-400/20 rounded-lg">
                        <Download className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Get the Desktop App
                      </h3>
                      <p className="text-gray-300 mb-4">
                        Download Hintify SnapAssist AI for your desktop to get instant hints from screenshots and clipboard images.
                      </p>
                      <Button
                        onClick={handleDownloadApp}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold flex items-center gap-2 border-0"
                      >
                        <Download className="h-4 w-4" />
                        Download for Desktop
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Help Text */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Having trouble? The app should open automatically. If it doesn't, make sure Hintify SnapAssist AI is installed on your computer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}