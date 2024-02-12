/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Ignorer ESLint under byggesteg
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;