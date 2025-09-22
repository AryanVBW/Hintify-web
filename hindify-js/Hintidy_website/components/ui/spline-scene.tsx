"use client"

import { Suspense, lazy, useEffect, useState, memo } from "react"
import { SplineLoader } from "../loading/SplineLoader"

// Simple lazy loading without TypeScript conflicts
const SplineComponent = lazy(() => import("@splinetool/react-spline"))

interface SplineSceneProps {
  scene: string
  className?: string
  priority?: boolean
}

export const SplineScene = memo(function SplineScene({ 
  scene, 
  className,
  priority = false 
}: SplineSceneProps) {
  const [shouldLoad, setShouldLoad] = useState(priority)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    )

    const element = document.getElementById(`spline-scene-${scene.split('/').pop()}`)
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [scene, priority])

  if (!shouldLoad) {
    return (
      <div 
        id={`spline-scene-${scene.split('/').pop()}`}
        className={`w-full h-full ${className}`}
      >
        <SplineLoader 
          className="w-full h-full" 
          size="lg"
        />
      </div>
    )
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense
        fallback={
          <SplineLoader 
            className="w-full h-full" 
            size="lg"
          />
        }
      >
        <SplineComponent scene={scene} className={className} />
      </Suspense>
    </div>
  )
})
