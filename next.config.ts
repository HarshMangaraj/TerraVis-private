import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: 'output: export' removed — it's a production-only static export setting
  // that adds significant overhead in dev mode. Re-add only for production builds.
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "*.replit.dev",
    "*.repl.co",
    "*.pike.replit.dev",
  ],
};

export default nextConfig;
