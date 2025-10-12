import { zValidator } from '@hono/zod-validator'
import { db } from '@repo/db'
import { insertTodoSchema, todo } from '@repo/db/schema'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes } from 'http-status-codes'
import * as HttpStatusCodes from 'stoker/http-status-codes'

import { createRouter } from '@/lib/create-app'

export const todos = createRouter()

todos.post(
  '/todos/add',
  zValidator('json', insertTodoSchema),
  async (c) => {
    try {
      const data = c.req.valid('json')

      const response = await db.insert(todo).values({
        title: data.title,
      }).returning()

      return c.json(response, StatusCodes.OK)
    }
    catch (error) {
      console.error('Error creating todo:', error)

      throw new HTTPException(HttpStatusCodes.INTERNAL_SERVER_ERROR, {
        message: 'Failed to create todo',
      })
    }
  },
)
