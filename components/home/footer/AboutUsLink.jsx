"use client";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";

const AboutUsLink = () => {
  return (
    <li>
      <Link
        href="/about-us"
        className="flex items-center gap-2 text-sm font-semibold text-farm-800 hover:text-farm-600 transition-colors group"
      >
        <FaInfoCircle className="w-4 h-4 group-hover:scale-110 transition-transform text-farm-500" />
        <span>About Us</span>
      </Link>
    </li>
  );
};

export default AboutUsLink;

