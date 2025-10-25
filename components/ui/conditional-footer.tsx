"use client"

import { usePathname } from 'next/navigation'
import { Footer } from './footer'

export function ConditionalFooter() {
  const pathname = usePathname()

  // Don't show footer on pages that have their own footer or authentication pages
  if (pathname === '/coming-soon' || pathname === '/' || pathname === '/sign-in' || pathname === '/sign-up') {
    return null
  }

  return <Footer />
}