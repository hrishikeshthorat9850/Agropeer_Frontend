/**
 * Platform Adapter for Toast System
 * Detects platform and routes to appropriate implementation
 */

let CapacitorToast = null;
let Capacitor = null;
let isCapacitorInitialized = false;

/**
 * Initialize Capacitor plugins (lazy load)
 */
async function initCapacitor() {
  if (typeof window === 'undefined' || isCapacitorInitialized) {
    return CapacitorToast !== null;
  }

  try {
    const { Capacitor: Cap } = await import('@capacitor/core');
    Capacitor = Cap;

    if (Capacitor.isNativePlatform()) {
      // Try to load Capacitor Toast plugin
      try {
        const { Toast: ToastPlugin } = await import('@capacitor/toast');
        CapacitorToast = ToastPlugin;
        isCapacitorInitialized = true;
        return true;
      } catch (error) {
        console.warn('Capacitor Toast plugin not available, using web fallback');
        isCapacitorInitialized = true;
        return false;
      }
    }
    
    isCapacitorInitialized = true;
    return false;
  } catch (error) {
    console.warn('Capacitor not available:', error);
    isCapacitorInitialized = true;
    return false;
  }
}

/**
 * Check if running on Android/Capacitor
 */
export async function isAndroidPlatform() {
  if (typeof window === 'undefined') return false;
  await initCapacitor();
  return Capacitor?.isNativePlatform() === true && Capacitor?.getPlatform() === 'android';
}

/**
 * Check if Capacitor Toast is available
 */
export async function isCapacitorToastAvailable() {
  await initCapacitor();
  return CapacitorToast !== null;
}

/**
 * Show native Android toast (if available)
 */
export async function showNativeToast(message, duration = 'short') {
  const isAvailable = await isCapacitorToastAvailable();
  
  if (isAvailable && CapacitorToast) {
    try {
      await CapacitorToast.show({
        text: message,
        duration: duration === 'long' ? 'long' : 'short',
        position: 'bottom',
      });
      return true;
    } catch (error) {
      console.warn('Failed to show native toast:', error);
      return false;
    }
  }
  
  return false;
}

/**
 * Get platform info
 */
export async function getPlatformInfo() {
  await initCapacitor();
  
  return {
    isNative: Capacitor?.isNativePlatform() === true,
    platform: Capacitor?.getPlatform() || 'web',
    hasNativeToast: CapacitorToast !== null,
  };
}

