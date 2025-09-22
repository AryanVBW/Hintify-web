import { Navbar } from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicy() {
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
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: December 2024</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                <p className="mb-4">
                  Hintify collects information you provide when you use our hint-based AI assistant service, create an account, or contact us for support.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Account information (username, email address)</li>
                  <li>Questions and interactions with our AI assistant</li>
                  <li>Usage patterns and learning preferences</li>
                  <li>Device and browser information</li>
                  <li>Communication records when you contact support</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide personalized hints and guidance through our AI assistant</li>
                  <li>Improve our hint algorithms and learning effectiveness</li>
                  <li>Analyze usage patterns to enhance the user experience</li>
                  <li>Communicate service updates and educational content</li>
                  <li>Ensure platform security and prevent misuse</li>
                  <li>Comply with legal obligations and enforce our terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Data Security & Privacy</h2>
                <p className="mb-4">
                  We implement robust security measures to protect your personal information and learning data:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Access controls limiting data access to authorized personnel</li>
                  <li>Your conversations are used only to improve hint quality, not shared with third parties</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Your Rights & Choices</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access, update, or delete your personal information</li>
                  <li>Export your conversation history and learning data</li>
                  <li>Opt out of non-essential communications</li>
                  <li>Request clarification about how your data is used</li>
                  <li>Delete your account and associated data at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
                <p>
                  Hintify may integrate with third-party services for analytics and functionality. We ensure these partners maintain appropriate privacy standards and limit data sharing to what's necessary for service operation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or how we handle your data, please contact us at{" "}
                  <a href="mailto:vivek.aryanvbw@gmail.com" className="text-yellow-400 hover:text-yellow-300">
                    vivek.aryanvbw@gmail.com
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
