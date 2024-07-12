"use client";

import React, { useEffect, useRef, useState } from "react";
import { Modal, Avatar } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewFormData, reviewSchema } from "./schema";
import { tags } from "@/constant/tags";
import { stringAvatar } from "@/utils/string-avatar";
import { addReview } from "../../actions/destination.action";
import { CustomInput } from "@/components/form/custom-input";
import { CustomTextarea } from "@/components/form/custom-textarea";
import { CustomTagSelect } from "@/components/form/custom-tag-select";

export function ReviewFormModal({
  showModal,
  setShowModal,
  destinationId,
  user,
  defaultValues,
  onSubmit,
}: {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  destinationId: string;
  user: {
    email?: string | null;
    name?: string | null;
    image?: string | null;
  };
  defaultValues?: {
    title: string;
    body: string;
    tags: string[];
  };
  onSubmit?: (data: ReviewFormData) => void;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>(
    defaultValues?.tags ?? []
  );

  const { control, handleSubmit, reset } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: defaultValues ?? {
      title: "",
      body: "",
      tags: [],
    },
  });

  const _onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    try {
      if (!user.email) return;

      const result = await addReview(user.email, destinationId, {
        ...data,
        tags: selectedTags,
      });

      if (onSubmit) {
        onSubmit(data);
      }
      setShowModal(false);
      reset();
    } catch (err) {}
  };

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)} size="md">
        <Modal.Header>
          <div className="flex flex-row items-center justify-between">
            {user.image ? (
              <Avatar
                img={user.image}
                alt="avatar of Jese"
                rounded
                className="flex-shrink-0"
              />
            ) : (
              <div
                className="flex-shrink-0 relative inline-flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-600 h-10 w-10 rounded-full"
                {...stringAvatar(user.name ?? "")}
              />
            )}
            <div className="mx-2">
              <p className="font-semibold text-sm w-full line-clamp-1 text-ellipsis">
                {user.name}
              </p>
              <p className="text-xs font-light text-gray-500">
                Posting publicly across Nosh
              </p>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="hide-scrollbar min-h-96">
          <form
            onSubmit={handleSubmit(_onSubmit)}
            className="flex flex-col gap-4"
          >
            <CustomInput
              name="title"
              control={control}
              placeholder="Write a title..."
            />
            <CustomTextarea
              name="body"
              control={control}
              placeholder="Leave a comment..."
            />
            <CustomTagSelect
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <button
              className="w-full justify-center rounded-lg bg-orange-500 px-5 py-3 text-center text-lg font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 flex flex-row gap-2 items-center"
              type="submit"
            >
              <span>Post</span>
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
