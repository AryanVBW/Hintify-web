import React from 'react'
import { Github, Linkedin } from 'lucide-react'

interface FooterProps {
  className?: string
  variant?: 'default' | 'minimal' | 'coming-soon'
}

export function Footer({ className = '', variant = 'default' }: FooterProps) {
  const baseClasses = "w-full py-6 px-4"
  const variantClasses = {
    default: "bg-gray-50 border-t border-gray-200 text-gray-700",
    minimal: "bg-transparent text-gray-600",
    'coming-soon': "bg-transparent text-gray-400"
  }

  return (
    <footer className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium">
            © 2024 Hintify. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span>Founded by:</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Rishabh Bafna</span>
                  <div className="flex gap-1">
                    <a
                      href="https://linkedin.com/in/rishabh-bafna-98402212a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1 rounded hover:bg-opacity-20 transition-colors ${
                        variant === 'coming-soon' 
                          ? 'text-pink-400 hover:bg-pink-500' 
                          : 'text-blue-600 hover:bg-blue-500'
                      }`}
                      title="Rishabh Bafna LinkedIn"
                    >
                      <Linkedin className="w-3 h-3" />
                    </a>
                    <a
                      href="https://github.com/RishabhIIITD"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1 rounded hover:bg-opacity-20 transition-colors ${
                        variant === 'coming-soon' 
                          ? 'text-pink-400 hover:bg-pink-500' 
                          : 'text-gray-700 hover:bg-gray-500'
                      }`}
                      title="Rishabh Bafna GitHub"
                    >
                      <Github className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Vivek W</span>
                  <div className="flex gap-1">
                    <a
                      href="https://linkedin.com/in/vivek-wagadare"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1 rounded hover:bg-opacity-20 transition-colors ${
                        variant === 'coming-soon' 
                          ? 'text-pink-400 hover:bg-pink-500' 
                          : 'text-blue-600 hover:bg-blue-500'
                      }`}
                      title="Vivek W LinkedIn"
                    >
                      <Linkedin className="w-3 h-3" />
                    </a>
                    <a
                      href="https://github.com/AryanVBW"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1 rounded hover:bg-opacity-20 transition-colors ${
                        variant === 'coming-soon' 
                          ? 'text-pink-400 hover:bg-pink-500' 
                          : 'text-gray-700 hover:bg-gray-500'
                      }`}
                      title="Vivek W GitHub"
                    >
                      <Github className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}