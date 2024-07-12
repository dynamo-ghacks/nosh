import { ReviewItemCard } from "@/app/(authenticated)/destination/[id]/components/review-item-card";
import { Badge } from "flowbite-react";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const UserReview = ({
  restaurantName,
  isVerified,
  location,
  username,
  reviewDate,
  tags,
  reviewText,
}: {
  restaurantName: string;
  isVerified: boolean;
  location: string;
  username: string;
  reviewDate: string;
  tags: string[];
  reviewText: string;
}) => {
  return (
    <div className="bg-pink-50 p-6 rounded-xl text-black">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold">
          {restaurantName.length > 40
            ? restaurantName.substring(0, 40) + "..."
            : restaurantName}
        </h2>
        {isVerified && (
          <Badge
            color={"success"}
            icon={RiVerifiedBadgeFill}
            className="bg-emerald-500 text-white px-4 text-xs"
          >
            Verified
          </Badge>
        )}
      </div>

      <div className="flex items-center text-gray-600 mb-4">
        <svg
          className="w-5 h-5 mr-2 text-orange-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        <span>{location}</span>
      </div>

      <ReviewItemCard
        userTags={[]}
        review={{
          id: "1",
          title: restaurantName,
          body: reviewText,
          tags: tags,
          user: {
            name: username,
            image: null,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
      />
    </div>
  );
};

export default UserReview;
