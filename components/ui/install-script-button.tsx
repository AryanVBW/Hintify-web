'use client'

import { useState } from 'react'
import { Button } from './button'
import { Terminal, Copy, Check } from 'lucide-react'

export function InstallScriptButton() {
  const [showPopup, setShowPopup] = useState(false)
  const [copied, setCopied] = useState(false)

  const installScript = `curl -fsSL https://raw.githubusercontent.com/AryanVBW/Hintify/main/install.sh | bash`

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(installScript)
      setCopied(true)
      setShowPopup(true)
      
      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false)
        setCopied(false)
      }, 3000)
    } catch (err) {
      console.error('Failed to copy script:', err)
    }
  }

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 bg-transparent flex items-center gap-2"
        onClick={handleCopyScript}
      >
        <Terminal className="h-4 w-4" />
        Copy Install Script
      </Button>

      {/* Glass Morphism Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="glass-popup animate-popup-in">
            <div className="flex items-center gap-3 mb-3">
              {copied ? (
                <Check className="h-5 w-5 text-green-400" />
              ) : (
                <Copy className="h-5 w-5 text-blue-400" />
              )}
              <span className="text-white font-semibold">
                {copied ? 'Script Copied!' : 'Copying...'}
              </span>
            </div>
            <p className="text-gray-300 text-sm text-center">
              Paste this script in terminal to install the app
            </p>
            <div className="mt-3 p-2 bg-black/30 rounded-md border border-white/10">
              <code className="text-xs text-gray-300 font-mono break-all">
                {installScript}
              </code>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .glass-popup {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          max-width: 400px;
          margin: 0 20px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        @keyframes popup-in {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-popup-in {
          animation: popup-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  )
}
