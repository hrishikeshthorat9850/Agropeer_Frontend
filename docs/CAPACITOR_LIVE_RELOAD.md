# Capacitor Live Reload (Android)

Use this to develop and fix Android bugs with instant reload when you change the web app.

## Quick steps

### 1. Start the dev server (reachable from device/emulator)

**Terminal 1:**

```bash
npm run dev:host
```

This runs Next.js with `--hostname 0.0.0.0` so the Android device/emulator can reach it.

### 2. Point Capacitor at the dev server and run Android

**Terminal 2:**

- **Physical device** (phone/tablet on same Wi‑Fi):
  ```bash
  npm run android:live
  ```
  Uses your machine’s LAN IP (e.g. `http://192.168.1.x:3000`).

- **Android Emulator:**
  ```bash
  npm run android:live:emulator
  ```
  Uses `http://10.0.2.2:3000` (emulator’s alias for host localhost).

This script:

1. Updates `capacitor.config.json` with `server.url` for live reload
2. Runs `npx cap sync android`
3. Runs `npx cap run android` (builds and launches the app)

### 3. Develop

- Edit your app (e.g. in `app/`, `components/`).
- Save; the app will reload and show changes (or refresh the WebView if needed).

## What was configured

- **`package.json`**
  - `dev:host` – Next.js dev server on `0.0.0.0` so device/emulator can connect.
  - `android:live` – dev config + sync + run on **physical device** (LAN IP).
  - `android:live:emulator` – same but for **emulator** (`10.0.2.2:3000`).
- **`scripts/update-capacitor-config.js`**
  - `dev` – sets `server.url` to your LAN IP or (with `emulator`) to `10.0.2.2:3000`.
- **`android/app/src/main/AndroidManifest.xml`**
  - `android:usesCleartextTraffic="true"` so the app can load `http://` in dev.

## Switching back to production (bundled app)

Before building a release APK, remove the dev server URL so the app loads from the built bundle:

```bash
node scripts/update-capacitor-config.js prod
npx cap sync android
```

Then build as usual (e.g. `npm run android:prod` or your release flow).
