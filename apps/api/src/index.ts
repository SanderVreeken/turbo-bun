import { serve } from '@hono/node-server'
import { config } from 'dotenv'
import path from 'node:path'

import createApp from './lib/create-app'

// Load environment variables from .env files before importing auth module
// This ensures that process.env is populated correctly
config({ path: path.resolve(__dirname, '../../../.env') })
config({ path: path.resolve(__dirname, '../.env') })

async function startServer() {
  const app = createApp()

  const server = serve({
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
  }, (info) => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${info.port}`)
  })

  return server
}

startServer().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
