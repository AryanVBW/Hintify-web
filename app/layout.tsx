import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ConditionalFooter } from "@/components/ui/conditional-footer"
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
  authors: [
    { name: "Rishabh Bafna", url: "https://linkedin.com/in/rishabh-bafna-98402212a" },
    { name: "Vivek W", url: "https://linkedin.com/in/vivek-wagadare" }
  ],
  creator: "Rishabh Bafna & Vivek W",
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
    "author": [
      {
        "@type": "Person",
        "name": "Rishabh Bafna",
        "url": "https://linkedin.com/in/rishabh-bafna-98402212a"
      },
      {
        "@type": "Person", 
        "name": "Vivek W",
        "url": "https://linkedin.com/in/vivek-wagadare"
      }
    ],
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
    <AuthProvider>
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
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              <Suspense fallback={null}>{children}</Suspense>
            </main>
            <ConditionalFooter />
          </div>
          <Analytics />
        </body>
      </html>
    </AuthProvider>
  )
}
