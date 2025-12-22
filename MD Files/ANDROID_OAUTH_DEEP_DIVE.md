# Android OAuth Flow - Complete Deep Dive Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture & Flow Diagram](#architecture--flow-diagram)
3. [Key Concepts](#key-concepts)
4. [Component Breakdown](#component-breakdown)
5. [Line-by-Line Code Analysis](#line-by-line-code-analysis)
6. [How It All Works Together](#how-it-all-works-together)
7. [Troubleshooting Guide](#troubleshooting-guide)

---

## Overview

This documentation explains how OAuth authentication works for Android browsers in a Capacitor-based Next.js application using Supabase. The flow involves multiple components working together to authenticate users via Google or Facebook.

### What Happens During OAuth?

1. **User clicks OAuth button** → Initiates OAuth flow
2. **App opens in-app browser** → User authenticates with provider (Google/Facebook)
3. **Provider redirects back** → With authentication tokens in URL
4. **Deep link handler catches redirect** → Extracts tokens from URL
5. **Session is created** → Tokens stored in localStorage
6. **User redirected to home** → Now authenticated

---

## Architecture & Flow Diagram

```
┌─────────────────┐
│  User clicks    │
│  OAuth Button   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  OAuthButtons.jsx                   │
│  - Detects native platform          │
│  - Calls signInWithOAuth()          │
│  - Opens Browser with OAuth URL     │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Capacitor Browser                  │
│  - Opens Google/Facebook login      │
│  - User enters credentials          │
│  - Provider authenticates           │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Provider Redirects                 │
│  agropeer://login-callback          │
│  #access_token=xxx&refresh_token=yyy│
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  MobileOAuthHandler.jsx             │
│  - Listens for appUrlOpen event     │
│  - Extracts tokens from URL         │
│  - Sets session with setSession()   │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Session Stored                     │
│  - localStorage (automatic)           │
│  - User authenticated               │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Redirect to /home                  │
│  User is now logged in              │
└─────────────────────────────────────┘
```

---

## Key Concepts

### 1. **Capacitor**
Capacitor is a cross-platform app runtime that allows web apps to run natively on iOS and Android. It provides plugins to access native device features.

**Key Capacitor APIs Used:**
- `Capacitor.isNativePlatform()` - Detects if running on native app
- `App.addListener()` - Listens for deep link events
- `Browser.open()` - Opens in-app browser
- `Browser.close()` - Closes in-app browser

### 2. **Deep Links**
Deep links are URLs that open your app directly. For Android:
- **Custom Scheme**: `agropeer://login-callback#tokens`
- **Intent URL**: `https://agrogram-wheat.vercel.app/auth/callback`

### 3. **OAuth Flow**
OAuth 2.0 authorization code flow with PKCE:
1. App requests authorization URL from Supabase
2. User authenticates with provider
3. Provider redirects with tokens in URL hash
4. App extracts tokens and creates session

### 4. **URL Hash vs Query Parameters**
- **Hash (`#`)**: Not sent to server, stays in browser
- **Query (`?`)**: Sent to server
- Supabase uses hash for security (tokens never hit server logs)

---

## Component Breakdown

### File Structure
```
components/login/OAuthButtons.jsx      → Initiates OAuth flow
Mobile/MobileOAuthHandler.jsx          → Handles deep link callbacks
app/auth/callback/page.jsx             → Web callback handler
app/LayoutClient.jsx                   → Alternative handler (backup)
lib/supabaseClient.js                  → Supabase client instance
```

---

## Line-by-Line Code Analysis

## 📄 File 1: `components/login/OAuthButtons.jsx`

This component renders the OAuth login buttons and initiates the authentication flow.

### Imports Section

```javascript
"use client";
```
**Line 224**: Next.js directive indicating this is a client component. Client components run in the browser and can use React hooks and browser APIs.

```javascript
import { useState } from "react";
```
**Line 226**: Imports React's `useState` hook for managing component state (loading states, errors).

```javascript
import { supabase } from "@/lib/supabaseClient";
```
**Line 227**: Imports the Supabase client instance. This is a singleton object that handles all Supabase operations.

```javascript
import { Capacitor } from "@capacitor/core";
```
**Line 228**: Imports Capacitor's core API. Capacitor is the bridge between web code and native Android/iOS functionality.

```javascript
import { Browser } from "@capacitor/browser";
```
**Line 229**: Imports Capacitor's Browser plugin. This allows opening/closing in-app browsers on native platforms.

```javascript
import { motion } from "framer-motion";
```
**Line 230**: Imports Framer Motion for animations (not critical for OAuth flow).

```javascript
import { FaGoogle, FaFacebook } from "react-icons/fa";
```
**Line 231**: Imports icon components for the buttons (UI only).

### Component Definition

```javascript
export default function OAuthButtons() {
```
**Line 233**: Exports the main component as default. This is a functional React component.

```javascript
  const [loading, setLoading] = useState({ google: false, facebook: false });
```
**Line 234**: 
- Creates state object to track loading status for each provider
- `useState` returns `[currentValue, setterFunction]`
- Initial state: both providers not loading
- Used to show spinners and disable buttons during OAuth

```javascript
  const [error, setError] = useState("");
```
**Line 235**: 
- State for error messages
- Empty string = no error
- Used to display error messages to user

```javascript
  const isNative = Capacitor.isNativePlatform();
```
**Line 237**: 
- **Critical line**: Detects if app is running on native platform (Android/iOS)
- Returns `true` on native apps, `false` on web browsers
- Determines which OAuth flow to use (native vs web)

### OAuth Handler Function

```javascript
  const handleOAuthLogin = async (provider) => {
```
**Line 239**: 
- Async function that handles OAuth login
- `provider` parameter: `"google"` or `"facebook"`
- `async` allows using `await` for asynchronous operations

```javascript
    setError("");
```
**Line 240**: Clears any previous error messages before starting new OAuth attempt.

```javascript
    setLoading((p) => ({ ...p, [provider]: true }));
```
**Line 241**: 
- Updates loading state using functional update
- `(p) => ({ ...p, [provider]: true })`:
  - `p` = previous state
  - `{ ...p }` = spread operator copies all properties
  - `[provider]: true` = computed property name sets specific provider to true
- Example: If `provider = "google"`, sets `{ google: true, facebook: false }`

```javascript
    try {
```
**Line 243**: Starts try-catch block for error handling. If anything fails, catch block handles it.

```javascript
      let redirectTo;
```
**Line 247**: Declares variable to store the redirect URL. This is where OAuth provider will redirect after authentication.

```javascript
      if (isNative) {
```
**Line 248**: Checks if running on native platform (Android/iOS app).

```javascript
        let baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://agrogram-wheat.vercel.app";
```
**Line 250**: 
- Gets base URL from environment variable or uses fallback
- `process.env.NEXT_PUBLIC_APP_URL`: Next.js environment variable (accessible in browser)
- Fallback ensures URL exists even if env var not set

```javascript
        if (process.env.NEXT_PUBLIC_VERCEL_URL && !baseUrl.includes("://")) {
          baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
        }
```
**Lines 252-254**: 
- Checks if Vercel URL exists and baseUrl doesn't have protocol
- Adds `https://` prefix if missing
- Ensures URL is properly formatted

```javascript
        if (!baseUrl.startsWith("http")) {
          baseUrl = `https://${baseUrl}`;
        }
```
**Lines 257-259**: 
- Final safety check: ensures URL starts with `http` or `https`
- Adds `https://` if missing
- Prevents malformed URLs

```javascript
        redirectTo = "agropeer://login-callback";
```
**Line 263**: 
- **CRITICAL**: Sets custom scheme deep link for native apps
- Format: `scheme://path#tokens`
- `agropeer://` = custom URL scheme registered in AndroidManifest.xml
- `login-callback` = path that triggers our handler
- This URL will contain tokens after OAuth redirect

```javascript
      } else {
        const redirectTo = isNative
          ? "agropeer://login-callback"
          : `${window.location.origin}/auth/callback`;
      }
```
**Lines 264-268**: 
- **Note**: This code has a bug - `redirectTo` is declared with `const` inside else block, so it's not accessible outside
- Should be: `redirectTo = isNative ? ... : ...`
- For web: uses `/auth/callback` route
- `window.location.origin` = current domain (e.g., `https://example.com`)

```javascript
      console.log("OAuth started. Native:", isNative);
      console.log("Redirect URL:", redirectTo);
```
**Lines 271-272**: Debug logging to help troubleshoot OAuth issues.

```javascript
      const { data, error } = await supabase.auth.signInWithOAuth({
```
**Line 274**: 
- **KEY FUNCTION**: Calls Supabase's OAuth method
- `await` pauses execution until promise resolves
- Returns object with `{ data, error }` structure
- `signInWithOAuth()` generates OAuth URL and handles flow

```javascript
        provider,
```
**Line 275**: Provider name: `"google"` or `"facebook"`. Supabase knows which OAuth endpoint to use.

```javascript
        options: {
          redirectTo,
```
**Line 277**: 
- `redirectTo`: Where provider redirects after authentication
- For native: `agropeer://login-callback`
- For web: `https://yourapp.com/auth/callback`
- Supabase includes this in OAuth request

```javascript
          skipBrowserRedirect: isNative,
```
**Line 278**: 
- **IMPORTANT**: Tells Supabase not to auto-redirect browser
- `true` on native: We manually open browser with `Browser.open()`
- `false` on web: Supabase handles redirect automatically
- Without this, native apps would try to redirect in WebView (doesn't work)

```javascript
      });
```
**Line 280**: Closes the `signInWithOAuth()` call.

```javascript
      if (error) throw error;
```
**Line 282**: 
- Checks if Supabase returned an error
- `throw` stops execution and jumps to `catch` block
- Prevents continuing with invalid OAuth URL

```javascript
      if (isNative && data?.url) {
```
**Line 284**: 
- Checks if native platform AND OAuth URL exists
- `data?.url`: Optional chaining - safely accesses `url` property
- If `data` is null/undefined, returns `undefined` instead of error

```javascript
        await Browser.open({ 
          url: data.url,
          windowName: '_self',
          toolbarColor: '#2E7D32'
        });
```
**Lines 286-290**: 
- **CRITICAL**: Opens in-app browser on native platform
- `Browser.open()`: Capacitor API that opens system browser
- `url`: The OAuth URL from Supabase (e.g., `https://accounts.google.com/oauth/...`)
- `windowName: '_self'`: Opens in same window (not new tab)
- `toolbarColor`: Android toolbar color (green in this case)
- User sees Google/Facebook login page in browser
- After login, browser redirects to `agropeer://login-callback#tokens`

```javascript
        // Don't set loading to false here - MobileOAuthHandler will handle the callback
```
**Line 291**: 
- Comment explains why loading state isn't reset
- `MobileOAuthHandler` will handle success/failure
- Keeps button in loading state until callback completes

```javascript
      } else if (data?.url) {
        window.location.href = data.url;
```
**Lines 292-293**: 
- Web platform fallback
- Directly redirects browser to OAuth URL
- Browser handles redirect automatically
- After auth, redirects to `/auth/callback`

```javascript
        setLoading((p) => ({ ...p, [provider]: false }));
```
**Line 294**: Resets loading state for web (since redirect happens immediately).

```javascript
    } catch (err) {
      console.error("OAuth error:", err);
      setError(err.message || "OAuth failed");
      setLoading((p) => ({ ...p, [provider]: false }));
    }
```
**Lines 297-300**: 
- Catches any errors during OAuth flow
- Logs error for debugging
- Shows error message to user
- Resets loading state

### Render Section

```javascript
  return (
    <div className="space-y-4">
```
**Line 304**: Returns JSX with spacing between elements.

```javascript
      <div className="grid grid-cols-2 gap-3">
```
**Line 307**: CSS Grid layout: 2 columns with gap between buttons.

```javascript
        <motion.button
          type="button"
          onClick={() => handleOAuthLogin("google")}
          disabled={loading.google || loading.facebook}
```
**Lines 309-312**: 
- Google OAuth button
- `onClick`: Calls handler with `"google"` provider
- `disabled`: Prevents clicks during any OAuth flow
- `motion.button`: Animated button from Framer Motion

The rest is UI styling - not critical for OAuth flow understanding.

---

## 📄 File 2: `Mobile/MobileOAuthHandler.jsx`

This component listens for deep link callbacks and processes OAuth tokens.

### Imports

```javascript
"use client";
```
**Line 1**: Client component directive.

```javascript
import { useEffect } from "react";
```
**Line 3**: 
- `useEffect`: React hook for side effects
- Runs after component mounts
- Perfect for setting up event listeners

```javascript
import { App } from "@capacitor/app";
```
**Line 4**: 
- Capacitor App plugin
- Provides `appUrlOpen` event (fires when deep link opens app)

```javascript
import { Browser } from "@capacitor/browser";
```
**Line 5**: Browser plugin for closing in-app browser.

```javascript
import { supabase } from "@/lib/supabaseClient";
```
**Line 6**: Supabase client for session management.

```javascript
import { useRouter } from "next/navigation";
```
**Line 7**: 
- Next.js router hook
- Provides navigation functions (`push`, `replace`)
- Client-side routing (no page reload)

### Component Definition

```javascript
export function MobileOAuthHandler() {
```
**Line 9**: Named export (not default). Component that handles OAuth callbacks.

```javascript
  const router = useRouter();
```
**Line 10**: Gets router instance for navigation.

### useEffect Hook

```javascript
  useEffect(() => {
```
**Line 12**: 
- Runs after component mounts
- Sets up deep link listener
- Returns cleanup function

```javascript
    const handleAppUrl = async ({ url }) => {
```
**Line 13**: 
- Event handler function
- `{ url }`: Destructured parameter from `appUrlOpen` event
- `url`: The deep link URL (e.g., `agropeer://login-callback#access_token=xxx`)

```javascript
      console.log("🔥 appUrlOpen fired");
      console.log("URL:", url);
```
**Lines 14-15**: Debug logging to track when deep link is received.

### OAuth Callback Detection

```javascript
      const isOAuthCallback = 
        url.includes("auth/callback") || 
        url.includes("login-callback") ||
        url.includes("#access_token") ||
        url.includes("#code=") ||
        url.includes("?code=");
```
**Lines 18-23**: 
- Checks if URL is an OAuth callback
- Multiple conditions cover different URL formats
- `includes()`: String method that checks if substring exists
- Returns `true` if any condition matches

```javascript
      if (isOAuthCallback) {
```
**Line 25**: Only processes if it's an OAuth callback.

```javascript
        try {
```
**Line 26**: Error handling wrapper.

### Close Browser

```javascript
          try {
            await Browser.close();
          } catch (e) {
            console.log("Browser already closed or not open");
          }
```
**Lines 28-32**: 
- Attempts to close in-app browser
- Nested try-catch: Browser might already be closed
- Prevents errors from crashing OAuth flow
- `await`: Waits for browser to close

```javascript
          await new Promise(resolve => setTimeout(resolve, 300));
```
**Line 35**: 
- **IMPORTANT**: Waits 300ms before processing
- Gives browser time to fully process redirect
- Prevents race conditions
- `Promise`: Creates promise that resolves after timeout
- `setTimeout`: Delays execution

### URL Parsing

```javascript
          let cleanUrl = url;
          let hash = "";
          let searchParams = "";
```
**Lines 38-40**: 
- Variables to store parsed URL components
- `cleanUrl`: URL after scheme conversion
- `hash`: Token parameters (after `#`)
- `searchParams`: Query parameters (after `?`)

```javascript
          if (url.startsWith("agropeer://")) {
            cleanUrl = url.replace("agropeer://", "https://");
          } else if (url.startsWith("com.hrishikesh.agrogram://")) {
            cleanUrl = url.replace("com.hrishikesh.agrogram://", "https://");
          }
```
**Lines 43-47**: 
- **CRITICAL**: Converts custom scheme to HTTPS
- Custom schemes (`agropeer://`) can't be parsed by `URL` constructor
- Replaces with `https://` so we can use standard URL parsing
- Supports multiple custom schemes

### Extract Hash

```javascript
          const hashIndex = cleanUrl.indexOf("#");
```
**Line 50**: 
- Finds position of `#` character
- Returns `-1` if not found
- Hash contains OAuth tokens

```javascript
          if (hashIndex !== -1) {
            hash = cleanUrl.substring(hashIndex + 1);
          }
```
**Lines 51-53**: 
- If hash exists, extracts everything after `#`
- `substring(hashIndex + 1)`: Starts after `#` character
- Example: `https://example.com#token=123` → `token=123`

### Extract Query Parameters

```javascript
          const queryIndex = cleanUrl.indexOf("?");
          if (queryIndex !== -1 && hashIndex === -1) {
            searchParams = cleanUrl.substring(queryIndex + 1);
          }
```
**Lines 56-59**: 
- Finds query parameters (after `?`)
- Only extracts if no hash exists (hash takes priority)
- Some OAuth flows use query params instead of hash

### Parse Tokens

```javascript
          let accessToken = null;
          let refreshToken = null;
          let expiresIn = null;
          let tokenType = "bearer";
```
**Lines 62-65**: 
- Variables to store extracted tokens
- `null` = not found yet
- `tokenType`: Defaults to `"bearer"` (OAuth standard)

```javascript
          if (hash) {
            const hashParams = new URLSearchParams(hash);
```
**Lines 67-69**: 
- If hash exists, parse it
- `URLSearchParams`: Browser API for parsing query strings
- Handles `key=value&key2=value2` format

```javascript
            accessToken = hashParams.get("access_token");
            refreshToken = hashParams.get("refresh_token");
            expiresIn = hashParams.get("expires_in");
            tokenType = hashParams.get("token_type") || "bearer";
```
**Lines 70-73**: 
- Extracts specific tokens from parsed hash
- `get()`: Returns value for key, or `null` if not found
- `|| "bearer"`: Fallback if `token_type` not provided

```javascript
          } else if (searchParams) {
            const queryParams = new URLSearchParams(searchParams);
            accessToken = queryParams.get("access_token");
            refreshToken = queryParams.get("refresh_token");
            expiresIn = queryParams.get("expires_in");
            tokenType = queryParams.get("token_type") || "bearer";
          }
```
**Lines 74-81**: 
- Same parsing logic for query parameters
- Fallback if tokens are in query string instead of hash

### Set Session

```javascript
          if (accessToken && refreshToken) {
```
**Line 84**: 
- Checks if both required tokens exist
- Both are needed for authentication
- `&&`: Logical AND operator

```javascript
            if (hash) {
              window.location.hash = `#${hash}`;
              await new Promise(resolve => setTimeout(resolve, 200));
            }
```
**Lines 86-90**: 
- Sets hash in browser's location
- Supabase might read from `window.location.hash`
- Waits 200ms for hash to be set
- Template literal: `` `#${hash}` `` inserts hash value

```javascript
            const { data: sessionResult, error: setSessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
```
**Lines 93-96**: 
- **MOST CRITICAL LINE**: Creates Supabase session
- `setSession()`: Stores tokens in localStorage
- Persists authentication across app restarts
- Returns `{ data, error }` structure
- `await`: Waits for session to be created

```javascript
            if (setSessionError) {
              console.error("Set session error:", setSessionError);
              router.push("/login?error=" + encodeURIComponent(setSessionError.message || "Failed to set session"));
              return;
            }
```
**Lines 98-102**: 
- Checks for errors setting session
- `encodeURIComponent()`: URL-encodes error message
- Prevents special characters from breaking URL
- Redirects to login with error
- `return`: Stops execution (prevents continuing)

```javascript
            if (!sessionResult?.session) {
              console.error("Session not created after setSession");
              router.push("/login?error=" + encodeURIComponent("Failed to create session"));
              return;
            }
```
**Lines 105-109**: 
- Verifies session was actually created
- `sessionResult?.session`: Optional chaining
- Double-checks session exists
- Redirects if session missing

### Fallback Session Retrieval

```javascript
          } else {
            if (hash) {
              window.location.hash = `#${hash}`;
              await new Promise(resolve => setTimeout(resolve, 300));
            }
            
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
```
**Lines 111-118**: 
- Fallback if tokens weren't extracted
- Sets hash and waits
- `getSession()`: Retrieves existing session
- Supabase might auto-parse hash

```javascript
            if (sessionError || !session) {
              console.error("Session error:", sessionError);
              router.push("/login?error=" + encodeURIComponent(sessionError?.message || "Failed to create session"));
              return;
            }
          }
```
**Lines 119-124**: Error handling for fallback method.

### Verify Session

```javascript
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
```
**Line 127**: 
- Retrieves session again to verify
- Confirms session was stored correctly

```javascript
          if (sessionError || !session) {
            console.error("Session error:", sessionError);
            router.push("/login?error=" + encodeURIComponent(sessionError?.message || "Failed to create session"));
            return;
          }
```
**Lines 129-133**: Final verification before proceeding.

### Verify User

```javascript
          const { data: { user }, error: userError } = await supabase.auth.getUser();
```
**Line 136**: 
- Fetches user data from Supabase
- Confirms user is authenticated
- Returns user profile information

```javascript
          if (userError || !user) {
            console.error("User error:", userError);
            router.push("/login?error=" + encodeURIComponent(userError?.message || "Failed to get user"));
            return;
          }
```
**Lines 138-142**: Error handling if user fetch fails.

### Success Redirect

```javascript
          console.log("✅ OAuth login successful, redirecting to home");
          router.push("/home");
```
**Lines 145-146**: 
- Logs success message
- Navigates to home page
- User is now authenticated

### Error Handling

```javascript
        } catch (err) {
          console.error("OAuth handler error:", err);
          router.push("/login?error=" + encodeURIComponent(err.message || "Authentication failed"));
        }
```
**Lines 147-150**: 
- Catches any unexpected errors
- Logs error for debugging
- Redirects to login with error message

### Event Listener Setup

```javascript
    const listenerPromise = App.addListener("appUrlOpen", handleAppUrl);
```
**Line 155**: 
- **CRITICAL**: Registers deep link listener
- `appUrlOpen`: Event fired when app opens via deep link
- `handleAppUrl`: Function to call when event fires
- Returns promise (Capacitor API)

### Cleanup Function

```javascript
    return () => {
      listenerPromise.then(listener => {
        if (listener && listener.remove) {
          listener.remove();
        }
      }).catch(err => {
        console.error("Error removing listener:", err);
      });
    };
```
**Lines 158-166**: 
- Cleanup function (runs when component unmounts)
- Removes event listener to prevent memory leaks
- `listener.remove()`: Unsubscribes from event
- Error handling if removal fails

```javascript
  }, [router]);
```
**Line 167**: 
- Dependency array for `useEffect`
- Re-runs if `router` changes (shouldn't happen)
- Empty array `[]` would run once on mount

```javascript
  return null;
```
**Line 169**: 
- Component doesn't render anything
- Pure logic component (no UI)
- Just sets up event listener

---

## 📄 File 3: `app/auth/callback/page.jsx`

This handles OAuth callbacks for **web browsers** (not native apps).

### Key Differences from Mobile Handler

1. **No Capacitor APIs**: Uses standard browser APIs
2. **Direct URL Access**: Can read `window.location.href` directly
3. **No Deep Links**: Uses regular HTTPS URLs

### Code Analysis

```javascript
"use client";
```
**Line 1**: Client component.

```javascript
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Capacitor } from "@capacitor/core";
import LoadingSpinner from "@/components/LoadingSpinner";
```
**Lines 3-7**: Standard imports (Capacitor imported but not really needed for web).

```javascript
export default function AuthCallback() {
  const router = useRouter();
  const isNative = Capacitor.isNativePlatform();
```
**Lines 9-11**: Component setup (isNative check not really used).

```javascript
  useEffect(() => {
    const finish = async () => {
```
**Lines 13-14**: 
- `useEffect` runs on mount
- `finish`: Async function to handle callback
- Immediately invoked

```javascript
      await new Promise(resolve => setTimeout(resolve, 300));
```
**Line 17**: Waits for URL hash to be available.

```javascript
      const currentUrl = window.location.href;
```
**Line 20**: 
- Gets full current URL
- Includes hash and query parameters
- Example: `https://app.com/auth/callback#access_token=xxx`

```javascript
      const hashIndex = currentUrl.indexOf("#");
      let hash = "";
      if (hashIndex !== -1) {
        hash = currentUrl.substring(hashIndex + 1);
      }
```
**Lines 24-28**: Extracts hash from URL (same logic as mobile handler).

```javascript
      const queryIndex = currentUrl.indexOf("?");
      let searchParams = "";
      if (queryIndex !== -1 && hashIndex === -1) {
        searchParams = currentUrl.substring(queryIndex + 1);
      }
```
**Lines 31-35**: Extracts query parameters (fallback).

```javascript
      let accessToken = null;
      let refreshToken = null;

      if (hash) {
        const hashParams = new URLSearchParams(hash);
        accessToken = hashParams.get("access_token");
        refreshToken = hashParams.get("refresh_token");
      } else if (searchParams) {
        const queryParams = new URLSearchParams(searchParams);
        accessToken = queryParams.get("access_token");
        refreshToken = queryParams.get("refresh_token");
      }
```
**Lines 38-51**: Parses tokens (identical to mobile handler).

```javascript
      if (accessToken && refreshToken) {
        const { data: sessionResult, error: setSessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
```
**Lines 54-59**: Sets session (same as mobile).

```javascript
        if (setSessionError) {
          console.error("Set session error:", setSessionError);
          router.replace("/login?error=" + encodeURIComponent(setSessionError.message || "Failed to set session"));
          return;
        }

        if (!sessionResult?.session) {
          console.error("Session not created after setSession");
          router.replace("/login?error=" + encodeURIComponent("Failed to create session"));
          return;
        }
```
**Lines 61-72**: Error handling and verification.

```javascript
      } else {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          console.error("Session error:", sessionError);
          router.replace("/login?error=" + encodeURIComponent(sessionError?.message || "Failed to create session"));
          return;
        }
      }
```
**Lines 73-83**: Fallback if tokens not extracted.

```javascript
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        console.error("Session error:", sessionError);
        router.replace("/login?error=" + encodeURIComponent(sessionError?.message || "Failed to create session"));
        return;
      }
```
**Lines 86-92**: Final session verification.

```javascript
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User error:", userError);
        router.replace("/login?error=" + encodeURIComponent(userError?.message || "Failed to get user"));
        return;
      }
```
**Lines 95-101**: User verification.

```javascript
      console.log("✅ OAuth callback successful");
      router.replace("/home");
```
**Lines 104-105**: Success redirect.

```javascript
    finish();
```
**Line 112**: Immediately invokes the async function.

```javascript
  }, [router]);
```
**Line 113**: Dependency array.

```javascript
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Completing sign in...</p>
      </div>
    </div>
  );
```
**Lines 115-122**: Loading UI while processing callback.

---

## How It All Works Together

### Complete Flow Sequence

1. **User Action**: User clicks "Sign in with Google" button
   - `OAuthButtons.jsx` → `handleOAuthLogin("google")`

2. **Platform Detection**: App checks if running on native platform
   - `Capacitor.isNativePlatform()` → `true` on Android

3. **OAuth URL Generation**: Supabase generates OAuth URL
   - `signInWithOAuth()` → Returns `{ data: { url: "https://accounts.google.com/..." } }`

4. **Browser Opens**: In-app browser opens with OAuth URL
   - `Browser.open({ url: data.url })` → Opens Google login page

5. **User Authenticates**: User enters credentials in browser
   - Google validates credentials
   - User grants permissions

6. **Provider Redirects**: Google redirects to callback URL
   - Redirects to: `agropeer://login-callback#access_token=xxx&refresh_token=yyy`
   - Deep link opens app

7. **Deep Link Handler**: `MobileOAuthHandler` receives event
   - `App.addListener("appUrlOpen")` → Fires with URL
   - `handleAppUrl({ url })` → Processes callback

8. **Token Extraction**: Handler parses tokens from URL
   - Extracts `access_token` and `refresh_token` from hash
   - Uses `URLSearchParams` to parse

9. **Session Creation**: Tokens stored in localStorage
   - `supabase.auth.setSession({ access_token, refresh_token })`
   - Session persists across app restarts

10. **Verification**: Handler verifies session and user
    - `getSession()` → Confirms session exists
    - `getUser()` → Confirms user authenticated

11. **Redirect**: User redirected to home page
    - `router.push("/home")` → Navigation to home
    - User is now logged in

---

## Key JavaScript Concepts Explained

### 1. **Async/Await**
```javascript
const handleAppUrl = async ({ url }) => {
  await Browser.close();
  await supabase.auth.setSession(...);
}
```
- `async`: Function returns a Promise
- `await`: Pauses execution until Promise resolves
- Makes asynchronous code look synchronous

### 2. **Destructuring**
```javascript
const { data, error } = await supabase.auth.setSession(...);
const { url } = event;
```
- Extracts properties from objects
- Shorthand for `const data = result.data`

### 3. **Template Literals**
```javascript
window.location.hash = `#${hash}`;
router.push(`/login?error=${message}`);
```
- Backticks (`` ` ``) allow string interpolation
- `${variable}` inserts variable value

### 4. **Optional Chaining**
```javascript
sessionResult?.session
data?.url
```
- `?.` safely accesses nested properties
- Returns `undefined` if property doesn't exist
- Prevents errors from null/undefined

### 5. **URLSearchParams**
```javascript
const params = new URLSearchParams("key=value&key2=value2");
const value = params.get("key"); // "value"
```
- Browser API for parsing query strings
- Handles URL-encoded values automatically

### 6. **Promise Constructor**
```javascript
await new Promise(resolve => setTimeout(resolve, 300));
```
- Creates Promise that resolves after timeout
- Used for delays/waiting

### 7. **Functional State Updates**
```javascript
setLoading((p) => ({ ...p, [provider]: true }));
```
- Uses previous state to compute new state
- Prevents race conditions
- `[provider]`: Computed property name

---

## Troubleshooting Guide

### Issue: OAuth redirect not working
**Symptoms**: Browser opens but doesn't redirect back to app

**Solutions**:
1. Check custom scheme in `AndroidManifest.xml`
2. Verify `redirectTo` URL matches scheme
3. Check Supabase redirect URL configuration

### Issue: Tokens not extracted
**Symptoms**: Session not created, user not logged in

**Solutions**:
1. Check URL format (hash vs query params)
2. Verify `URLSearchParams` parsing
3. Add console.log to debug token extraction

### Issue: Session not persisting
**Symptoms**: User logged out after app restart

**Solutions**:
1. Verify `setSession()` called successfully
2. Check localStorage in browser DevTools
3. Ensure no code clearing session

### Issue: Deep link not firing
**Symptoms**: `appUrlOpen` event never fires

**Solutions**:
1. Verify listener registered correctly
2. Check AndroidManifest.xml deep link config
3. Test deep link manually: `adb shell am start -a android.intent.action.VIEW -d "agropeer://login-callback"`

---

## Android Configuration

### AndroidManifest.xml
```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="agropeer" />
</intent-filter>
```

This registers the `agropeer://` scheme so Android knows to open your app when this URL is accessed.

---

## Summary

The OAuth flow for Android browsers involves:
1. **Initiating** OAuth via Supabase
2. **Opening** in-app browser
3. **Receiving** deep link callback
4. **Extracting** tokens from URL
5. **Storing** session in localStorage
6. **Verifying** authentication
7. **Redirecting** to home

Each step is carefully orchestrated to ensure secure, persistent authentication. Understanding each line of code helps debug issues and customize the flow for your needs.

---

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Capacitor Deep Links](https://capacitorjs.com/docs/guides/deep-links)
- [OAuth 2.0 Specification](https://oauth.net/2/)
- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

