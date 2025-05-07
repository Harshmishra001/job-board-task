/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment variables that will be available on the client-side
  env: {
    // Public environment variables (these are also available via process.env.NEXT_PUBLIC_*)
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  // Server-side environment variables are automatically available in API routes
};

module.exports = nextConfig;
