import React from "react";
import { filterTags } from "../../utils/filter-tags";
import { Badge } from "flowbite-react";
import { FaCheck } from "react-icons/fa6";
import { LuCircleDashed } from "react-icons/lu";

export function TagView({
  userTags,
  destTags,
}: {
  userTags: string[];
  destTags: string[];
}) {
  return (
    <div className="flex flex-row flex-wrap gap-2 w-full">
      {filterTags(userTags, destTags).map((item) => (
        <Badge
          key={item.tag}
          color={"success"}
          className={
            !item.highlight
              ? "px-4 w-fit flex-grow-0 border border-orange-300 bg-transparent text-orange-500"
              : "px-4 w-fit flex-grow-0"
          }
          icon={item.highlight ? FaCheck : LuCircleDashed}
        >
          {item.highlight ? item.tag : `${item.tag}`}
        </Badge>
      ))}
    </div>
  );
}
