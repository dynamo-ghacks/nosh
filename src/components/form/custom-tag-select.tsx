"use client";

import React, { useState } from "react";
import { tags } from "@/constant/tags";

export function CustomTagSelect({
  selectedTags,
  setSelectedTags,
}: {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}) {
  const [tagOptions, setTagOptions] = useState<string[]>(tags);
  const [inputValue, setInputValue] = useState("");
  const [filteredTags, setFilteredTags] = useState<string[]>(tags);

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredTags(
      tags.filter((tag) => tag.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.find((t) => t === tag)) {
      setSelectedTags([...selectedTags, tag]);
      setSelectedTags([...selectedTags, tag]);
    }
    setInputValue("");
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    setTagOptions([...tagOptions, tag]);

    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <>
      <div className="relative">
        <input
          type="text"
          placeholder="Search tags..."
          className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-orange-500 text-gray-900 focus:border-orange-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-500 dark:focus:ring-orange-500 p-2.5 text-sm rounded-lg"
          value={inputValue}
          onChange={handleTagChange}
          disabled={selectedTags.length === 7}
        />
        {inputValue && selectedTags.length < 7 && (
          <ul className=" absolute top-12 z-10 w-full bg-white text-black border rounded-lg shadow-sm max-h-32 overflow-auto text-sm">
            {filteredTags.map((option) =>
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
    </>
  );
}
