"use client";
import Image from "next/image";
import { useState } from "react";

import { useLanguage } from "@/Context/languagecontext";

/**
 * Lazy-loaded Image component with intersection observer
 * Only loads image when it's about to enter viewport
 */
export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false, // If true, native "eager", else "lazy"
  placeholder = "blur",
  blurDataURL,
  ...props
}) {
  const [error, setError] = useState(false);
  const { t } = useLanguage();

  if (error) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-xs text-center p-1">
          {t("image_failed_to_load") || "Failed"}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "Image"}
      width={width}
      height={height}
      className={`${className} transition-opacity duration-300`}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      placeholder={placeholder === "blur" && blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      onError={() => setError(true)}
      {...props}
    />
  );
}
