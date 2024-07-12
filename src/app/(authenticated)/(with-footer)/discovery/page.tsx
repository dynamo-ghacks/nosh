import { getServerSession } from "next-auth";
import HomePage from "./layouts/discovery-page";

export default async function pages() {
  const session = await getServerSession();
  return (
    <HomePage
      userProfileUrl={session?.user.image!}
      username={session?.user.name!}
    />
  );
}
