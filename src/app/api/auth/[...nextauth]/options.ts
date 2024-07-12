import { env } from "@/env";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prisma from "@/db/prisma";

const prismaAdpt = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prismaAdpt),
  callbacks: {
    async signIn({ account, profile }) {
      console.log("signIn", account, profile);
      if (!profile?.email) {
        throw new Error("No email returned from Google");
      }

      return true;
    },
    async session({ session, user }) {
      console.log("session", session, user);
      const userDb = session?.user?.email
        ? await prisma.user.findUnique({
            where: {
              email: session.user.email,
            },
            select: {
              onboarding: true,
              name: true,
              image: true,
              email: true,
            },
          })
        : {};

      if (session.user) {
        session.user = userDb as any;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};
