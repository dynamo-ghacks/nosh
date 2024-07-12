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
  const [tagOptions, setTagOptions] = useState<string[]>(tags);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    defaultValues?.tags ?? []
  );
  const [inputValue, setInputValue] = useState("");

  const { control, handleSubmit, reset } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: defaultValues ?? {
      title: "",
      body: "",
      tags: [],
    },
  });

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.find((t) => t === tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setInputValue("");
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    setTagOptions([...tagOptions, tag]);
  };

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
            <div className="relative">
              <input
                type="text"
                placeholder="Search tags..."
                className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-orange-500 bg-orange-50 text-gray-900 focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-500 dark:focus:ring-orange-500 p-2.5 text-sm rounded-lg"
                value={inputValue}
                onChange={handleTagChange}
                disabled={selectedTags.length === 7}
              />
              {inputValue && selectedTags.length < 7 && (
                <ul className=" absolute top-12 z-10 w-full bg-white text-black border rounded-lg shadow-sm max-h-32 overflow-auto text-sm">
                  {tagOptions.map((option) =>
                    selectedTags.includes(option) ? (
                      <></>
                    ) : (
                      <li
                        key={option}
                        className="p-2 hover:bg-orange-100 cursor-pointer"
                        onClick={() => handleTagSelect(option)}
                      >
                        {option}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-2 text-orange-600 hover:text-orange-800"
                    onClick={() => handleTagRemove(tag)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
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
