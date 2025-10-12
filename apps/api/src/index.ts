import { config } from 'dotenv'
import path from 'node:path'

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

// Load environment variables from .env files before importing auth module
// This ensures that process.env is populated correctly
config({ path: path.resolve(__dirname, '../../../.env') })
config({ path: path.resolve(__dirname, '../.env') })

const { auth } = await import('@repo/auth')

const app = new Hono()

app.use('*', cors({
  origin: process.env.WEB_URL!,
  credentials: true,
}))

app.on(['POST', 'GET'], '/api/auth/*', c => auth.handler(c.req.raw))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

async function startServer() {
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
