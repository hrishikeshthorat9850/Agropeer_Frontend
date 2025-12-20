# Step-by-Step: Adding Redirect URL to Supabase

## ⚠️ This is the MOST COMMON issue causing "No OAuth code received"

Follow these steps **exactly** to fix the issue:

## Step 1: Open Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Select your project (the one with URL: `gwjpmypuqmmoqcjyufln.supabase.co`)

## Step 2: Navigate to URL Configuration

1. In the left sidebar, click **Authentication**
2. Click **URL Configuration** (it's in the submenu under Authentication)
3. You should see a page with:
   - **Site URL** field
   - **Redirect URLs** section (this is what we need!)

## Step 3: Add Your Callback URLs

In the **Redirect URLs** section:

1. Click the **"Add URL"** button (or **"+"** button)
2. Add this URL **exactly** (copy-paste to avoid typos):
   ```
   http://localhost:3000/auth/callback
   ```
3. Click **"Add URL"** again and add:
   ```
   https://agrogram-wheat.vercel.app/auth/callback
   ```

## Step 4: Verify the URLs

Make sure:
- ✅ No trailing slashes (`/auth/callback` not `/auth/callback/`)
- ✅ Correct protocol (`http://` for localhost, `https://` for production)
- ✅ Exact path (`/auth/callback` not `/auth/callbacks` or `/callback`)
- ✅ No extra spaces before or after

## Step 5: Save

1. Click **"Save"** button at the bottom of the page
2. Wait for the success message

## Step 6: Test Again

1. Go back to your app
2. Try "Sign in with Google" again
3. Check the browser console for debug logs

## Visual Checklist

```
Supabase Dashboard
├── Authentication
    ├── Providers ✅ (Google enabled with Client ID/Secret)
    └── URL Configuration ← YOU ARE HERE
        ├── Site URL: (your production URL)
        └── Redirect URLs:
            ├── ✅ http://localhost:3000/auth/callback
            └── ✅ https://agrogram-wheat.vercel.app/auth/callback
```

## Common Mistakes to Avoid

❌ **Wrong:**
- `http://localhost:3000/auth/callback/` (trailing slash)
- `http://localhost:3000/Auth/Callback` (wrong case)
- `http://localhost:3000/callback` (missing `/auth`)
- `localhost:3000/auth/callback` (missing protocol)

✅ **Correct:**
- `http://localhost:3000/auth/callback`
- `https://agrogram-wheat.vercel.app/auth/callback`

## Still Not Working?

If you've added the URLs correctly but still get the error:

1. **Double-check the exact URL** in your browser's address bar when you see the error
   - Copy the full URL from the address bar
   - Compare it character-by-character with what's in Supabase

2. **Check Supabase logs:**
   - Go to **Logs** → **Auth Logs** in Supabase Dashboard
   - Look for any errors related to redirect URLs

3. **Clear browser cache:**
   - Sometimes old redirects are cached
   - Try in incognito/private mode

4. **Verify Google Cloud Console:**
   - Make sure **Authorized Redirect URIs** has: `https://gwjpmypuqmmoqcjyufln.supabase.co/auth/v1/callback`
   - This is different from what goes in Supabase!

## Quick Test

After adding the URLs, you can test by:

1. Opening browser console (F12)
2. Clicking "Sign in with Google"
3. After Google auth, check the URL you're redirected to
4. It should look like: `http://localhost:3000/auth/callback?code=...`
5. If you see `http://localhost:3000/auth/callback` without `?code=...`, the URL isn't configured correctly in Supabase


