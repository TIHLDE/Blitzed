/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Ignorer ESLint under byggesteg
      ignoreDuringBuilds: true,
    },
    experimental: {
      serverActions: true,
    },
  };
  
  module.exports = nextConfig;