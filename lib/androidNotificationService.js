// lib/androidNotificationService.js
// Android-specific LOCAL notification service (client-side only)
// Separate from web notificationService.js - doesn't interfere with existing code
// NOTE: This file is CLIENT-SIDE ONLY. Push notifications are handled server-side.

import { showAndroidNotification } from '@/utils/capacitorNotifications';

/**
 * Send local notification on Android (when user is online)
 * This is separate from push notifications and works alongside them
 * CLIENT-SIDE ONLY - doesn't import any server-side code
 * @param {string} userId - User ID (optional, for logging)
 * @param {object} notification - Notification data
 * @param {string} notification.title - Notification title
 * @param {string} notification.body - Notification body
 * @param {object} notification.data - Additional data payload
 */
export async function sendAndroidLocalNotification(userId, { title, body, data = {} }) {
  try {
    // Show local notification on Android device
    const success = await showAndroidNotification({
      title,
      body,
      data: {
        ...data,
        userId: userId || null,
        timestamp: new Date().toISOString(),
      },
    });

    return { success };
  } catch (error) {
    console.error('Error sending Android local notification:', error);
    return { success: false, error: error.message };
  }
}

// NOTE: sendAndroidPushNotification is moved to app/api/android/notifications/route.js
// to keep server-side code separate from client-side code

