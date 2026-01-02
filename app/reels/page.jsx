"use client";
import React from "react";
import { FaVideo } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function Reels() {
  const { t } = useLanguage();

  return (
    <div style={{ minHeight: "calc(100vh - 126px)" }} className="min-h-[calc(100vh-122px)] flex flex-col justify-center items-center px-4 text-center overflow-hidden">

      <h1 className="text-4xl font-bold text-farm-900 dark:text-white">
        {t("reels")}
      </h1>

      <p className="text-gray-600 mt-2 max-w-md dark:text-gray-300">
        {t("reels_desc")}
      </p>

      <div className="mt-8 px-6 py-3 rounded-xl bg-yellow-100 text-yellow-800 text-sm font-medium 
      dark:bg-yellow-600/20 dark:text-yellow-300 shadow flex items-center gap-2">
        <FaVideo className="text-lg" />
        {t("coming_soon")}
      </div>
    </div>
  );
}
