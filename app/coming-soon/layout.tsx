import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Coming Soon - Hintify | AI-Powered Learning Assistant",
  description: "Something amazing is coming! Hintify is building the future of AI-assisted learning. Get hints, not answers. Join our waitlist for exclusive early access.",
  openGraph: {
    title: "Coming Soon - Hintify",
    description: "The future of AI-assisted learning is almost here. Join our waitlist for exclusive early access!",
    images: ['/og-image.png'],
  },
}

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}