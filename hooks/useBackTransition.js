/**
 * useBackTransition Hook
 * 
 * React hook for using smooth back transitions in components.
 * 
 * This hook provides an easy way to enhance UI back buttons with
 * smooth transitions while preserving existing navigation logic.
 * 
 * EXISTING BEHAVIOR PRESERVED:
 * - All router.back() calls work as before
 * - All window.history.back() calls work as before
 * - No breaking changes to existing code
 * 
 * USAGE:
 * ```jsx
 * import { useBackTransition } from '@/hooks/useBackTransition';
 * import { useRouter } from 'next/navigation';
 * 
 * function MyComponent() {
 *   const router = useRouter();
 *   const { backWithTransition } = useBackTransition();
 *   
 *   return (
 *     <button onClick={() => backWithTransition(router)}>
 *       Go Back
 *     </button>
 *   );
 * }
 * ```
 */

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { playBackAnimation, routerBackWithTransition, backWithTransition as backWithTransitionUtil } from '@/utils/backTransition';

/**
 * Hook for smooth back transitions
 * 
 * @param {Object} options - Configuration options
 * @param {Object} options.router - Optional Next.js router (auto-detected if not provided)
 * @returns {Object} Transition utilities
 */
export function useBackTransition(options = {}) {
  const nextRouter = useRouter();

  /**
   * Navigate back with smooth transition using Next.js router
   * 
   * @param {Object} router - Optional router (uses hook's router if not provided)
   */
  const routerBack = useCallback((router = nextRouter) => {
    return routerBackWithTransition(router);
  }, [nextRouter]);

  /**
   * Navigate back with smooth transition using window.history
   */
  const backWithTransition = useCallback(() => {
    return backWithTransitionUtil();
  }, []);

  /**
   * Play transition before executing a custom callback
   * 
   * Useful for custom navigation logic
   * 
   * @param {Function} callback - Navigation callback to wrap
   * @param {Object} transitionOptions - Transition options
   */
  const playTransition = useCallback((callback, transitionOptions) => {
    return playBackAnimation(callback, transitionOptions);
  }, []);

  return {
    routerBack,
    backWithTransition,
    playTransition,
  };
}

/**
 * Convenience hook that returns a ready-to-use back handler
 * 
 * @returns {Function} Back handler function
 */
export function useBackHandler() {
  const { routerBack } = useBackTransition();
  return routerBack;
}
