import { jwtVerify } from 'jose'
import { cookies, headers } from 'next/headers'

import { envClient, envServer } from '@/config/env'

import 'server-only'

// auth server
export const authServer = {
  // get session
  getSession: async () => {
    try {
      const response = await fetch(`${envClient.NEXT_PUBLIC_CLIENT_API_URL}/api/v1/auth/get-session`, {
        headers: await headers(),
      })

      return await response.json()
    } catch {
      return { user: null, session: null }
    }
  },

  // get cache token
  getCacheSession: async () => {
    try {
      const cookieStore = await cookies()

      const cacheToken =
        cookieStore.get('better-auth.session_data')?.value ||
        cookieStore.get('__Secure-better-auth.session_data')?.value

      const secret = new TextEncoder().encode(envServer.JWT_SECRET)
      const { payload } = await jwtVerify(cacheToken || '', secret)

      return payload
    } catch {
      return { user: null, session: null }
    }
  },
}
