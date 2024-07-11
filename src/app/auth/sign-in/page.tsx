import { getServerSession } from "next-auth";
import SignInPage from "./components/sign-in-page";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function Page() {
  const session = await getServerSession(authOptions);

  console.log("session", session);

  return <SignInPage />;
}
