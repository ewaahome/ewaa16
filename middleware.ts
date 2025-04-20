import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Define the same secret key as in auth.ts
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "this_is_a_secure_secret_key_for_development_do_not_use_in_production";

export async function middleware(request: NextRequest) {
  // Get path from the URL
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Redirect port 3001/3002 requests to port 3000
  if (request.headers.get('host')?.match(/localhost:300[1-9]/)) {
    const url = request.nextUrl.clone();
    url.host = url.host.replace(/300[1-9]/, '3000');
    return NextResponse.redirect(url);
  }

  // Handle auth protection for restricted routes
  const token = await getToken({ 
    req: request,
    secret: NEXTAUTH_SECRET
  });
  
  // Protected routes
  const protectedPaths = [
    "/trips",
    "/reservations",
    "/properties",
    "/favorites"
  ];
  
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );
  
  if (isProtectedPath && !token) {
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = { 
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)"
  ]
}
