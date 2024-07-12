import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ProfileDisplay from "./components/profile-display";
import UserReview from "./components/user-review";
import { DefaultUser, getServerSession } from "next-auth";

export default async function page() {
  const session = (await getServerSession(authOptions)) as {
    user?: DefaultUser & { tags: string[] };
  } | null;
  const userReviews = await prisma.review.findMany({
    where: {
      user: {
        email: session?.user?.email!,
      },
    },
    include: {
      destination: true,
    },
  });
  return (
    <div className="flex flex-col items-center p-2 w-full mb-8 overflow-y-auto gap-4">
      <ProfileDisplay
        name={session?.user?.name || "Nama Tidak Diketahui"}
        email={session?.user?.email || "Email Tidak Diketahui"}
        avatarUrl={session?.user?.image || "/images/login-avatar.svg"}
      />
      {userReviews.map((review) => (
        <UserReview
          key={review.id}
          restaurantName={review.title}
          isVerified={true}
          location={review.destination.address}
          username={session?.user?.name || "John Doe"}
          reviewDate={review.createdAt.toString()}
          tags={review.tags}
          reviewText={review.body}
        />
      ))}
    </div>
  );
}
