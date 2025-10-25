'use client'

import React, { createContext, useContext } from 'react'
import { useUser, useClerk } from '@clerk/nextjs'

interface AuthContextType {
  user: any | null
  session: any | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {}
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isLoaded } = useUser()
  const { signOut: clerkSignOut } = useClerk()

  const handleSignOut = async () => {
    try {
      await clerkSignOut()
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  const value: AuthContextType = {
    user: user ? {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress || null,
      user_metadata: {
        full_name: user.fullName,
        name: user.fullName,
        given_name: user.firstName,
        family_name: user.lastName,
        avatar_url: user.imageUrl,
        picture: user.imageUrl
      }
    } : null,
    session: user ? { user } : null,
    loading: !isLoaded,
    signOut: handleSignOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
