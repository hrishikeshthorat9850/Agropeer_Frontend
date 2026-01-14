"use client";
import { useLanguage } from "@/Context/languagecontext";

export default function ExpertAdvice() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-center items-center px-4 text-center h-[80vh] overflow-hidden">

      <h1 className="text-4xl font-bold text-farm-900 dark:text-white">
        {t("expert_title")}
      </h1>

      <p className="text-gray-600 mt-2 max-w-md dark:text-gray-300">
        {t("expert_desc")}
      </p>

      <div className="mt-8 px-6 py-3 rounded-xl bg-yellow-100 text-yellow-800 text-sm font-medium dark:bg-yellow-600/20 dark:text-yellow-300 shadow">
        {t("coming_soon")}
      </div>

    </div>
  );
}
