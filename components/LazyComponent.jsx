"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useIntersectionObserver } from "@/utils/lazyLoading";

/**
 * Higher-order component for lazy loading components
 * Wraps dynamic import with loading fallback
 */
export function createLazyComponent(importFn, options = {}) {
  const {
    loading = <LoadingSpinner />,
    ssr = false,
    ...dynamicOptions
  } = options;

  return dynamic(importFn, {
    loading: () => loading,
    ssr,
    ...dynamicOptions,
  });
}

/**
 * Lazy component wrapper with intersection observer
 * Only loads component when it's about to enter viewport
 */
export function LazyComponent({ children, fallback = <LoadingSpinner /> }) {
  const [elementRef, isVisible] = useIntersectionObserver();

  return (
    <div ref={elementRef}>
      {isVisible ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        <div className="min-h-[200px] flex items-center justify-center">
          {fallback}
        </div>
      )}
    </div>
  );
}

