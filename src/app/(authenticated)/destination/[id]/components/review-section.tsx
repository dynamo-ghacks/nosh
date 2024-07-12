"use client";

import React from "react";
import { ReviewItemCard } from "./review-item-card";
import { useDestinationDetail } from "../hooks/useDestinationDetail";
import { FaPlus } from "react-icons/fa";
import { ReviewFormModal } from "./add-review-section/review-form";

export function ReviewSection({
  hooks,
}: {
  hooks: ReturnType<typeof useDestinationDetail>;
}) {
  const { reviews: _reviews, userReview: _userReview, user } = hooks;

  return (
    <>
      <div id="scrollableDiv" className="overflow-y-auto hide-scrollbar">
        {_userReview && (
          <ReviewItemCard
            key={"user"}
            userTags={user?.tags ?? []}
            review={_userReview}
            isUser
            hooks={hooks}
          />
        )}
        {_reviews.map((review) => {
          if (review.user.email === user?.email) {
            return <></>;
          }
          return (
            <ReviewItemCard
              key={review.id}
              userTags={user?.tags ?? []}
              review={review}
              hooks={hooks}
            />
          );
        })}
      </div>
      {!_userReview && (
        <>
          <div className="w-full bg-white flex justify-around items-center py-4 fixed bottom-0 left-0 right-0 max-w-md mx-auto z-10 px-6">
            <button
              className="w-full justify-center rounded-lg bg-orange-500 px-5 py-3 text-center text-lg font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 flex flex-row gap-2 items-center"
              onClick={() =>
                hooks.setModal({
                  show: true,
                  defaultValues: undefined,
                })
              }
            >
              <span>Add Your Review</span>
              <FaPlus />
            </button>
          </div>
        </>
      )}
      <ReviewFormModal hooks={hooks} />
    </>
  );
}
