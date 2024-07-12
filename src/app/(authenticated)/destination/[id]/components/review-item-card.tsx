import React, { useState } from "react";
import { Avatar, Card } from "flowbite-react";
import { stringAvatar } from "../../../../../utils/string-avatar";
import { format } from "date-fns";
import { TagView } from "../../../../../components/tag/tag-view";
import { ReviewFormModal } from "./add-review-section/review-form";

export function ReviewItemCard({
  userTags,
  review,
  destinationId,
  isUser = false,
  setUserReview = () => {},
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
  isUser?: boolean;
  destinationId: string;
  setUserReview?: (review: any) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Card className="border border-orange-500 rounded-2xl shadow-orange-50">
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
        <p className="font-semibold text-sm w-full line-clamp-1 text-ellipsis mx-2">
          {review.user.name}
        </p>
        <p className="text-sm text-gray-500 flex-shrink-0">
          {format(new Date(review.updatedAt), "dd LLL yyyy")} at{" "}
          {format(new Date(review.updatedAt), "HH:mm")}
        </p>
      </div>
      <div>{<TagView userTags={userTags} destTags={review.tags} />}</div>
      <p className="">{review.body}</p>
      {isUser && (
        <>
          <div className="flex flex-row justify-end gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-2 h-10 rounded-lg min-w-20 bg-orange-100 text-orange-500 hover:text-orange-800 focus:outline-none"
            >
              Edit
            </button>
          </div>
          {isUser && (
            <ReviewFormModal
              showModal={showModal}
              setShowModal={setShowModal}
              destinationId={destinationId}
              user={review.user}
              defaultValues={review}
            />
          )}
        </>
      )}
    </Card>
  );
}
