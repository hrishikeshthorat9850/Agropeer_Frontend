"use client";
import { FaChartLine, FaEye } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function MarketSection({ router }) {
  const { t } = useLanguage();

  return (
    <section className="mb-8">
      <div
        onClick={() => router.push("/market-prices")}
        className="
          relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 
          rounded-3xl p-6 shadow-xl shadow-gray-200 dark:shadow-none cursor-pointer group
        "
      >
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-500/10 rounded-full blur-xl -ml-10 -mb-10" />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <h2 className="text-white/80 font-medium text-sm tracking-wide uppercase">
                {t("market_section_title")}
              </h2>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
              {t("market_prices_button")}
            </h3>
            <p className="text-white/50 text-sm max-w-xs line-clamp-2">
              {t("market_section_desc")}
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-full text-white backdrop-blur-md group-hover:bg-white/20 transition-colors">
            <FaChartLine className="w-6 h-6" />
          </div>
        </div>

        {/* Fake Graph Line */}
        <div className="mt-6 h-12 flex items-end gap-1 opacity-50">
          {[40, 60, 45, 70, 65, 85, 80, 50, 60, 75, 90, 100].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-green-500/50 rounded-t-sm"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
