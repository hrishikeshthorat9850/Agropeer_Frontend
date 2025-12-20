# Firebase Cloud Messaging (FCM) - Environment Variables Guide

## 📋 Required Environment Variables

### 🔵 Client-Side (Web App) - `NEXT_PUBLIC_*` variables

These are exposed to the browser and required for FCM web push notifications:

```env
# Firebase Web App Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# FCM VAPID Key (Web Push)
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key_here
```

### 🔴 Server-Side Only (Keep Secret!)

These should NEVER be exposed to the client:

```env
# Google Service Account (for sending notifications from server)
GOOGLE_APPLICATION_CREDENTIALS=./path/to/service-account-key.json

# OR use JSON content directly (alternative approach)
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}

# Supabase (already exists, but needed for FCM token storage)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

---

## 🔧 How to Get These Values

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create new: `agrogram-5e026`)
3. Go to **Project Settings** (gear icon) → **General** tab

### 2. Get Web App Config

1. In Firebase Console → **Project Settings** → **General**
2. Scroll to **Your apps** section
3. Click on **Web app** (or add one if not exists)
4. Copy the config values:
   - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `messagingSenderId` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `NEXT_PUBLIC_FIREBASE_APP_ID`

### 3. Get VAPID Key (Web Push)

1. Firebase Console → **Project Settings** → **Cloud Messaging** tab
2. Scroll to **Web configuration** section
3. Under **Web Push certificates**, click **Generate key pair**
4. Copy the key → `NEXT_PUBLIC_FIREBASE_VAPID_KEY`

### 4. Get Service Account Key (Server-Side)

**Option A: Download JSON file (Recommended)**
1. Firebase Console → **Project Settings** → **Service accounts** tab
2. Click **Generate new private key**
3. Download the JSON file
4. Save it securely (e.g., `./config/firebase-service-account.json`)
5. Set: `GOOGLE_APPLICATION_CREDENTIALS=./config/firebase-service-account.json`
6. **IMPORTANT**: Add to `.gitignore`!

**Option B: Use environment variable**
1. Copy entire JSON content from service account file
2. Set as: `FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'`
3. Update `lib/fcmServer.js` to parse this instead

---

## 📱 For Future Android App (Capacitor)

When building Android app, you'll also need:

```env
# Android-specific (for Capacitor)
NEXT_PUBLIC_FIREBASE_ANDROID_APP_ID=your_android_app_id
```

**To get Android config:**
1. Firebase Console → **Project Settings** → **General**
2. Add **Android app** (package: `com.yourapp.agrogram`)
3. Download `google-services.json`
4. Place in `android/app/` directory (Capacitor will handle this)

---

## ✅ Current Status Check

Based on your codebase, you currently have:

### ✅ Already Configured:
- `NEXT_PUBLIC_SUPABASE_URL` (for token storage)
- `SUPABASE_SERVICE_ROLE_KEY` (for server-side operations)

### ⚠️ Need to Add:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_VAPID_KEY`
- `GOOGLE_APPLICATION_CREDENTIALS` (or `FIREBASE_SERVICE_ACCOUNT_KEY`)

---

## 🔒 Security Best Practices

1. **Never commit** `.env.local` or service account JSON files
2. Add to `.gitignore`:
   ```
   .env.local
   .env*.local
   *service-account*.json
   config/firebase-service-account.json
   ```
3. Use different Firebase projects for dev/staging/production
4. Rotate service account keys periodically
5. Use environment-specific values in deployment platforms (Vercel, etc.)

---

## 📝 Example `.env.local` File

```env
# Supabase (existing)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Firebase Web Config
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBUUqhN6r0GRRm1AeoE2kV-WeJ0gphYFH0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=agrogram-5e026.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=agrogram-5e026
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=191374076947
NEXT_PUBLIC_FIREBASE_APP_ID=1:191374076947:web:b48309f4ef57cac861e3e6

# FCM VAPID Key
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key_here

# Service Account (server-side only)
GOOGLE_APPLICATION_CREDENTIALS=./config/firebase-service-account.json
```

---

## 🚀 Next Steps

1. ✅ Add all environment variables to `.env.local`
2. ✅ Download and secure service account JSON
3. ✅ Update `firebase-messaging-sw.js` to use env variables
4. ✅ Test FCM token registration
5. ✅ Test sending notifications

---

## 📚 Additional Resources

- [Firebase Console](https://console.firebase.google.com/)
- [FCM Web Setup Guide](https://firebase.google.com/docs/cloud-messaging/js/client)
- [Capacitor FCM Plugin](https://capacitorjs.com/docs/apis/push-notifications)

