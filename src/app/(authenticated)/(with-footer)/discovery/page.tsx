import { DefaultUser, getServerSession } from "next-auth";
import HomePage from "./layouts/home-page";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function pages(){
    const session = (await getServerSession(authOptions)) as {
        user?: DefaultUser & { tags: string[] };
      } | null;
    return (
        <HomePage 
        userProfileUrl={session?.user?.image!}
        username={session?.user?.name!}
        userTags={session?.user?.tags!}
        />
    )
}