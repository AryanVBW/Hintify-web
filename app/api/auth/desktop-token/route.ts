/**
 * Desktop Authentication Token API
 *
 * This API endpoint provides a method for desktop apps to obtain
 * authentication tokens through a server-side exchange mechanism.
 *
 * SECURITY CONSIDERATIONS:
 * =======================
 *
 * 1. Server-Side Token Generation:
 *    - Tokens are generated server-side, never exposed in client code
 *    - Clerk secret key is kept secure on the server
 *    - Reduces attack surface compared to client-side token handling
 *
 * 2. Session Validation:
 *    - Validates that the user has an active Clerk session
 *    - Checks session expiration and validity
 *    - Ensures only authenticated users can obtain tokens
 *
 * 3. Rate Limiting (Recommended):
 *    - Implement rate limiting to prevent abuse
 *    - Limit requests per IP address or user
 *    - Use services like Upstash Redis or Vercel Edge Config
 *
 * 4. CORS Configuration:
 *    - Restrict CORS to only allow requests from your domain
 *    - Prevents unauthorized cross-origin requests
 *    - Desktop app should use the browser-based flow instead
 *
 * TOKEN LIFECYCLE:
 * ===============
 *
 * 1. Token Expiration:
 *    - Access tokens expire after 1 hour (Clerk default)
 *    - Clerk handles token refresh automatically
 *    - Desktop app should implement token refresh logic
 *
 * 2. Token Refresh Flow:
 *    - Clerk manages session tokens automatically
 *    - Tokens are refreshed before expiration
 *    - Desktop app can request new tokens when needed
 *
 * 3. Token Revocation:
 *    - Tokens can be revoked by signing out
 *    - Clerk maintains session state
 *    - Revoked tokens are immediately invalid
 *
 * USAGE:
 * =====
 *
 * This endpoint is used by the desktop authentication flow.
 * The /auth/desktop page calls this endpoint to get a session token
 * after the user has authenticated via Clerk OAuth.
 *
 * Example Request:
 * POST /api/auth/desktop-token
 * Body:
 *   { "state": "uuid-state-parameter" }
 *
 * Example Response:
 * {
 *   "success": true,
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "user": {
 *     "id": "...",
 *     "email": "user@example.com",
 *     ...
 *   }
 * }
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user from Clerk
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - No active session'
        },
        { status: 401 }
      )
    }

    // Get full user details
    const user = await currentUser()

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to retrieve user information'
        },
        { status: 500 }
      )
    }

    // Get the session token
    const { getToken } = await auth()
    const token = await getToken()

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to generate session token'
        },
        { status: 500 }
      )
    }

    // Prepare user data for desktop app
    const userData = {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress || null,
      name: user.fullName,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.imageUrl,
      emailVerified: user.primaryEmailAddress?.verification?.status === 'verified',
      createdAt: user.createdAt
    }

    // Return token and user information
    return NextResponse.json(
      {
        success: true,
        token: token,
        user: userData
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache'
        }
      }
    )

  } catch (error) {
    console.error('Desktop token API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}

// OPTIONS handler for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      }
    }
  )
}

