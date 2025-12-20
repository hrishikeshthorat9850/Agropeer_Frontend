"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { usePagination } from './usePagination';
import { apiRequest } from '@/utils/apiHelpers';

/**
 * Hook for fetching products with pagination
 * @param {object} options
 * @param {number} options.initialPage - Initial page number
 * @param {number} options.limit - Items per page
 * @param {string} options.userId - Filter by user ID (optional)
 * @param {string} options.category - Filter by category (optional)
 * @param {string} options.search - Search term (optional)
 */
export function useProductsPaginated({ 
  initialPage = 1, 
  limit = 12,
  userId = null,
  category = null,
  search = null,
} = {}) {
  const [products, setProducts] = useState([]);
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

  const fetchProducts = useCallback(async (page) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        orderBy: 'date',
        order: 'desc',
      });

      if (userId) {
        params.append('userId', userId);
      }

      if (category) {
        params.append('category', category);
      }

      if (search) {
        params.append('search', search);
      }

      const { data, error: apiError } = await apiRequest(`${BASE_URL}/api/products?${params.toString()}`);

      if (apiError) {
        setError(apiError.message || "Failed to load products");
        return;
      }

      setProducts(data?.data || []);
      // Use ref to avoid dependency issues
      setTotalRef.current(data?.pagination?.total || 0);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, [limit, userId, category, search]);

  useEffect(() => {
    fetchProducts(pagination.page);
  }, [pagination.page, fetchProducts]);

  const refreshProducts = useCallback(() => {
    fetchProducts(pagination.page);
  }, [fetchProducts, pagination.page]);

  const goToPage = useCallback((page) => {
    setPageRef.current(page);
  }, []);

  return {
    products,
    loading,
    error,
    refreshProducts,
    pagination: {
      ...pagination,
      goToPage,
    },
  };
}

