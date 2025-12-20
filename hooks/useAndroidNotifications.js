// hooks/useAndroidNotifications.js
// React hook for Android notifications using Capacitor
// Separate from web notifications - doesn't interfere with existing code

import { useEffect, useState } from 'react';
import {
  requestAndroidNotificationPermission,
  setupAndroidNotificationChannel,
  isAndroidPlatform,
} from '@/utils/capacitorNotifications';

/**
 * Hook to manage Android notification permissions and setup
 * Only works on Android/Capacitor, does nothing on web
 */
export function useAndroidNotifications() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      const android = await isAndroidPlatform();
      setIsAndroid(android);

      if (!android) {
        setIsReady(true);
        return; // Not Android, skip setup
      }

      try {
        // Setup notification channel first
        await setupAndroidNotificationChannel();
        
        // Request permission
        const granted = await requestAndroidNotificationPermission();
        setHasPermission(granted);
      } catch (error) {
        console.error('Error initializing Android notifications:', error);
      } finally {
        setIsReady(true);
      }
    }

    init();
  }, []);

  return {
    isAndroid,
    hasPermission,
    isReady,
  };
}

