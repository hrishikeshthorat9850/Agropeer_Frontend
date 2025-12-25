Android Deep Link Password Reset: Technical Documentation
This document explains the "Forgot Password" flow implemented for the AgroPeer Android App using Capacitor and Supabase.

1. High-Level Overview
The goal is to allow a user to reset their password via an email link that opens the Android App directly instead of a web browser.

The Flow:

User enters email in the app -> requests password reset.
Supabase sends an email with a special link.
User clicks the link on their phone.
Android OS recognizes the link (agropeer://...) and launches the AgroPeer app.
App intercepts the link, logs the user in automatically, and navigates to the "Reset Password" screen.
User enters a new password.
2. Key Technologies
Deep Links (Custom URL Schemes): A deep link is like a website URL, but for apps. Instead of https://google.com, we use agropeer://reset-password. When Android sees agropeer://, it knows to open your app.
Supabase Auth: Manages the user accounts and sends the emails. It supports "PKCE" (Proof Key for Code Exchange), which is a secure way to log in via URL codes.
Capacitor: The bridge that lets your web code (React/Next.js) talk to native Android features (like listening for app launches).
3. Step-by-Step Implementation Details
Step A: Sending the Reset Request
File: 
app/forgot-password/page.jsx

When the user submits their email:

const redirectTo = "agropeer://reset-password"; 
await supabase.auth.resetPasswordForEmail(email, { redirectTo });
We tell Supabase: "When the user clicks the link in the email, send them to agropeer://reset-password".
Supabase appends a secure code (for PKCE) or access_token (for Implicit) to this URL.
Step B: Android Configuration (The "Doorway")
File: 
android/app/src/main/AndroidManifest.xml
 (Native Code) File: 
capacitor.config.json
 (Configuration)

For the app to "capture" the link, it must register the agropeer scheme.

// capacitor.config.json
"server": {
  "androidScheme": "agropeer" 
}
This tells Android: "If you see a link starting with agropeer://, this app can handle it."

Step C: Receiving the Link (The "Bridge")
File: 
Mobile/MobileResetPasswordHandler.jsx

This component is mounted globally in your app. It listens for the appUrlOpen event, which fires whenever the app is opened via a Deep Link.

Listener: App.addListener("appUrlOpen", ...) catches the URL.
Filter: It checks if (url.includes("reset-password")). We ignore other links (like OAuth logins) here.
Parsing: It extracts the code parameter from the URL.
Example URL: agropeer://reset-password?code=123xyz...
Exchange: It calls supabase.auth.exchangeCodeForSession(code).
This trades the one-time code for a valid user Session.
Result: The user is now logged in!
Step D: The Reset Screen
File: 
app/reset-password/page.jsx

Now that the user is logged in (thanks to Step C), they can securely update their password.

Validation: Checks if Password matches Confirm Password.
Update: Calls supabase.auth.updateUser({ password: newPassword }).
Completion: Redirects the user to the Login page (or Home) upon success.
4. Conflict Resolution (The "Gotcha")
File: 
Mobile/MobileOAuthHandler.jsx

You also have a 
MobileOAuthHandler
 for Google/Facebook logins. Initially, it tried to handle every deep link, which caused it to intercept the password reset link and redirect to /home prematurely.

The Fix: We added a check in 
MobileOAuthHandler
:

// 🛑 Critical: Ignore reset-password links
if (url.includes("reset-password")) return;
This ensures that the Reset Handler gets exclusive control over reset links.

5. Summary of URLs
URL Scheme	Handled By	Purpose
agropeer://reset-password	
MobileResetPasswordHandler
Password Reset Flow
agropeer://login-callback	
MobileOAuthHandler
Social Login (Google/FB)
https://...	System Browser	Normal Web Browsing
Note: You must ensure agropeer://reset-password is whitelisted in your Supabase Dashboard > Authentication > URL Configuration > Redirect URLs. If it's not there, Supabase won't allow the email to be sent with that link.