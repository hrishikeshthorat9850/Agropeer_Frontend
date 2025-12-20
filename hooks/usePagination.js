"use client";
import { useState, useCallback, useMemo } from "react";

/**
 * Custom hook for pagination
 * @param {number} initialPage - Initial page number
 * @param {number} initialLimit - Items per page
 * @returns {object} Pagination state and controls
 */
export function usePagination(initialPage = 1, initialLimit = 10) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);

  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const hasNextPage = useMemo(() => page < totalPages, [page, totalPages]);
  const hasPreviousPage = useMemo(() => page > 1, [page]);

  const goToPage = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

  const previousPage = useCallback(() => {
    if (hasPreviousPage) {
      setPage((prev) => prev - 1);
    }
  }, [hasPreviousPage]);

  const reset = useCallback(() => {
    setPage(initialPage);
  }, [initialPage]);

  // Memoize setTotal to prevent infinite loops
  const setTotalMemoized = useCallback((newTotal) => {
    setTotal(newTotal);
  }, []);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    setPage: goToPage,
    setLimit,
    setTotal: setTotalMemoized,
    nextPage,
    previousPage,
    reset,
  };
}

