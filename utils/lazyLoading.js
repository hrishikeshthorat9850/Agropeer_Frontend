/**
 * Lazy Loading Utilities
 * Provides hooks and utilities for implementing lazy loading across the project
 */

import { useEffect, useRef, useState } from 'react';

/**
 * Intersection Observer hook for lazy loading elements
 * @param {Object} options - Intersection Observer options
 * @returns {[React.RefObject, boolean]} - Ref to attach to element and visibility state
 */
export function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after first intersection to avoid re-triggering
          observer.unobserve(element);
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before element is visible
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return [elementRef, isVisible];
}

/**
 * Lazy load images with intersection observer
 * @param {string} src - Image source URL
 * @param {string} placeholder - Placeholder image URL
 * @returns {[React.RefObject, boolean, string]} - Ref, loaded state, and image src
 */
export function useLazyImage(src, placeholder = '/placeholder.png') {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [elementRef, isVisible] = useIntersectionObserver();

  useEffect(() => {
    if (isVisible && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        // Keep placeholder on error
        setIsLoaded(false);
      };
    }
  }, [isVisible, src]);

  return [elementRef, isLoaded, imageSrc];
}

/**
 * Lazy load data/API calls when element becomes visible
 * @param {Function} fetchFn - Function to fetch data
 * @param {Array} deps - Dependencies array
 * @returns {[React.RefObject, any, boolean, Error]} - Ref, data, loading, error
 */
export function useLazyData(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [elementRef, isVisible] = useIntersectionObserver();

  useEffect(() => {
    if (isVisible && fetchFn && !data && !loading) {
      setLoading(true);
      setError(null);
      
      Promise.resolve(fetchFn())
        .then((result) => {
          setData(result);
          setError(null);
        })
        .catch((err) => {
          setError(err);
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isVisible, ...deps]);

  return [elementRef, data, loading, error];
}

/**
 * Debounce function for lazy loading
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll-based lazy loading
 */
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

