"use client";
import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for lazy loading with intersection observer
 * @param {Object} options - Intersection Observer options
 * @returns {[React.RefObject, boolean]} - Ref and visibility state
 */
export function useLazyLoad(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          observer.unobserve(element);
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before visible
        threshold: 0.01,
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasLoaded, options]);

  return [elementRef, isVisible];
}

/**
 * Hook for lazy loading images
 */
export function useLazyImage(src, fallbackSrc = '/placeholder.png') {
  const [imageSrc, setImageSrc] = useState(fallbackSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [elementRef, isVisible] = useLazyLoad();

  useEffect(() => {
    if (isVisible && src && imageSrc === fallbackSrc) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
      };
      img.onerror = () => {
        setIsLoading(false);
      };
    }
  }, [isVisible, src, imageSrc, fallbackSrc]);

  return [elementRef, imageSrc, isLoading];
}

/**
 * Hook for lazy loading data/API calls
 */
export function useLazyFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [elementRef, isVisible] = useLazyLoad();

  useEffect(() => {
    if (isVisible && fetchFn && !data && !loading) {
      setLoading(true);
      setError(null);
      
      Promise.resolve(fetchFn())
        .then(setData)
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [isVisible, ...deps]);

  return [elementRef, { data, loading, error }];
}

