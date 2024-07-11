"use client";

import { env } from "@/env";
import { signIn } from "next-auth/react";

export const GoogleAuthButton = ({ signUp }: { signUp?: boolean }) => (
  <button
    onClick={() => {
      console.log("GoogleAuthButton clicked", env.NEXT_PUBLIC_CALLBACK_URL);
      signIn("google");
    }}
  >
    <span className="mr-2">G</span>
    {signUp ? "Daftar" : "Masuk"} menggunakan Google
  </button>
);
