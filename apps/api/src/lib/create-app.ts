import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { requestId } from 'hono/request-id'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'

import { pinoLogger } from '@/middlewares/pino-logger'
import { todos } from '@/routes/todos.routes'

import type { AppBindings } from './types'

const { auth } = await import('@repo/auth')

export function createRouter() {
  return new Hono<AppBindings>()
}

export default function createApp() {
  const app = createRouter()

  app.use(cors({
    origin: [process.env.API_URL!, process.env.WEB_URL!],
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }))

  app.use(serveEmojiFavicon('🚀'))
  app.use(requestId())
  app.use(pinoLogger())

  app.on(['POST', 'GET'], '/api/auth/*', c =>
    auth.handler(c.req.raw))

  const routes = [todos]
  routes.forEach((route) => {
    app.route('/', route)
  })

  app.onError(onError)
  app.notFound(notFound)

  return app
}
