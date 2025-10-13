// Types for the Hono app
import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi'
import type { Logger } from 'pino'

export interface AppBindings {
  Bindings: {
    incoming: any
    outgoing: any
  }
  Variables: {
    logger: Logger
  }
}

export type AppOpenAPI = OpenAPIHono<AppBindings>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>
