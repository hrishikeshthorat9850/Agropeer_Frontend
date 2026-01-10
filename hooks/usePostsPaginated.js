"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { usePagination } from './usePagination';
import { apiRequest } from '@/utils/apiHelpers';

/**
 * Hook for fetching posts with pagination
 * @param {object} options
 * @param {number} options.initialPage - Initial page number
 * @param {number} options.limit - Items per page
 * @param {string} options.userId - Filter by user ID (optional)
 */
export function usePostsPaginated({
  initialPage = 1,
  limit = 10,
  userId = null
} = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const pagination = usePagination(initialPage, limit);

  // Use refs to store stable references to avoid infinite loops
  const setTotalRef = useRef(pagination.setTotal);
  const setPageRef = useRef(pagination.setPage);

  // Update refs when pagination changes
  setTotalRef.current = pagination.setTotal;
  setPageRef.current = pagination.setPage;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchPosts = useCallback(async (page, isRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        orderBy: 'created_at',
        order: 'desc',
      });

      if (userId) {
        params.append('userId', userId);
      }

      const { data, error: apiError } = await apiRequest(`${BASE_URL}/api/posts?${params.toString()}`);

      if (apiError) {
        setError(apiError.message || "Failed to load posts");
        return;
      }

      const newPosts = data?.data || [];
      const total = data?.pagination?.total || 0;

      // Update posts state: replace if refresh or page 1, else append
      setPosts(prevPosts => {
        if (page === 1 || isRefresh) {
          return newPosts;
        }

        // Filter out duplicates just in case
        const existingIds = new Set(prevPosts.map(p => p.id));
        const uniqueNewPosts = newPosts.filter(p => !existingIds.has(p.id));

        return [...prevPosts, ...uniqueNewPosts];
      });

      // Update hasMore based on whether we received fewer items than limit
      setHasMore(newPosts.length === limit);

      // Use ref to avoid dependency issues
      setTotalRef.current(total);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, [limit, userId, BASE_URL]);

  useEffect(() => {
    fetchPosts(pagination.page);
  }, [pagination.page, fetchPosts]);

  const refreshPosts = useCallback(() => {
    // Reset to page 1 for refresh
    setPageRef.current(1);
    fetchPosts(1, true);
  }, [fetchPosts]);

  const goToPage = useCallback((page) => {
    setPageRef.current(page);
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPageRef.current(pagination.page + 1);
    }
  }, [loading, hasMore, pagination.page]);

  return {
    posts,
    loading,
    error,
    refreshPosts,
    hasMore,
    loadMore,
    pagination: {
      ...pagination,
      goToPage,
    },
  };
}
