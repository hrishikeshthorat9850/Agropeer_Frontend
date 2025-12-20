import { useEffect, useState, useRef } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { getMessagingIfSupported } from '@/lib/firebaseClient';
import { useLogin } from '@/Context/logincontext';

// Detect Native Shell
async function isNativePlatform() {
  if (typeof window === 'undefined') return false;
  try {
    const { Capacitor } = await import('@capacitor/core');
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

// Check HTTPS or localhost
function isSecureContext() {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  const isLocalhost = ['localhost', '127.0.0.1', '[::1]'].includes(hostname);
  return window.isSecureContext || window.location.protocol === 'https:' || isLocalhost;
}

export default function useFcmToken(onForegroundMessage) {
  const [token, setToken] = useState(null);
  const [permission, setPermission] = useState('default');
  const { user } = useLogin();  
  const registerLock = useRef(false); // prevents multiple API calls on re-renders

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isMounted = true;

    async function setupWebFcm() {
      if (await isNativePlatform()) return;

      if (!isSecureContext()) {
        console.warn('⚠️ Notifications require HTTPS or localhost');
        return;
      }

      if (!('serviceWorker' in navigator)) {
        console.warn('⚠️ Browser does not support Service Workers.');
        return;
      }

      try {
        const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

        if (isMounted) {
          await requestAndGetToken(reg);
        }
      } catch (err) {
        console.error("❌ Service Worker registration failed:", err);
      }
    }

    async function requestAndGetToken(swReg) {
      const perm = await Notification.requestPermission();
      setPermission(perm);

      if (perm !== 'granted') return;

      const messaging = await getMessagingIfSupported();
      if (!messaging) return;

      try {
        const newToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: swReg,
        });

        if (!newToken) return;

        setToken(newToken);

        const storedToken = localStorage.getItem('fcm_token');
        const storedUser = localStorage.getItem('fcm_user_id');

        const currentUserId = user?.id || null;

        // Avoid duplicate registration
        if (storedToken === newToken && storedUser === currentUserId) {
          console.log("🔄 Token unchanged — skipping backend registration");
          return;
        }

        await registerTokenWithServer(newToken, currentUserId);

        localStorage.setItem('fcm_token', newToken);
        localStorage.setItem('fcm_user_id', currentUserId);
        
      } catch (err) {
        console.error("❌ Error getting FCM token:", err);
      }
    }

    setupWebFcm();

    // Foreground message handler
    (async () => {
      if (await isNativePlatform()) return;

      const messaging = await getMessagingIfSupported();
      if (!messaging) return;

      onMessage(messaging, (payload) => {
        if (onForegroundMessage) onForegroundMessage(payload);
      });
    })();

    return () => {
      isMounted = false;
    };
  }, [onForegroundMessage]);

  /**
   * Re-register when:
   * - Token exists AND
   * - User logs in (id changes)
   */
  useEffect(() => {
    if (!token || !user?.id) return;

    const storedUser = localStorage.getItem('fcm_user_id');

    // Only re-register if user ID changed
    if (storedUser !== user.id) {
      registerTokenWithServer(token, user.id)
        .then(() => {
          localStorage.setItem('fcm_user_id', user.id);
        })
        .catch(err => console.error("❌ Error re-registering:", err));
    }
  }, [token, user?.id]);

  return { token, permission };
}

/**
 * Safely send token to backend with JSON protection
 */
async function registerTokenWithServer(token, userId) {
  if (!token) return;

  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    await fetch(`${BASE_URL}/api/register-fcm-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        deviceType: 'web',
        userId: userId || null,
      }),
    });
    console.log("📨 Token registered:", token);
  } catch (err) {
    console.error("❌ FCM token registration failed:", err);
  }
}
