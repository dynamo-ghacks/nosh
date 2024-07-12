import { Badge } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { FaMapPin, FaRegCircle } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import MapMarked from "../../../../components/map/map-marked";
import { DefaultUser, getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/options";
import { getDestination } from "./actions/destination.action";
import { notFound } from "next/navigation";
import { ReviewSection } from "./components/review-section";
import { TagView } from "@/components/tag/tag-view";
import { AddReviewSection } from "./components/add-review-section";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = (await getServerSession(authOptions)) as {
    user?: DefaultUser & { tags: string[] };
  } | null;

  const data = await getDestination(params.id);

  if (!data.success || !data.data?.destination?.data) {
    notFound();
  }

  const detail = data.data.destination.data;

  return (
    <div
      className={`flex flex-col gap-6 text-black ${
        !data.data.userReview && "pb-20"
      }`}
    >
      {detail.image ? (
        <Image
          src={detail.image}
          alt={detail.name}
          width={320}
          height={200}
          className="aspect-[3 / 2] rounded-lg w-full"
        />
      ) : (
        <div className="bg-gray-300 aspect-[3 / 2] rounded-lg h-[200px] w-full flex items-center justify-center">
          <FaRegCircle className="text-gray-400 text-4xl" />
        </div>
      )}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <h2 className="font-semibold text-2xl">{detail.name}</h2>
          {detail.isVerified && (
            <Badge
              color={"success"}
              icon={RiVerifiedBadgeFill}
              className="bg-emerald-500 text-white px-4 text-xs"
            >
              Verified
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {detail.description}
        </p>
        <div className="text-sm flex flex-row items-center gap-2">
          <FaMapPin />
          <p>{detail.address}</p>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <TagView
            userTags={session?.user?.tags ?? []}
            destTags={detail?.tags ?? []}
          />
        </div>
      </div>
      <div>
        <p className="mb-4">Map Location</p>
        <MapMarked
          center={{ lat: detail.latitude, lng: detail.longitude }}
          containerStyle={{
            width: "100%",
            height: "200px",
            borderRadius: "16px",
          }}
        />
      </div>
      <div>
        <p className="mb-2">Review</p>
        <ReviewSection
          user={session?.user}
          reviews={data.data.reviews.data}
          meta={data.data.reviews.meta}
          destinationId={params.id}
          userReview={data.data.userReview}
        />
      </div>
      {session?.user && !data.data.userReview && (
        <AddReviewSection user={session.user} destinationId={params.id} />
      )}
    </div>
  );
}
