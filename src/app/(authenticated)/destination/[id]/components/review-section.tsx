"use client";

import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getReviewByDestination } from "../actions/destination.action";
import { ReviewItemCard } from "./review-item-card";
import { DefaultUser } from "next-auth";

interface Review {
  id: string;
  title: string;
  body: string;
  tags: string[];
  user: {
    id: string;
    name: string | null;
    image: string | null;
    email: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
}
export function ReviewSection({
  destinationId,
  user,
  reviews,
  meta,
  userReview,
}: {
  destinationId: string;
  user?:
    | (DefaultUser & {
        tags?: string[];
      })
    | null;
  reviews: Review[];
  meta: {
    page: number;
    take: number;
    nextPage: number | null;
    count: number;
  };
  userReview?: Review | null;
}) {
  const [_userReview, setUserReview] = React.useState(userReview ?? null);
  const [_reviews, setReviews] = React.useState(reviews ?? []);
  const [_meta, setMeta] = React.useState(
    meta ?? { page: 1, take: 10, nextPage: 2, count: 0 }
  );

  console.log(_reviews.length, _meta.page * 10);

  async function fetchData() {
    try {
      if (!_meta.nextPage) return;

      const result = await getReviewByDestination(
        destinationId,
        _meta.nextPage,
        _meta.take
      );

      console.log(result);
      if (result.success) {
        setReviews((prevReviews) => [
          ...prevReviews,
          ...(result.data?.data ?? []),
        ]);
        setMeta({
          page: result.data?.meta.page ?? 1,
          take: result.data?.meta.take ?? 10,
          nextPage: result.data?.meta.nextPage ?? null,
          count: result.data?.meta.count ?? 0,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function refresh() {
    try {
      const result = await getReviewByDestination(destinationId, 1, _meta.take);
      console.log(result);
      if (result.success) {
        setReviews(result.data?.data ?? []);
        setMeta({
          page: result.data?.meta.page ?? 1,
          take: result.data?.meta.take ?? 10,
          nextPage: result.data?.meta.nextPage ?? null,
          count: result.data?.meta.count ?? 0,
        });
        setUserReview(result.data?.userReview ?? null);
      }
    } catch (err) {}
  }

  return (
    <div
      id="scrollableDiv"
      className="h-[100svh] overflow-y-auto hide-scrollbar"
    >
      <InfiniteScroll
        dataLength={10 * _meta.page}
        next={fetchData}
        hasMore={!!_meta.nextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
        height={"100svh"}
        className="hide-scrollbar flex flex-col gap-4"
      >
        {_userReview && (
          <ReviewItemCard
            key={"user"}
            userTags={user?.tags ?? []}
            review={_userReview}
            isUser
            destinationId={destinationId}
          />
        )}
        {_reviews.map((review, index) => {
          if (review.user.email === user?.email) {
            return <></>;
          }
          return (
            <ReviewItemCard
              key={index}
              userTags={user?.tags ?? []}
              review={review}
              destinationId={destinationId}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
