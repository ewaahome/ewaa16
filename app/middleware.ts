import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware for handling Next.js routing in static export
export function middleware(request: NextRequest) {
  // For static exports on Netlify, we need to ensure proper routing
  const url = request.nextUrl.clone();
  
  // Handle API routes that should be redirected to Netlify functions
  if (url.pathname.startsWith('/api/')) {
    // In static exports, API routes need to be handled by Netlify functions
    const netlifyFunctionPath = url.pathname.replace('/api/', '/.netlify/functions/');
    url.pathname = netlifyFunctionPath;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    // Skip all internal paths (_next, _static, etc.)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 