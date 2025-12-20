# Firebase Service Account Setup Guide

## 🔐 What You Need

To send push notifications from your server, you need Firebase Service Account credentials.

## 📋 Step-by-Step Setup

### Option 1: Download JSON File (Recommended)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: `agrogram-5e026`

2. **Get Service Account Key**
   - Click the gear icon ⚙️ → **Project Settings**
   - Go to **Service accounts** tab
   - Click **Generate new private key**
   - Click **Generate key** in the popup
   - A JSON file will download (e.g., `agrogram-5e026-firebase-adminsdk-xxxxx.json`)

3. **Save the File Securely**
   ```bash
   # Create a config directory (if it doesn't exist)
   mkdir config
   
   # Move the downloaded file there
   # Rename it to something simpler
   mv ~/Downloads/agrogram-5e026-firebase-adminsdk-xxxxx.json ./config/firebase-service-account.json
   ```

4. **Add to `.env` file**
   ```env
   GOOGLE_APPLICATION_CREDENTIALS=./config/firebase-service-account.json
   ```

5. **Add to `.gitignore`** (IMPORTANT!)
   ```
   # Firebase Service Account
   config/firebase-service-account.json
   *.json
   !package*.json
   ```

### Option 2: Use Environment Variable (Alternative)

If you prefer not to use a file:

1. **Download the JSON file** (same as Option 1, step 1-2)

2. **Copy the entire JSON content**

3. **Add to `.env` file** (as a single line, no line breaks)
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"agrogram-5e026",...}
   ```
   
   ⚠️ **Note**: The entire JSON must be on one line, or use proper escaping.

## ✅ Verify Setup

After adding the credentials, run:

```bash
npm run check-firebase-env
```

You should see:
```
✅ GOOGLE_APPLICATION_CREDENTIALS: ./config/firebase-service-account.json
```

OR

```
✅ FIREBASE_SERVICE_ACCOUNT_KEY: Set (JSON content)
```

## 🚀 Next Steps

Once service account is set up:

1. **Inject Firebase config:**
   ```bash
   npm run inject-firebase
   ```

2. **Test sending notifications:**
   - Go to `/admin/send-notification`
   - Send a test notification

## 🔒 Security Reminders

- ✅ **Never commit** service account JSON files to git
- ✅ **Never commit** `.env` file to git  
- ✅ Add to `.gitignore`:
  ```
  .env
  .env.local
  config/firebase-service-account.json
  *.json
  !package*.json
  ```
- ✅ Use different service accounts for dev/staging/production
- ✅ Rotate keys periodically

## 🐛 Troubleshooting

### "File not found" error
- Check the path in `GOOGLE_APPLICATION_CREDENTIALS` is correct
- Use relative path from project root: `./config/firebase-service-account.json`
- Or use absolute path: `C:/full/path/to/file.json`

### "Invalid JSON" error (Option 2)
- Make sure the entire JSON is on one line
- Or properly escape newlines: `{"key":"value\nwith\nnewlines"}`

### "Permission denied" error
- Make sure the service account has "Firebase Cloud Messaging API Admin" role
- In Firebase Console → IAM & Admin → Service Accounts → Check permissions

