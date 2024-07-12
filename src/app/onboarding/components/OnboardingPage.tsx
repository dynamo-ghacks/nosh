"use client";

import React from "react";
import { useState } from "react";
import { Checkbox, TextInput } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { tags } from "../../../constant/tags";
import { onboardingUser } from "../actions/onboarding.action";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

export function OnboardingPage({ email }: { email: string }) {
  const { pending } = useFormStatus();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleCheckboxChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((i) => i !== tag) : [...prev, tag]
    );
  };

  const handleNext = async () => {
    try {
      const res = await onboardingUser(email, selectedTags);
      if (res.success) {
        router.replace("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TextInput
        type="text"
        placeholder="Search here..."
        rightIcon={HiSearch}
        className="mb-4 w-full [&_input]:border-orange-500 [&_input]:bg-orange-50 [&_svg]:text-orange-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p className="text-[#878787] font-light text-start w-full">
        Select one or more
      </p>
      <div className="h-full flex flex-col gap-4 overflow-y-auto hide-scrollbar">
        {tags
          .filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((tag, index) => (
            <div
              key={index}
              className={`font-light w-full flex items-center tags-center justify-between p-3 mb-2 rounded-lg ${
                selectedTags.includes(tag)
                  ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                  : "border border-orange-500 text-[#262626]"
              }`}
              onClick={() => handleCheckboxChange(tag)}
            >
              <span>{tag}</span>
              <Checkbox
                checked={selectedTags.includes(tag)}
                onChange={() => handleCheckboxChange(tag)}
                className={
                  selectedTags.includes(tag)
                    ? "focus:ring-white border-white text-orange-500 "
                    : "text-orange-500 border-orange-500"
                }
              />
            </div>
          ))}
      </div>
      <div className="w-full bg-white flex-shrink-0 h-12 mt-4">
        <button
          onClick={handleNext}
          disabled={pending}
          className="w-full justify-center rounded-lg bg-orange-500 px-5 py-3 text-center text-lg font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        >
          Next
        </button>
      </div>
    </>
  );
}
