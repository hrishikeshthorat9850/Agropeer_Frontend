"use client";
import { useState, useEffect, useCallback } from 'react';
import { usePagination } from './usePagination';
import { apiRequest } from '@/utils/apiHelpers';

/**
 * Hook for fetching user favorites with pagination
 * @param {object} options
 * @param {string} options.userId - User ID (required)
 * @param {string} options.type - 'posts' or 'products' (default: 'posts')
 * @param {number} options.initialPage - Initial page number
 * @param {number} options.limit - Items per page
 */
export function useFavoritesPaginated({ 
  userId,
  type = "posts",
  initialPage = 1, 
  limit = 10,
} = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const pagination = usePagination(initialPage, limit);

  const fetchFavorites = useCallback(async (page = pagination.page) => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        userId,
        type,
        page: page.toString(),
        limit: pagination.limit.toString(),
      });

      const { data, error: apiError } = await apiRequest(`${BASE_URL}/api/user-favorites?${params.toString()}`);

      if (apiError) {
        setError(apiError.message || "Failed to load favorites");
        return;
      }

      setItems(data?.data || []);
      pagination.setTotal(data?.pagination?.total || 0);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, [userId, type, pagination.limit, pagination]);

  useEffect(() => {
    fetchFavorites(pagination.page);
  }, [pagination.page, fetchFavorites]);

  const refreshFavorites = useCallback(() => {
    fetchFavorites(pagination.page);
  }, [fetchFavorites, pagination.page]);

  const goToPage = useCallback((page) => {
    pagination.setPage(page);
  }, [pagination]);

  return {
    items,
    loading,
    error,
    refreshFavorites,
    pagination: {
      ...pagination,
      goToPage,
    },
  };
}

