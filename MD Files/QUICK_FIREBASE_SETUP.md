# Quick Firebase Setup Guide

## 🔧 Current Issue

The script can't find your Firebase environment variables. Let's fix this!

## ✅ Solution: Create `.env.local` File

1. **Create a file named `.env.local` in your project root** (same folder as `package.json`)

2. **Add these variables** (get values from Firebase Console):

```env
# Firebase Web App Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBUUqhN6r0GRRm1AeoE2kV-WeJ0gphYFH0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=agrogram-5e026.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=agrogram-5e026
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=191374076947
NEXT_PUBLIC_FIREBASE_APP_ID=1:191374076947:web:b48309f4ef57cac861e3e6

# FCM VAPID Key (get from Firebase Console → Cloud Messaging → Web Push certificates)
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key_here

# Service Account (for sending notifications)
GOOGLE_APPLICATION_CREDENTIALS=./config/firebase-service-account.json
# OR use JSON content directly:
# FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

## 📍 Where to Get Values

### Firebase Console Steps:

1. Go to: https://console.firebase.google.com/
2. Select your project: `agrogram-5e026`
3. Click the gear icon ⚙️ → **Project Settings**
4. **General tab** → Scroll to "Your apps" → Click on **Web app**
   - Copy: `apiKey`, `authDomain`, `projectId`, `messagingSenderId`, `appId`
5. **Cloud Messaging tab** → Scroll to "Web Push certificates"
   - Click "Generate key pair" if needed
   - Copy the VAPID key

## 🧪 Test Your Setup

After creating `.env.local`:

```bash
# Check if all variables are loaded
npm run check-firebase-env

# If all good, inject into service worker
npm run inject-firebase
```

## ⚠️ Important

- **Never commit `.env.local` to git** (it should be in `.gitignore`)
- The values shown above are from your existing service worker - you can use them temporarily
- For production, use different Firebase projects for dev/staging/prod

## 🚀 Quick Start (Using Existing Values)

If you want to use the values already in your service worker temporarily:

1. The script will automatically extract them
2. But you should still create `.env.local` for proper configuration
3. The hardcoded values in `firebase-messaging-sw.js` will be replaced

---

## Need Help?

Run this to see what's missing:
```bash
npm run check-firebase-env
```

This will show you exactly which variables are set and which are missing!

