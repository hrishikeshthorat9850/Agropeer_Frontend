# OAuth "No OAuth code received" Error - Troubleshooting Guide

## What This Error Means

The error "No OAuth code received" means your app's callback page (`/auth/callback`) was reached, but Supabase didn't include the `code` parameter in the redirect URL. This usually indicates a configuration issue.

## Most Common Cause: Supabase Redirect URL Not Configured

**90% of the time, this is because the redirect URL isn't added to Supabase's allowed list.**

### ✅ Fix: Add Redirect URL to Supabase

1. Go to **Supabase Dashboard** → **Authentication** → **URL Configuration**
   - Direct link: `https://supabase.com/dashboard/project/YOUR_PROJECT_ID/auth/url-configuration`
   - Replace `YOUR_PROJECT_ID` with your actual project ID

2. In the **Redirect URLs** section, click **Add URL**

3. Add these URLs **exactly** (case-sensitive, must match):
   - For local development: `http://localhost:3000/auth/callback`
   - For production: `https://agrogram-wheat.vercel.app/auth/callback`

4. **Important:** The URL must match **exactly** what you're using in your code:
   - ✅ Correct: `http://localhost:3000/auth/callback`
   - ❌ Wrong: `http://localhost:3000/auth/callback/` (trailing slash)
   - ❌ Wrong: `http://localhost:3000/Auth/Callback` (wrong case)

5. Click **Save**

## Step-by-Step Verification Checklist

### 1. Google Cloud Console ✅
- [ ] **Authorized JavaScript Origins** includes:
  - `https://agrogram-wheat.vercel.app`
  - `http://localhost:3000`
- [ ] **Authorized Redirect URIs** includes:
  - `https://gwjpmypuqmmoqcjyufln.supabase.co/auth/v1/callback`
  - ❌ **NOT** your app's callback URLs

### 2. Supabase Dashboard - Provider Configuration ✅
- [ ] Go to **Authentication** → **Providers** → **Google**
- [ ] Google provider is **Enabled**
- [ ] **Client ID (for OAuth)** is filled in
- [ ] **Client Secret (for OAuth)** is filled in
- [ ] Click **Save**

### 3. Supabase Dashboard - URL Configuration ✅
- [ ] Go to **Authentication** → **URL Configuration**
- [ ] **Site URL** is set (usually your production URL)
- [ ] **Redirect URLs** list includes:
  - `http://localhost:3000/auth/callback`
  - `https://agrogram-wheat.vercel.app/auth/callback`
- [ ] URLs match **exactly** (no trailing slashes, correct case)

### 4. Your Code ✅
- [ ] `OAuthButtons.jsx` uses correct redirect URL
- [ ] Callback page exists at `/app/auth/callback/page.js`

## Testing the Flow

1. **Open browser console** (F12) before clicking "Sign in with Google"
2. **Click "Sign in with Google"**
3. **Watch the console logs** - you should see:
   - `OAuth redirect URL: http://localhost:3000/auth/callback`
   - `OAuth URL from Supabase: https://...` (a long URL)
4. **After Google authentication**, check the URL you're redirected to
5. **Check the callback page console** - you should see:
   - `🔍 OAuth Callback Debug Info:` with all parameters

## Common Issues & Solutions

### Issue 1: "redirect_uri_mismatch" from Google
**Symptom:** Google shows an error page with "redirect_uri_mismatch"

**Solution:**
- Make sure Google Cloud Console → **Authorized Redirect URIs** has:
  - `https://gwjpmypuqmmoqcjyufln.supabase.co/auth/v1/callback`
- **NOT** your app's callback URLs

### Issue 2: Supabase redirects but no code parameter
**Symptom:** You reach `/auth/callback` but URL has no `code=` parameter

**Solution:**
- Check Supabase Dashboard → **URL Configuration** → **Redirect URLs**
- Make sure your callback URL is in the list
- URL must match **exactly** (no trailing slash, correct case)

### Issue 3: Works locally but not in production
**Symptom:** OAuth works on `localhost:3000` but fails on Vercel

**Solution:**
- Add production URL to Supabase: `https://agrogram-wheat.vercel.app/auth/callback`
- Make sure Google Cloud Console has production origin: `https://agrogram-wheat.vercel.app`

### Issue 4: Code parameter present but session exchange fails
**Symptom:** You see the code in the URL but get an error when exchanging it

**Solution:**
- Check Supabase environment variables are set correctly
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check browser console for detailed error messages

## Debug Mode

The callback page now includes debug information in development mode. When you see the error:

1. Look at the browser console for detailed logs
2. Check the "Debug Info" section on the callback page (dev mode only)
3. Copy the full URL from the address bar
4. Check what parameters are present (or missing)

## Still Not Working?

If you've verified all the above:

1. **Clear browser cache and cookies**
2. **Try in incognito/private mode**
3. **Check Supabase logs:**
   - Go to **Supabase Dashboard** → **Logs** → **Auth Logs**
   - Look for errors related to OAuth
4. **Verify environment variables:**
   - Make sure `NEXT_PUBLIC_SUPABASE_URL` is correct
   - Make sure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
5. **Check the OAuth flow step by step:**
   - Does it redirect to Google? ✅
   - Does Google authenticate? ✅
   - Does it redirect back? ✅
   - What URL does it redirect to? (Check this!)

## Quick Test

Run this in your browser console on the login page:

```javascript
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Current origin:', window.location.origin);
console.log('Expected callback:', window.location.origin + '/auth/callback');
```

Then verify that `Expected callback` matches what's in Supabase Dashboard → URL Configuration → Redirect URLs.


