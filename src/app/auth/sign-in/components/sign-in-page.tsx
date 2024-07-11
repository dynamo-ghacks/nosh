"use client";

import { signIn } from "next-auth/react";
import { Button } from "flowbite-react";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Sign In</h2>
        <Button
          onClick={() => signIn("google")}
          color="blue"
          className="w-full"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
