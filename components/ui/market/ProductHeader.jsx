"use client";
import { FaRupeeSign } from "react-icons/fa";
import { formatName } from "@/utils/formatName";
import { useLanguage } from "@/Context/languagecontext";

export default function ProductHeader({ product, sellerInfo }) {
  const { t } = useLanguage();
  if (!product) return null;

  return (
    <div className="relative bg-gradient-to-br from-[#f8fbf8] via-[#f3f8f5] to-[#eaf3ed] rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-[#e8f0ea] px-8 py-10 md:px-12 md:py-12 transition-all duration-500 overflow-hidden dark:bg-none dark:bg-[#272727] dark:border-none">
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(80,180,90,0.08),_transparent_70%)]"></div>

      {/* Product Title */}
      <h1 className="relative z-10 text-center text-3xl md:text-4xl font-extrabold text-[#1b2e1b] tracking-tight leading-tight mb-6 dark:text-white">
        {product.title}
      </h1>

      {/* Price */}
      <div className="relative z-10 flex items-baseline justify-center gap-2 mb-10">
        <FaRupeeSign className="text-[#317a32] text-3xl md:text-4xl" />
        <span className="text-4xl md:text-5xl font-bold text-[#245b25] tracking-tight">
          {product.price?.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Seller Info */}
      {sellerInfo && (
        <div className="relative z-10 flex items-center justify-center gap-4 md:gap-6 px-6 py-5 bg-white/70 backdrop-blur-md rounded-2xl border border-[#dcefe1] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 dark:bg-[#1E1E1E] dark:border-none">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3f8f3d] to-[#2f7030] flex items-center justify-center text-white font-bold text-lg shadow-[0_3px_8px_rgba(47,112,48,0.3)]">
            {formatName(sellerInfo).charAt(0)}
          </div>
          <div className="flex flex-col text-left">
            <p className="text-xs uppercase tracking-[0.1em] text-[#5e7260] font-semibold">
              {t("label_sold_by")}
            </p>
            <p className="text-lg font-semibold text-[#1d311d] leading-tight">
              {formatName(sellerInfo)}
            </p>
          </div>
        </div>
      )}

      {/* Bottom accent border */}
      <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-gradient-to-r from-[#3f8f3d] via-[#68a864] to-[#2f7030] rounded-b-3xl opacity-70"></div>
    </div>
  );
}
