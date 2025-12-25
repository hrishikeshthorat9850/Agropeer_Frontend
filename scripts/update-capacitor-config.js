const fs = require('fs');
const path = require('path');
const os = require('os');

const configPath = path.join(process.cwd(), 'capacitor.config.json');

// Helper to get local IP address
function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip internal (i.e. 127.0.0.1) and non-ipv4 addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const args = process.argv.slice(2);
const mode = args[0]; // 'dev' or 'prod'

if (!['dev', 'prod'].includes(mode)) {
    console.error('❌ Usage: node scripts/update-capacitor-config.js <dev|prod>');
    process.exit(1);
}

const config = require(configPath);

if (mode === 'dev') {
    const localIp = getLocalIpAddress();
    console.log(`🔧 Configuring for DEVELOPMENT (Live Reload) on ${localIp}...`);

    // In dev, we point to the local Next.js server
    config.server = {
        ...config.server,
        url: `http://${localIp}:3000`,
        cleartext: true,
    };
} else {
    console.log('🚀 Configuring for PRODUCTION (Bundled)...');

    // In prod, we remove the server URL so it loads from the local bundle (index.html)
    // We keep androidScheme but remove 'url' and 'cleartext'
    if (config.server) {
        delete config.server.url;
        delete config.server.cleartext;
    }
}

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log('✅ capacitor.config.json updated!');
