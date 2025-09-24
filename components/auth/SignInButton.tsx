'use client'

import React, { useState } from 'react'
import { signInWithGoogle } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

interface SignInButtonProps {
  className?: string
  children?: React.ReactNode
}

export const SignInButton: React.FC<SignInButtonProps> = ({ 
  className = '', 
  children = 'Sign In' 
}) => {
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setLoading(true)
      await signInWithGoogle()
    } catch (error) {
      console.error('Sign in error:', error)
      // You might want to show a toast or error message here
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSignIn}
      disabled={loading}
      className={className}
    >
      {loading ? 'Signing in...' : children}
    </Button>
  )
}

export default SignInButton
