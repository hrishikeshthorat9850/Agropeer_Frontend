# FCM Setup Checklist

## ✅ Environment Variables to Add

### Client-Side (`.env.local`)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_VAPID_KEY=
```

### Server-Side (`.env.local` - Keep Secret!)
```env
GOOGLE_APPLICATION_CREDENTIALS=./config/firebase-service-account.json
# OR
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

## 📍 Where to Find Each Value

| Variable | Location in Firebase Console |
|----------|------------------------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Project Settings → General → Your apps → Web app config |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Same as above |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Same as above |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Same as above |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Same as above |
| `NEXT_PUBLIC_FIREBASE_VAPID_KEY` | Project Settings → Cloud Messaging → Web Push certificates |
| `GOOGLE_APPLICATION_CREDENTIALS` | Project Settings → Service accounts → Generate new private key |

## ⚠️ Important Notes

1. **Service Worker Limitation**: `firebase-messaging-sw.js` runs in a service worker context and cannot access `process.env`. You'll need to either:
   - Keep hardcoded values (current approach - OK for public values)
   - Use a build script to inject env vars at build time
   - Use Firebase Remote Config

2. **For Android (Future)**: When adding Capacitor, you'll need:
   - `google-services.json` file in `android/app/`
   - Android package name matching Firebase Android app

3. **Security**: Never commit `.env.local` or service account JSON files!

