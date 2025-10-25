/**
 * Clerk Authentication Configuration
 * 
 * This file provides helper functions for Clerk authentication.
 * Clerk handles OAuth, session management, and JWT tokens automatically.
 */

import { auth, currentUser } from '@clerk/nextjs/server'

/**
 * Get the current authenticated user (server-side)
 * Use this in Server Components and API Routes
 */
export async function getCurrentUser() {
  try {
    const user = await currentUser()
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Get the current session (server-side)
 * Use this in Server Components and API Routes
 */
export async function getCurrentSession() {
  try {
    const { userId, sessionId, getToken } = await auth()
    
    if (!userId || !sessionId) {
      return null
    }

    return {
      userId,
      sessionId,
      getToken
    }
  } catch (error) {
    console.error('Error getting current session:', error)
    return null
  }
}

/**
 * Get the session token (JWT) for API calls
 * Use this when you need to pass authentication to external services
 */
export async function getSessionToken() {
  try {
    const { getToken } = await auth()
    const token = await getToken()
    return token
  } catch (error) {
    console.error('Error getting session token:', error)
    return null
  }
}

/**
 * Check if user is authenticated (server-side)
 */
export async function isAuthenticated() {
  try {
    const { userId } = await auth()
    return !!userId
  } catch (error) {
    console.error('Error checking authentication:', error)
    return false
  }
}

