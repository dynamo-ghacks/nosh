import { env } from "@/env";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  adapter: PrismaAdapter(prisma),
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
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};
