import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";

// Define routes that should redirect to coming-soon (ONLY /dashboard)
const comingSoonRoutes = [
  '/dashboard',
];

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/auth/desktop(.*)',
  '/auth-success(.*)',
  '/coming-soon(.*)',
  '/privacy(.*)',
  '/terms(.*)',
  '/report-issue(.*)',
  '/api/auth/desktop-token(.*)',
  '/api/report-issue(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;

  // Redirect ONLY /dashboard to coming-soon (unbuilt feature)
  if (comingSoonRoutes.some(route => pathname.startsWith(route)) && pathname !== '/coming-soon') {
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }

  // Protect routes that are not public
  if (!isPublicRoute(request)) {
    await auth.protect()
  }

  return NextResponse.next();
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};