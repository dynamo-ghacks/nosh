import { DefaultUser, getServerSession } from "next-auth";
import HomePage from "./layouts/home-page";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function pages(){
    const session = (await getServerSession(authOptions)) as {
        user?: DefaultUser & { tags: string[] };
      } | null;
    const newestDestination = await prisma.destination.findFirst({
        orderBy: { createdAt: 'desc' }
    })
    const allDestinations = await prisma.destination.findMany()
    return (
        <HomePage 
        userProfileUrl={session?.user?.image!}
        username={session?.user?.name!}
        userTags={session?.user?.tags!}
        recommendedRestaurant={
            {
                name: newestDestination?.name!,
                location: newestDestination?.address!,
                image: newestDestination?.image!,
                destinationTags: newestDestination?.tags!,
                userTags: session?.user?.tags!,
                isHighlighted: true,
                id: newestDestination?.id!
            }
        }
        nearestRestaurants={allDestinations.map(destination => ({
            name: destination.name,
            location: destination.address,
            image: destination.image || "/images/restaurant-sign.png",
            destinationTags: destination.tags,
            userTags: session?.user?.tags!,
            isHighlighted: false,
            id: destination.id
        }))
        }
        />
    )
}