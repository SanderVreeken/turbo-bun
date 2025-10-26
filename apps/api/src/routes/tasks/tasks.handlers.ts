import { db } from '@repo/db'
import { task } from '@repo/db/schema'
import { HTTPException } from 'hono/http-exception'
import * as HttpStatusCodes from 'stoker/http-status-codes'

import type { AppRouteHandler } from '@/lib/types'

import type { AddRoute, GetAllRoute } from './tasks.routes'

export const getAll: AppRouteHandler<GetAllRoute> = async (c) => {
  try {
    const response = await db.query.task.findMany()

    return c.json(response, HttpStatusCodes.OK)
  }
  catch (error) {
    if (error instanceof HTTPException) {
      throw error
    }

    throw new HTTPException(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      {
        message: 'Failed to create task',
      },
    )
  }
}

export const add: AppRouteHandler<AddRoute> = async (c) => {
  const body = c.req.valid('json')
  const user = c.get('user')

  try {
    const response = await db.insert(task).values({
      title: body.title,
      description: body.description,
      status: body.status,
      priority: body.priority,
      createdBy: user.id,
    }).returning()

    return c.json(response[0], HttpStatusCodes.OK)
  }
  catch (error) {
    console.error(error)
    if (error instanceof HTTPException) {
      throw error
    }

    throw new HTTPException(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      {
        message: 'Failed to create task',
      },
    )
  }
}
