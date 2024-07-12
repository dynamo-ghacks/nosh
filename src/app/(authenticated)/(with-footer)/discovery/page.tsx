import { getServerSession } from "next-auth";
import HomePage from "./layouts/home-page";

export default async function pages(){
    const session = await getServerSession();
    return (
        <HomePage 
        userProfileUrl={session?.user.image!}
        username={session?.user.name!}
        />
    )
}