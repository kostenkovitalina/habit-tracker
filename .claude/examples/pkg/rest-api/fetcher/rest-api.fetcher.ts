import ky, { type KyInstance } from 'ky'

import { envClient } from '@/config/env'

// fetchers
export const restApiFetcher: KyInstance = ky.create({
  prefixUrl: `${envClient.NEXT_PUBLIC_CLIENT_API_URL}/v1`,
  throwHttpErrors: false,
})
