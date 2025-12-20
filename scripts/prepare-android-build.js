#!/usr/bin/env node

/**
 * Prepare Android Build Script
 * This script adds export const dynamic = "force-static" to all API routes
 * to allow static export to work with API routes (they'll be skipped)
 */

const fs = require('fs');
const path = require('path');

const API_DIR = path.join(process.cwd(), 'app', 'api');

function findRouteFiles(dir, fileList = [], relativePath = '') {
  const files = fs.readdirSync(dir);
  const baseDir = path.join(process.cwd(), 'app', 'api');

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const newRelativePath = path.join(relativePath, file);
      findRouteFiles(filePath, fileList, newRelativePath);
    } else if (file === 'route.js') {
      // Check if any part of the path contains dynamic segments (brackets like [id])
      const fullPath = path.relative(baseDir, filePath);
      const pathParts = fullPath.split(path.sep);
      const isDynamic = pathParts.some(part => part.startsWith('[') && part.endsWith(']'));
      fileList.push({ path: filePath, isDynamic, relativePath: fullPath });
    }
  });

  return fileList;
}

function prepareAndroidBuild() {
  console.log('🔧 Preparing API routes for Android static export...\n');

  if (!fs.existsSync(API_DIR)) {
    console.log('⚠️  API directory not found, skipping...\n');
    return [];
  }

  // Find all API route files
  const routeFiles = findRouteFiles(API_DIR);
  const modifiedFiles = [];

  for (const routeInfo of routeFiles) {
    const filePath = routeInfo.path;
    const isDynamic = routeInfo.isDynamic;
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let wasModified = false;

      // Add export const dynamic = "force-static" if not present
      if (!content.includes('export const dynamic')) {
        const dynamicExport = "export const dynamic = 'force-static';\n\n";
        
        // Insert after imports but before other code
        const importMatch = content.match(/(import[\s\S]*?from[\s\S]*?;[\s\n]*)+/);
        
        if (importMatch) {
          const insertIndex = importMatch.index + importMatch[0].length;
          content = content.slice(0, insertIndex) + dynamicExport + content.slice(insertIndex);
        } else {
          // No imports, add at the very beginning
          content = dynamicExport + content;
        }
        wasModified = true;
      }

      // For dynamic routes, add generateStaticParams if not present
      if (isDynamic && !content.includes('generateStaticParams')) {
        const generateStaticParams = "\n// Empty generateStaticParams for static export (API routes are called from Vercel)\nexport async function generateStaticParams() {\n  return [];\n}\n\n";
        
        // Insert after dynamic export or imports
        const dynamicMatch = content.match(/export const dynamic[\s\S]*?\n\n/);
        if (dynamicMatch) {
          const insertIndex = dynamicMatch.index + dynamicMatch[0].length;
          content = content.slice(0, insertIndex) + generateStaticParams + content.slice(insertIndex);
        } else {
          // If no dynamic export, add after imports
          const importMatch = content.match(/(import[\s\S]*?from[\s\S]*?;[\s\n]*)+/);
          if (importMatch) {
            const insertIndex = importMatch.index + importMatch[0].length;
            content = content.slice(0, insertIndex) + generateStaticParams + content.slice(insertIndex);
          } else {
            // Add at the beginning
            content = generateStaticParams + content;
          }
        }
        wasModified = true;
      }

      if (wasModified) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedFiles.push(filePath);
        const routeType = isDynamic ? ' (dynamic)' : '';
        console.log(`✅ Modified: ${path.relative(process.cwd(), filePath)}${routeType}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  console.log(`\n✨ Prepared ${modifiedFiles.length} API route files for static export\n`);
  return modifiedFiles;
}

// Run if called directly
if (require.main === module) {
  prepareAndroidBuild();
}

module.exports = { prepareAndroidBuild };

