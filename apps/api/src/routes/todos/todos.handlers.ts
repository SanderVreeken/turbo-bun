import { db } from '@repo/db'
import { todo } from '@repo/db/schema'
import { HTTPException } from 'hono/http-exception'
import * as HttpStatusCodes from 'stoker/http-status-codes'

import type { AppRouteHandler } from '@/lib/types'

import type { AddRoute } from './todos.routes'

export const add: AppRouteHandler<AddRoute> = async (c) => {
  const body = c.req.valid('json')

  try {
    const response = await db.insert(todo).values({
      title: body.title,
    }).returning()

    return c.json(response[0], HttpStatusCodes.OK)
  }
  catch (error) {
    if (error instanceof HTTPException) {
      throw error
    }

    throw new HTTPException(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      {
        message: 'Failed to create todo',
      },
    )
  }
}
