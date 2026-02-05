/**
 * usePageTransition Hook
 * 
 * React hook for using smooth forward page transitions in components.
 * 
 * This hook provides an easy way to enhance forward navigation with
 * smooth transitions while preserving existing navigation logic.
 * 
 * EXISTING BEHAVIOR PRESERVED:
 * - All router.push() calls work as before
 * - All router.replace() calls work as before
 * - No breaking changes to existing code
 * 
 * COORDINATION:
 * - Works alongside useBackTransition hook
 * - Uses distinct CSS classes to prevent conflicts
 * - Both can be used independently
 * 
 * USAGE:
 * ```jsx
 * import { usePageTransition } from '@/hooks/usePageTransition';
 * import { useRouter } from 'next/navigation';
 * 
 * function MyComponent() {
 *   const router = useRouter();
 *   const { push, replace } = usePageTransition();
 *   
 *   return (
 *     <button onClick={() => push('/profile')}>
 *       Go to Profile
 *     </button>
 *   );
 * }
 * ```
 */

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  navigateWithTransition,
  routerPushWithTransition,
  routerReplaceWithTransition,
  TRANSITION_TYPES,
} from '@/utils/pageTransition';

/**
 * Hook for smooth forward page transitions
 * 
 * @param {Object} options - Configuration options
 * @param {Object} options.router - Optional Next.js router (auto-detected if not provided)
 * @param {string} options.defaultType - Default transition type (default: 'slide-left')
 * @returns {Object} Transition utilities
 */
export function usePageTransition(options = {}) {
  const nextRouter = useRouter();
  const { defaultType = TRANSITION_TYPES.SLIDE_LEFT } = options;

  /**
   * Navigate forward with smooth transition using router.push()
   * 
   * @param {string} path - Path to navigate to
   * @param {Object} transitionOptions - Optional transition options
   */
  const push = useCallback((path, transitionOptions = {}) => {
    return routerPushWithTransition(nextRouter, path, {
      type: defaultType,
      ...transitionOptions,
    });
  }, [nextRouter, defaultType]);

  /**
   * Navigate forward with smooth transition using router.replace()
   * 
   * @param {string} path - Path to navigate to
   * @param {Object} transitionOptions - Optional transition options
   */
  const replace = useCallback((path, transitionOptions = {}) => {
    return routerReplaceWithTransition(nextRouter, path, {
      type: defaultType,
      ...transitionOptions,
    });
  }, [nextRouter, defaultType]);

  /**
   * Play transition before executing a custom callback
   * 
   * Useful for custom navigation logic
   * 
   * @param {Function} callback - Navigation callback to wrap
   * @param {Object} transitionOptions - Transition options
   */
  const navigate = useCallback((callback, transitionOptions = {}) => {
    return navigateWithTransition(callback, {
      type: defaultType,
      ...transitionOptions,
    });
  }, [defaultType]);

  return {
    push,
    replace,
    navigate,
    TRANSITION_TYPES, // Export types for convenience
  };
}

/**
 * Convenience hook that returns ready-to-use navigation functions
 * with a specific transition type
 * 
 * @param {string} transitionType - Transition type (slide-left, fade, scale)
 * @returns {Object} Navigation functions with specified transition type
 */
export function usePageTransitionWithType(transitionType = TRANSITION_TYPES.SLIDE_LEFT) {
  return usePageTransition({ defaultType: transitionType });
}
