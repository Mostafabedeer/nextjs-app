"use client";

import { useState } from "react";

interface TagDescriptionProps {
  description: string;
}

function TagDescription({ description }: TagDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={() => setExpanded((isExpanded) => !isExpanded)}
      style={{
        display: expanded ? "block" : "-webkit-box",
        overflow: expanded ? "visible" : "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: expanded ? "unset" : 3,
      }}
      className="text-dark500_light700 mt-2 w-full cursor-pointer text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    >
      {description}
    </button>
  );
}

export default TagDescription;
