# Android Build Configuration Fixes

## ✅ Issues Fixed

### 1. **webDir Mismatch** ✅
- **Before**: `"webDir": "dist"` (Next.js doesn't create `dist/`)
- **After**: `"webDir": "out"` (Next.js static export creates `out/`)
- **Impact**: Capacitor now looks in the correct directory for build files

### 2. **Server Config Placement** ✅
- **Before**: `server` config was inside `plugins` object (incorrect)
- **After**: `server` config moved to root level of `capacitor.config.json`
- **Impact**: Server configuration now works correctly

### 3. **next.config.mjs Logic** ✅
- **Before**: `...(isAndroidBuild ? {} : { output: 'export' })` (backwards logic)
- **After**: `...(isAndroidBuild ? { output: 'export' } : {})` (correct logic)
- **Impact**: Static export now enables correctly when building for Android

## 📋 Configuration Changes

### `capacitor.config.json`
```json
{
  "webDir": "out",  // ✅ Changed from "dist"
  "server": {       // ✅ Moved from inside plugins
    "url": "https://agrogram-wheat.vercel.app",
    "cleartext": true
  },
  "plugins": { ... }
}
```

### `next.config.mjs`
```javascript
// ✅ Fixed logic - enables export when ANDROID_BUILD=true
...(isAndroidBuild ? { output: 'export' } : {}),
```

## 🚀 Next Steps

1. **Clean build directories**:
   ```bash
   rm -rf out dist .next
   ```

2. **Build for Android**:
   ```bash
   npm run build:android -- --apk
   ```

3. **Verify build output**:
   - Check that `out/` directory is created
   - Verify `out/index.html` exists and has proper content
   - Check Android assets: `android/app/src/main/assets/public/`

4. **Test APK**:
   - Install on device: `adb install android/app/build/outputs/apk/release/app-release.apk`
   - Verify app loads (not stuck on "Loading AgroGram...")
   - Check navbar/content spacing

## 🔍 What to Check

### If app still shows "Loading AgroGram...":

1. **Check build output**:
   ```bash
   ls -la out/
   ```
   Should show: `index.html`, `_next/`, and other static files

2. **Check Android assets**:
   ```bash
   cat android/app/src/main/assets/public/index.html
   ```
   Should show your actual Next.js app HTML, not placeholder

3. **Verify Capacitor sync**:
   ```bash
   npx cap sync android
   ```

4. **Check logs**:
   ```bash
   adb logcat | grep -i capacitor
   ```

## 🐛 Troubleshooting

### Issue: Still seeing "Loading AgroGram..."
- **Cause**: Old assets in Android project
- **Fix**: 
  ```bash
  rm -rf android/app/src/main/assets/public/*
  npm run build:android
  ```

### Issue: Build fails
- **Cause**: Missing dependencies or config issues
- **Fix**: 
  ```bash
  npm install
  npm run build:android
  ```

### Issue: Content behind navbar
- **Cause**: CSS not loading or safe-area not working
- **Fix**: 
  - Verify CSS files in `out/_next/static/`
  - Check viewport meta tag in `out/index.html`
  - Test on real device (not emulator)

## ✅ Expected Results

After fixes:
- ✅ App loads properly (not stuck on loading screen)
- ✅ All CSS/styles applied correctly
- ✅ Navbar spacing works (content doesn't go behind navbar)
- ✅ Safe area insets work on devices with notches
- ✅ All features functional

## 📝 Notes

- The `server` config is kept for development/testing
- For production, you can remove `server` config to use fully bundled app
- The build script automatically handles static export configuration
- Vercel deployment is unaffected (uses normal build, not static export)

