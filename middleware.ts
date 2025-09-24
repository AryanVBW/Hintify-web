import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect unbuilt routes to coming-soon
  if (comingSoonRoutes.some(route => pathname.startsWith(route)) && pathname !== '/coming-soon') {
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};