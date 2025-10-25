import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";

// Define routes that should redirect to coming-soon
const comingSoonRoutes = [
  '/dashboard',
  '/privacy',
  '/terms',
  '/profile',
  '/settings',
  '/analytics',
  '/admin',
  '/api/dashboard',
  '/app',
  '/pricing',
  '/features',
  '/docs',
  '/help',
  '/support',
];

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/auth/desktop(.*)',
  '/auth-success(.*)',
  '/coming-soon(.*)',
  '/api/auth/desktop-token(.*)',
  '/api/report-issue(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl;

  // Redirect unbuilt routes to coming-soon
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