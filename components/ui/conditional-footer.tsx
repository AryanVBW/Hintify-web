"use client"

import { usePathname } from 'next/navigation'
import { Footer } from './footer'

export function ConditionalFooter() {
  const pathname = usePathname()
  
  // Don't show footer on pages that have their own footer
  if (pathname === '/coming-soon' || pathname === '/') {
    return null
  }
  
  return <Footer />
}