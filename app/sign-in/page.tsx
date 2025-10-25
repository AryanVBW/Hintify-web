'use client'

import React, { useEffect } from 'react'
import { SignIn } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import Hyperspeed from '@/components/Hyperspeed'
import { useAuth } from '@/components/auth/AuthProvider'

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromApp = searchParams.get('from') === 'app'
  const { user, loading: authLoading } = useAuth()

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/')
    }
  }, [user, authLoading, router])


  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden flex items-center justify-center p-4">
      {/* Hyperspeed Background */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed />
      </div>

      {/* Ambient glow effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Clerk Sign In Component */}
      <div className="relative z-10 w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>

        <div className="relative">
          <SignIn
            appearance={{
              elements: {
                rootBox: 'mx-auto w-full',
                card: 'backdrop-blur-3xl bg-gradient-to-br from-black/50 via-gray-900/40 to-black/50 border-2 border-white/25 shadow-[0_20px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(59,130,246,0.2),inset_0_2px_4px_rgba(255,255,255,0.2)] rounded-3xl relative overflow-hidden',
                headerTitle: 'text-white font-bold text-3xl drop-shadow-[0_4px_12px_rgba(0,0,0,1)] bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text',
                headerSubtitle: 'text-gray-100 font-medium text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]',
                socialButtonsBlockButton: 'backdrop-blur-xl bg-gradient-to-br from-white/20 via-white/15 to-white/20 border-2 border-white/40 text-white font-bold hover:from-white/30 hover:via-white/25 hover:to-white/30 hover:border-white/50 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative overflow-hidden',
                socialButtonsBlockButtonText: 'text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] relative z-10',
                formButtonPrimary: 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-400 hover:to-blue-500 text-white font-bold text-base shadow-[0_8px_30px_rgba(59,130,246,0.6),0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_12px_50px_rgba(59,130,246,0.8),0_0_40px_rgba(59,130,246,0.6)] hover:scale-[1.03] transition-all duration-300 relative overflow-hidden',
                formFieldInput: 'backdrop-blur-xl bg-gradient-to-br from-white/15 via-white/10 to-white/15 border-2 border-white/35 text-white font-semibold text-base placeholder:text-gray-300 placeholder:font-normal focus:from-white/20 focus:via-white/15 focus:to-white/20 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-400/30 focus:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]',
                formFieldLabel: 'text-white font-bold text-sm drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] tracking-wide',
                footerActionLink: 'text-blue-400 font-bold hover:text-blue-300 hover:underline hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                footerActionText: 'text-gray-100 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                identityPreviewText: 'text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                identityPreviewEditButton: 'text-blue-400 font-bold hover:text-blue-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]',
                dividerLine: 'bg-gradient-to-r from-transparent via-white/40 to-transparent',
                dividerText: 'text-gray-100 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] px-4 bg-gradient-to-r from-transparent via-gray-900/50 to-transparent',
                formFieldInputShowPasswordButton: 'text-gray-200 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300',
                otpCodeFieldInput: 'backdrop-blur-xl bg-white/15 border-2 border-white/40 text-white font-bold text-xl text-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]',
                formResendCodeLink: 'text-blue-400 font-bold hover:text-blue-300 hover:underline hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]',
                alertText: 'text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                formFieldErrorText: 'text-red-400 font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]',
                formFieldSuccessText: 'text-green-400 font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]',
                formFieldWarningText: 'text-yellow-400 font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]',
                formFieldInfoText: 'text-blue-400 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                formFieldHintText: 'text-gray-100 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                verificationLinkStatusBox: 'text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
                main: 'text-white',
                backButton: 'text-blue-400 font-bold hover:text-blue-300 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]',
                alternativeMethodsBlockButton: 'text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
              }
            }}
            fallbackRedirectUrl={fromApp ? '/auth-success?source=app' : '/'}
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    </div>
  )
}
