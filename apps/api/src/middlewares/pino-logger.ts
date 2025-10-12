import type { Context, MiddlewareHandler } from 'hono'
import type { Logger } from 'pino'

import pino from 'pino'
import { pinoHttp } from 'pino-http'
import pretty from 'pino-pretty'

import type { AppBindings } from '@/lib/types'

/**
 * Creates a Pino HTTP logging middleware for request/response logging
 * Configures production-optimized logging and development-friendly pretty printing
 * @returns Hono middleware that logs HTTP requests and responses with Pino
 */
export function pinoLogger(): MiddlewareHandler<AppBindings> {
  return async (c: Context<AppBindings>, next) => {
    const incoming = c.env?.incoming || c.req.raw
    const outgoing = c.env?.outgoing || new Response()
    const requestId = c.get('requestId')

    // Add request ID to the incoming request if available
    if (incoming && requestId) {
      // @ts-expect-error - Adding custom property for logging
      incoming.id = requestId
    }

    await new Promise<void>((resolve) => {
      const logger = pinoHttp({
        level: process.env.LOG_LEVEL || 'info',
        logger: pino(process.env.NODE_ENV === 'production' ? undefined : pretty()),
      })
      logger(incoming as any, outgoing as any, () => resolve())
    })

    // Extract logger from the request and set it in context
    if (incoming && 'log' in incoming) {
      c.set('logger', (incoming as any).log as Logger)
    }
    else {
      // Fallback logger if request logging fails
      c.set('logger', pino(process.env.NODE_ENV === 'production' ? undefined : pretty()))
    }

    await next()
  }
}
