/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
