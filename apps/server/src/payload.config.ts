import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? 'change-me-in-production-secret-32chars',

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? '',
    },
  }),

  collections: [],

  typescript: {
    outputFile: './src/payload-types.ts',
  },
})
