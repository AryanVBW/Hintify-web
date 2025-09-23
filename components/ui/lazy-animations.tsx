"use client"

import { memo, lazy, Suspense } from "react"

const AnimatedGradientLazy = lazy(() => import("./animated-gradient-background"))
const SparklesCoreLazy = lazy(() => import("./sparkles").then(m => ({ default: m.SparklesCore })))

export const LazyAnimatedGradient = memo(function LazyAnimatedGradient(props: any) {
  return (
    <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />}>
      <AnimatedGradientLazy {...props} />
    </Suspense>
  )
})

export const LazySparkles = memo(function LazySparkles(props: any) {
  return (
    <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
      <SparklesCoreLazy {...props} />
    </Suspense>
  )
})