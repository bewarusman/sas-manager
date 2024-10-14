import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authOptions } from './lib/auth-config';
import NextAuth from "next-auth";
// import { getToken } from 'next-auth/jwt';

interface CustomRequest extends NextRequest {
  auth?: {
    user: {
      email: string;
    },
    expires: Date;
  };
}

const { auth } = NextAuth(authOptions);

// Define the secret for NextAuth's JWT
const secret = process.env.NEXTAUTH_SECRET || '';

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

export default auth(async function middleware(req: NextRequest) {
  // export async function middleware(req: NextRequest) {

  const request: CustomRequest = req;
  const { pathname } = request.nextUrl;

  // console.log(request.auth);

  // Handle API authentication and response
  if (isApiRoute(pathname)) {
    return handleApiAuth(request.auth?.user);
  }

  // // Handle public route login redirection
  if (!request.auth?.user && pathname !== '/login') {
    return redirectToLogin(req);
  }

  // // Handle user authorization
  // if (request.auth?.user) {
  //   return await handleAuthorization(req, request.auth?.user);
  // }

  return NextResponse.next();
  // }
});

// Function to handle API authentication
function handleApiAuth(user: any) {
  if (!user) {
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
async function handleAuthorization(req: NextRequest, authorizedUser: any) {
  const { pathname } = req.nextUrl;

  // If user is SUPER_ADMIN, allow access to all routes
  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: authorizedUser.email
  //   }
  // });
  if (authorizedUser?.role === 'SUPER_ADMIN') {
    return NextResponse.next();
  }

  // If the user is trying to access an admin route but is not authorized
  if (isAdminUrl(pathname)) {
    const notAuthorizedUrl = new URL('/not-authorized', req.url);
    return NextResponse.redirect(notAuthorizedUrl);
  }

  return NextResponse.next();
}

// Add admin routes here
const adminUrls = ['/app-user'];

// Function to check if a route is an admin URL
function isAdminUrl(pathname: string) {
  return adminUrls.some((u) => pathname.startsWith(u));
}