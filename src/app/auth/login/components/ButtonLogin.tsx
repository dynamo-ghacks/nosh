"use client";
import { signIn } from "next-auth/react";

export default function ButtonLogin() {
  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/onboarding",
        })
      }
      className="inline-flex w-full justify-center rounded-lg bg-orange-500 px-5 py-3 text-center text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Login with Google
    </button>
  );
}
