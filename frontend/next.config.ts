import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 2592000,
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'vistainsaat.com' },
      { protocol: 'https', hostname: 'www.vistainsaat.com' },
      { protocol: 'https', hostname: 'api.vistainsaat.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
      ...(process.env.NODE_ENV === 'development'
        ? [
            { protocol: 'http' as const, hostname: 'localhost', port: '8086' },
            { protocol: 'http' as const, hostname: '127.0.0.1', port: '8086' },
          ]
        : []),
    ],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/tr',
        permanent: true,
      },
    ];
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'sonner', '@tanstack/react-query'],
  },

  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          ...(isDev ? [{ key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' }] : []),
        ],
      },
      ...(!isDev
        ? [
            {
              source: '/_next/static/(.*)',
              headers: [
                { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
              ],
            },
          ]
        : []),
    ];
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  compress: true,
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
