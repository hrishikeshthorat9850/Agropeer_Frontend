# Project Implementation Guide

This document outlines the architecture, environment setup, and deployment process for the Chat Application.

## Architecture Overview

The system consists of three main components:
1.  **Frontend (Next.js)**: The user interface, built with React/Next.js and wrapped with Capacitor for mobile.
2.  **Socket Server (Node.js/Express/Socket.io)**: Handles real-time communication (chats, notifications).
3.  **Database (Supabase)**: Stores users, conversations, and messages.

## Prerequisites

- Node.js (v18+)
- Android Studio (for Android builds)
- Supabase Account
- Vercel Account (for Frontend deployment)
- A server (e.g., Render, Railway, VPS) for the Socket Server

## Environment Setup

### 1. Root `.env` (Frontend)

Create a `.env` file in the root directory:

```env
# URL of your Socket.io Server
# Dev: http://localhost:4000 (or your local IP for Android)
# Prod: https://your-socket-server.onrender.com
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000

# Supabase Config
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Server `.env` (Socket Server)

Create a `.env` file in the `server/` directory:

```env
PORT=4000
FRONTEND_URL=http://localhost:3000,capacitor://localhost,agropeer://localhost
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Running the Project

### Development (Local)

1.  **Start the Socket Server:**
    ```bash
    cd server
    npm install
    npm run dev
    ```

2.  **Start the Frontend:**
    ```bash
    # In root directory
    npm run dev
    ```
    This will start Next.js on `http://localhost:3000`.

### Android Development (Live Reload)

To run the Android app on your device/emulator with live reload (connected to your local Next.js server):

```bash
npm run android:dev
```
*   This script automatically updates `capacitor.config.json` to point `server.url` to your computer's local IP address.
*   It then copies the assets and opens Android Studio.
*   **Important:** Ensure your phone and computer are on the same WiFi network.

## Building for Production

### 1. Deploy Socket Server
Deploy the `server/` directory to a hosting provider (Render, Railway, DigitalOcean, etc.).
Update `NEXT_PUBLIC_SOCKET_URL` in your root `.env` to the deployed URL.

### 2. Deploy Frontend (Web)
Deploy the root directory to Vercel/Netlify.
Ensure environment variables are set in the deployment dashboard.

### 3. Build Android APK (Production)

To build a simplified, bundled APK (offline-first architecture, no live reload dependence):

```bash
npm run android:prod
```
*   This removes `server.url` from `capacitor.config.json` so the app loads from the bundled `index.html`.
*   It runs a full static build (`next build` + `next export`).
*   It syncs with Capacitor and builds the APK (`release` variant).
*   The APK will be located at: `android/app/build/outputs/apk/release/app-release.apk`
