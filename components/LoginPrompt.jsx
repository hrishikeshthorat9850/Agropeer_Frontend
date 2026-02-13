"use client";
import Link from "next/link";
import { FaComment } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function LoginPrompt({
  icon: Icon = FaComment,
  titleKey = "login_title",
  descKey = "login_desc",
  btnKey = "go_to_login",
}) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-center items-center h-[80vh] px-4 text-gray-500">
      <div className="text-center max-w-md w-full">
        <Icon className="text-6xl text-farm-400 dark:text-farm-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-farm-800 dark:text-farm-200 mb-2">
          {t(titleKey)}
        </h2>
        <p className="text-farm-600 dark:text-farm-400 mb-6">{t(descKey)}</p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 bg-farm-600 dark:bg-farm-500 text-white rounded-xl hover:bg-farm-700 dark:hover:bg-farm-600 transition-colors font-semibold active:scale-95"
        >
          {t(btnKey)}
        </Link>
      </div>
    </div>
  );
}
