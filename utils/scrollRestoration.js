/**
 * Scroll Position Restoration Utility
 * 
 * PURPOSE:
 * Preserves scroll position when navigating back, providing native Android app feel.
 * Only scrolls to top on forward navigation (new pages).
 * 
 * HOW IT WORKS:
 * 1. Saves scroll position before navigation
 * 2. Detects if navigation is back vs forward
 * 3. Restores scroll position on back navigation
 * 4. Scrolls to top on forward navigation
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

// Store scroll positions per route
const scrollPositions = new Map();

// Track navigation direction
let isBackNavigation = false;
let previousPathname = null;

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Saves current scroll position for a route
 * @param {string} pathname - The route pathname
 */
export function saveScrollPosition(pathname) {
  if (typeof window === 'undefined') return;
  
  const normalizedPath = normalizePath(pathname);
  const scrollY = window.scrollY || window.pageYOffset || 0;
  
  scrollPositions.set(normalizedPath, scrollY);
}

/**
 * Restores scroll position for a route
 * @param {string} pathname - The route pathname
 * @param {boolean} smooth - Whether to use smooth scrolling (default: false)
 */
export function restoreScrollPosition(pathname, smooth = false) {
  if (typeof window === 'undefined') return;
  
  const normalizedPath = normalizePath(pathname);
  const savedPosition = scrollPositions.get(normalizedPath);
  
  if (savedPosition !== undefined && savedPosition > 0) {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      window.scrollTo({
        top: savedPosition,
        left: 0,
        behavior: smooth ? 'smooth' : 'instant',
      });
    });
    return true;
  }
  
  return false;
}

/**
 * Clears saved scroll position for a route
 * @param {string} pathname - The route pathname
 */
export function clearScrollPosition(pathname) {
  const normalizedPath = normalizePath(pathname);
  scrollPositions.delete(normalizedPath);
}

/**
 * Normalizes pathname (removes trailing slash)
 * @param {string} path - The pathname
 * @returns {string} Normalized pathname
 */
function normalizePath(path) {
  if (!path) return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

/**
 * Marks navigation as back navigation
 */
export function markBackNavigation() {
  isBackNavigation = true;
  // Reset flag after a short delay
  setTimeout(() => {
    isBackNavigation = false;
  }, 100);
}

/**
 * Checks if current navigation is back navigation
 * @returns {boolean}
 */
export function isNavigatingBack() {
  return isBackNavigation;
}

/**
 * Tracks pathname changes to detect back navigation
 * @param {string} currentPathname - Current pathname
 * @returns {boolean} True if this is back navigation
 */
export function trackNavigation(currentPathname) {
  const normalizedCurrent = normalizePath(currentPathname);
  const normalizedPrevious = previousPathname ? normalizePath(previousPathname) : null;
  
  // If we're going back to a previous pathname, it's likely back navigation
  const isBack = normalizedPrevious !== null && 
                 scrollPositions.has(normalizedCurrent) &&
                 normalizedCurrent !== normalizedPrevious;
  
  previousPathname = currentPathname;
  
  return isBack;
}

/**
 * Handles scroll restoration for a route change
 * @param {string} pathname - Current pathname
 * @param {boolean} forceScrollToTop - Force scroll to top (default: false)
 */
export function handleScrollRestoration(pathname, forceScrollToTop = false) {
  if (typeof window === 'undefined') return;
  
  const normalizedPath = normalizePath(pathname);
  
  // Never scroll to top on /posts (infinite scroll page)
  if (normalizedPath === "/posts") {
    return;
  }
  
  // If forcing scroll to top (forward navigation)
  if (forceScrollToTop) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return;
  }
  
  // Check if this is back navigation
  const isBack = trackNavigation(pathname) || isNavigatingBack();
  
  if (isBack) {
    // Restore scroll position
    const restored = restoreScrollPosition(pathname);
    if (!restored) {
      // If no saved position, scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  } else {
    // Forward navigation - scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
}

/**
 * Initializes scroll restoration system
 */
export function initScrollRestoration() {
  if (typeof window === 'undefined') return;
  
  // Disable browser default scroll restoration
  if (window.history) {
    window.history.scrollRestoration = 'manual';
  }
  
  // Save scroll position before navigation (popstate = back/forward)
  window.addEventListener('popstate', () => {
    // Mark as back navigation
    markBackNavigation();
  });
  
  // Save scroll position periodically (for forward navigation)
  let scrollSaveTimer = null;
  window.addEventListener('scroll', () => {
    // Debounce scroll position saving
    clearTimeout(scrollSaveTimer);
    scrollSaveTimer = setTimeout(() => {
      const currentPath = window.location.pathname;
      saveScrollPosition(currentPath);
    }, 150);
  }, { passive: true });
  
  // Save scroll position before page unload
  window.addEventListener('beforeunload', () => {
    const currentPath = window.location.pathname;
    saveScrollPosition(currentPath);
  });
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollRestoration);
  } else {
    initScrollRestoration();
  }
}
