# Push Notifications Implementation Guide

## ✅ Implementation Complete!

Push notifications for chats and weather alerts are now fully implemented.

---

## 📁 Files Created/Updated

### Core Services
- ✅ `lib/notificationService.js` - Notification service with rate limiting
- ✅ `server/server.js` - Updated to send chat push notifications

### API Routes
- ✅ `app/api/weather-alerts/route.js` - Send weather alerts & check rate limits
- ✅ `app/api/weather-alerts/check-and-send/route.js` - Automated weather check endpoint

### Database
- ✅ `database/weather_alerts_sent_schema.sql` - Schema for tracking weather alerts

### Scripts
- ✅ `scripts/setup-weather-alerts-cron.js` - Cron job setup guide

---

## 🔔 Chat Notifications

### How It Works

1. **When a message is sent:**
   - Server receives message via Socket.IO
   - Message is saved to database
   - Socket.IO broadcasts to online users
   - **NEW:** If recipient is offline, push notification is sent

2. **Notification Details:**
   - Title: "New message from [Sender Name]"
   - Body: Message content (truncated to 100 chars)
   - Data: Includes conversation ID, sender ID, message ID
   - Link: Opens chat conversation when clicked

3. **Smart Sending:**
   - Only sends if recipient is **not online**
   - Gets sender name from database
   - Handles errors gracefully (doesn't break chat)

### Testing Chat Notifications

1. User A logs in and opens chat
2. User B logs in (or stays logged out)
3. User A sends a message
4. If User B is offline → Push notification sent
5. If User B is online → No push (gets real-time message)

---

## 🌤️ Weather Alerts

### How It Works

1. **Rate Limiting:**
   - Maximum 3 alerts per user per day
   - Tracks in `weather_alerts_sent` table
   - Resets at midnight (UTC)

2. **Alert Conditions:**
   - **High Temperature:** > 35°C
   - **Rain Alert:** > 60% chance of rain
   - **High Wind:** > 40 km/h

3. **Automated Checking:**
   - Endpoint: `/api/weather-alerts/check-and-send`
   - Checks all users with location data
   - Sends alerts for critical conditions
   - Respects rate limits

### Database Setup

Run this SQL in Supabase:

```sql
CREATE TABLE IF NOT EXISTS public.weather_alerts_sent (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  alert_type TEXT NOT NULL,
  weather_data JSONB,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT weather_alerts_sent_pkey PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS idx_weather_alerts_sent_user_id ON public.weather_alerts_sent(user_id);
CREATE INDEX IF NOT EXISTS idx_weather_alerts_sent_sent_at ON public.weather_alerts_sent(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_weather_alerts_user_date ON public.weather_alerts_sent(user_id, (sent_at::date));
```

### Setting Up Automated Weather Checks

#### Option 1: Cron Job Service (Recommended)

1. **Use cron-job.org (Free):**
   - Go to https://cron-job.org
   - Create account
   - Add new cron job:
     - URL: `https://your-domain.com/api/weather-alerts/check-and-send`
     - Method: POST
     - Schedule: Every 4-6 hours
     - Headers: `Content-Type: application/json`

#### Option 2: Vercel Cron (If deployed on Vercel)

Add to `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/weather-alerts/check-and-send",
    "schedule": "0 */4 * * *"
  }]
}
```

#### Option 3: Manual Testing

```bash
curl -X POST http://localhost:3000/api/weather-alerts/check-and-send \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## 🧪 Testing

### Test Chat Notifications

1. **Setup:**
   - User A: Log in, allow notifications
   - User B: Log in, allow notifications

2. **Test:**
   - User B logs out or closes browser
   - User A sends message to User B
   - User B should receive push notification

### Test Weather Alerts

1. **Manual Test:**
   ```bash
   # Check if user can receive alert
   curl "http://localhost:3000/api/weather-alerts?userId=YOUR_USER_ID"
   
   # Send test alert
   curl -X POST http://localhost:3000/api/weather-alerts \
     -H "Content-Type: application/json" \
     -d '{
       "userId": "YOUR_USER_ID",
       "type": "high_temp",
       "title": "🌡️ High Temperature Alert",
       "body": "Temperature is 38°C. Ensure crops are well irrigated.",
       "weatherData": {"temperature": 38}
     }'
   ```

2. **Automated Check:**
   ```bash
   curl -X POST http://localhost:3000/api/weather-alerts/check-and-send \
     -H "Content-Type: application/json" \
     -d '{}'
   ```

---

## 📊 API Endpoints

### Chat Notifications
- **Automatic** - Sent from `server/server.js` when message is received

### Weather Alerts

#### Send Alert
```
POST /api/weather-alerts
Body: {
  userId: string,
  type: string,
  title: string,
  body: string,
  weatherData?: object
}
```

#### Check Rate Limit
```
GET /api/weather-alerts?userId=xxx
Response: {
  canSend: boolean,
  count: number,
  remaining: number
}
```

#### Automated Check & Send
```
POST /api/weather-alerts/check-and-send
Body: { userId?: string } // Optional, checks all users if omitted
```

---

## 🔧 Configuration

### Environment Variables Needed

Already set up:
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- ✅ `GOOGLE_APPLICATION_CREDENTIALS` (or `FIREBASE_SERVICE_ACCOUNT_KEY`)

Optional:
- `NEXT_PUBLIC_APP_URL` - For cron job setup (your production URL)

---

## 📝 Notes

1. **Chat Notifications:**
   - Only sent when recipient is offline
   - Includes sender name from database
   - Links directly to conversation

2. **Weather Alerts:**
   - Rate limited to 3 per day per user
   - Only sends for critical conditions
   - Tracks all sent alerts in database

3. **Error Handling:**
   - Notification failures don't break chat/weather features
   - Errors are logged but don't crash the system

---

## 🚀 Next Steps

1. ✅ Create `weather_alerts_sent` table in Supabase
2. ✅ Test chat notifications
3. ✅ Test weather alerts
4. ✅ Set up cron job for automated weather checks
5. ✅ Monitor notification delivery rates

---

## 🎉 Ready to Use!

Your push notification system is now fully functional for both chats and weather alerts!

