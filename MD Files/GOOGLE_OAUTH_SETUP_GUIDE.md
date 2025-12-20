# Google OAuth Setup Guide for Supabase

## Understanding the OAuth Flow

When using Supabase for OAuth authentication, the flow works like this:

1. **User clicks "Sign in with Google"** → Your app redirects to Google
2. **Google authenticates** → Google redirects to **Supabase's callback URL**
3. **Supabase processes OAuth** → Supabase redirects to **your app's callback URL** (`/auth/callback`)

## Configuration Steps

### Step 1: Google Cloud Console Configuration

Go to: https://console.cloud.google.com/auth/clients?project=agrogram-5e026

#### Authorized JavaScript Origins
These are the domains where your app runs (where OAuth requests originate from).

✅ **Correct Configuration:**
- `https://agrogram-wheat.vercel.app`
- `http://localhost:3000`

#### Authorized Redirect URIs
⚠️ **THIS IS THE KEY ISSUE!** 

When using Supabase, Google must redirect to **Supabase's callback URL**, NOT your app's callback URLs.

✅ **Correct Configuration (REPLACE your current ones):**
- `https://gwjpmypuqmmoqcjyufln.supabase.co/auth/v1/callback`

❌ **Remove these (they're wrong for Supabase OAuth):**
- ~~`http://localhost:3000/auth/callback`~~
- ~~`https://agrogram-wheat.vercel.app/auth/callback`~~

### Step 2: Supabase Dashboard Configuration

Go to: https://supabase.com/dashboard/project/my-project-id/auth/providers

#### Enable Google Provider
1. Navigate to **Authentication** → **Providers**
2. Find **Google** and click **Enable**
3. Enter your **Google Client ID** and **Google Client Secret** from Google Cloud Console

#### Configure Redirect URLs
Go to: **Authentication** → **URL Configuration**

Add your app's callback URLs to the **Redirect URLs** list:

✅ **Add these URLs:**
- `http://localhost:3000/auth/callback`
- `https://agrogram-wheat.vercel.app/auth/callback`

This tells Supabase where to redirect users after successful OAuth authentication.

### Step 3: Verify Your Code

Your code in `OAuthButtons.jsx` is already correct! It's using:
- `redirectTo: redirectUrl` where `redirectUrl` is your app's `/auth/callback` route
- This is the URL Supabase will redirect to after processing OAuth

## Summary: Where Each URL Goes

| URL Type | Where It Goes | Example |
|----------|---------------|---------|
| **Authorized JavaScript Origins** | Google Cloud Console | `https://agrogram-wheat.vercel.app` |
| **Authorized Redirect URIs** | Google Cloud Console | `https://gwjpmypuqmmoqcjyufln.supabase.co/auth/v1/callback` |
| **Redirect URLs** | Supabase Dashboard → URL Configuration | `https://agrogram-wheat.vercel.app/auth/callback` |
| **Callback URL in Code** | Your app code (already correct) | `/auth/callback` |

## Common Issues & Solutions

### Issue: "redirect_uri_mismatch" error
**Solution:** Make sure Google Cloud Console has the Supabase callback URL (`https://gwjpmypuqmmoqcjyufln.supabase.co/auth/v1/callback`)

### Issue: "Invalid redirect URL" from Supabase
**Solution:** Make sure Supabase Dashboard → URL Configuration has your app's callback URLs

### Issue: OAuth works locally but not in production
**Solution:** 
- Check that production URL is in Google Cloud Console (Authorized JavaScript Origins)
- Check that Supabase has production callback URL in Redirect URLs list

## Testing Checklist

- [ ] Google OAuth enabled in Supabase Dashboard
- [ ] Google Client ID and Secret entered in Supabase
- [ ] Supabase callback URL added to Google Cloud Console (Authorized Redirect URIs)
- [ ] App callback URLs added to Supabase (Redirect URLs)
- [ ] Test locally: `http://localhost:3000`
- [ ] Test production: `https://agrogram-wheat.vercel.app`


