"use client";
import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";

const SuccessStoriesLink = () => {
  return (
    <li>
      <Link
        href="/farmer-story"
        className="flex items-center gap-2 text-sm font-semibold text-farm-800 hover:text-farm-600 transition-colors group"
      >
        <FaBookOpen className="w-4 h-4 group-hover:scale-110 transition-transform text-farm-500" />
        <span>Success Stories</span>
      </Link>
    </li>
  );
};

export default SuccessStoriesLink;

