"use client";
import Link from "next/link";
import { FaCog } from "react-icons/fa";

const HowItWorksLink = () => {
  return (
    <li>
      <Link
        href="/how-it-works"
        className="flex items-center gap-2 text-sm font-semibold text-farm-800 hover:text-farm-600 transition-colors group"
      >
        <FaCog className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300 text-farm-500" />
        <span>How It Works</span>
      </Link>
    </li>
  );
};

export default HowItWorksLink;

