# Android Build Guide - Hybrid Approach

This guide explains how to build a native Android APK while keeping your Vercel deployment working.

## 🎯 Overview

We use a **hybrid approach**:
- **Web deployment**: Normal Next.js build (works on Vercel)
- **Android build**: Static export build (native app experience)
- **API calls**: Point to Vercel deployment URL

## 📋 Prerequisites

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Install additional Capacitor plugins** (if not already installed):
   ```bash
   npm install @capacitor/camera @capacitor/filesystem @capacitor/geolocation @capacitor/device @capacitor/network @capacitor/share @capacitor/clipboard @capacitor/haptics @capacitor/preferences @capacitor/status-bar @capacitor/splash-screen @capacitor/keyboard
   ```

3. **Android Studio**: Make sure Android Studio is installed with:
   - Android SDK
   - Gradle
   - Java JDK

## 🚀 Building Android APK

### Quick Build

```bash
# Build Next.js and sync with Capacitor
npm run build:android

# Build and create APK
npm run build:android -- --apk
```

### Step-by-Step Process

1. **Build Next.js with static export**:
   ```bash
   npm run build:android
   ```
   This script:
   - Temporarily modifies `next.config.mjs` to enable static export
   - Builds the Next.js app
   - Syncs with Capacitor
   - Restores original config

2. **Open in Android Studio** (optional):
   ```bash
   npm run cap:open
   ```

3. **Build APK**:
   ```bash
   # Debug APK
   npm run android:build:debug

   # Release APK (for Play Store)
   npm run android:build
   ```

   APK location: `android/app/build/outputs/apk/release/app-release.apk`

## 🔧 Configuration Files

### `capacitor.config.json`
- `webDir`: Set to `"out"` (static export output)
- `plugins`: Configured for splash screen, status bar, keyboard, etc.

### `next.config.mjs`
- **Web builds**: Normal configuration (no static export)
- **Android builds**: Temporarily adds `output: 'export'` via build script

### `AndroidManifest.xml`
- Added permissions for camera, storage, location, network
- Configured for hardware acceleration
- Keyboard input mode set to `adjustResize`

## 📱 Native Features Available

### Already Configured:
- ✅ Push Notifications
- ✅ Local Notifications
- ✅ Toast Messages
- ✅ App Lifecycle

### Newly Added:
- ✅ Camera Access
- ✅ File System
- ✅ Geolocation
- ✅ Device Info
- ✅ Network Status
- ✅ Share Functionality
- ✅ Clipboard
- ✅ Haptics (Vibration)
- ✅ Status Bar Control
- ✅ Splash Screen
- ✅ Keyboard Handling
- ✅ Preferences (Local Storage)

## 🔌 Using Native Features

### Example: Camera
```javascript
import { Camera } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: 'base64'
  });
};
```

### Example: File System
```javascript
import { Filesystem, Directory } from '@capacitor/filesystem';

const writeFile = async () => {
  await Filesystem.writeFile({
    path: 'data.txt',
    data: 'Hello World',
    directory: Directory.Data
  });
};
```

### Example: API Calls (Hybrid Approach)
```javascript
import { createApiUrl } from '@/lib/apiConfig';

// In your API calls
const response = await fetch(createApiUrl('/api/posts'));
```

## 🌐 API Configuration

### For Native App:
- API calls go to: `https://agrogram-wheat.vercel.app/api/*`
- Configured via `NEXT_PUBLIC_API_URL` environment variable
- Uses `lib/apiConfig.js` helper

### For Web:
- Uses relative URLs (same origin)
- Falls back to Vercel URL if needed

## 🚢 Deployment Impact

### ✅ Vercel Deployment (Unchanged)
- Your normal `npm run build` still works
- API routes continue to function
- No changes needed to deployment process

### ✅ Android Build (Separate)
- Uses separate build script
- Doesn't affect Vercel deployment
- Creates standalone APK

## 📝 Environment Variables

Create `.env.local` for local development:
```env
NEXT_PUBLIC_API_URL=https://agrogram-wheat.vercel.app
```

For production Android app, the API URL is hardcoded in `lib/apiConfig.js` or set via environment variable.

## 🐛 Troubleshooting

### Build Fails
1. Check if `out/` directory exists after build
2. Verify Capacitor sync: `npx cap sync android`
3. Check Android Studio for errors

### API Calls Not Working
1. Verify `NEXT_PUBLIC_API_URL` is set correctly
2. Check network permissions in AndroidManifest.xml
3. Test API URL in browser first

### App Crashes on Launch
1. Check Android logs: `adb logcat`
2. Verify all plugins are installed
3. Check AndroidManifest.xml permissions

## 📦 Building for Play Store

1. **Generate signed APK**:
   - Create keystore (if not exists)
   - Configure signing in `android/app/build.gradle`
   - Build release APK

2. **Test on real device**:
   ```bash
   adb install android/app/build/outputs/apk/release/app-release.apk
   ```

3. **Upload to Play Store**:
   - Use the signed APK from `android/app/release/`

## 🎨 Customization

### App Icon
Replace icons in: `android/app/src/main/res/mipmap-*/`

### Splash Screen
Configure in `capacitor.config.json` and add images to `android/app/src/main/res/`

### App Name
Change in:
- `capacitor.config.json` → `appName`
- `android/app/src/main/res/values/strings.xml`

## 📚 Additional Resources

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Android Build Guide](https://developer.android.com/studio/build)

## ✅ Checklist

Before building APK:
- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Tested on web first
- [ ] Android Studio installed
- [ ] Gradle sync successful
- [ ] Permissions configured in AndroidManifest.xml
- [ ] App icons and splash screens added

