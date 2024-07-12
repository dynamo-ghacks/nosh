"use client";

import { signIn } from "next-auth/react";

export const GoogleAuthButton = ({ signUp }: { signUp?: boolean }) => (
  <button
    onClick={() => {
      signIn("google");
    }}
  >
    <span className="mr-2">G</span>
    {signUp ? "Daftar" : "Masuk"} menggunakan Google
  </button>
);
