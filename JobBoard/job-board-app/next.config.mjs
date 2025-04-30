/** @type {import('next').NextConfig} */
const nextConfig = {
  // Environment variables that will be available on the client-side
  // Note: We're not exposing the MongoDB URI to the client for security reasons
  env: {
    // Add any client-side environment variables here
  },
  // Server-side environment variables are automatically available in API routes
};

export default nextConfig;
