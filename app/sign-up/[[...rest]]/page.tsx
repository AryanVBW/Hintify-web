"use client"

import React, { useEffect } from 'react'
import { SignUp } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import Hyperspeed from '@/components/Hyperspeed'
import { useAuth } from '@/components/auth/AuthProvider'

export default function SignUpCatchAllPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromApp = searchParams.get('from') === 'app'
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/')
    }
  }, [user, authLoading, router])

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0">
        <Hyperspeed />
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>

        <div className="relative">
          <SignUp
            appearance={{
              elements: {
                rootBox: 'mx-auto w-full',
                card: 'backdrop-blur-3xl bg-gradient-to-br from-black/50 via-gray-900/40 to-black/50 border-2 border-white/25 shadow-[0_20px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(168,85,247,0.2),inset_0_2px_4px_rgba(255,255,255,0.2)] rounded-3xl relative overflow-hidden',
                headerTitle: 'text-white font-bold text-3xl drop-shadow-[0_4px_12px_rgba(0,0,0,1)] bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text',
                headerSubtitle: 'text-gray-100 font-medium text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]',
                formFieldLabel: 'text-gray-100 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                formFieldInput: 'text-white placeholder-gray-300 bg-black/40 border-white/20 focus:border-purple-400 focus:ring-purple-400 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]',
                formFieldErrorText: 'text-red-300 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                footer: 'bg-black/20 rounded-b-3xl border-t border-white/10',
                footerActionLink: 'text-purple-400 font-bold hover:text-purple-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]',
                formButtonPrimary: 'bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold shadow-[0_10px_30px_rgba(168,85,247,0.5)] hover:shadow-[0_10px_40px_rgba(168,85,247,0.8)]',
                identityPreviewText: 'text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                socialButtonsBlockButton: 'text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                dividerText: 'text-gray-200 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                formFieldAction: 'text-purple-300 font-semibold hover:text-purple-200',
                formHeaderTitle: 'text-white font-bold',
                formHeaderSubtitle: 'text-gray-100',
                formFieldHintText: 'text-gray-100 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                verificationLinkStatusBox: 'text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                main: 'text-white',
                backButton: 'text-purple-400 font-bold hover:text-purple-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]',
                alternativeMethodsBlockButton: 'text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
              }
            }}
            fallbackRedirectUrl={fromApp ? '/auth-success?source=app' : '/'}
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </div>
  )
}

