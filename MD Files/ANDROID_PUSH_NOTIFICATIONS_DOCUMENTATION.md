# Android Push Notifications – Full Documentation

This document explains **how Android push notifications work** in Agrogram, **which function to use** to send them, **how to change the notification UI**, and **how to use** the feature end-to-end.

---

## Table of Contents

1. [How Android Push Notifications Work](#1-how-android-push-notifications-work)
2. [Which Function to Use to Send Notifications](#2-which-function-to-use-to-send-notifications)
3. [Changing the UI of Push Notifications on Android](#3-changing-the-ui-of-push-notifications-on-android)
4. [Usage Guide](#4-usage-guide)
5. [Environment & Database](#5-environment--database)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. How Android Push Notifications Work

### High-level flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Your backend   │     │  Firebase FCM    │     │  Android device  │
│  (Node server)  │────▶│  (Google)        │────▶│  (Agrogram app)  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                         │                         │
        │ 1. sendNotificationToUser()                       │
        │    with userId, title, body, data                  │
        │                         │ 2. FCM delivers          │
        │                         │    to device token       │
        │                         │                         │ 3. System shows
        │                         │                         │    notification
        │                         │                         │    (or in-app)
```

### Two paths on Android

| User state        | What happens                                                                 |
|------------------|-------------------------------------------------------------------------------|
| **App in background / killed** | FCM delivers the message → **Android system** shows the notification (tray). Tap opens app and can deep-link using `data.url` or `data.conversationId`. |
| **App in foreground**         | FCM still delivers → **Capacitor** `pushNotificationReceived` fires → your code shows a **local notification** via `showAndroidNotification()` so the user sees a heads-up. Tap is handled by `pushNotificationActionPerformed` and deep-links. |

### Main components

| Component | Role |
|----------|------|
| **FCM (Firebase Cloud Messaging)** | Google’s service that delivers messages to devices using FCM tokens. |
| **FCM token** | Per-device token stored in Supabase `fcm_tokens` and registered when the user opens the app (see `useNativeFcmToken.js`). |
| **Server** | Looks up tokens by `user_id`, then calls Firebase FCM HTTP v1 API to send the message (see `server/lib/fcmServer.js` and `server/lib/notificationService.js`). |
| **Capacitor** | On Android, `@capacitor/push-notifications` receives FCM messages; `@capacitor/local-notifications` is used to show the in-foreground local notification. |

### Files involved

| File | Purpose |
|------|--------|
| `server/lib/notificationService.js` | **Primary API**: `sendNotificationToUser(userId, { title, body, data })`. Fetches FCM tokens, saves to `notifications` table, calls FCM. |
| `server/lib/fcmServer.js` | Builds FCM payload and sends to Firebase (`sendPushNotification`, `sendPushNotificationToMultiple`). |
| `hooks/useNativeFcmToken.js` | On Android: requests permission, registers with FCM, registers token with your backend, subscribes to `pushNotificationReceived` and `pushNotificationActionPerformed`. |
| `components/AndroidNotificationHandler.jsx` | Uses `useNativeFcmToken`; on foreground receive calls `showAndroidNotification()`; on action tap runs `router.push(data.url)` or chats deep-link. |
| `utils/capacitorNotifications.js` | `showAndroidNotification()`, `setupAndroidNotificationChannel()`, permission helpers. |
| `utils/capacitorNotificationsChannel.js` | Defines the Android notification channel (e.g. `agrogram_chat`). |

---

## 2. Which Function to Use to Send Notifications

### Recommended: `sendNotificationToUser` (server-side)

Use this for **all** push notifications (chat, weather, comments, etc.). It sends to **every device** of the user (web + Android) and respects user preference.

**Location:** `server/lib/notificationService.js`

**Signature:**

```js
import { sendNotificationToUser } from '@/server/lib/notificationService';

await sendNotificationToUser(userId, {
  title: 'Notification title',
  body: 'Notification body text',
  data: {
    type: 'chat_message',           // optional: your type
    url: '/chats?conversation=xyz',  // used for deep link on tap
    conversationId: '...',           // optional: used by Android handler
    // ... any string key-value pairs (all values are stringified by FCM)
  },
  image: null,  // optional: URL of image for rich notification
});
```

**Behavior:**

- Checks user metadata `notifications_enabled` (if `false`, skips).
- Inserts into `notifications` table (in-app list).
- Loads all FCM tokens for that `user_id` from `fcm_tokens`.
- Calls `sendPushNotificationToMultiple()` so **both web and Android** get the same message.

**Example (chat) – already in codebase:**

```js
// server/server.js (concept)
await sendNotificationToUser(recipientId, {
  title: notificationTitle,
  body: notificationBody,
  data: {
    type: 'chat_message',
    conversationId: conversation_id,
    url: `/chats?conversation=${conversation_id}`,
    platform: 'all',
  },
});
```

**Example (new feature, e.g. comment):**

```js
const { sendNotificationToUser } = await import('@/server/lib/notificationService');

await sendNotificationToUser(postOwnerId, {
  title: 'New comment on your post',
  body: `${commenterName}: ${commentPreview}`,
  data: {
    type: 'post_comment',
    url: `/posts?postId=${postId}`,
    postId,
    commentId,
  },
});
```

### Optional: `sendWeatherAlert` (server-side, with rate limit)

For **weather alerts only**, use this so rate limiting (e.g. 3 per user per day) and DB logging are applied.

**Location:** `server/lib/notificationService.js`

```js
await sendWeatherAlert(userId, {
  type: 'high_temp',
  title: 'High temperature alert',
  body: 'Temperature is 38°C. Ensure crops are well irrigated.',
  weatherData: { temperature: 38 },
});
```

### Do **not** use for normal app notifications

- **`showAndroidNotification()`** – client-only; use only when you already received a push (e.g. in foreground) and want to show a local notification. Do not call from server.
- **`sendPushNotification()` / `sendPushNotificationToMultiple()`** – low-level FCM; prefer `sendNotificationToUser()` so token lookup, DB, and user preferences are handled.

---

## 3. Changing the UI of Push Notifications on Android

Notification “UI” on Android is controlled by:

1. **FCM payload** (server) – title, body, image, **channel**, priority, sound.
2. **Notification channel** (client/native) – name, description, importance, sound, vibration, visibility.
3. **Local notification options** (client) – used when showing the **foreground** notification (channel, icon, actions).

Below is where to change each part.

### 3.1 Server-side: FCM payload (tray notification when app is in background)

**File:** `server/lib/fcmServer.js`

Function: `sendPushNotification` (used by `sendPushNotificationToMultiple`). The `android` block controls what the **system** shows when the app is in background or killed.

**Current snippet:**

```js
android: {
  priority: "high",
  notification: {
    sound: "default",
    channelId: "default",
  },
},
```

**What you can change:**

| Option | Purpose |
|--------|--------|
| `channelId` | Must match a channel created on the device (e.g. `"agrogram_chat"` or a new one like `"agrogram_general"`). Controls sound, importance, visibility in settings. |
| `sound` | `"default"` or custom sound resource. |
| `priority` | `"high"` or `"normal"`. High helps show heads-up. |
| **Image** | Already supported: pass `image: 'https://...'` in `sendPushNotification`; FCM shows it as big picture (where supported). |

**Example – use a dedicated channel and high priority:**

```js
android: {
  priority: "high",
  notification: {
    sound: "default",
    channelId: "agrogram_chat",  // match channel created in app
  },
},
```

If you add more notification types (e.g. weather, posts), you can use different `channelId` values and define one channel per type in the app (see below).

---

### 3.2 Client-side: Notification channel (name, sound, importance, visibility)

Channels define how notifications **look and behave** in the system (sound, vibration, lockscreen visibility, etc.). They are created in the app; the server only references them by `channelId`.

**File 1:** `utils/capacitorNotificationsChannel.js`  
**File 2:** `utils/capacitorNotifications.js` → `setupAndroidNotificationChannel()`

Both create a channel with id `agrogram_chat`. Prefer one place (e.g. `capacitorNotifications.js`) so you don’t duplicate.

**Current channel (concept):**

```js
await LocalNotifications.createChannel({
  id: 'agrogram_chat',
  name: 'Chat Notifications',
  description: 'Notifications for chat messages',
  importance: 5,        // 5 = HIGH (heads-up, sound)
  sound: 'default',
  visibility: 1,         // SHOW on lock screen
  lights: true,
  vibration: true,
});
```

**What you can change:**

| Field | Values / effect |
|-------|------------------|
| `id` | Must match `channelId` in FCM payload (e.g. `agrogram_chat`). |
| `name` | Shown in Android Settings → Notifications → your app. |
| `description` | Shown in channel settings. |
| `importance` | 1=min, 2=low, 3=default, 4=high, 5=max (heads-up + sound). |
| `sound` | `'default'` or custom (e.g. `'content://...'`). |
| `visibility` | 0=secret, 1=show, 2=public. |
| `lights` | Notification LED. |
| `vibration` | Use system default vibration pattern. |

To change the **visible UI** (e.g. “Chat” vs “Alerts”), edit `name` and `description` here and ensure server uses the same `channelId`.

---

### 3.3 Client-side: Foreground local notification (icon, channel, actions)

When the app is **in foreground**, the handler shows a **local** notification via `showAndroidNotification()` in `utils/capacitorNotifications.js`. That controls the **foreground** look and tap behavior.

**Current call:**

```js
await LocalNotifications.schedule({
  notifications: [{
    title,
    body,
    id: notificationId,
    sound: 'default',
    data,
    channelId: 'agrogram_chat',
    smallIcon: 'ic_launcher',
    actionTypeId: 'OPEN_APP',
  }],
});
```

**What you can change:**

| Option | Purpose |
|--------|--------|
| `channelId` | Must match the channel created above (e.g. `agrogram_chat`). |
| `smallIcon` | Android drawable name (e.g. `ic_launcher`, `ic_notification`). Shown in status bar and left of the notification. |
| `actionTypeId` | Must match an action type registered in `setupAndroidNotificationChannel()` (e.g. `OPEN_APP` with a “View” action). |
| `largeIcon` | Optional; not shown in snippet – add if your Capacitor plugin supports it. |

**Icon:**  
- `smallIcon` must be a **drawable resource** in the Android project (e.g. `android/app/src/main/res/drawable/ic_notification.png`).  
- If you add `ic_notification`, reference it as `smallIcon: 'ic_notification'` (without extension).  
- White/transparent icon for status bar works best.

---

### 3.4 Native Android (optional): Custom layout / style

If you build the Android app with Capacitor (`android/` folder):

- **Channel:** Already created from JS; you can add more channels in the same way for different `channelId`s.
- **Custom layout:** Android allows custom notification layouts via `NotificationCompat` and `setCustomContentView()` / `setCustomBigContentView()`. That requires **native code** in the Android project (Java/Kotlin), not in this repo’s JS. Capacitor’s local notification plugin does not expose custom layouts; you’d need a custom plugin or native modification.

For most cases, changing **title**, **body**, **image** (server), **channel name/description**, **importance**, and **smallIcon** (client) is enough to “change the UI” of push notifications.

---

## 4. Usage Guide

### 4.1 Sending a notification from your backend

1. **Import (dynamic import is fine):**

   ```js
   const { sendNotificationToUser } = await import('@/server/lib/notificationService');
   ```

2. **Call with recipient and content:**

   ```js
   await sendNotificationToUser(recipientUserId, {
     title: 'Your title',
     body: 'Your body',
     data: {
       url: '/path/to/open',  // deep link when user taps
       type: 'your_type',
       id: 'some_id',
     },
   });
   ```

3. **Optional image:**

   ```js
   await sendNotificationToUser(userId, {
     title: 'New post',
     body: 'Someone you follow posted.',
     image: 'https://your-cdn.com/image.jpg',
     data: { url: '/posts?postId=123' },
   });
   ```

4. **Error handling (non-blocking):**

   ```js
   try {
     await sendNotificationToUser(recipientId, { title, body, data });
   } catch (e) {
     console.error('Notification send failed:', e);
   }
   ```

### 4.2 Where to call it (examples)

- **Chat:** Already in `server/server.js` – when a message is saved and recipient is offline or not viewing that conversation.
- **Weather:** Use `sendWeatherAlert()` from weather cron/job (see `app/api/weather-alerts/check-and-send/route.js`).
- **New features (e.g. comments, likes):** After saving the comment/like in your API or server logic, get the **recipient user id**, then call `sendNotificationToUser(recipientId, { ... })` with an appropriate `data.url` (e.g. `/posts?postId=...`).

### 4.3 Deep link on Android

- Put the target path in `data.url` (e.g. `data.url: '/chats?conversation=xyz'`).
- `AndroidNotificationHandler` and `useNativeFcmToken` use `data.url` or `data.conversationId` to open the right screen when the user taps the notification.

---

## 5. Environment & Database

### Environment variables (see also `MD Files/FCM_ENV_VARIABLES.md`)

- **Server:**  
  `GOOGLE_APPLICATION_CREDENTIALS` (path to Firebase service account JSON) or `FIREBASE_SERVICE_ACCOUNT_KEY` (JSON string).  
  `NEXT_PUBLIC_FIREBASE_PROJECT_ID` or `FIREBASE_PROJECT_ID` for FCM.
- **Supabase:**  
  `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (for tokens and `notifications` table).
- **Android app:**  
  Firebase Android app with `google-services.json` in the Android project; FCM token is registered via `useNativeFcmToken` and stored in `fcm_tokens`.

### Database

- **`fcm_tokens`**  
  Columns: `user_id`, `token`, `device_type` (e.g. `'android'`). Used to resolve `userId` → FCM tokens for sending.

- **`notifications`**  
  Optional; used to store a copy of notifications (title, body, link, seen) for in-app notification list.

---

## 6. Troubleshooting

| Issue | What to check |
|-------|----------------|
| No notification on Android | User has granted notification permission; FCM token is registered for that user in `fcm_tokens`; server env (service account, project ID) is correct; no errors in server logs when calling `sendNotificationToUser`. |
| Notification received but tap does nothing | Ensure `data.url` or `data.conversationId` is set and that `AndroidNotificationHandler` / `useNativeFcmToken` `onAction` uses it (e.g. `router.push(data.url)`). |
| Different look than expected | Align `channelId` between server (`fcmServer.js`) and client channel creation; adjust channel `name`, `importance`, `sound`; set `smallIcon` in `capacitorNotifications.js` and add the drawable in the Android project. |
| Notifications disabled for user | `sendNotificationToUser` checks `user_metadata.notifications_enabled === false` and skips; ensure you’re not overriding that. |

---

## Quick reference

| Goal | Where |
|------|--------|
| Send push to a user (web + Android) | `sendNotificationToUser(userId, { title, body, data })` in `server/lib/notificationService.js` |
| Send weather alert (rate-limited) | `sendWeatherAlert(userId, { type, title, body, weatherData })` in same file |
| Change FCM payload (channel, priority) | `server/lib/fcmServer.js` → `sendPushNotification` → `android` block |
| Change channel name/importance/sound | `utils/capacitorNotifications.js` → `setupAndroidNotificationChannel()` and/or `utils/capacitorNotificationsChannel.js` |
| Change foreground notification icon | `utils/capacitorNotifications.js` → `showAndroidNotification()` → `smallIcon` |
| Handle tap / deep link | `components/AndroidNotificationHandler.jsx` and `hooks/useNativeFcmToken.js` (`onAction`, `data.url`, `data.conversationId`) |

This is the complete picture of how Android push notifications work, which function to use, how to change their UI, and how to use the feature in your codebase.
