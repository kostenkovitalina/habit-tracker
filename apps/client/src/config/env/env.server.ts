import { z } from 'zod'
import { createEnv } from '@t3-oss/env-nextjs'

export const envServer = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),

    DATABASE_URL: z.string().min(1),
    DATABASE_URL_UNPOOLED: z.string().optional(),

    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.string().url(),
    BETTER_AUTH_API_KEY: z.string().optional(),
  },

  emptyStringAsUndefined: true,

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_URL_UNPOOLED: process.env.DATABASE_URL_UNPOOLED,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_API_KEY: process.env.BETTER_AUTH_API_KEY,
  },
})