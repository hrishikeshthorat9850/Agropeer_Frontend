# FCM Push Notifications - Implementation Guide

## ✅ Implementation Complete!

Your FCM push notification system is now fully implemented and ready to use.

---

## 📁 Files Created/Updated

### Core Files
- ✅ `lib/fcmServer.js` - Server-side FCM functions
- ✅ `lib/firebaseClient.js` - Client-side Firebase config (already existed)
- ✅ `hooks/useFcmToken.js` - React hook for FCM token management
- ✅ `components/NotificationHandler.jsx` - Notification UI component

### API Routes
- ✅ `app/api/register-fcm-token/route.js` - Register FCM tokens
- ✅ `app/api/send-notifications/route.js` - Send notifications

### Admin Interface
- ✅ `app/admin/send-notification/page.jsx` - Admin notification sender

### Build Scripts
- ✅ `scripts/inject-firebase-config.js` - Inject env vars into service worker
- ✅ `public/firebase-messaging-sw.template.js` - Service worker template

### Integration
- ✅ `app/LayoutClient.jsx` - Integrated NotificationHandler

---

## 🚀 How It Works

### 1. **Token Registration (Automatic)**
- When a user visits your site, `NotificationHandler` component loads
- It requests notification permission
- Gets FCM token and automatically registers it with your backend
- Token is stored in `fcm_tokens` table in Supabase

### 2. **Sending Notifications**

#### Option A: Admin Interface
1. Go to `/admin/send-notification`
2. Fill in title, body, optional URL/image
3. Choose recipients (All users or Selected)
4. Click "Send Notification"

#### Option B: API Call
```javascript
// Send to single token
fetch('/api/send-notifications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    token: 'user-fcm-token',
    title: 'Hello!',
    body: 'This is a test notification',
    data: { url: '/home' }
  })
});

// Send to multiple tokens
fetch('/api/send-notifications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    tokens: ['token1', 'token2', 'token3'],
    title: 'Hello Everyone!',
    body: 'This is a broadcast notification'
  })
});
```

#### Option C: Server-Side (Node.js)
```javascript
import { sendPushNotification } from '@/lib/fcmServer';

await sendPushNotification({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  token: 'user-fcm-token',
  title: 'Server Notification',
  body: 'This was sent from the server',
  data: { customData: 'value' },
  image: 'https://example.com/image.jpg'
});
```

### 3. **Receiving Notifications**

#### Foreground (App is open)
- Notifications appear as in-app banners via `NotificationHandler`
- Auto-dismiss after 5 seconds

#### Background (App is closed/minimized)
- Service worker handles notifications
- Shows native browser/system notifications
- Clicking notification opens the app to the specified URL

---

## 🧪 Testing

### 1. **Test Token Registration**
1. Open your app in browser
2. Allow notification permission when prompted
3. Check browser console for: `✅ FCM Token obtained`
4. Check Supabase `fcm_tokens` table - should see your token

### 2. **Test Sending Notification**

#### Quick Test via Admin Panel:
1. Login as admin: `/admin/login`
2. Go to: `/admin/send-notification`
3. Fill form and send
4. Check if notification appears

#### Test via API:
```bash
curl -X POST http://localhost:3000/api/send-notifications \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_FCM_TOKEN",
    "title": "Test Notification",
    "body": "This is a test!"
  }'
```

### 3. **Test Foreground Notification**
- Keep app open
- Send notification
- Should see in-app banner

### 4. **Test Background Notification**
- Minimize/close browser tab
- Send notification
- Should see system notification
- Click notification - should open app

---

## 🔧 Setup Steps

### 1. **Run Build Script** (First Time)
```bash
npm run inject-firebase
```
This injects your Firebase config into the service worker.

### 2. **Build for Production**
```bash
npm run build
```
The `prebuild` script automatically runs `inject-firebase` before building.

### 3. **Verify Service Worker**
After build, check `public/firebase-messaging-sw.js` - it should have your Firebase config values.

---

## 📱 For Future Android App (Capacitor)

When you're ready to build Android app:

1. **Install Capacitor FCM Plugin:**
```bash
npm install @capacitor/push-notifications
npx cap sync
```

2. **Update `useFcmToken.js`** to detect platform:
```javascript
import { Capacitor } from '@capacitor/core';

if (Capacitor.isNativePlatform()) {
  // Use Capacitor Push Notifications API
} else {
  // Use current web FCM implementation
}
```

3. **Add Android Config:**
- Place `google-services.json` in `android/app/`
- Update `android/app/build.gradle` with Firebase dependencies

---

## 🐛 Troubleshooting

### Issue: "Service Worker registration failed"
- **Solution**: Make sure you're running on HTTPS or localhost
- Service workers require secure context

### Issue: "No registration token available"
- **Solution**: Check that `NEXT_PUBLIC_FIREBASE_VAPID_KEY` is set correctly
- Verify in Firebase Console → Cloud Messaging → Web Push certificates

### Issue: "Failed to get access token"
- **Solution**: Verify `GOOGLE_APPLICATION_CREDENTIALS` path is correct
- Or check `FIREBASE_SERVICE_ACCOUNT_KEY` JSON is valid

### Issue: "Notification not showing"
- **Check**: Browser notification permission is granted
- **Check**: Service worker is registered (DevTools → Application → Service Workers)
- **Check**: Console for errors

### Issue: "Token not registering"
- **Check**: Supabase `fcm_tokens` table exists
- **Check**: `SUPABASE_SERVICE_ROLE_KEY` is correct
- **Check**: Network tab for API errors

---

## 📊 Database Schema

Make sure your Supabase `fcm_tokens` table has this structure:

```sql
CREATE TABLE IF NOT EXISTS fcm_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  token TEXT UNIQUE NOT NULL,
  device_type TEXT DEFAULT 'web',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fcm_tokens_user_id ON fcm_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_fcm_tokens_token ON fcm_tokens(token);
```

---

## 🔐 Security Notes

1. **Service Account Key**: Never commit to git
2. **Environment Variables**: Keep `.env.local` in `.gitignore`
3. **API Routes**: Consider adding authentication middleware
4. **Rate Limiting**: Implement rate limiting for `/api/send-notifications`

---

## 📚 Next Steps

1. ✅ Test notification sending
2. ✅ Customize notification appearance
3. ✅ Add notification categories/types
4. ✅ Implement notification preferences per user
5. ✅ Add scheduled notifications
6. ✅ Set up notification analytics

---

## 🎉 You're All Set!

Your FCM push notification system is ready to use. Start sending notifications to engage your users!

