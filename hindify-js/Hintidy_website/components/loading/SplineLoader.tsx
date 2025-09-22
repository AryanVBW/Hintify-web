"use client"

import { memo } from "react"

interface SplineLoaderProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

const SplineLoader = memo(function SplineLoader({ 
  className = "", 
  size = "md" 
}: SplineLoaderProps) {
  const sizeClasses = {
    sm: "h-32 w-32",
    md: "h-48 w-48", 
    lg: "h-64 w-64"
  }

  return (
    <div className={`flex items-center justify-center bg-black/5 rounded-lg ${className}`}>
      <div className="relative">
        {/* Animated 3D-like loader */}
        <div className={`${sizeClasses[size]} relative`}>
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-yellow-400/20 animate-spin"></div>
          
          {/* Middle ring */}
          <div className="absolute inset-4 rounded-full border-2 border-yellow-400/40 animate-spin-slow"></div>
          
          {/* Inner ring */}
          <div className="absolute inset-8 rounded-full border-2 border-yellow-400/60 animate-pulse"></div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 bg-yellow-400 rounded-full animate-bounce"></div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="mt-4 text-center">
          <p className="text-sm text-yellow-400/80 animate-pulse">Loading 3D Scene...</p>
          <div className="flex justify-center mt-2 space-x-1">
            <div className="h-1 w-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="h-1 w-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="h-1 w-1 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
})

SplineLoader.displayName = "SplineLoader"

export { SplineLoader }