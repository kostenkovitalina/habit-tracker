import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  target: 'node24',
  outDir: 'dist',
  clean: true,
  sourcemap: false,
  minify: true,
  splitting: false,
  treeshake: true,
  dts: false,
  external: [
    'payload',
    'next',
    '@payloadcms/next',
    '@payloadcms/ui',
    '@payloadcms/db-postgres',
    '@payloadcms/richtext-lexical',
    '@payloadcms/plugin-seo',
    '@payloadcms/storage-s3',
  ],
  noExternal: [],
  skipNodeModulesBundle: true,
  bundle: true,
  platform: 'node',
  shims: false,
})
