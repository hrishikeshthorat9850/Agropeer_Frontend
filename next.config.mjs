/** @type {import('next').NextConfig} */
const nextConfig = {
  // REQUIRED for Capacitor static routing
  trailingSlash: true,

  // REQUIRED for static export
  images: {
    unoptimized: true,
  },

  // Keep this – safe
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default nextConfig;
