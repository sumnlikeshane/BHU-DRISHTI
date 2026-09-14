import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const criticalSceneSource = '/src/features/landing/map/IndiaScene.tsx'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const supabaseUrl = env.VITE_SUPABASE_URL || env.SUPABASE_URL || ''
  const supabasePublishableKey =
    env.VITE_SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_PUBLISHABLE_KEY || ''

  return {
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(
        supabasePublishableKey,
      ),
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'critical-map-modulepreload',
        transformIndexHtml: {
          order: 'post',
          handler(_html, context) {
            const productionChunk = context.bundle
              ? Object.values(context.bundle).find(
                  (output) =>
                    output.type === 'chunk' &&
                    output.facadeModuleId?.endsWith(criticalSceneSource),
                )
              : undefined
            const href =
              productionChunk?.type === 'chunk'
                ? `/${productionChunk.fileName}`
                : criticalSceneSource
            return [
              {
                tag: 'link',
                attrs: {
                  rel: 'modulepreload',
                  href,
                  fetchpriority: 'high',
                },
                injectTo: 'head',
              },
            ]
          },
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      warmup: {
        clientFiles: [
          './src/main.tsx',
          './src/features/landing/map/IndiaScene.tsx',
        ],
      },
    },
  }
})
