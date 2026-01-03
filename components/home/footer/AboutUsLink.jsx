"use client";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

const AboutUsLink = () => {
  const { t } = useLanguage();
  return (
    <li>
      <Link
        href="/about-us"
        className="flex items-center gap-2 text-sm font-semibold text-farm-800 hover:text-farm-600 transition-colors group"
      >
        <FaInfoCircle className="w-4 h-4 group-hover:scale-110 transition-transform text-farm-500" />
        <span>{t("footer_about_us")}</span>
      </Link>
    </li>
  );
};

export default AboutUsLink;

