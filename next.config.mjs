/** @type {import('next').NextConfig} */
const nextConfig = {
  // REQUIRED for Capacitor static routing
  trailingSlash: true,
  output: "export",
  // REQUIRED for static export
 images: {
    unoptimized : true,
  },

  // Keep this – safe
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // Turbopack configuration for better compatibility
  turbopack: {},
  // Enable production client source maps to map runtime errors to original source
  productionBrowserSourceMaps: true,
  
};

export default nextConfig;
