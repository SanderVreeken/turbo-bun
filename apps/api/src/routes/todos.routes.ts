import { zValidator } from '@hono/zod-validator'
import { db } from '@repo/db'
import { insertTodoSchema, todo } from '@repo/db/schema'
import { HTTPException } from 'hono/http-exception'
import * as HttpStatusCodes from 'stoker/http-status-codes'

import { createRouter } from '@/lib/create-app'

export const todos = createRouter()

todos.post(
  '/todos/add',
  zValidator('json', insertTodoSchema),
  async (c) => {
    const logger = c.get('logger')

    try {
      const data = c.req.valid('json')

      const response = await db.insert(todo).values({
        title: data.title,
      }).returning()

      logger.info({ todoId: response[0]?.id }, 'Todo created successfully')
      return c.json(response, HttpStatusCodes.OK)
    }
    catch (error) {
      logger.error({ error: error instanceof Error ? error.message : 'Unknown error' }, 'Failed to create todo')

      throw new HTTPException(HttpStatusCodes.INTERNAL_SERVER_ERROR, {
        message: 'Failed to create todo',
      })
    }
  },
)
