"use server";
import { DefaultUser, getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { AwaitedReactNode } from "react";

export const AuthGuard = async ({
  children,
}: {
  children: AwaitedReactNode;
}): Promise<AwaitedReactNode> => {
  const session = (await getServerSession(authOptions)) as {
    user?: DefaultUser & { onboarding: boolean };
  } | null;

  if (!session?.user?.email) {
    redirect("/auth/login");
  }

  console.log(session?.user?.onboarding);
  if (!session?.user?.onboarding) {
    redirect("/onboarding");
  }

  return children;
};
