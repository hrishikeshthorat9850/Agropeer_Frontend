
"use client";
import { useState } from "react";

export default function TextClamp({
  text = "",
  lines = 3,         // number of lines to clamp
  className = "",    // extra classes
  truncateLength = 100, // optional: only show button if text longer than this
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  return (
    <div className="relative">
      <p
        className={`${className} transition-all duration-300 ${
          !isExpanded
            ? `line-clamp-${lines} overflow-hidden break-words`
            : "whitespace-pre-wrap truncate"
        }`}
      >
        {text}
      </p>

      {text.length > truncateLength && (
        <button
          className="text-blue-600 text-sm mt-1 hover:underline"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "View More" : "View Less"}
        </button>
      )}
    </div>
  );
}

