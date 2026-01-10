"use client";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

const ReviewsLink = () => {
  const { t } = useLanguage();
  return (
    <li>
      <Link
        href="/reviews"
        className="flex items-center gap-2 text-sm font-semibold text-farm-800 hover:text-farm-600 transition-colors group"
      >
        <FaStar className="w-4 h-4 group-hover:scale-110 transition-transform text-farm-500" />
        <span>{t("footer_reviews")}</span>
      </Link>
    </li>
  );
};

export default ReviewsLink;

