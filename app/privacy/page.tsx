import { Metadata } from "next"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy - Hintify",
  description: "Learn how Hintify protects your privacy and handles your data.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          Privacy Policy
        </h1>
        
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">Last Updated: October 25, 2025</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Welcome to Hintify. We respect your privacy and are committed to protecting your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:vivek.aryanvbw@gmail.com" className="text-blue-400 hover:text-blue-300 underline">
                  vivek.aryanvbw@gmail.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
