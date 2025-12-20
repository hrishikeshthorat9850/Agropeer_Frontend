/**
 * Helper script to check Firebase environment variables
 * Run: node scripts/check-firebase-env.js
 */

const fs = require('fs');
const path = require('path');

// Try to load environment variables
const envPaths = [
  path.join(__dirname, '..', '.env.local'),
  path.join(__dirname, '..', '.env'),
];

let envLoaded = false;
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
    console.log(`\n📄 Found and loaded: ${envPath}\n`);
    envLoaded = true;
    break;
  }
}

if (!envLoaded) {
  console.log('\n⚠️  No .env.local or .env file found in project root\n');
}

const requiredVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  'NEXT_PUBLIC_FIREBASE_VAPID_KEY',
];

console.log('🔍 Checking Firebase environment variables:\n');
console.log('─'.repeat(60));

let allPresent = true;
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    // Show first/last few characters for security
    const display = value.length > 20 
      ? `${value.substring(0, 10)}...${value.substring(value.length - 5)}`
      : `${value.substring(0, 5)}...`;
    console.log(`✅ ${varName}`);
    console.log(`   Value: ${display} (${value.length} chars)`);
  } else {
    console.log(`❌ ${varName} - NOT SET`);
    allPresent = false;
  }
  console.log('');
});

console.log('─'.repeat(60));

if (allPresent) {
  console.log('\n✅ All Firebase environment variables are set!\n');
} else {
  console.log('\n❌ Some environment variables are missing.\n');
  console.log('💡 To fix this:\n');
  console.log('   1. Create a .env.local file in your project root');
  console.log('   2. Add the missing variables:\n');
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      console.log(`      ${varName}=your_value_here`);
    }
  });
  console.log('\n   3. Get values from Firebase Console:');
  console.log('      https://console.firebase.google.com/');
  console.log('      → Project Settings → General → Your apps\n');
}

// Check for service account
console.log('🔐 Server-side credentials:\n');
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (fs.existsSync(credPath)) {
    console.log(`✅ GOOGLE_APPLICATION_CREDENTIALS: ${credPath}`);
  } else {
    console.log(`⚠️  GOOGLE_APPLICATION_CREDENTIALS: ${credPath} (file not found)`);
  }
} else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  console.log('✅ FIREBASE_SERVICE_ACCOUNT_KEY: Set (JSON content)');
} else {
  console.log('❌ No service account credentials found');
  console.log('   Set either GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT_KEY\n');
}

