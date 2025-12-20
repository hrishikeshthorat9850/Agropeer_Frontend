"use client";
import { useState, useEffect, useCallback } from 'react';
import { apiRequest } from '@/utils/apiHelpers';

/**
 * Hook for fetching posts (non-paginated, for backward compatibility)
 * For pagination, use usePostsPaginated instead
 */
export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: apiError } = await apiRequest(`${BASE_URL}/api/posts?limit=50`);

      if (apiError) {
        setError(apiError.message || "Failed to load posts. Please try again later.");
        return;
      }

      setPosts(data?.data || []);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const refreshPosts = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refreshPosts };
}
