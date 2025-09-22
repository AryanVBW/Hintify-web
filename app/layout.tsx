import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

export const metadata: Metadata = {
  title: "Hintify - Get Hints, Not Answers",
  description: "Think smarter, not harder. Hintify gives you just the right nudge to solve problems yourself.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#facc15', // yellow-400
          colorBackground: 'rgba(0, 0, 0, 0.9)',
          colorInputBackground: 'rgba(31, 31, 31, 0.8)',
          colorInputText: '#ffffff',
          colorText: '#ffffff',
          colorTextSecondary: '#d1d5db', // gray-300
          colorShimmer: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          fontFamily: 'inherit'
        },
        elements: {
          // Modal backdrop
          modalBackdrop: 'backdrop-blur-md bg-black/60',
          
          // Main modal container - centered position
          modal: `
            backdrop-blur-xl bg-black/80 border border-white/20 
            shadow-2xl shadow-black/50 rounded-2xl
          `,
          
          // Card styling
          card: `
            backdrop-blur-xl bg-black/90 border border-white/10 
            shadow-2xl rounded-2xl
          `,
          
          // Header
          headerTitle: 'text-white text-2xl font-bold',
          headerSubtitle: 'text-gray-300',
          
          // Form elements
          formButtonPrimary: `
            bg-gradient-to-br from-yellow-400 to-yellow-500 
            hover:from-yellow-500 hover:to-yellow-600 
            text-black font-semibold rounded-full 
            transition-all duration-200 border-0
          `,
          
          formFieldInput: `
            bg-black/40 border border-white/20 rounded-lg 
            text-white placeholder:text-gray-400 
            focus:border-yellow-400/50 focus:ring-yellow-400/20
            backdrop-blur-sm
          `,
          
          formFieldLabel: 'text-gray-300 font-medium',
          
          // Links and text
          formFieldHintText: 'text-gray-400',
          formFieldSuccessText: 'text-green-400',
          formFieldErrorText: 'text-red-400',
          
          // Social buttons
          socialButtonsBlockButton: `
            bg-white border border-gray-200 rounded-lg 
            text-gray-900 hover:bg-gray-50 transition-colors
            backdrop-blur-sm
          `,
          
          // Footer
          footerActionText: 'text-gray-300',
          footerActionLink: 'text-yellow-400 hover:text-yellow-300 font-medium',
          
          // Divider
          dividerLine: 'bg-white/20',
          dividerText: 'text-gray-400',
          
          // Loading
          spinner: 'text-yellow-400',
          
          // User button (for signed in state)
          userButtonAvatarBox: 'border-2 border-white/20',
          userButtonPopoverCard: `
            backdrop-blur-xl bg-black/90 border border-white/20 
            shadow-2xl rounded-xl
          `,
          userButtonPopoverText: 'text-white'
        }
      }}
    >
      <html lang="en">
        <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
