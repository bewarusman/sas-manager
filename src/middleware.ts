// import NextAuth from "next-auth";
// export { auth as middleware } from "@/auth";

// export default auth(async function middleware(req: NextRequest) {

// })

// middleware.ts

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

  // Redirect to login page if the user is not authenticated
  if (!token && pathname !== '/') {
    const loginUrl = new URL('/', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Specify which routes should be protected
export const config = {
  matcher: ['/home/:path*', '/dashboard/:path*', '/settings/:path*'], // Add protected routes here
};
