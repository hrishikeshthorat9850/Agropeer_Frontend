# Capacitor Scripts: How They Work (Dev vs Prod)

This doc explains how the Capacitor-related scripts work internally and how the **development** vs **production** flows differ.

---

## 1. `scripts/update-capacitor-config.js` — Internal behaviour

### Purpose

Updates **`capacitor.config.json`** so the Android app either:

- **Dev:** loads the app from your **local dev server** (live reload), or  
- **Prod:** loads the app from the **bundled files** in the APK (no `server.url`).

### Usage

```bash
node scripts/update-capacitor-config.js <dev|prod> [emulator]
```

- **`dev`** — Sets a dev server URL for live reload.
- **`prod`** — Removes the dev server URL so the app uses the built bundle.
- **`emulator`** (optional, only with `dev`) — Use Android emulator’s host alias instead of your LAN IP.

### Internal flow

1. **Read config**  
   Loads `capacitor.config.json` from the project root (`require(configPath)`).

2. **Validate mode**  
   Exits with an error if the first argument is not `dev` or `prod`.

3. **Dev mode (`dev`)**  
   - **Host:**
     - If second arg is **`emulator`**: uses **`10.0.2.2`** (Android emulator’s alias for the host machine’s `localhost`).
     - Otherwise: calls **`getLocalIpAddress()`** to get your machine’s **LAN IPv4** (e.g. `192.168.1.5`).
   - **Write to config:**
     - Sets `config.server.url = "http://<host>:3000"`.
     - Sets `config.server.cleartext = true` (allows HTTP; Capacitor uses this for dev).
   - **Result:** When the app starts, the WebView loads from that URL instead of from the bundled `webDir`.

4. **Prod mode (`prod`)**  
   - Removes `config.server.url` and `config.server.cleartext` (if present).
   - Leaves other `server` fields (e.g. `hostname`, `androidScheme`) unchanged.
   - **Result:** The app loads from the local bundle (e.g. `webDir` / `out`), as in a normal production build.

5. **Persist**  
   Writes the modified object back to `capacitor.config.json` with `fs.writeFileSync`.

### `getLocalIpAddress()` — How it works

- Uses Node’s **`os.networkInterfaces()`** to list all network interfaces.
- Iterates over interfaces and their addresses.
- Picks the **first IPv4 address** that is **not internal** (not `127.0.0.1`).
- That is typically your **Wi‑Fi or Ethernet LAN IP** (e.g. `192.168.x.x`).
- If none is found, returns **`'localhost'`**.

So:

- **Physical device on same Wi‑Fi:** dev config uses this LAN IP; the phone can reach `http://<LAN_IP>:3000`.
- **Emulator:** use `emulator` so the script uses `10.0.2.2` instead (emulator’s special alias for host).

### What Capacitor does with the config

- **`server.url` set (dev):**  
  The native app’s WebView loads the app from that URL. No bundled web assets are used for the initial load; you get live reload as you change the Next.js app.

- **`server.url` not set (prod):**  
  The WebView loads from the **local bundle** (e.g. `file://` or Capacitor’s equivalent of `webDir`). That bundle is what `npx cap sync android` copies from `out` (or your `webDir`).

- **`webDir`:**  
  Always points to the built output directory (e.g. `"out"`). In prod it’s the source of the bundled app; in dev with `server.url` set, the app still “knows” where the bundle would be but actually loads from `url`.

---

## 2. npm scripts — What runs and when

### Web (Next.js) dev server

| Script        | Command                                      | Purpose |
|---------------|----------------------------------------------|---------|
| **`dev`**     | `next dev --turbopack`                       | Dev server; default bind is usually `localhost:3000`. Good for browser; device/emulator often can’t reach it. |
| **`dev:host`**| `next dev --turbopack --hostname 0.0.0.0`    | Dev server bound on **all interfaces** (`0.0.0.0:3000`). Required so a physical device or emulator can connect for live reload. |

Use **`dev:host`** whenever you run the Android app in dev/live-reload mode.

### Capacitor / Android

| Script                  | What it runs (in order)                                                                 | When to use |
|-------------------------|------------------------------------------------------------------------------------------|-------------|
| **`cap:sync`**          | `npx cap sync android`                                                                   | Copy web assets + config from project to `android/`. Run after changing `capacitor.config.json` or after building. |
| **`cap:copy`**          | `npx cap copy android`                                                                   | Copy web assets only (no native dependency sync). |
| **`cap:open`**          | `npx cap open android`                                                                   | Open the Android project in Android Studio. |
| **`android:dev`**      | `update-capacitor-config.js dev` → `cap copy android` → `cap open android`               | One-time: switch to dev config, copy assets, open Android Studio. You still need to run `dev:host` and then Run from Android Studio. |
| **`android:live`**      | `update-capacitor-config.js dev` → `cap sync android` → `cap run android`                 | **Live reload on a physical device:** sets dev URL (LAN IP), syncs, builds and runs the app. Run while `dev:host` is running in another terminal. |
| **`android:live:emulator`** | `update-capacitor-config.js dev emulator` → `cap sync android` → `cap run android`   | Same as above but dev URL is `10.0.2.2:3000` for the **Android emulator**. |
| **`android:prod`**      | `update-capacitor-config.js prod` → `npm run build:android -- --apk`                    | **Production:** remove dev URL, then run full Android build (including APK). |
| **`android:build`**      | `cd android && ./gradlew assembleRelease`                                                | Build release APK only (assumes `out` is already built and synced). |
| **`android:build:debug`** | `cd android && ./gradlew assembleDebug`                                                | Build debug APK only. |

So:

- **Dev / live reload:** `dev:host` + `android:live` (or `android:live:emulator`).
- **Prod / release APK:** `android:prod` (which first runs `update-capacitor-config.js prod`, then `build:android -- --apk`).

---

## 3. `scripts/build-android.js` — Production build (used by `android:prod`)

### Purpose

Builds the **web app for production**, syncs it to Android, and optionally builds the **release APK**. Used when you run **`android:prod`** (after switching to prod config).

### Internal flow

1. **Next.js config for static export**  
   - Reads `next.config.mjs`.  
   - If it does **not** already contain `output: 'export'`:
     - Backs up the current file to `next.config.mjs.backup`.
     - Injects static export options: `output: 'export'`, `trailingSlash: true`.
     - Writes the modified config.  
   - This makes `next build` produce a **static export** (e.g. in `out/`), which Capacitor expects for `webDir`.

2. **Build Next.js**  
   Runs `npm run build` (which runs `next build`). Output goes to `out/` (or whatever `webDir` is in `capacitor.config.json`).

3. **Sync Capacitor**  
   Runs `npx cap sync android`. This:
   - Copies `out/` (or `webDir`) into the Android project.
   - Copies `capacitor.config.json` into the Android app assets.
   - Updates native dependencies if needed.

4. **Optional APK build**  
   - If the script is run with **`--apk`** or **`-a`** (e.g. `npm run build:android -- --apk` or as called by `android:prod`), it runs:
     - `cd android && ./gradlew assembleRelease`
   - Produces: `android/app/build/outputs/apk/release/app-release.apk`.

5. **Restore Next.js config (finally)**  
   - If the script had modified `next.config.mjs`, it restores it from `next.config.mjs.backup` and deletes the backup.  
   - So your normal `next.config.mjs` (e.g. without `output: 'export'`) is restored after the Android build.

### When it’s used

- **`android:prod`** runs **`update-capacitor-config.js prod`** first (so no `server.url`), then **`npm run build:android -- --apk`**, which runs this script with `--apk`. So the full prod flow is: prod config → static export build → cap sync → release APK.

---

## 4. Dev vs prod — End‑to‑end flow

### Development (live reload)

```
You                          Scripts / tools
─────────────────────────────────────────────────────────────────
1. npm run dev:host     →    Next.js listens on 0.0.0.0:3000
2. npm run android:live     → update-capacitor-config.js dev
   (or android:live:emulator)   → capacitor.config.json gets server.url = http://<IP>:3000
                             → npx cap sync android (config + assets copied to android/)
                             → npx cap run android (builds app, installs, launches)

3. App opens            →    WebView loads http://<IP>:3000 (or 10.0.2.2:3000)
4. You edit code        →    Save → Next.js HMR → refresh/reload in app
```

- **Config:** `capacitor.config.json` has **`server.url`** and **`cleartext: true`**.  
- **Content source:** **Dev server** (no use of `out/` for loading).  
- **Build:** Only the native app is built/run; web is served by Next.js.

### Production (bundled app, release APK)

```
You                          Scripts / tools
─────────────────────────────────────────────────────────────────
1. npm run android:prod  →    update-capacitor-config.js prod
                             → capacitor.config.json: server.url and cleartext removed

                             → build-android.js:
                                - Optionally patch next.config.mjs (output: 'export')
                                - npm run build → next build → static export to out/
                                - npx cap sync android → out/ + config copied to android/
                                - cd android && ./gradlew assembleRelease → APK

2. APK                   →    WebView loads app from local bundle (file://... from out/)
```

- **Config:** **No `server.url`**; only `webDir` (and other server options you keep).  
- **Content source:** **Bundled files** in the APK (from `out/`).  
- **Build:** Full Next.js static build + Capacitor sync + Gradle release build.

### Summary table

| Aspect           | Development (live reload)     | Production (APK)                |
|-----------------|------------------------------|----------------------------------|
| **Config script** | `update-capacitor-config.js dev [emulator]` | `update-capacitor-config.js prod` |
| **server.url**  | Set to `http://<host>:3000`  | Removed                          |
| **Web content** | Served by Next.js dev server | Bundled in APK (`webDir` / `out`) |
| **Next.js**     | `npm run dev:host`            | `npm run build` (static export)   |
| **Capacitor**   | `cap sync` + `cap run android` | `cap sync` after build          |
| **APK**         | Not built (or debug only)    | `assembleRelease` (e.g. via android:prod) |

---

## 5. Quick reference

- **Live reload (device):** Terminal 1: `npm run dev:host` → Terminal 2: `npm run android:live`.  
- **Live reload (emulator):** Terminal 1: `npm run dev:host` → Terminal 2: `npm run android:live:emulator`.  
- **Production APK:** `npm run android:prod` (handles prod config + build + sync + APK).  
- **Only update config (no run):** `node scripts/update-capacitor-config.js dev` or `prod`; then `npx cap sync android` if you need to push config to the Android project.
