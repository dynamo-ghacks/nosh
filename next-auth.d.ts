import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { AdapterUser as BaseAdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  export interface User extends DefaultUser {
    onboarding: boolean;
  }

  export interface Session {
    user: User;
  }

  interface AdapterUser extends BaseAdapterUser {
    onboarding: boolean;
  }
}
