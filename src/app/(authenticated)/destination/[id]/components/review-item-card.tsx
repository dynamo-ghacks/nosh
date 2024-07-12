import React from "react";
import { Avatar } from "flowbite-react";
import { stringAvatar } from "../../../../../utils/string-avatar";
import { format } from "date-fns";
import { TagView } from "../../../../../components/tag/tag-view";

export function ReviewItemCard({
  userTags,
  review,
}: {
  userTags: string[];
  review: {
    id: string;
    title: string;
    body: string;
    tags: string[];
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
    createdAt: Date;
    updatedAt: Date;
  };
}) {
  return (
    <div className="border border-orange-500 p-4 flex flex-col gap-4 rounded-2xl">
      <div className="flex flex-row items-center justify-between">
        {review.user.image ? (
          <Avatar
            img={review.user.image}
            alt="avatar of Jese"
            rounded
            className="flex-shrink-0"
          />
        ) : (
          <div
            className="flex-shrink-0 relative inline-flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-600 h-10 w-10 rounded-full"
            {...stringAvatar(review.user.name ?? "")}
          />
        )}
        <p className="text-sm w-full line-clamp-1 text-ellipsis mx-2">
          {review.user.name}
        </p>
        <p className="text-sm text-gray-500 flex-shrink-0">
          {format(new Date(review.updatedAt), "dd LLL yyyy")} at{" "}
          {format(new Date(review.updatedAt), "HH:mm")}
        </p>
      </div>
      <div>{<TagView userTags={userTags} destTags={review.tags} />}</div>
      <p className="">{review.body}</p>
    </div>
  );
}
