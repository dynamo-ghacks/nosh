import { type DefaultUser, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = (await getServerSession(authOptions)) as {
    user?: DefaultUser & { onboarding: boolean };
  } | null;

  if (!session?.user?.email) {
    redirect("/auth/login");
  }

  return (
    <div className="overflow-y-hidden relative h-full flex flex-col gap-4 min-h-screen bg-white p-6 py-10"></div>
  );
}
