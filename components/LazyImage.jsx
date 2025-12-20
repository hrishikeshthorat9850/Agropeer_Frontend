"use client";
import Image from "next/image";
import { useState } from "react";
import { useIntersectionObserver } from "@/utils/lazyLoading";

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
  priority = false,
  placeholder = "blur",
  blurDataURL,
  ...props
}) {
  const [elementRef, isVisible] = useIntersectionObserver();
  const [imageError, setImageError] = useState(false);

  // If priority is true, load immediately
  if (priority) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority
        {...props}
      />
    );
  }

  return (
    <div ref={elementRef} className={className} style={{ width, height }}>
      {isVisible && !imageError ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          loading="lazy"
          onError={() => setImageError(true)}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          {...props}
        />
      ) : (
        <div
          className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
          style={{ width, height }}
        >
          {imageError && (
            <span className="text-gray-400 text-sm">Failed to load</span>
          )}
        </div>
      )}
    </div>
  );
}

