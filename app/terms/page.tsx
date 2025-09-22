import { Navbar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/10 mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-400">Last updated: December 2024</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
                <p>
                  By accessing and using Hintify's AI assistant service, you accept and agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Service Description</h2>
                <p className="mb-4">
                  Hintify provides an AI-powered assistant that offers hints and guidance rather than direct answers, designed to encourage critical thinking and learning. Our services include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Progressive hint system for problem-solving guidance</li>
                  <li>Contextual clues and thought-provoking questions</li>
                  <li>Learning reinforcement through guided discovery</li>
                  <li>Personalized hint delivery based on your learning style</li>
                  <li>Educational support across various subjects and skills</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">User Responsibilities</h2>
                <p className="mb-4">When using Hintify, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the service for legitimate learning and problem-solving purposes</li>
                  <li>Provide accurate information when requesting hints</li>
                  <li>Respect the intellectual property rights of others</li>
                  <li>Not attempt to reverse-engineer or exploit our AI algorithms</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Not use the service to cheat on exams or assignments</li>
                  <li>Report any technical issues or inappropriate content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Service Limitations</h2>
                <p className="mb-4">Please understand that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hintify provides guidance, not guaranteed solutions</li>
                  <li>Our AI may not have perfect knowledge in all domains</li>
                  <li>Hints are designed to guide learning, not replace education</li>
                  <li>Service availability may be subject to maintenance and updates</li>
                  <li>We reserve the right to modify features and functionality</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                <p>
                  All content, algorithms, and intellectual property within Hintify remain our exclusive property. Users retain ownership of their questions and learning data, while granting us permission to use this data to improve our service quality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                <p>
                  Hintify is provided "as is" without warranties. Our liability for any claims arising from service use shall not exceed the amount paid for our services. We are not responsible for learning outcomes or decisions made based on our hints.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
                <p>
                  Either party may terminate this agreement at any time. Upon termination, your access to Hintify will cease, though these terms will continue to apply to past usage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                <p>
                  For questions about these Terms of Service, contact us at{" "}
                  <a href="mailto:legal@hintify.com" className="text-yellow-400 hover:text-yellow-300">
                    legal@hintify.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
