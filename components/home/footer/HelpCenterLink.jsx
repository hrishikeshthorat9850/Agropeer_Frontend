"use client";
import Link from "next/link";
import { FaQuestionCircle } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

const HelpCenterLink = () => {
  const { t } = useLanguage();
  return (
    <li>
      <Link
        href="/help"
        className="flex items-center gap-2 text-sm font-semibold text-farm-800 hover:text-farm-600 transition-colors group"
      >
        <FaQuestionCircle className="w-4 h-4 group-hover:scale-110 transition-transform text-farm-500" />
        <span>{t("footer_help_center")}</span>
      </Link>
    </li>
  );
};

export default HelpCenterLink;

