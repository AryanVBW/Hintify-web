"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useAuth } from "@/components/auth/AuthProvider"
import { SignInButton } from "@/components/auth/SignInButton"
import { UserButton } from "@/components/auth/UserButton"

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const defaultTextColor = "text-gray-300"
  const hoverTextColor = "text-white"
  const textSizeClass = "text-sm"

  return (
    <a href={href} className={`group relative inline-block overflow-hidden h-5 flex items-center ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-400 ease-out transform group-hover:-translate-y-1/2">
        <span className={defaultTextColor}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </a>
  )
}

export function Navbar() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [headerShapeClass, setHeaderShapeClass] = useState("rounded-full")
  const shapeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (shapeTimeoutRef.current) {
      clearTimeout(shapeTimeoutRef.current)
    }

    if (isOpen) {
      setHeaderShapeClass("rounded-xl")
    } else {
      shapeTimeoutRef.current = setTimeout(() => {
        setHeaderShapeClass("rounded-full")
      }, 300)
    }

    return () => {
      if (shapeTimeoutRef.current) {
        clearTimeout(shapeTimeoutRef.current)
      }
    }
  }, [isOpen])

  const logoElement = (
    <div className="flex items-center gap-2">
      <Image src="/logo.png" alt="Hintify" width={32} height={32} className="w-8 h-8" />
      <span className="text-white font-semibold text-lg">Hintify</span>
    </div>
  )

  const navLinksData = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Examples", href: "#examples" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Report Issue", href: "/report-issue" },
  ]

  const authButtonsElement = (
    <>
      {!user ? (
        <>
          <SignInButton className="px-4 py-2 sm:px-3 text-xs sm:text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors duration-200 w-full sm:w-auto">
            Sign In
          </SignInButton>
          <div className="relative group w-full sm:w-auto">
            <div
              className="absolute inset-0 -m-2 rounded-full
                           hidden sm:block
                           bg-yellow-400
                           opacity-40 filter blur-lg pointer-events-none
                           transition-all duration-300 ease-out
                           group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3"
            ></div>
            <SignInButton className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-black bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 w-full sm:w-auto">
              Try Hintify
            </SignInButton>
          </div>
        </>
      ) : (
        <UserButton className="w-8 h-8" />
      )}
    </>
  )

  return (
    <header
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-20
                       flex flex-col items-center
                       pl-6 pr-6 py-3 backdrop-blur-md
                       ${headerShapeClass}
                       border border-white/20 bg-black/40
                       w-[calc(100%-2rem)] sm:w-auto
                       transition-[border-radius] duration-300 ease-in-out
                       shadow-lg shadow-black/20`}
    >
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <div className="flex items-center">{logoElement}</div>

        <nav className="hidden sm:flex items-center space-x-6 text-sm">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          {authButtonsElement}
        </div>

        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12M6 12h12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      <div
        className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? "max-h-[1000px] opacity-100 pt-4" : "max-h-0 opacity-0 pt-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col items-center space-y-4 text-base w-full">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors w-full text-center"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-4 w-full">
          <div className="flex flex-col items-center space-y-4 w-full">
            {authButtonsElement}
          </div>
        </div>
      </div>
    </header>
  )
}
