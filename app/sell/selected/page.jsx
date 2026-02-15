"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useLanguage } from "@/Context/languagecontext";
import LoadingSpinner from "@/components/LoadingSpinner";
// ADDITIVE ENHANCEMENT: Import forward page transition hook for smooth UI transitions
// This does NOT replace existing logic - it only enhances UI transitions
import { usePageTransition } from "@/hooks/usePageTransition";
import { useBackPress } from "@/Context/BackHandlerContext";

// Lazy load SellForm - heavy form component
const SellForm = dynamic(() => import("../../../components/SellForm"), {
  loading: () => <LoadingSpinner />,
});

export default function SelectedCategoryPage() {
  const { t } = useLanguage();
  const router = useRouter();
  // ADDITIVE ENHANCEMENT: Get forward transition handlers
  // Original router.push() still available, this adds smooth transitions
  const { push } = usePageTransition();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("others");

  useBackPress(
    () => {
      push("/sell/choose"); // Explicitly go back to choose category or just back? User asked for back.
      // If we use push here, it acts like a back if we consider the flow.
      // Actually, generic router.back() is safer for global consistency, BUT for this specific page,
      // going back to 'choose' might be the intended "Up" navigation.
      // However, sticking to router.back() (or push to parent) is fine.
      // Let's use router.back() via explicit hook if we want "Back" behavior.
      // But wait, the previous code had "push('/sell/choose')" on the custom back button.
      // Let's replicate that behavior for the hardware back button too.
      push("/sell/choose");
      return true;
    },
    10,
    true,
  );

  const LABELS = {
    seeds: t("category_seeds"),
    fertilizers: t("category_fertilizers"),
    pesticides: t("category_pesticides"),
    machinery: t("category_machinery"),
    livestock: t("category_livestock"),
    vegetables: t("category_vegetables"),
    fruits: t("category_fruits"),
    oil: t("category_oil"),
    services: t("category_services"),
    others: t("category_others"),
  };

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  const pretty = LABELS[category] || t("selected_category_fallback");

  return (
    <div className="min-h-screen flex justify-center font-sans bg-farm-50 dark:bg-black transition-colors duration-300">
      <div className="w-full max-w-3xl bg-white shadow-2xl p-4 flex flex-col gap-6 dark:bg-[#1e1e1e] border-x border-gray-100 dark:border-white/5 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pt-2">
          <div>
            <p className="text-sm text-farm-600 dark:text-farm-400 font-medium tracking-wide uppercase">
              {t("sell_selected_title")}
            </p>
            <h2 className="text-xl font-bold text-farm-900 dark:text-white mt-0.5">
              {pretty}
            </h2>
          </div>
          <button
            onClick={() => {
              // ENHANCED: Use push() with smooth transition instead of router.push()
              // PRESERVED: All other behavior unchanged
              push("/sell/choose");
            }}
            className="px-4 py-2 border border-farm-600 dark:border-farm-500 rounded-xl text-farm-700 dark:text-farm-400 font-semibold hover:bg-farm-50 dark:hover:bg-farm-900/20 transition-colors"
          >
            {t("change_button")}
          </button>
        </div>

        {/* Sell Form */}
        <div className="mt-2">
          <SellForm category={category} />
        </div>
      </div>
    </div>
  );
}
