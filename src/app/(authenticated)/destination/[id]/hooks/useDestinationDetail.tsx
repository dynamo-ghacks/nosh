"use client";

import { useState } from "react";
import { Destination, Review } from "../types/destination.type";
import { DefaultUser } from "next-auth";
import { ReviewFormData } from "../schema";

export function useDestinationDetail({
  reviews: _reviews,
  userReview: _userReview,
  destination: _destination,
  user: _user,
}: {
  reviews: Review[];
  userReview: Review | null | undefined;
  destination: Destination;
  user?:
    | (DefaultUser & {
        tags?: string[];
      })
    | null;
}) {
  const [destination, setDestination] = useState<Destination>(_destination);
  const [user, setUser] = useState<
    (DefaultUser & { tags?: string[] }) | null | undefined
  >(_user);
  const [reviews, setReviews] = useState<Review[]>(_reviews);
  const [userReview, setUserReview] = useState<Review | null | undefined>(
    _userReview
  );
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{
    show: boolean;
    defaultValues?: ReviewFormData;
  }>({
    show: false,
    defaultValues: undefined,
  });

  return {
    reviews,
    setReviews,
    userReview,
    setUserReview,
    loading,
    setLoading,
    modal,
    setModal,
    destination,
    setDestination,
    user,
    setUser,
  };
}
