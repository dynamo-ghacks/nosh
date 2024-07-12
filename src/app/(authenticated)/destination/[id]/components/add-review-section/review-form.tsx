"use client";

import React, { useEffect, useState } from "react";
import { Modal, Avatar } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewFormData, reviewSchema } from "../../schema";
import { stringAvatar } from "@/utils/string-avatar";
import { addReview } from "../../actions/destination.action";
import { CustomInput } from "@/components/form/custom-input";
import { CustomTextarea } from "@/components/form/custom-textarea";
import { CustomTagSelect } from "@/components/form/custom-tag-select";
import { useDestinationDetail } from "../../hooks/useDestinationDetail";
import { CustomButton } from "@/components/ui/custom-button";

export function ReviewFormModal({
  hooks,
}: {
  hooks: ReturnType<typeof useDestinationDetail>;
}) {
  const { user, destination, modal } = hooks;
  const [selectedTags, setSelectedTags] = useState<string[]>(
    modal.defaultValues?.tags ?? []
  );
  const {
    control,
    reset,
    setValue,
    formState: { isValid },
    getValues,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: modal.defaultValues ?? {
      title: "",
      body: "",
      tags: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (modal.defaultValues) {
      setValue("body", modal.defaultValues.body);
      setValue("title", modal.defaultValues.title);
      setValue("tags", modal.defaultValues.tags);
      setSelectedTags(modal.defaultValues.tags);
    } else {
      reset();
    }
  }, [modal.defaultValues]);

  if (!user || !destination) return <></>;

  const _onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    try {
      if (!user.email) return;

      hooks.setLoading(true);
      const result = await addReview(user.email, destination.id, {
        ...data,
        tags: selectedTags,
      });

      if (result.data) {
        hooks.setUserReview({
          ...result.data,
          user: {
            email: user?.email,
            image: user?.image,
            name: user?.name,
          },
        });
      }

      hooks.setLoading(false);
      hooks.setModal({
        show: false,
      });
      reset();
    } catch (err) {
    } finally {
      hooks.setLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={hooks.modal.show}
        onClose={() =>
          hooks.setModal({
            show: false,
          })
        }
        size="md"
      >
        <Modal.Header title="">
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
            onSubmit={(e) => {
              e.preventDefault();
              _onSubmit({
                title: getValues("title"),
                body: getValues("body"),
                tags: getValues("tags"),
              });
            }}
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
            <CustomButton
              label="Post"
              disabled={hooks.loading || !isValid}
              loading={hooks.loading}
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
