import React from "react";
import { filterTags } from "../../utils/filter-tags";
import { Badge } from "flowbite-react";
import { FaCheck } from "react-icons/fa6";
import { LuCircleDashed } from "react-icons/lu";
import { FaEllipsisH } from "react-icons/fa";

export function TagView({
  userTags,
  destTags,
  highlightedTextColor,
  nonHighlightedTextColor,
  highlightedBgColor,
  nonHighlightedBgColor,
  maxTags,
}: {
  userTags?: string[];
  destTags: string[];
  highlightedTextColor?: string;
  nonHighlightedTextColor?: string;
  highlightedBgColor?: string;
  nonHighlightedBgColor?: string;
  maxTags?: number;
}) {
  const filteredTags = filterTags(userTags || [], destTags);
  const displayTags = maxTags ? filteredTags.slice(0, maxTags) : filteredTags;
  const hasMoreTags = maxTags && filteredTags.length > maxTags;

  return (
    <div className="flex flex-row flex-wrap gap-2 w-full items-center">
      {displayTags.map((item) => (
        <Badge
          key={item.tag}
          color={"success"}
          className={`
            px-4 w-fit flex-grow-0
            ${item.highlight
              ? `${highlightedTextColor || ''} ${highlightedBgColor || ''}`
              : `border border-orange-300 ${nonHighlightedBgColor || 'bg-transparent'} ${nonHighlightedTextColor || 'text-orange-500'}`
            }
          `}
          icon={item.highlight ? FaCheck : LuCircleDashed}
        >
          {item.highlight ? item.tag : `${item.tag}`}
        </Badge>
      ))}
      {hasMoreTags &&
        <span className={`text-sm ${nonHighlightedTextColor || 'text-orange-500'}`}>
          and more...
        </span>
      }
    </div>
  );
}