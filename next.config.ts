import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

// i18n
const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/pkg/locale/request.ts',
  experimental: {
    createMessagesDeclaration: './translations/en.json',
  },
})

// config
const nextConfig: NextConfig = {
  poweredByHeader: false,
  expireTime: 604800,

  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV !== 'production',
    },
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost', port: '4000' },
    ],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 1080, 1920],
    imageSizes: [16, 64, 128],
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },

  headers: async () => [
    {
      source: '/_next/image',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, immutable' }],
    },
  ],
}

export default withNextIntl(nextConfig)