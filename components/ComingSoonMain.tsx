"use client"

import React, { useState, useEffect } from 'react'
import { LaserFlow } from "@/components/LaserFlow"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  Twitter, 
  Github, 
  Linkedin, 
  Clock, 
  Sparkles,
  ArrowRight,
  Bell,
  Zap,
  Brain,
  Target,
  MessageSquare
} from "lucide-react"

interface ComingSoonMainProps {
  launchDate?: Date
}

export default function ComingSoonMain({ 
  launchDate = new Date('2024-12-31T00:00:00') 
}: ComingSoonMainProps) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [launchDate])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      // Send email notification to your email
      console.log('Subscribed email:', email)
      // You can integrate with your backend or email service here
      // For now, you could use a service like EmailJS or Formspree
      // Example: emailjs.send('service_id', 'template_id', {
      //   user_email: email,
      //   to_email: 'vivek.aryanvbw@gmail.com'
      // })
    }
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Multi-layered LaserFlow Background */}
      <div className="absolute inset-0 z-0">
        {/* Primary laser flow */}
        <LaserFlow
          className="w-full h-full absolute"
          color="#FF79C6"
          wispDensity={1.5}
          flowSpeed={0.3}
          fogIntensity={0.8}
          verticalSizing={3}
          horizontalSizing={1}
          wispSpeed={15}
          wispIntensity={8}
          flowStrength={0.4}
          verticalBeamOffset={0.1}
          horizontalBeamOffset={0.2}
        />
        
        {/* Secondary laser flow for depth */}
        <LaserFlow
          className="w-full h-full absolute opacity-60"
          color="#8B5CF6"
          wispDensity={0.8}
          flowSpeed={0.5}
          fogIntensity={0.4}
          verticalSizing={2}
          horizontalSizing={0.6}
          wispSpeed={8}
          wispIntensity={4}
          flowStrength={0.2}
          verticalBeamOffset={-0.1}
          horizontalBeamOffset={-0.1}
        />
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 z-5 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Header Badge */}
          <div className="mb-8 animate-pulse">
            <Badge variant="outline" className="mb-6 px-6 py-3 text-lg text-pink-300 border-pink-400/40 bg-black/30 backdrop-blur-lg shadow-2xl">
              <Sparkles className="w-5 h-5 mr-3 animate-spin" />
              Something Amazing is Coming
            </Badge>
          </div>

          {/* Main Brand */}
          <div className="mb-12">
            <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-white via-pink-200 to-pink-400 bg-clip-text text-transparent mb-6 tracking-tight">
              Hintify
            </h1>
            <h2 className="text-2xl md:text-4xl font-medium text-gray-200 mb-4">
              Get Hints, Not Answers
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing the way you learn. Our AI-powered platform provides intelligent hints that guide your thinking process, helping you solve problems independently while building deep understanding.
            </p>
          </div>

          {/* Countdown Section */}
          <Card className="bg-black/40 backdrop-blur-xl border-pink-500/30 mb-12 max-w-3xl mx-auto shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-pink-400 mr-3 animate-pulse" />
                <h3 className="text-2xl font-bold text-white">Launch Countdown</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-xl p-6 border border-pink-500/40 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm md:text-base text-gray-300 capitalize font-medium">
                        {unit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features Preview Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <Card className="bg-black/30 backdrop-blur-lg border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-xl flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
                  <Brain className="w-8 h-8 text-pink-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">AI-Powered Intelligence</h4>
                <p className="text-gray-300 leading-relaxed">
                  Advanced AI algorithms that understand your learning style and provide personalized hints
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-lg border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-xl flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
                  <Target className="w-8 h-8 text-pink-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Progressive Learning</h4>
                <p className="text-gray-300 leading-relaxed">
                  Step-by-step guidance that builds your problem-solving skills organically
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-lg border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500/30 to-purple-600/30 rounded-xl flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
                  <MessageSquare className="w-8 h-8 text-pink-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Interactive Experience</h4>
                <p className="text-gray-300 leading-relaxed">
                  Engaging conversations that make learning feel like discovery, not instruction
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Email Subscription */}
          <Card className="bg-black/40 backdrop-blur-xl border-pink-500/30 mb-10 max-w-lg mx-auto shadow-2xl">
            <CardContent className="p-8">
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-6">
                  <div className="flex items-center justify-center mb-4">
                    <Bell className="w-6 h-6 text-pink-400 mr-3 animate-bounce" />
                    <h3 className="text-xl font-bold text-white">Join the Waitlist</h3>
                  </div>
                  <p className="text-gray-300 text-center mb-6">
                    Be among the first to experience the future of learning. Get exclusive early access and updates!
                  </p>
                  <div className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black/60 border-pink-500/40 text-white placeholder-gray-400 focus:border-pink-400 focus:ring-pink-400/20 h-12 text-lg"
                      required
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white h-12 text-lg font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Get Early Access
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Welcome to the Future!</h3>
                  <p className="text-gray-300">
                    You're all set! We'll notify you the moment Hintify launches.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant="outline"
              size="lg"
              className="bg-black/40 border-pink-500/40 hover:bg-pink-500/20 text-pink-300 hover:text-white transition-all duration-300"
              onClick={() => window.open('https://www.linkedin.com/in/vivek-wagadare/', '_blank')}
            >
              <Twitter className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-black/40 border-pink-500/40 hover:bg-pink-500/20 text-pink-300 hover:text-white transition-all duration-300"
              onClick={() => window.open('https://github.com/AryanVBW', '_blank')}
            >
              <Github className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-black/40 border-pink-500/40 hover:bg-pink-500/20 text-pink-300 hover:text-white transition-all duration-300"
              onClick={() => window.open('https://www.linkedin.com/in/vivek-wagadare/', '_blank')}
            >
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-black/40 border-pink-500/40 hover:bg-pink-500/20 text-pink-300 hover:text-white transition-all duration-300"
              onClick={() => window.open('mailto:vivek.aryanvbw@gmail.com', '_blank')}
            >
              <Mail className="w-5 h-5" />
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Hintify. Crafting the future of intelligent learning. | All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Created by <a href="https://github.com/AryanVBW" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition-colors">Vivek Wagadare</a> | 
              Contact: <a href="mailto:vivek.aryanvbw@gmail.com" className="text-pink-400 hover:text-pink-300 transition-colors"> vivek.aryanvbw@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}