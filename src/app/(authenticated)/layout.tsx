import { AuthGuard } from "@/components/auth/auth-guard";
import { AwaitedReactNode } from "react";

export default function Layout({ children }: { children: AwaitedReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
