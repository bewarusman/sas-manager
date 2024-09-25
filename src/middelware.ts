import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Define the secret for NextAuth's JWT
const secret = process.env.NEXTAUTH_SECRET || '';

// Add admin routes here
const adminUrls = ['/app-user'];

// Add protected routes here
export const config = {
  matcher: [
    '/:path',
    '/home/:path*',
    '/dashboard/:path*',
    '/settings/:path*',
    '/api/users/:path*',
    '/api/profiles/:path*',
    '/app-user/:path*',
  ],
};

// Main middleware function
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret,
    salt: ''
  });
  const { pathname } = req.nextUrl;

  // Handle API authentication and response
  if (isApiRoute(pathname)) {
    return handleApiAuth(token);
  }

  // Handle public route login redirection
  if (!token && pathname !== '/login') {
    return redirectToLogin(req);
  }

  // Handle user authorization
  if (token) {
    return handleAuthorization(req, token);
  }

  return NextResponse.next();
}

// Function to handle API authentication
function handleApiAuth(token: any) {
  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized: Invalid or expired token' },
      { status: 401 }
    );
  }
  return NextResponse.next();
}

// Function to check if a route is part of the API
function isApiRoute(pathname: string) {
  return pathname.startsWith('/api');
}

// Function to redirect to login page
function redirectToLogin(req: NextRequest) {
  const loginUrl = new URL('/login', req.url);
  return NextResponse.redirect(loginUrl);
}

// Function to handle user authorization based on role and protected URLs
function handleAuthorization(req: NextRequest, token: any) {
  const { pathname } = req.nextUrl;

  // If user is SUPER_ADMIN, allow access to all routes
  if (token?.user?.role === 'SUPER_ADMIN') {
    return NextResponse.next();
  }

  // If the user is trying to access an admin route but is not authorized
  if (isAdminUrl(pathname)) {
    const notAuthorizedUrl = new URL('/not-authorized', req.url);
    return NextResponse.redirect(notAuthorizedUrl);
  }

  return NextResponse.next();
}

// Function to check if a route is an admin URL
function isAdminUrl(pathname: string) {
  return adminUrls.some((u) => pathname.startsWith(u));
}
