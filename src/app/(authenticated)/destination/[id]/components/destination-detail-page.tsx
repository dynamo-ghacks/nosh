"use client";

import React from "react";
import { Badge } from "flowbite-react";
import Image from "next/image";
import { FaMapPin, FaRegCircle } from "react-icons/fa6";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { TagView } from "@/components/tag/tag-view";
import { Destination, Review } from "../types/destination.type";
import { DefaultUser } from "next-auth";
import MapMarked from "@/components/map/map-marked";
import { ReviewSection } from "./review-section";
import { useDestinationDetail } from "../hooks/useDestinationDetail";

interface DestinationDetailPageProps {
  userReview?: Review | null;
  detail: Destination;
  user: DefaultUser & { tags?: string[] };
}

export function DestinationDetailPage(props: DestinationDetailPageProps) {
  const hooks = useDestinationDetail({
    user: props.user,
    userReview: props.userReview,
    destination: props.detail,
    reviews: props.detail.Review,
  });

  return (
    <div
      className={`flex flex-col gap-6 text-black ${
        props.detail.Review.length > 0 && "pb-20"
      }`}
    >
      {props.detail.image ? (
        <Image
          src={props.detail.image}
          alt={props.detail.name}
          width={320}
          height={200}
          className="aspect-[3 / 2] rounded-lg w-full"
        />
      ) : (
        <div className="bg-gray-300 aspect-[3 / 2] rounded-lg h-[200px] w-full flex items-center justify-center">
          <FaRegCircle className="text-gray-400 text-4xl" />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <h2 className="font-semibold text-2xl">{props.detail.name}</h2>
          {props.detail.isVerified && (
            <Badge
              color={"success"}
              icon={RiVerifiedBadgeFill}
              className="bg-emerald-500 text-white px-4 text-xs"
            >
              Verified
            </Badge>
          )}
        </div>
        <p>{props.detail.headline}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {props.detail.description}
        </p>
        <div className="text-sm flex flex-row items-start gap-2 w-full mb-2">
          <FaMapPin className="flex-shrink-0 w-4" />
          <p className="text-sm">{props.detail.address}</p>
        </div>
        <TagView
          userTags={props.user?.tags ?? []}
          destTags={hooks.destination?.tags ?? []}
        />
      </div>
      <div>
        <p className="mb-4">Map Location</p>
        <MapMarked
          center={{ lat: props.detail.latitude, lng: props.detail.longitude }}
          containerStyle={{
            width: "100%",
            height: "200px",
            borderRadius: "16px",
          }}
        />
      </div>
      <div>
        <p className="mb-2">Review</p>
        <ReviewSection hooks={hooks} />
      </div>
    </div>
  );
}
