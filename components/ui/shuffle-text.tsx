"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface ShuffleTextProps {
  text: string
  className?: string
  duration?: number
  characters?: string
  trigger?: "hover" | "load" | "both" | "manual"
  onComplete?: () => void
}

export function ShuffleText({
  text,
  className = "",
  duration = 1.5,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
  trigger = "both",
  onComplete,
}: ShuffleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const shuffle = () => {
    if (isAnimating) return

    setIsAnimating(true)
    
    // Kill any existing animation
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false)
        onComplete?.()
      }
    })

    timelineRef.current = timeline

    const chars = text.split("")
    const shuffleSteps = Math.min(10, chars.length)
    const stepDuration = duration / shuffleSteps

    // Create shuffle animation
    for (let step = 0; step <= shuffleSteps; step++) {
      timeline.to({}, {
        duration: stepDuration,
        ease: "none",
        onUpdate: () => {
          const progress = step / shuffleSteps
          const revealCount = Math.floor(progress * chars.length)
          
          const shuffledText = chars
            .map((char, index) => {
              if (index < revealCount) {
                return char
              }
              // Don't shuffle spaces and punctuation for better readability
              if (char === " " || /[.,!?;:]/.test(char)) {
                return char
              }
              return characters[Math.floor(Math.random() * characters.length)]
            })
            .join("")
            
          setDisplayText(shuffledText)
        }
      })
    }

    // Final step to ensure exact text
    timeline.set({}, {
      onComplete: () => {
        setDisplayText(text)
      }
    })
  }

  useEffect(() => {
    if (trigger === "load" || trigger === "both") {
      const timer = setTimeout(() => {
        shuffle()
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [text, trigger])

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (trigger === "hover" || trigger === "both") {
      shuffle()
    }
  }

  const handleClick = () => {
    if (trigger === "manual" || trigger === "both") {
      shuffle()
    }
  }

  return (
    <span 
      ref={textRef}
      className={`${isAnimating ? 'cursor-wait' : 'cursor-pointer'} ${className}`} 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  )
}
