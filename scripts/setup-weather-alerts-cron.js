/**
 * Setup script for weather alerts cron job
 * 
 * This script can be used to set up a cron job that calls the weather alerts API
 * 
 * For production, you can:
 * 1. Use a cron service like cron-job.org, EasyCron, or Vercel Cron
 * 2. Set up a server-side cron job
 * 3. Use a cloud function scheduler
 * 
 * Recommended schedule: Every 4-6 hours (to check weather 3 times per day)
 */

const CRON_SCHEDULE = '0 */4 * * *'; // Every 4 hours
const API_ENDPOINT = process.env.NEXT_PUBLIC_APP_URL 
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/weather-alerts/check-and-send`
  : 'http://localhost:3000/api/weather-alerts/check-and-send';

console.log(`
📅 Weather Alerts Cron Job Setup
================================

Schedule: ${CRON_SCHEDULE} (Every 4 hours)
Endpoint: POST ${API_ENDPOINT}

To set up:

1. Using cron-job.org (Free):
   - Go to https://cron-job.org
   - Create account
   - Add new cron job:
     * URL: ${API_ENDPOINT}
     * Method: POST
     * Schedule: Every 4 hours
     * Headers: Content-Type: application/json

2. Using Vercel Cron (if deployed on Vercel):
   Add to vercel.json:
   {
     "crons": [{
       "path": "/api/weather-alerts/check-and-send",
       "schedule": "0 */4 * * *"
     }]
   }

3. Using server-side cron (Node.js):
   Install: npm install node-cron
   Then run this script or create a separate cron service.

4. Manual testing:
   curl -X POST ${API_ENDPOINT} \\
     -H "Content-Type: application/json" \\
     -d '{}'
`);

