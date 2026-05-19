import { headers } from 'next/headers'
import 'server-only'

import { auth } from '../auth'

// auth server
export const authServer = {
  getSession: async () => {
    return auth.api.getSession({
      headers: await headers(),
    })
  },
}
