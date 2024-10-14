import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient, User } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  return user;
}

export const authOptions: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET || '',
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      // @ts-ignore
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const email: string = credentials?.email as string;
          const user = await getUserByEmail(email);
          if (user) {
            const hashed = credentials.password as string | '';
            const isMatch = await bcrypt.compare(hashed, user?.password);
            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or Password is not correct");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      console.log(user);
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user = token.user as User
      return session;
    },
  },
};

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);