import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { envServer } from '@/config/env'

import * as schema from './schema'

// max:1 — one connection per serverless cold start
const client = postgres(envServer.DATABASE_URL, { max: 1, ssl: 'require' })

export const db = drizzle(client, { schema })
