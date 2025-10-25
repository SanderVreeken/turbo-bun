import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi'
import type { Session, User } from '@repo/db/auth-schema'
import type { Logger } from 'pino'

export interface AppBindings {
  Bindings: {
    incoming: any
    outgoing: any
  }
  Variables: {
    logger: Logger
    user: User
    session: Session
  }
}

export type AppOpenAPI = OpenAPIHono<AppBindings>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>
