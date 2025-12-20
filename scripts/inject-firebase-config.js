/**
 * Build-time script to inject Firebase config into service worker
 * Run this before building: node scripts/inject-firebase-config.js
 */

const fs = require('fs');
const path = require('path');

// Try to load environment variables from multiple locations
const envPaths = [
  path.join(__dirname, '..', '.env.local'),
  path.join(__dirname, '..', '.env'),
  path.join(process.cwd(), '.env.local'),
  path.join(process.cwd(), '.env'),
];

let envLoaded = false;
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
    console.log(`📄 Loaded environment from: ${path.basename(envPath)}`);
    envLoaded = true;
    break;
  }
}

if (!envLoaded) {
  console.warn('⚠️  No .env.local or .env file found. Trying to use existing environment variables...');
  // Still try to load dotenv with default behavior
  require('dotenv').config();
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate all required values
const requiredVars = [
  { key: 'apiKey', env: 'NEXT_PUBLIC_FIREBASE_API_KEY' },
  { key: 'authDomain', env: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN' },
  { key: 'projectId', env: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID' },
  { key: 'messagingSenderId', env: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID' },
  { key: 'appId', env: 'NEXT_PUBLIC_FIREBASE_APP_ID' },
];

const missing = requiredVars.filter(({ key }) => !firebaseConfig[key]);

// If missing, try to extract from existing service worker as fallback
if (missing.length > 0) {
  const swPath = path.join(__dirname, '..', 'public', 'firebase-messaging-sw.js');
  if (fs.existsSync(swPath)) {
    const swContent = fs.readFileSync(swPath, 'utf8');
    const configMatch = swContent.match(/firebase\.initializeApp\(\{[\s\S]*?\}\)/);
    
    if (configMatch) {
      console.log('⚠️  Some env vars missing. Attempting to extract from existing service worker...\n');
      
      // Try to extract values from existing service worker
      const extractValue = (key) => {
        const regex = new RegExp(`${key}:\\s*"([^"]+)"`, 'i');
        const match = configMatch[0].match(regex);
        return match ? match[1] : null;
      };
      
      missing.forEach(({ key, env }) => {
        const extracted = extractValue(key);
        if (extracted) {
          firebaseConfig[key] = extracted;
          console.log(`   ✅ Extracted ${key} from existing service worker`);
        }
      });
      
      // Re-check what's still missing
      const stillMissing = requiredVars.filter(({ key }) => !firebaseConfig[key]);
      
      if (stillMissing.length > 0) {
        console.error('\n❌ Still missing Firebase environment variables:');
        stillMissing.forEach(({ key, env }) => {
          console.error(`   - ${env} (for ${key})`);
        });
        console.error('\n💡 Please add these to your .env.local file:');
        console.error('   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key');
        console.error('   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com');
        console.error('   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id');
        console.error('   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id');
        console.error('   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id\n');
        console.error('   Or run: npm run check-firebase-env\n');
        process.exit(1);
      } else {
        console.log('\n✅ Using values from existing service worker\n');
      }
    } else {
      console.error('\n❌ Missing Firebase environment variables:');
      missing.forEach(({ key, env }) => {
        console.error(`   - ${env} (for ${key})`);
      });
      console.error('\n💡 Please add these to your .env.local file.');
      console.error('   Run: npm run check-firebase-env to see what\'s missing\n');
      process.exit(1);
    }
  } else {
    console.error('\n❌ Missing Firebase environment variables:');
    missing.forEach(({ key, env }) => {
      console.error(`   - ${env} (for ${key})`);
    });
    console.error('\n💡 Please add these to your .env.local file.');
    console.error('   Run: npm run check-firebase-env to see what\'s missing\n');
    process.exit(1);
  }
}

console.log('✅ All Firebase environment variables found');

// Read service worker template (or existing file)
const swPath = path.join(__dirname, '..', 'public', 'firebase-messaging-sw.js');
const templatePath = path.join(__dirname, '..', 'public', 'firebase-messaging-sw.template.js');

let swContent;
if (fs.existsSync(templatePath)) {
  // Use template if it exists
  swContent = fs.readFileSync(templatePath, 'utf8');
  // Replace placeholders
  swContent = swContent
    .replace('{{FIREBASE_API_KEY}}', firebaseConfig.apiKey)
    .replace('{{FIREBASE_AUTH_DOMAIN}}', firebaseConfig.authDomain)
    .replace('{{FIREBASE_PROJECT_ID}}', firebaseConfig.projectId)
    .replace('{{FIREBASE_MESSAGING_SENDER_ID}}', firebaseConfig.messagingSenderId)
    .replace('{{FIREBASE_APP_ID}}', firebaseConfig.appId);
} else {
  // Read existing file and replace config
  swContent = fs.readFileSync(swPath, 'utf8');
  // Replace hardcoded config with environment variables
  swContent = swContent.replace(
    /firebase\.initializeApp\(\{[\s\S]*?\}\);/,
    `firebase.initializeApp(${JSON.stringify(firebaseConfig, null, 2)});`
  );
}

// Write updated service worker
fs.writeFileSync(swPath, swContent, 'utf8');
console.log('✅ Firebase config injected into service worker');

