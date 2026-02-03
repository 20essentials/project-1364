import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  // reactCompiler: true (Doesn't Work with PWA)
};

export default nextConfig;
