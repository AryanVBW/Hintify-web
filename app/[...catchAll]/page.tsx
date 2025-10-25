"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="relative z-10 w-full max-w-2xl bg-gray-900/50 border-gray-800 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 animate-pulse">
                404
              </div>
              <div className="absolute inset-0 text-9xl font-black text-red-500/20 blur-xl">
                404
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold text-white mb-2">
            Page Not Found
          </CardTitle>
          <p className="text-gray-400 text-lg">
            Oops! The page you're looking for doesn't exist.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-gray-300">
            <p className="mb-4">
              The page you're trying to access might have been moved, deleted, or never existed.
            </p>
            <p className="text-sm text-gray-500">
              Don't worry, you can find your way back!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50 hover:border-gray-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>

          <div className="pt-6 border-t border-gray-800">
            <p className="text-center text-sm text-gray-500 mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                onClick={() => router.push('/sign-in')}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push('/sign-up')}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => router.push('/report-issue')}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                Report Issue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}