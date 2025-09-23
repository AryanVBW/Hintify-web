"use client"

import React from 'react'
import { LaserFlow } from "@/components/LaserFlow"
import { Button } from "@/components/ui/button"
import { 
  Mail, 
  X
} from "lucide-react"

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* LaserFlow Background - flows from top and stops above COMING SOON */}
      <div className="absolute inset-0 z-0">
        <LaserFlow
          className="w-full h-full"
          color="#FF79C6"
          wispDensity={2.0}
          flowSpeed={0.25}
          fogIntensity={1.2}
          verticalSizing={4.0}
          horizontalSizing={0.8}
          wispSpeed={12}
          wispIntensity={10}
          flowStrength={0.6}
          verticalBeamOffset={-0.1}
          horizontalBeamOffset={0}
        />
      </div>

      {/* Gradient mask to make laser stop above content */}
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-transparent via-transparent to-black" 
           style={{
             background: `linear-gradient(to bottom, 
               transparent 0%, 
               transparent 40%,
               rgba(0,0,0,0.1) 50%,
               rgba(0,0,0,0.3) 60%, 
               rgba(0,0,0,0.6) 70%,
               rgba(0,0,0,0.8) 80%,
               black 90%)`
           }} />

      {/* Content positioned to show laser falling on text */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Top spacing to let laser show */}
        <div className="flex-1" />
        
        {/* Coming Soon Text positioned in lower portion */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Brand and Tagline - enhanced with matching colors */}
            <div className="mb-12">
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #FF79C6 40%, #f8fafc 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 0 15px rgba(255, 121, 198, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2)',
                  filter: 'drop-shadow(0 0 10px rgba(255, 121, 198, 0.15))'
                }}
              >
                Hintify
              </h1>
              <p 
                className="text-xl md:text-2xl mb-4 font-medium"
                style={{
                  background: 'linear-gradient(90deg, #e5e7eb 0%, #FF79C6 50%, #e5e7eb 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 0 15px rgba(255, 121, 198, 0.2)',
                  backgroundSize: '200% 100%',
                  animation: 'tagline-shine 3s ease-in-out infinite'
                }}
              >
                Get Hints, Not Answers
              </p>
              <p 
                className="text-lg md:text-xl max-w-2xl mx-auto"
                style={{
                  color: '#d1d5db',
                  textShadow: '0 0 10px rgba(255, 121, 198, 0.1)',
                  opacity: 0.9
                }}
              >
                Think smarter, not harder.
              </p>
            </div>
            
            {/* CSS Animations for tagline effects */}
            <style>{`
              @keyframes tagline-shine {
                0% { background-position: -200% center; }
                50% { background-position: 200% center; }
                100% { background-position: -200% center; }
              }
            `}</style>

            {/* Coming Soon with subtle gloss effect - moved down */}
            <div className="mb-8 mt-8">
              <h2 
                className="text-5xl md:text-6xl lg:text-8xl font-black tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #e5e7eb 30%, #ffffff 60%, #f3f4f6 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)',
                  filter: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.8))',
                  position: 'relative'
                }}
              >
                COMING SOON
              </h2>
            </div>
          </div>
        </div>

        {/* Bottom section with social links */}
        <div className="flex-shrink-0 pb-8">
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              className="bg-black/30 border-pink-500/30 hover:bg-pink-500/20 text-pink-400 backdrop-blur-sm"
              onClick={() => window.open('https://www.linkedin.com/in/vivek-wagadare/', '_blank')}
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-black/30 border-pink-500/30 hover:bg-pink-500/20 text-pink-400 backdrop-blur-sm"
              onClick={() => window.open('https://github.com/AryanVBW', '_blank')}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-black/30 border-pink-500/30 hover:bg-pink-500/20 text-pink-400 backdrop-blur-sm"
              onClick={() => window.open('https://www.linkedin.com/in/vivek-wagadare/', '_blank')}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-black/30 border-pink-500/30 hover:bg-pink-500/20 text-pink-400 backdrop-blur-sm"
              onClick={() => window.open('mailto:vivek.aryanvbw@gmail.com', '_blank')}
            >
              <Mail className="w-4 h-4" />
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2024 Hintify. All rights reserved. | Building the future of AI-assisted learning.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Created by <a href="https://github.com/AryanVBW" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">Vivek Wagadare</a> | Contact: <a href="mailto:vivek.aryanvbw@gmail.com" className="text-pink-400 hover:text-pink-300">vivek.aryanvbw@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}