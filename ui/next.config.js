/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow reading files from the parent repo at build/runtime.
  experimental: { externalDir: true },
  // Pyodide loads from a CDN; we permit it via webpack fallback.
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false, path: false };
    return config;
  },
};
module.exports = nextConfig;
