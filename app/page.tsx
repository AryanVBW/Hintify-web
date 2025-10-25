import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spotlight } from "@/components/ui/spotlight"
import { SplineScene } from "@/components/ui/spline-scene"
import { LazyAnimatedGradient, LazySparkles } from "@/components/ui/lazy-animations"
import HintifyMagicBento from "@/components/HintifyMagicBento"
import { Navbar } from "@/components/ui/navbar"
import { DownloadButton } from "@/components/ui/download-button"
import { InstallScriptButton } from "@/components/ui/install-script-button"
import { OpenInAppPopup } from "@/components/OpenInAppPopup"
import Link from "next/link"
import {
  CheckCircle,
  ArrowRight,
  BookOpen,
  Github,
  Brain,
  Target,
  Zap,
} from "lucide-react"
import { Metadata } from "next"

// SEO metadata for the home page
export const metadata: Metadata = {
  title: "Hintify - Get Hints, Not Answers | AI-Powered Learning Assistant",
  description: "Think smarter, not harder. Hintify gives you just the right nudge to solve problems yourself. Our AI provides progressive hints that guide your thinking without giving away answers.",
  openGraph: {
    title: "Hintify - Get Hints, Not Answers",
    description: "AI-powered learning assistant that guides your thinking with progressive hints. Think smarter, not harder.",
    images: ['/og-image.png'],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Component */}
      <Navbar />

      {/* Open in App Popup - shows when user signs in from app */}
      <OpenInAppPopup />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="container mx-auto px-4">
          <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-none">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

            <div className="flex h-full">
              {/* Left content */}
              <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-balance">
                  <span className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
                    You're not a robot like me, don't turn into a machine
                  </span>
                </h1>
                <p className="mt-4 text-neutral-300 max-w-lg">
                  Start thinking, don't let your mind go on mute. Hintify won't hand you answers; it drops clever clues
                  that spark wild connections, guiding you to discover solutions and keep your mind sharp, alive, and
                  unstoppable.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <DownloadButton />
                  <InstallScriptButton />
                </div>

                <div className="flex items-center gap-8 text-sm text-neutral-400 mt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400" />
                    <span>No Direct Answers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400" />
                    <span>Think For Yourself</span>
                  </div>
                </div>
              </div>

              {/* Right content */}
              <div className="flex-1 relative">
                <SplineScene
                  scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Tired of Being Spoon-Fed Answers?</h2>
              <div className="space-y-4 text-gray-300">
                <p className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  Getting instant answers that you forget immediately
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  Becoming dependent on AI for every little problem
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  Losing your ability to think critically and solve problems
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  Missing the satisfaction of figuring things out yourself
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Hintify Helps You Think</h3>
              <div className="space-y-4 text-gray-300">
                <p className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  Gentle nudges that point you in the right direction
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  Progressive hints that build your understanding step by step
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  Encourages deep thinking and genuine learning
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  The joy of "aha!" moments when you solve it yourself
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">How Hintify Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Smart hints designed to spark your thinking, not replace it
            </p>
          </div>

          <HintifyMagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            disableAnimations={false}
            spotlightRadius={300}
            particleCount={12}
            enableTilt={false}
            glowColor="132, 0, 255"
            clickEffect={true}
            enableMagnetism={true}
          />
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">See Hintify in Action</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-black/80 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex text-yellow-400">{"💡".repeat(3)}</div>
                  <p className="text-gray-300">
                    <strong>Question:</strong> "How do I fix this JavaScript error?"
                    <br />
                    <strong>Hintify:</strong> "What do you think happens when you try to access a property on something
                    that might be undefined? Have you checked what your variable contains at that point?"
                  </p>
                  <div>
                    <p className="font-semibold text-white">Programming Problem</p>
                    <p className="text-sm text-gray-400">Debugging guidance without giving away the solution</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex text-yellow-400">{"💡".repeat(3)}</div>
                  <p className="text-gray-300">
                    <strong>Question:</strong> "I can't solve this math problem."
                    <br />
                    <strong>Hintify:</strong> "What's the first step you usually take with equations like this? What if
                    you tried isolating one variable first? Which side looks simpler to work with?"
                  </p>
                  <div>
                    <p className="font-semibold text-white">Math Homework</p>
                    <p className="text-sm text-gray-400">Step-by-step thinking guidance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/80 backdrop-blur-sm border-white/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex text-yellow-400">{"💡".repeat(3)}</div>
                  <p className="text-gray-300">
                    <strong>Question:</strong> "How should I approach this work conflict?"
                    <br />
                    <strong>Hintify:</strong> "What do you think the other person's perspective might be? Have you
                    considered what outcome would be best for everyone involved? What's one small step you could take to
                    open dialogue?"
                  </p>
                  <div>
                    <p className="font-semibold text-white">Life Decision</p>
                    <p className="text-sm text-gray-400">Thoughtful guidance for personal challenges</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Thinking Over Answers?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real growth happens when you solve problems yourself
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-yellow-900/40 rounded-full flex items-center justify-center mx-auto">
                <Brain className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Stronger</h3>
              <p className="text-gray-300">Critical Thinking Skills</p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-green-900/40 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Better</h3>
              <p className="text-gray-300">Problem-Solving Confidence</p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-blue-900/40 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Deeper</h3>
              <p className="text-gray-300">Understanding & Learning</p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-purple-900/40 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">More</h3>
              <p className="text-gray-300">Satisfying "Aha!" Moments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Simple 3-Step Process</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From question to insight, we guide your thinking journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-6">
              <div className="h-20 w-20 bg-yellow-400 text-black rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-white">Ask Your Question</h3>
              <p className="text-gray-300">
                Share your problem or challenge with Hintify. Be as specific as you'd like - we'll meet you where you
                are.
              </p>
            </div>

            <div className="text-center space-y-6">
              <div className="h-20 w-20 bg-yellow-400 text-black rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-white">Get Thoughtful Hints</h3>
              <p className="text-gray-300">
                Receive carefully crafted hints that guide your thinking without giving away the answer. Ask for more if
                needed.
              </p>
            </div>

            <div className="text-center space-y-6">
              <div className="h-20 w-20 bg-yellow-400 text-black rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-white">Discover the Solution</h3>
              <p className="text-gray-300">
                Experience the satisfaction of solving the problem yourself, with newfound understanding and confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <LazyAnimatedGradient
          Breathing={true}
          gradientColors={["#0A0A0A", "#FFC107", "#FF9800", "#FF5722", "#E91E63", "#9C27B0", "#3F51B5"]}
          gradientStops={[35, 50, 60, 70, 80, 90, 100]}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="relative h-32 w-full flex flex-col items-center justify-center">
              <div className="w-full absolute inset-0">
                <LazySparkles
                  id="ctasparticles"
                  background="transparent"
                  minSize={0.6}
                  maxSize={1.4}
                  particleDensity={100}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                  speed={0.8}
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 relative z-20 text-balance">
                Ready to think for yourself?
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <DownloadButton />
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                See More Examples
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative py-20 bg-black border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/90" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Hintify</h3>
                <p className="text-gray-300 leading-relaxed">
                  Empowering minds to think critically and solve problems independently through thoughtful guidance and
                  hints.
                </p>
              </div>

              <div className="flex space-x-4">
                <a
                  href="https://github.com/AryanVBW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Features</h4>
              <ul className="space-y-3">
                {[
                  "Progressive Hints",
                  "Think-First Approach",
                  "Contextual Guidance",
                  "Learning Reinforcement",
                  "Human-Like Conversation",
                ].map((feature) => (
                  <li key={feature}>
                    <a
                      href="#how-it-works"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {feature}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 mt-16 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-center lg:text-left">
                <p className="text-gray-400">© 2024 Hintify. All rights reserved.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 mt-2 text-xs text-gray-500">
                  <span>Founded by:</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Rishabh Bafna</span>
                      <div className="flex gap-1">
                        <a
                          href="https://linkedin.com/in/rishabh-bafna-98402212a"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded text-blue-400 hover:text-blue-300 transition-colors"
                          title="Rishabh Bafna LinkedIn"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                        <a
                          href="https://github.com/RishabhIIITD"
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1 rounded text-gray-400 hover:text-gray-300 transition-colors"
                          title="Rishabh Bafna GitHub"
                        >
                          <Github className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                    <span className="text-gray-600">•</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Vivek W</span>
                      <div className="flex gap-1">
                        <a
                          href="https://linkedin.com/in/vivek-wagadare"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded text-blue-400 hover:text-blue-300 transition-colors"
                          title="Vivek W LinkedIn"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                        <a
                          href="https://github.com/AryanVBW"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded text-gray-400 hover:text-gray-300 transition-colors"
                          title="Vivek W GitHub"
                        >
                          <Github className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-end space-x-8">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
