// 🚀 Create a notification channel (Android only)
export async function setupAndroidNotificationChannel() {
  const { Capacitor } = await import("@capacitor/core");
  if (!Capacitor.isNativePlatform()) return; // Skip on web

  const { LocalNotifications } = await import("@capacitor/local-notifications");

  await LocalNotifications.createChannel({
    id: "agrogram_chat",              // Channel ID (must match in notifications)
    name: "Chat Notifications",       // Name shown in system settings
    description: "Notifications for chat messages",
    importance: 5,                    // 5 = HIGH priority pop-up notification
    sound: "default",                 // Use default notification sound
    visibility: 1,                    // SHOW content on lock screen
    lights: true,
    vibration: true,
  });
}
