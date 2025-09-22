import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Hintify - Get Hints, Not Answers | AI-Powered Learning Assistant",
    template: "%s | Hintify"
  },
  description: "Think smarter, not harder. Hintify gives you just the right nudge to solve problems yourself. Our AI provides progressive hints that guide your thinking without giving away answers, helping you develop critical thinking skills.",
  keywords: [
    "AI learning assistant",
    "hints not answers",
    "critical thinking",
    "problem solving",
    "educational AI",
    "think for yourself",
    "progressive hints",
    "learning guidance",
    "cognitive development",
    "smart learning"
  ],
  authors: [{ name: "Hintify Team" }],
  creator: "Hintify",
  publisher: "Hintify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hintify.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hintify - Get Hints, Not Answers | AI-Powered Learning Assistant",
    description: "Think smarter, not harder. Hintify gives you just the right nudge to solve problems yourself. Develop critical thinking skills with our AI that provides hints, not answers.",
    url: 'https://hintify.com',
    siteName: 'Hintify',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hintify - Get Hints, Not Answers',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hintify - Get Hints, Not Answers",
    description: "AI-powered learning assistant that guides your thinking with progressive hints. Think smarter, not harder.",
    images: ['/twitter-image.png'],
    creator: '@hintify',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'education',
  classification: 'Educational Technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hintify",
    "description": "AI-powered learning assistant that provides progressive hints to help you think through problems instead of giving direct answers.",
    "url": "https://hintify.com",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Hintify Team"
    },
    "keywords": "AI learning, hints not answers, critical thinking, problem solving, educational AI",
    "featureList": [
      "Progressive hint system",
      "Think-first approach",
      "Contextual guidance",
      "Learning reinforcement",
      "Human-like conversation"
    ]
  }

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
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://prod.spline.design" />
          <link rel="dns-prefetch" href="https://vercel-insights.com" />
          <meta name="theme-color" content="#000000" />
          <meta name="msapplication-TileColor" content="#000000" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" type="image/png" href="/favicon.png" />
        </head>
        <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
