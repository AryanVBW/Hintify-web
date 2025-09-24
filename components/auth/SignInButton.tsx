'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface SignInButtonProps {
  className?: string
  children?: React.ReactNode
}

export const SignInButton: React.FC<SignInButtonProps> = ({
  className = '',
  children = 'Sign In'
}) => {
  const router = useRouter()

  const handleSignIn = () => {
    // Redirect to the dedicated sign-in page
    router.push('/sign-in')
  }

  return (
    <Button
      onClick={handleSignIn}
      className={className}
    >
      {children}
    </Button>
  )
}

export default SignInButton
