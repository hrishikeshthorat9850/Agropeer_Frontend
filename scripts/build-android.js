#!/usr/bin/env node

/**
 * Build script for Android APK
 * This script:
 * 1. Builds Next.js with static export
 * 2. Syncs with Capacitor
 * 3. Optionally builds the APK
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Android build process...\n');

// Step 1: Backup original next.config.mjs
const nextConfigPath = path.join(process.cwd(), 'next.config.mjs');
const nextConfigBackupPath = path.join(process.cwd(), 'next.config.mjs.backup');
const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');

// Check if static export is already configured
const hasStaticExport = nextConfigContent.includes("output: 'export'");

if (!hasStaticExport) {
  console.log('📝 Creating Android build configuration...');
  
  // Backup original config
  fs.writeFileSync(nextConfigBackupPath, nextConfigContent);
  console.log('✅ Backed up next.config.mjs\n');
  
  // Read and modify config
  let modifiedConfig = nextConfigContent;
  
  // Add static export configuration
  const exportConfig = `  // Static export for Android (added by build script)
  output: 'export',
  trailingSlash: true,
  `;
  
  // Insert after the config object opening
  const configMatch = modifiedConfig.match(/(const nextConfig = \{)/);
  if (configMatch) {
    const insertIndex = configMatch.index + configMatch[0].length;
    modifiedConfig = modifiedConfig.slice(0, insertIndex) + '\n' + exportConfig + modifiedConfig.slice(insertIndex);
  }
  
  // Write modified config
  fs.writeFileSync(nextConfigPath, modifiedConfig);
  console.log('✅ Modified next.config.mjs for static export\n');
}

try {
  // Step 2: Build Next.js
  console.log('📦 Building Next.js application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Next.js build completed\n');
  
  // Step 3: Sync Capacitor
  console.log('🔄 Syncing Capacitor...');
  execSync('npx cap sync android', { stdio: 'inherit' });
  console.log('✅ Capacitor sync completed\n');
  
  // Step 4: Ask if user wants to build APK
  const args = process.argv.slice(2);
  const buildApk = args.includes('--apk') || args.includes('-a');
  
  if (buildApk) {
    console.log('🔨 Building Android APK...');
    execSync('cd android && ./gradlew assembleRelease', { stdio: 'inherit' });
    console.log('\n✅ APK build completed!');
    console.log('📱 APK location: android/app/build/outputs/apk/release/app-release.apk\n');
  } else {
    console.log('💡 Tip: Run with --apk flag to build the APK: npm run build:android -- --apk\n');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // Restore original config if it was modified
  if (!hasStaticExport && fs.existsSync(nextConfigBackupPath)) {
    console.log('🔄 Restoring original next.config.mjs...');
    fs.copyFileSync(nextConfigBackupPath, nextConfigPath);
    fs.unlinkSync(nextConfigBackupPath);
    console.log('✅ Original configuration restored\n');
  }
}

console.log('✨ Android build process completed!\n');

