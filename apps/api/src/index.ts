import { serve } from '@hono/node-server'
import { auth } from '@repo/auth'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import env from './env'

const app = new Hono()

app.use('*', cors({
  origin: env.WEB_URL,
  credentials: true,
}))

app.on(['POST', 'GET'], '/api/auth/*', c => auth.handler(c.req.raw))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

async function startServer() {
  const server = serve({
    fetch: app.fetch,
    port: env.PORT || 3000,
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
