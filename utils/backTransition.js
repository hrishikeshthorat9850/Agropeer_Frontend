/**
 * Smooth Back Transition Utility
 *
 * PURPOSE:
 * Enhances existing back button handling with smooth UI transitions.
 * This utility is ADDITIVE and NON-INVASIVE - it does NOT replace or modify
 * existing back button logic.
 *
 * EXISTING BACK HANDLING (preserved):
 * - AppShell.jsx: App.addListener("backButton") with canGoBack logic
 * - Double-tap-to-exit functionality
 * - window.history.back() calls
 * - All existing behavior remains unchanged
 *
 * HOW IT WORKS:
 * 1. Wraps existing back navigation calls
 * 2. Adds CSS classes for smooth exit animations
 * 3. Waits for animation to complete before navigation
 * 4. Cleans up after navigation
 *
 * USAGE:
 * - attachBackTransition() - Enhances AppShell handler
 * - playBackAnimation(callback) - Plays transition before callback
 * - onBeforeBack(callback) - Registers pre-back hook
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const TRANSITION_DURATION = 350; // ms - Instagram feel (350ms)
const TRANSITION_CLASS_EXIT = "back-transition-exit";
const TRANSITION_CLASS_ENTER = "back-transition-enter";

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

/**
 * Callbacks registered to run before back navigation
 * @type {Set<Function>}
 */
const beforeBackCallbacks = new Set();

/**
 * Whether a transition is currently in progress
 * @type {boolean}
 */
let isTransitioning = false;

/**
 * Whether enter animation is already playing (prevents duplicate animations)
 * @type {boolean}
 */
let isEnterAnimationPlaying = false;

/**
 * The main content container element (usually body or #__next)
 * @type {HTMLElement | null}
 */
let contentContainer = null;

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
 * @returns {Promise<void>}
 */
function playExitAnimation() {
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

    // Force GPU acceleration for smooth animation
    container.style.transform = "translateZ(0)";
    container.style.willChange = "transform, opacity";

    // Add exit class
    container.classList.add(TRANSITION_CLASS_EXIT);

    // Wait for animation to complete
    const handleAnimationEnd = (e) => {
      // Only handle our transition, ignore child animations
      if (e.target === container && e.animationName?.includes("back-exit")) {
        container.removeEventListener("animationend", handleAnimationEnd);
        resolve();
      }
    };

    container.addEventListener("animationend", handleAnimationEnd);

    // Fallback timeout (safety net) - shorter for faster feel
    setTimeout(() => {
      container.removeEventListener("animationend", handleAnimationEnd);
      resolve();
    }, TRANSITION_DURATION + 20);
  });
}

/**
 * Applies enter animation class (for when navigating back TO a page)
 * This is called after navigation completes
 */
function playEnterAnimation() {
  // Prevent duplicate enter animations
  if (isEnterAnimationPlaying) {
    return;
  }

  if (typeof window === "undefined" || !document) return;

  const container = getContentContainer();
  if (!container) return;

  // Mark as playing to prevent duplicates
  isEnterAnimationPlaying = true;

  // Force GPU acceleration for smooth animation
  container.style.transform = "translateZ(0)";
  container.style.willChange = "transform, opacity";

  // Remove exit class if present
  container.classList.remove(TRANSITION_CLASS_EXIT);

  // Add enter class
  container.classList.add(TRANSITION_CLASS_ENTER);

  // Remove enter class after animation completes
  const handleAnimationEnd = () => {
    container.classList.remove(TRANSITION_CLASS_ENTER);
    // Remove will-change for better performance after animation
    container.style.willChange = "";
    container.removeEventListener("animationend", handleAnimationEnd);
    // Reset flag after animation completes
    isEnterAnimationPlaying = false;
  };

  container.addEventListener("animationend", handleAnimationEnd);

  // Fallback cleanup
  setTimeout(() => {
    container.classList.remove(TRANSITION_CLASS_ENTER);
    container.style.willChange = "";
    container.removeEventListener("animationend", handleAnimationEnd);
    // Reset flag
    isEnterAnimationPlaying = false;
  }, TRANSITION_DURATION + 20);
}

/**
 * Cleans up transition classes (safety function)
 */
function cleanupTransitionClasses() {
  if (typeof window === "undefined" || !document) return;

  const container = getContentContainer();
  if (!container) return;

  container.classList.remove(TRANSITION_CLASS_EXIT);
  container.classList.remove(TRANSITION_CLASS_ENTER);
  // Remove will-change for better performance
  container.style.willChange = "";
  // Reset flags
  isEnterAnimationPlaying = false;
  isTransitioning = false;
}

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Plays back transition animation before executing a callback
 *
 * This is the main function to wrap existing back navigation calls.
 * It plays the exit animation, then executes the callback (which should
 * perform the actual navigation), then plays the enter animation.
 *
 * @param {Function} navigationCallback - The existing back navigation function to wrap
 * @param {Object} options - Optional configuration
 * @param {boolean} options.skipEnterAnimation - Skip enter animation (default: false)
 * @returns {Promise<void>}
 *
 * @example
 * // Wrap existing window.history.back() call
 * playBackAnimation(() => window.history.back());
 *
 * @example
 * // Wrap router.back() call
 * playBackAnimation(() => router.back());
 */
export async function playBackAnimation(navigationCallback, options = {}) {
  // Prevent concurrent transitions
  if (isTransitioning) {
    // If already transitioning, just execute callback without animation
    navigationCallback();
    return;
  }

  isTransitioning = true;

  try {
    // Run registered before-back callbacks
    const callbackPromises = Array.from(beforeBackCallbacks).map((cb) => {
      try {
        return Promise.resolve(cb());
      } catch (error) {
        console.warn("[backTransition] Error in before-back callback:", error);
        return Promise.resolve();
      }
    });
    await Promise.all(callbackPromises);

    // Save scroll position before navigating back
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      // Store in sessionStorage for persistence across navigation
      if (scrollY > 0) {
        sessionStorage.setItem(`scroll_${currentPath}`, scrollY.toString());
      }
    }

    // Start exit animation immediately (non-blocking)
    playExitAnimation();

    // Execute navigation immediately for instant response (native Android feel)
    navigationCallback();

    // Play enter animation immediately after navigation (simultaneous with exit)
    if (!options.skipEnterAnimation) {
      // Use requestAnimationFrame to ensure DOM has updated, but don't wait
      requestAnimationFrame(() => {
        playEnterAnimation();

        // Restore scroll position after navigation completes (native Android behavior)
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          const savedScroll = sessionStorage.getItem(`scroll_${currentPath}`);
          if (savedScroll) {
            const scrollY = parseInt(savedScroll);
            if (scrollY > 0) {
              // Small delay to ensure DOM is ready
              setTimeout(() => {
                window.scrollTo({
                  top: scrollY,
                  left: 0,
                  behavior: "instant",
                });
              }, 50);
            }
          }
        }
      });
    }
  } catch (error) {
    console.error("[backTransition] Error during transition:", error);
    // Ensure navigation still happens even if transition fails
    navigationCallback();
  } finally {
    // Reset transition state after a short delay
    setTimeout(() => {
      isTransitioning = false;
      // Also reset enter animation flag in case it got stuck
      isEnterAnimationPlaying = false;
    }, TRANSITION_DURATION + 50);
  }
}

/**
 * Registers a callback to run before back navigation
 *
 * Useful for cleanup, state saving, or other pre-navigation tasks.
 * Callbacks are executed in registration order.
 *
 * @param {Function} callback - Function to call before back navigation
 * @returns {Function} Unregister function
 *
 * @example
 * const unregister = onBeforeBack(() => {
 *   console.log('About to navigate back');
 * });
 * // Later: unregister();
 */
export function onBeforeBack(callback) {
  if (typeof callback !== "function") {
    console.warn("[backTransition] onBeforeBack: callback must be a function");
    return () => {};
  }

  beforeBackCallbacks.add(callback);

  // Return unregister function
  return () => {
    beforeBackCallbacks.delete(callback);
  };
}

/**
 * Enhances an existing back button handler with smooth transitions
 *
 * This function wraps an existing back handler function, adding
 * transition animations while preserving all original behavior.
 *
 * @param {Function} originalHandler - The existing back handler function
 * @returns {Function} Enhanced handler with transitions
 *
 * @example
 * // In AppShell.jsx:
 * const enhancedHandler = attachBackTransition(({ canGoBack }) => {
 *   if (canGoBack) {
 *     window.history.back();
 *   }
 * });
 *
 * App.addListener("backButton", enhancedHandler);
 */
export function attachBackTransition(originalHandler) {
  if (typeof originalHandler !== "function") {
    console.warn(
      "[backTransition] attachBackTransition: handler must be a function",
    );
    return originalHandler;
  }

  return async (event) => {
    // If transition is already in progress, skip to prevent double-triggering
    if (isTransitioning) {
      return;
    }

    // For exit app case, don't add transition (immediate exit)
    // Check if this is an exit scenario by examining the handler's logic
    // We'll let the original handler decide, but wrap navigation calls

    // Call original handler, but intercept navigation calls
    const result = originalHandler(event);

    // If handler returns a promise, wait for it
    if (result instanceof Promise) {
      await result;
    }

    // Note: The actual navigation wrapping happens in playBackAnimation
    // This wrapper just ensures we don't double-trigger during transitions
  };
}

/**
 * Wraps window.history.back() with transition
 *
 * Convenience function for direct use
 *
 * @returns {Promise<void>}
 */
export function backWithTransition() {
  return playBackAnimation(() => {
    window.history.back();
  });
}

/**
 * Wraps router.back() with transition
 *
 * Convenience function for Next.js router
 *
 * @param {Object} router - Next.js router object
 * @returns {Promise<void>}
 */
export function routerBackWithTransition(router) {
  if (!router || typeof router.back !== "function") {
    console.warn(
      "[backTransition] routerBackWithTransition: invalid router object",
    );
    return Promise.resolve();
  }

  return playBackAnimation(() => {
    router.back();
  });
}

/**
 * Resets the transition utility (for testing/cleanup)
 *
 * Clears all callbacks and resets state
 */
export function resetBackTransition() {
  beforeBackCallbacks.clear();
  isTransitioning = false;
  isEnterAnimationPlaying = false;
  contentContainer = null;
  cleanupTransitionClasses();
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initializes the back transition utility
 *
 * Sets up event listeners and prepares the utility for use.
 * Should be called once when the app loads.
 */
export function initBackTransition() {
  if (typeof window === "undefined") return;

  // Clean up on page unload
  window.addEventListener("beforeunload", cleanupTransitionClasses);

  // NOTE: Removed popstate listener here because:
  // 1. playBackAnimation() already handles enter animation after navigation
  // 2. Having both causes duplicate animations and shaking
  // 3. The popstate listener was causing the enter animation to fire twice
  // If needed for browser back button (non-Capacitor), handle it separately

  console.log("[backTransition] Initialized");
}

// Auto-initialize if in browser
if (typeof window !== "undefined") {
  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBackTransition);
  } else {
    initBackTransition();
  }
}
