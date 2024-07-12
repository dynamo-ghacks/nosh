"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ReviewFormModal } from "./review-form";

interface TagOption {
  value: string;
  label: string;
}

export function AddReviewSection({
  destinationId,
  user,
}: {
  destinationId: string;
  user: {
    email?: string | null;
    name?: string | null;
    image?: string | null;
  };
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="w-full bg-white flex justify-around items-center py-4 fixed bottom-0 left-0 right-0 max-w-md mx-auto z-10 px-6">
        <button
          className="w-full justify-center rounded-lg bg-orange-500 px-5 py-3 text-center text-lg font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 flex flex-row gap-2 items-center"
          onClick={() => setShowModal(true)}
        >
          <span>Add Your Review</span>
          <FaPlus />
        </button>
      </div>

      <ReviewFormModal
        showModal={showModal}
        setShowModal={setShowModal}
        destinationId={destinationId}
        user={user}
      />
    </>
  );
}
