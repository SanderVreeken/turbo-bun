import { auth } from '@repo/auth'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import * as HttpStatusCodes from 'stoker/http-status-codes'

/**
 * Middleware to authenticate requests using session tokens stored in cookies.
 * Verifies the token and attaches session and user information to the context.
 * Throws HTTPException with 401 status if authentication fails.
 */
export const authMiddleware = createMiddleware(
  async (c, next) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    })

    if (!session) {
      throw new HTTPException(HttpStatusCodes.UNAUTHORIZED, {
        message: 'Unauthorized',
      })
    }

    c.set('session', session.session)
    c.set('user', session.user)
    return next()
  },
)
