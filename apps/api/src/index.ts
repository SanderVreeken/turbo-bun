import './env'

import { serve } from '@hono/node-server'

import createApp from './lib/create-app'

async function startServer() {
  const app = createApp()

  const server = serve(
    {
      fetch: app.fetch,
      port: Number(process.env.PORT) || 3000,
    },
    (info) => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on http://localhost:${info.port}`)
    },
  )

  return server
}

startServer().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
