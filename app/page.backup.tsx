// Uncomment the import below and comment out the current page content 
// if you want to make your entire site show as "Coming Soon"

// import ComingSoonMain from "@/components/ComingSoonMain"

// export default function HomePage() {
//   return <ComingSoonMain launchDate={new Date('2024-12-31T00:00:00')} />
// }

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spotlight } from "@/components/ui/spotlight"
import { SplineScene } from "@/components/ui/spline-scene"
import { LazyAnimatedGradient, LazySparkles } from "@/components/ui/lazy-animations"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import { Navbar } from "@/components/ui/navbar"
import { DownloadButton } from "@/components/ui/download-button"
import {
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Brain,
  Target,
  Zap,
  MessageSquare,
  BookOpen,
  Github,
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

                <p className="text-lg text-neutral-300 mt-4 max-w-md">
                  Think smarter, not harder. Don't just get answers, level up your brain. Learning has never been this engaging.
                </p>

                <div className="flex gap-4 mt-6">
                  <DownloadButton />
                  <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Button>
                </div>
              </div>

              {/* Right side - 3D Scene */}
              <div className="flex-1 relative">
                <SplineScene
                  scene="https://prod.spline.design/6aUTEKqzhI9sGE0y/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Hintify?
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              We believe in empowering your mind, not replacing it. Get the perfect nudge to solve problems yourself.
            </p>
          </div>

          <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
            <BentoCard
              name="Smart Hints"
              className="md:col-span-2"
              background={<LazyAnimatedGradient />}
              Icon={Lightbulb}
              description="Get intelligent hints that guide your thinking without giving away the answer."
              href="/"
              cta="Learn more"
            />
            <BentoCard
              name="Progressive Learning"
              className="md:col-span-1"
              background={<LazySparkles />}
              Icon={Brain}
              description="Build understanding step by step with our adaptive hint system."
              href="/"
              cta="Learn more"
            />
            <BentoCard
              name="Problem Solving"
              className="md:col-span-1"
              background={<LazyAnimatedGradient />}
              Icon={Target}
              description="Develop critical thinking skills that last beyond any single problem."
              href="/"
              cta="Learn more"
            />
            <BentoCard
              name="Interactive Experience"
              className="md:col-span-2"
              background={<LazySparkles />}
              Icon={MessageSquare}
              description="Engage in natural conversations that make learning feel like discovery."
              href="/"
              cta="Learn more"
            />
          </BentoGrid>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-neutral-300">
              Three simple steps to smarter learning
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ask Your Question</h3>
              <p className="text-neutral-300">
                Submit any problem or question you're working on
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Get Smart Hints</h3>
              <p className="text-neutral-300">
                Receive tailored hints that guide your thinking process
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Solve & Learn</h3>
              <p className="text-neutral-300">
                Discover the solution yourself and build lasting understanding
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Students Say
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="bg-neutral-900 border-neutral-800">
              <CardContent className="p-6">
                <p className="text-neutral-300 mb-4">
                  "Hintify helped me understand calculus concepts I was struggling with for weeks. The hints were perfect - just enough to point me in the right direction."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-white font-semibold">Sarah Chen</p>
                    <p className="text-neutral-400 text-sm">Computer Science Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900 border-neutral-800">
              <CardContent className="p-6">
                <p className="text-neutral-300 mb-4">
                  "Finally, an AI that doesn't just give me answers! Hintify made me think through problems and actually learn. My problem-solving skills have improved dramatically."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-white font-semibold">Marcus Johnson</p>
                    <p className="text-neutral-400 text-sm">Physics Major</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Think Smarter?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already learning more effectively with Hintify
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DownloadButton />
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
              <BookOpen className="mr-2 h-4 w-4" />
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">Hintify</h3>
              <p className="text-neutral-400">
                Think smarter, not harder. Get hints, not answers.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white">How it Works</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
            <p className="text-neutral-400">
              © 2024 Hintify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}