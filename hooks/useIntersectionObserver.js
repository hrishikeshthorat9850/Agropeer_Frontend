"use client";
import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for infinite scrolling using Intersection Observer
 * @param {Object} options
 * @param {Function} options.onIntersect - Callback function when element intersects
 * @param {boolean} options.enabled - Whether observer should be active
 * @param {Object} options.rootMargin - Margin around root
 * @param {number} options.threshold - Visibility threshold
 */
export function useIntersectionObserver({
    onIntersect,
    enabled = true,
    root = null,
    rootMargin = '0px',
    threshold = 0.1
}) {
    const targetRef = useRef(null);

    useEffect(() => {
        if (!enabled) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    onIntersect();
                }
            },
            { root, rootMargin, threshold }
        );

        const currentTarget = targetRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [enabled, onIntersect, root, rootMargin, threshold]);

    return targetRef;
}
