import { createAuthClient } from 'better-auth/react'

import { envClient } from '@/config/env'

// auth client
export const authClient = createAuthClient({
  baseURL: `${envClient.NEXT_PUBLIC_CLIENT_API_URL}/v1/auth`,
})
