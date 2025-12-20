"use client";
import { 
  FaTag, 
  FaList, 
  FaCalendarAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function ProductDetailsSection({ product }) {
  if (!product) return null;

  return (
    <div className="relative bg-gradient-to-br from-[#f8fbf8] via-[#f3f8f5] to-[#eaf3ed] rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-farm-200 px-8 py-10 md:px-10 md:py-12 space-y-8 transition-all duration-300 dark:bg-none dark:bg-[#272727] dark:border-none">
      {/* Header */}
      <h2 className="text-3xl font-extrabold text-[#1b2e1b] text-center tracking-tight border-b-2 border-[#a8d5a8] pb-4">
        Product Details
      </h2>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7 text-gray-800">
        {/* Category */}
        <div className="flex items-center gap-3 p-4 bg-white/70 backdrop-blur-sm border border-[#e4f0e6] rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.01] transition-all dark:bg-[#1E1E1E] dark:border-white/20">
          <FaTag className="text-[#2f7030] text-xl flex-shrink-0" />
          <div>
            <p className="text-xs text-[#6b7a6c] uppercase tracking-wide">Category</p>
            <p className="font-semibold text-[#1b2e1b]">{product.category || "-"}</p>
          </div>
        </div>

        {/* Quantity */}
        {product.quantity && (
          <div className="flex items-center gap-3 p-4 bg-white/70 backdrop-blur-sm border border-[#e4f0e6] rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.01] transition-all dark:bg-[#1E1E1E] dark:border-white/20">
            <FaList className="text-[#2f7030] text-xl flex-shrink-0" />
            <div>
              <p className="text-xs text-[#6b7a6c] uppercase tracking-wide">Quantity</p>
              <p className="font-semibold text-[#1b2e1b]">{product.quantity}</p>
            </div>
          </div>
        )}

        {/* Date */}
        <div className="flex items-center gap-3 p-4 bg-white/70 backdrop-blur-sm border border-[#e4f0e6] rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.01] transition-all dark:bg-[#1E1E1E] dark:border-white/20">
          <FaCalendarAlt className="text-[#2f7030] text-xl flex-shrink-0" />
          <div>
            <p className="text-xs text-[#6b7a6c] uppercase tracking-wide">Listed On</p>
            <p className="font-semibold text-[#1b2e1b]">
              {product.date
                ? new Date(product.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
            </p>
          </div>
        </div>

        {/* Type */}
        {/* <div className="flex items-center gap-3 p-4 bg-white/70 backdrop-blur-sm border border-[#e4f0e6] rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
          <FaTag className="text-[#2f7030] text-xl flex-shrink-0" />
          <div>
            <p className="text-xs text-[#6b7a6c] uppercase tracking-wide">Type</p>
            <p className="font-semibold text-[#1b2e1b]">{product.type || "-"}</p>
          </div>
        </div> */}

        {/* Location */}
        {product.location && (product.location.district || product.location.taluka || product.location.village) && (
          <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-[#edf8f3] to-[#e5f3ec] rounded-2xl border border-[#d3ead8] shadow-sm hover:shadow-md transition-all dark:bg-none dark:bg-[#1E1E1E] dark:border-white/20">
            <FaMapMarkerAlt className="text-[#317a32] text-xl flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-xs text-[#5e7260] uppercase tracking-wide mb-1">Location</p>
              <div className="space-y-1 text-[#1b2e1b]">
                {product.location.village && (
                  <p className="font-medium">
                    <span className="text-[#617161]">Village: </span> <br/> {product.location.village}
                  </p>
                )}
                {product.location.taluka && (
                  <p className="font-medium">
                    <span className="text-[#617161]">Taluka: </span> <br/> {product.location.taluka}
                  </p>
                )}
                {product.location.district && (
                  <p className="font-medium">
                    <span className="text-[#617161]">District: </span> <br/> {product.location.district}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <div className="border-t border-[#d9e9dd] dark:border-none">
          <h3 className="text-2xl md:text-3xl font-bold text-[#1b2e1b] mb-4 border-b border-[#b6e0b6] pb-2">
            Description
          </h3>
          <p className="text-[#2e3d2f] whitespace-pre-line leading-relaxed text-base md:text-lg tracking-wide">
            {product.description}
          </p>
        </div>
      )}

      {/* Additional Info */}
      {product.additional && Object.keys(product.additional).length > 0 && (
        <div className="border-t border-[#d9e9dd] dark:border-none">
          <h3 className="text-2xl md:text-3xl font-bold text-[#1b2e1b] mb-4 border-b border-[#b6e0b6] pb-2">
            Additional Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(product.additional).map(([key, val]) => (
              <div
                key={key}
                className="p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#e4f0e6] shadow-sm hover:shadow-md hover:scale-[1.01] transition-all dark:bg-[#272727] dark:border-white/20"
              >
                <p className="text-xs text-[#6b7a6c] uppercase tracking-wide mb-1">
                  {key.replace(/_/g, " ")}
                </p>
                <p className="font-semibold text-[#1b2e1b]">{val || "-"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
