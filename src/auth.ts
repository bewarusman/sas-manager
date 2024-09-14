import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
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
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const email: string = credentials?.email as string;
          const user = await getUserByEmail(email);
          console.log(user);
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
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      return session
    }
  },
};

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);