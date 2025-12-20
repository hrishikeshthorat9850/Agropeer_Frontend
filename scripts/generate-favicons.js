/**
 * Favicon Generator Script
 * 
 * This script helps generate properly sized favicon files from your source favicon.
 * 
 * To use this script, you need to install sharp:
 * npm install --save-dev sharp
 * 
 * Then run: node scripts/generate-favicons.js
 * 
 * Make sure you have a source favicon file at: public/favicon.png (or specify a different source)
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('❌ Sharp is not installed. Please install it first:');
  console.error('   npm install --save-dev sharp');
  console.error('\nAlternatively, you can use online tools:');
  console.error('   1. https://realfavicongenerator.net/');
  console.error('   2. https://favicon.io/');
  console.error('   3. https://www.favicon-generator.org/');
  process.exit(1);
}

const publicDir = path.join(__dirname, '..', 'public');
const sourceFavicon = path.join(publicDir, 'favicon.png');

// Check if source file exists
if (!fs.existsSync(sourceFavicon)) {
  console.error(`❌ Source favicon not found at: ${sourceFavicon}`);
  console.error('   Please ensure favicon.png exists in the public directory.');
  process.exit(1);
}

// Favicon sizes to generate
const faviconSizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'favicon-512x512.png', size: 512 },
];

async function generateFavicons() {
  console.log('🔄 Generating favicon sizes...\n');

  try {
    for (const { name, size } of faviconSizes) {
      const outputPath = path.join(publicDir, name);
      
      await sharp(sourceFavicon)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated: ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (16x16 and 32x32 combined)
    const favicon16 = await sharp(sourceFavicon)
      .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    
    const favicon32 = await sharp(sourceFavicon)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();

    // For .ico, we'll create a simple 32x32 PNG as .ico (browsers accept this)
    // For a proper .ico file, you'd need a specialized library
    const icoPath = path.join(publicDir, 'favicon.ico');
    await sharp(sourceFavicon)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(icoPath);
    
    console.log(`✅ Generated: favicon.ico (32x32)\n`);
    console.log('✨ All favicons generated successfully!');
    console.log('\n📝 Note: For a proper .ico file with multiple sizes, consider using:');
    console.log('   https://realfavicongenerator.net/ or https://favicon.io/\n');

  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    process.exit(1);
  }
}

generateFavicons();

