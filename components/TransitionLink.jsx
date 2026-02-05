/**
 * TransitionLink Component
 * 
 * OPTIONAL wrapper component for Next.js Link that adds smooth transitions.
 * 
 * IMPORTANT:
 * - This is OPTIONAL - existing Link components work without changes
 * - This component wraps Next.js Link, preserving all original behavior
 * - All Link props are passed through unchanged
 * - Only adds transition enhancement on click
 * 
 * EXISTING BEHAVIOR PRESERVED:
 * - All Link functionality works exactly as before
 * - Prefetching, href, etc. all work normally
 * - Can be used as drop-in replacement (optional)
 * 
 * USAGE:
 * ```jsx
 * // Before (still works):
 * import Link from 'next/link';
 * <Link href="/profile">Profile</Link>
 * 
 * // After (optional enhancement):
 * import TransitionLink from '@/components/TransitionLink';
 * <TransitionLink href="/profile">Profile</TransitionLink>
 * ```
 */

"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { routerPushWithTransition, TRANSITION_TYPES } from "@/utils/pageTransition";

/**
 * Enhanced Link component with smooth transitions
 * 
 * @param {Object} props - Link props + transition options
 * @param {string} props.href - Link href (required)
 * @param {string} props.transitionType - Transition type: 'slide-left' (default), 'fade', 'scale'
 * @param {boolean} props.skipTransition - Skip transition for this link (default: false)
 * @param {Function} props.onClick - Original onClick handler (preserved)
 * @param {React.ReactNode} props.children - Link content
 * @param {...any} props.rest - All other Next.js Link props
 */
export default function TransitionLink({
  href,
  transitionType = TRANSITION_TYPES.SLIDE_LEFT,
  skipTransition = false,
  onClick,
  children,
  ...rest
}) {
  const router = useRouter();

  /**
   * Enhanced click handler that wraps original onClick with transition
   * 
   * PRESERVES:
   * - Original onClick behavior
   * - Default link behavior (if onClick doesn't preventDefault)
   * - All Link functionality
   */
  const handleClick = useCallback((e) => {
    // Call original onClick if provided
    // This preserves existing onClick behavior exactly
    if (onClick) {
      const result = onClick(e);
      
      // If onClick prevents default, don't navigate
      if (e.defaultPrevented) {
        return;
      }
    }

    // If transition is skipped, use normal navigation
    if (skipTransition) {
      return; // Let Link handle navigation normally
    }

    // Prevent default Link navigation temporarily
    e.preventDefault();

    // Navigate with transition
    routerPushWithTransition(router, href, { type: transitionType });
  }, [href, transitionType, skipTransition, onClick, router]);

  // If transition is skipped, use normal Link (no enhancement)
  if (skipTransition) {
    return (
      <Link href={href} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  // Enhanced Link with transition
  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}

/**
 * Convenience export for different transition types
 */
export const SlideLink = (props) => (
  <TransitionLink {...props} transitionType={TRANSITION_TYPES.SLIDE_LEFT} />
);

export const FadeLink = (props) => (
  <TransitionLink {...props} transitionType={TRANSITION_TYPES.FADE} />
);

export const ScaleLink = (props) => (
  <TransitionLink {...props} transitionType={TRANSITION_TYPES.SCALE} />
);
