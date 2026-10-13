import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  turbopack: { root: import.meta.dirname },
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  // Needed for a single 404 page with several root layouts ([locale] and the `/` redirect).
  experimental: { globalNotFound: true },
};

export default nextConfig;
