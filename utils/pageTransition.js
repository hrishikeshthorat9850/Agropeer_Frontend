/**
 * Smooth Page Navigation Transition Utility
 *
 * PURPOSE:
 * Enhances forward page navigation with smooth UI transitions.
 * This utility is ADDITIVE and NON-INVASIVE - it does NOT replace or modify
 * existing navigation logic.
 *
 * EXISTING NAVIGATION (preserved):
 * - router.push() calls work exactly as before
 * - router.replace() calls work exactly as before
 * - Next.js Link components work exactly as before
 * - All existing navigation behavior remains unchanged
 *
 * COORDINATION WITH BACK TRANSITIONS:
 * - Uses distinct CSS classes: page-transition-* (vs back-transition-*)
 * - Prevents conflicts with back transition utility
 * - Both can run independently without interference
 *
 * HOW IT WORKS:
 * 1. Wraps existing navigation calls (router.push, router.replace)
 * 2. Adds CSS classes for smooth exit animations
 * 3. Waits for animation to complete before navigation
 * 4. Plays enter animation after navigation completes
 * 5. Cleans up after navigation
 *
 * USAGE:
 * - navigateWithTransition(callback, type?) - Wraps navigation with transition
 * - routerPushWithTransition(router, path) - Convenience for router.push
 * - routerReplaceWithTransition(router, path) - Convenience for router.replace
 * - onBeforeNavigate(callback) - Registers pre-navigation hook
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const TRANSITION_DURATION = 280; // ms - slightly faster than back (280ms vs 300ms)
const TRANSITION_CLASS_EXIT_FORWARD = "page-transition-exit-forward";
const TRANSITION_CLASS_ENTER_FORWARD = "page-transition-enter-forward";

// Animation types
export const TRANSITION_TYPES = {
  SLIDE_LEFT: "slide-left", // Default: Android forward navigation feel
  FADE: "fade",
  SCALE: "scale",
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

/**
 * Callbacks registered to run before forward navigation
 * @type {Set<Function>}
 */
const beforeNavigateCallbacks = new Set();

/**
 * Whether a forward transition is currently in progress
 * @type {boolean}
 */
let isTransitioning = false;

/**
 * The main content container element (usually body or #__next)
 * @type {HTMLElement | null}
 */
let contentContainer = null;

/**
 * Current transition type
 * @type {string}
 */
let currentTransitionType = TRANSITION_TYPES.SLIDE_LEFT;

// ============================================================================
// CORE TRANSITION FUNCTIONS
// ============================================================================

/**
 * Finds the main content container element
 * @returns {HTMLElement | null}
 */
function getContentContainer() {
  if (contentContainer) return contentContainer;

  // Try common container selectors
  const selectors = ["#__next", "main", "body", '[role="main"]'];
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      contentContainer = element;
      return element;
    }
  }

  // Fallback to body
  contentContainer = document.body;
  return contentContainer;
}

/**
 * Applies exit animation class to content container
 * @param {string} type - Animation type (slide-left, fade, scale)
 * @returns {Promise<void>}
 */
function playExitAnimation(type = TRANSITION_TYPES.SLIDE_LEFT) {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !document) {
      resolve();
      return;
    }

    const container = getContentContainer();
    if (!container) {
      resolve();
      return;
    }

    // Add exit class with type modifier
    container.classList.add(TRANSITION_CLASS_EXIT_FORWARD);
    container.setAttribute("data-transition-type", type);

    // Wait for animation to complete
    const handleAnimationEnd = (e) => {
      // Only handle our transition, ignore child animations
      if (
        e.target === container &&
        e.animationName?.includes("page-exit-forward")
      ) {
        container.removeEventListener("animationend", handleAnimationEnd);
        resolve();
      }
    };

    container.addEventListener("animationend", handleAnimationEnd);

    // Fallback timeout (safety net)
    setTimeout(() => {
      container.removeEventListener("animationend", handleAnimationEnd);
      resolve();
    }, TRANSITION_DURATION + 50);
  });
}

/**
 * Applies enter animation class (for when navigating TO a page)
 * This is called after navigation completes
 * @param {string} type - Animation type
 */
function playEnterAnimation(type = TRANSITION_TYPES.SLIDE_LEFT) {
  if (typeof window === "undefined" || !document) return;

  const container = getContentContainer();
  if (!container) return;

  // Remove exit class if present
  container.classList.remove(TRANSITION_CLASS_EXIT_FORWARD);

  // Add enter class with type modifier
  container.classList.add(TRANSITION_CLASS_ENTER_FORWARD);
  container.setAttribute("data-transition-type", type);

  // Remove enter class after animation completes
  const handleAnimationEnd = () => {
    container.classList.remove(TRANSITION_CLASS_ENTER_FORWARD);
    container.removeAttribute("data-transition-type");
    container.removeEventListener("animationend", handleAnimationEnd);
  };

  container.addEventListener("animationend", handleAnimationEnd);

  // Fallback cleanup
  setTimeout(() => {
    container.classList.remove(TRANSITION_CLASS_ENTER_FORWARD);
    container.removeAttribute("data-transition-type");
    container.removeEventListener("animationend", handleAnimationEnd);
  }, TRANSITION_DURATION + 50);
}

/**
 * Cleans up transition classes (safety function)
 */
function cleanupTransitionClasses() {
  if (typeof window === "undefined" || !document) return;

  const container = getContentContainer();
  if (!container) return;

  container.classList.remove(TRANSITION_CLASS_EXIT_FORWARD);
  container.classList.remove(TRANSITION_CLASS_ENTER_FORWARD);
  container.removeAttribute("data-transition-type");
}

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Plays forward navigation transition animation before executing a callback
 *
 * This is the main function to wrap existing forward navigation calls.
 * It plays the exit animation, then executes the callback (which should
 * perform the actual navigation), then plays the enter animation.
 *
 * @param {Function} navigationCallback - The existing navigation function to wrap
 * @param {Object} options - Optional configuration
 * @param {string} options.type - Animation type: 'slide-left' (default), 'fade', 'scale'
 * @param {boolean} options.skipEnterAnimation - Skip enter animation (default: false)
 * @returns {Promise<void>}
 *
 * @example
 * // Wrap existing router.push() call
 * navigateWithTransition(() => router.push('/profile'), { type: 'slide-left' });
 *
 * @example
 * // Wrap router.replace() call
 * navigateWithTransition(() => router.replace('/home'));
 */
export async function navigateWithTransition(navigationCallback, options = {}) {
  // Prevent concurrent transitions
  if (isTransitioning) {
    // If already transitioning, just execute callback without animation
    navigationCallback();
    return;
  }

  const { type = TRANSITION_TYPES.SLIDE_LEFT, skipEnterAnimation = false } =
    options;
  currentTransitionType = type;
  isTransitioning = true;

  try {
    // Dispatch custom event for direction awareness in React components
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("agropeer-nav-direction", {
          detail: { direction: "forward" },
        }),
      );
    }

    // Run registered before-navigate callbacks
    const callbackPromises = Array.from(beforeNavigateCallbacks).map((cb) => {
      try {
        return Promise.resolve(cb());
      } catch (error) {
        console.warn(
          "[pageTransition] Error in before-navigate callback:",
          error,
        );
        return Promise.resolve();
      }
    });
    await Promise.all(callbackPromises);

    // Play exit animation
    await playExitAnimation(type);

    // Execute the original navigation callback
    // This preserves existing behavior exactly
    navigationCallback();

    // Play enter animation after navigation (if not skipped)
    if (!skipEnterAnimation) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        playEnterAnimation(type);
      });
    }
  } catch (error) {
    console.error("[pageTransition] Error during transition:", error);
    // Ensure navigation still happens even if transition fails
    navigationCallback();
  } finally {
    // Reset transition state after a short delay
    setTimeout(() => {
      isTransitioning = false;
    }, TRANSITION_DURATION);
  }
}

/**
 * Convenience function: Wraps router.push() with transition
 *
 * @param {Object} router - Next.js router object
 * @param {string} path - Path to navigate to
 * @param {Object} options - Transition options
 * @returns {Promise<void>}
 *
 * @example
 * routerPushWithTransition(router, '/profile');
 */
export function routerPushWithTransition(router, path, options = {}) {
  if (!router || typeof router.push !== "function") {
    console.warn(
      "[pageTransition] routerPushWithTransition: invalid router object",
    );
    return Promise.resolve();
  }

  return navigateWithTransition(() => {
    router.push(path);
  }, options);
}

/**
 * Convenience function: Wraps router.replace() with transition
 *
 * @param {Object} router - Next.js router object
 * @param {string} path - Path to navigate to
 * @param {Object} options - Transition options
 * @returns {Promise<void>}
 *
 * @example
 * routerReplaceWithTransition(router, '/home');
 */
export function routerReplaceWithTransition(router, path, options = {}) {
  if (!router || typeof router.replace !== "function") {
    console.warn(
      "[pageTransition] routerReplaceWithTransition: invalid router object",
    );
    return Promise.resolve();
  }

  return navigateWithTransition(() => {
    router.replace(path);
  }, options);
}

/**
 * Registers a callback to run before forward navigation
 *
 * Useful for cleanup, state saving, or other pre-navigation tasks.
 * Callbacks are executed in registration order.
 *
 * @param {Function} callback - Function to call before navigation
 * @returns {Function} Unregister function
 *
 * @example
 * const unregister = onBeforeNavigate(() => {
 *   console.log('About to navigate forward');
 * });
 * // Later: unregister();
 */
export function onBeforeNavigate(callback) {
  if (typeof callback !== "function") {
    console.warn(
      "[pageTransition] onBeforeNavigate: callback must be a function",
    );
    return () => {};
  }

  beforeNavigateCallbacks.add(callback);

  // Return unregister function
  return () => {
    beforeNavigateCallbacks.delete(callback);
  };
}

/**
 * Resets the transition utility (for testing/cleanup)
 *
 * Clears all callbacks and resets state
 */
export function resetPageTransition() {
  beforeNavigateCallbacks.clear();
  isTransitioning = false;
  contentContainer = null;
  currentTransitionType = TRANSITION_TYPES.SLIDE_LEFT;
  cleanupTransitionClasses();
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initializes the page transition utility
 *
 * Sets up event listeners and prepares the utility for use.
 * Should be called once when the app loads.
 */
export function initPageTransition() {
  if (typeof window === "undefined") return;

  // Clean up on page unload
  window.addEventListener("beforeunload", cleanupTransitionClasses);

  // Handle route changes (Next.js)
  // This ensures enter animations play when navigating TO a page
  if (typeof window !== "undefined") {
    // Listen for Next.js route change events
    const handleRouteChange = () => {
      // Small delay to let navigation complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Only play enter animation if we're not in a back transition
          const container = getContentContainer();
          if (
            container &&
            !container.classList.contains("back-transition-exit")
          ) {
            playEnterAnimation(currentTransitionType);
          }
        });
      });
    };

    // Next.js doesn't expose route change events directly, so we use
    // a combination of popstate and a custom event system
    window.addEventListener("popstate", handleRouteChange);

    // Also listen for custom navigation events (if dispatched elsewhere)
    window.addEventListener("next-navigation", handleRouteChange);
  }

  console.log("[pageTransition] Initialized");
}

// Auto-initialize if in browser
if (typeof window !== "undefined") {
  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPageTransition);
  } else {
    initPageTransition();
  }
}
