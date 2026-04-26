const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow reading files from the parent repo at build/runtime.
  experimental: {
    externalDir: true,
    // Bundle the snapshot directory into serverless functions so /docs,
    // /audit, and /api/search can read repo files at runtime on Vercel.
    outputFileTracingIncludes: {
      "/docs/**": ["./repo-snapshot/**/*"],
      "/audit": ["./repo-snapshot/**/*"],
      "/api/search/**": ["./repo-snapshot/**/*"],
    },
  },
  outputFileTracingRoot: path.join(__dirname),
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false, path: false };
    return config;
  },
};
module.exports = nextConfig;
