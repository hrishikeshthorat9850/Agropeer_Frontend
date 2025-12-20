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
  
  const pagination = usePagination(initialPage, limit);
  
  // Use refs to store stable references to avoid infinite loops
  const setTotalRef = useRef(pagination.setTotal);
  const setPageRef = useRef(pagination.setPage);
  
  // Update refs when pagination changes
  setTotalRef.current = pagination.setTotal;
  setPageRef.current = pagination.setPage;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchPosts = useCallback(async (page) => {
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

      setPosts(data?.data || []);
      // Use ref to avoid dependency issues
      setTotalRef.current(data?.pagination?.total || 0);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, [limit, userId]);

  useEffect(() => {
    fetchPosts(pagination.page);
  }, [pagination.page, fetchPosts]);

  const refreshPosts = useCallback(() => {
    fetchPosts(pagination.page);
  }, [fetchPosts, pagination.page]);

  const goToPage = useCallback((page) => {
    setPageRef.current(page);
  }, []);

  return {
    posts,
    loading,
    error,
    refreshPosts,
    pagination: {
      ...pagination,
      goToPage,
    },
  };
}
