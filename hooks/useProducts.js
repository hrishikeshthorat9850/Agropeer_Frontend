"use client";

import { useState, useEffect, useCallback } from "react";
import { apiRequest } from "@/utils/apiHelpers";
import { useLogin } from "@/Context/logincontext";

/**
 * Hook for fetching products (non-paginated, for backward compatibility)
 * For pagination, use useProductsPaginated instead
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useLogin();
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error: apiError } = await apiRequest(`${BASE_URL}/api/products?limit=50`);

      if (apiError) {
        console.error("Error in fetching products...", apiError);
        setError(apiError);
        return;
      }

      setProducts(data?.data || []);
    } catch (e) {
      console.error("Error in fetchProducts...", e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, user?.id]); // Refetch if user changes

  const refreshProducts = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refreshProducts };
}
