import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Define the secret for NextAuth's JWT
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;

  // If token exists, the user is authenticated
  if (token) {
    return NextResponse.next();
  }

  // middleware authenticaton
  if (pathname.startsWith('/api')) {
    return NextResponse.json(
      { message: 'Unauthorized: Invalid or expired token' },
      { status: 401 }
    );
  }

  // Redirect to login page if the user is not authenticated
  if (!token && pathname !== '/login') {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Add protected routes here
export const config = {
  matcher: [
    '/:path',
    '/home/:path*',
    '/dashboard/:path*',
    '/settings/:path*',
    '/api/users/:path*'
  ],
};
