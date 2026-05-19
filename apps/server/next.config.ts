import type { NextConfig } from 'next'

import { withPayload } from '@payloadcms/next/withPayload'

// config
const nextConfig: NextConfig = {
  poweredByHeader: false,

  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 25,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
