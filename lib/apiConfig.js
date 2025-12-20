/**
 * API Configuration for Hybrid Approach
 * This file handles API URL configuration for both web and native apps
 */

// Get API URL from environment variable or use default
export const getApiUrl = () => {
  // For native apps, use the Vercel deployment URL
  // For web, use relative URLs or the same Vercel URL
  if (typeof window !== 'undefined') {
    // Check if running in Capacitor native app
    const isNative = window.Capacitor?.isNativePlatform();
    
    if (isNative) {
      // In native app, use full URL to Vercel
      return process.env.NEXT_PUBLIC_API_URL || 'https://agrogram-wheat.vercel.app';
    } else {
      // In web browser, use relative URLs for same origin, or full URL for different origin
      return process.env.NEXT_PUBLIC_API_URL || '';
    }
  }
  
  // Server-side rendering
  return process.env.NEXT_PUBLIC_API_URL || 'https://agrogram-wheat.vercel.app';
};

/**
 * Helper to create full API endpoint URL
 */
export const createApiUrl = (endpoint) => {
  const baseUrl = getApiUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  if (baseUrl) {
    return `${baseUrl}${cleanEndpoint}`;
  }
  
  return cleanEndpoint;
};

/**
 * Check if running in native app
 */
export const isNativeApp = () => {
  if (typeof window === 'undefined') return false;
  return window.Capacitor?.isNativePlatform() || false;
};

/**
 * Check if running on Android
 */
export const isAndroid = () => {
  if (typeof window === 'undefined') return false;
  if (isNativeApp()) {
    return window.Capacitor?.getPlatform() === 'android';
  }
  return /Android/i.test(navigator.userAgent);
};

