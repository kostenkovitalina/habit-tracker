import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

// env client
export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_CLIENT_WEB_URL: z.string().nonempty({ message: 'NEXT_PUBLIC_CLIENT_WEB_URL is required' }),
    NEXT_PUBLIC_CLIENT_API_URL: z.string().nonempty({ message: 'NEXT_PUBLIC_CLIENT_API_URL is required' }),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_CLIENT_WEB_URL: process.env.NEXT_PUBLIC_CLIENT_WEB_URL,
    NEXT_PUBLIC_CLIENT_API_URL: process.env.NEXT_PUBLIC_CLIENT_API_URL,
  },
})
