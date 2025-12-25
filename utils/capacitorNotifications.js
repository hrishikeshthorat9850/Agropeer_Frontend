// utils/capacitorNotifications.js
// Android-specific notification handling using Capacitor Local Notifications
// This is separate from web notifications and doesn't interfere with existing code

let LocalNotifications = null;
let Capacitor = null;

// Lazy load Capacitor plugins only when needed
async function initCapacitor() {
  if (typeof window === 'undefined') return false;

  try {
    // Check if running in Capacitor
    const { Capacitor: Cap } = await import('@capacitor/core');
    Capacitor = Cap;

    if (!Capacitor.isNativePlatform()) {
      return false; // Not on native platform
    }

    // Load Local Notifications plugin
    const { LocalNotifications: LocalNotif } = await import('@capacitor/local-notifications');
    LocalNotifications = LocalNotif;

    return true;
  } catch (error) {
    console.warn('Capacitor plugins not available:', error);
    return false;
  }
}

/**
 * Request notification permissions for Android
 */
export async function requestAndroidNotificationPermission() {
  if (typeof window === 'undefined') return false;

  const isCapacitor = await initCapacitor();
  if (!isCapacitor || !LocalNotifications) return false;

  try {
    const { display } = await LocalNotifications.checkPermissions();
    if (display === 'granted') {
      return true;
    }

    const { display: newDisplay } = await LocalNotifications.requestPermissions();
    return newDisplay === 'granted';
  } catch (error) {
    console.error('Error requesting Android notification permission:', error);
    return false;
  }
}

/**
 * Show local notification on Android
 * @param {object} notification - Notification data
 * @param {string} notification.title - Notification title
 * @param {string} notification.body - Notification body
 * @param {object} notification.data - Additional data payload
 * @param {number} notification.id - Unique notification ID (optional)
 */
export async function showAndroidNotification({ title, body, data = {}, id = null }) {
  if (typeof window === 'undefined') return false;

  const isCapacitor = await initCapacitor();
  if (!isCapacitor || !LocalNotifications) return false;

  try {
    // Always make notification ID a number
    let notificationId = Number(id);

    if (!notificationId || isNaN(notificationId)) {
      notificationId = Math.floor(Date.now() / 1000); // fallback number
    }


    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: notificationId,
          sound: 'default',
          data,
          // Android-specific options
          channelId: 'agrogram_chat',
          smallIcon: 'ic_launcher',
          // Action buttons (optional)
          actionTypeId: 'OPEN_APP',
        },
      ],
    });

    return true;
  } catch (error) {
    console.error('Error showing Android notification:', error);
    return false;
  }
}

/**
 * Check if running on Android/Capacitor
 */
export async function isAndroidPlatform() {
  if (typeof window === 'undefined') return false;

  const isCapacitor = await initCapacitor();
  if (!isCapacitor || !Capacitor) return false;

  return Capacitor.getPlatform() === 'android';
}

/**
 * Setup notification channel for Android (required for Android 8.0+)
 */
export async function setupAndroidNotificationChannel() {
  if (typeof window === 'undefined') return false;

  const isCapacitor = await initCapacitor();
  if (!isCapacitor || !LocalNotifications) return false;

  try {
    // Create notification channel for Android
    await LocalNotifications.createChannel({
      id: 'agrogram_chat',
      name: 'Chat Notifications',
      description: 'Notifications for chat messages',
      importance: 5, // high priority
      sound: 'default',
      visibility: 1,
      lights: true,
      vibration: true,
    });

    // Register action types (optional but good to keep)
    await LocalNotifications.registerActionTypes({
      types: [
        {
          id: 'OPEN_APP',
          actions: [
            {
              id: 'view',
              title: 'View',
            },
          ],
        },
      ],
    });

    return true;
  } catch (error) {
    console.warn('Error setting up Android notification channel:', error);
    return false;
  }
}

