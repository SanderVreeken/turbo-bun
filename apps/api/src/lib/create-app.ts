import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { requestId } from 'hono/request-id'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'
import { defaultHook } from 'stoker/openapi'

import { pinoLogger } from '@/middlewares/pino-logger'
import todos from '@/routes/todos/todos.index'

import type { AppBindings } from './types'

import configureOpenAPI from './create-open-api'

const { auth } = await import('@repo/auth')

/**
 * Creates a router instance with default OpenAPI configuration
 * @returns OpenAPIHono router instance
 */
export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    defaultHook,
    strict: false,
  })
}

/**
 * Creates and configures the main application instance with all routes and middleware
 * @returns Configured Hono application instance
 */
export default function createApp() {
  const app = createRouter()

  app.use(cors({
    origin: [process.env.BETTER_AUTH_URL!],
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }))

  app.use(serveEmojiFavicon('🚀'))
  app.use(requestId())
  app.use(pinoLogger())

  configureOpenAPI(app)

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
