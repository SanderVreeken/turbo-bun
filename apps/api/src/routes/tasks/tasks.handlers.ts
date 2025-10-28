import { db } from '@repo/db'
import { task } from '@repo/db/schema'
import { eq } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import * as HttpStatusPhrases from 'stoker/http-status-phrases'

import type { AppRouteHandler } from '@/lib/types'

import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants'

import type { AddRoute, GetAllRoute, UpdateRoute } from './tasks.routes'

export const getAll: AppRouteHandler<GetAllRoute> = async (c) => {
  const response = await db.query.task.findMany()
  return c.json(response, HttpStatusCodes.OK)
}

export const add: AppRouteHandler<AddRoute> = async (c) => {
  const body = c.req.valid('json')
  const user = c.get('user')

  const response = await db.insert(task).values({
    title: body.title,
    description: body.description,
    status: body.status,
    priority: body.priority,
    createdBy: user.id,
  }).returning()

  return c.json(response[0], HttpStatusCodes.OK)
}

export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const updates = c.req.valid('json')

  if (Object.keys(updates).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATES,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATES,
            },
          ],
          name: 'ZodError',
        },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    )
  }

  const [updated] = await db.update(task)
    .set(updates)
    .where(eq(task.id, id))
    .returning()

  if (!updated) {
    throw new HTTPException(HttpStatusCodes.NOT_FOUND, {
      message: HttpStatusPhrases.NOT_FOUND,
    })
  }

  return c.json(updated, HttpStatusCodes.OK)
}
