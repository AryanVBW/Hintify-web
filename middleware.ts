import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes (currently redirecting to coming-soon)
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

// Define routes that should redirect to coming-soon
const isComingSoonRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/auth-success(.*)',
  '/privacy(.*)',
  '/terms(.*)',
  '/profile(.*)',
  '/settings(.*)',
  '/analytics(.*)',
  '/admin(.*)',
  '/api/dashboard(.*)',
  '/app(.*)',
  '/pricing(.*)',
  '/features(.*)',
  '/docs(.*)',
  '/help(.*)',
  '/support(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Redirect unbuilt routes to coming-soon
  if (isComingSoonRoute(req) && req.nextUrl.pathname !== '/coming-soon') {
    return NextResponse.redirect(new URL('/coming-soon', req.url));
  }

  // Protect dashboard routes (though they redirect anyway)
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};