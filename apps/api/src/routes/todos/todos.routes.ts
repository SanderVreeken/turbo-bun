import { createRoute } from '@hono/zod-openapi'
import { insertTodoSchema, selectTodoSchema } from '@repo/db/schema'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, createMessageObjectSchema } from 'stoker/openapi/schemas'

const tags = ['Todos']

export const add = createRoute({
  path: '/todos/add',
  method: 'post',
  request: {
    body: jsonContentRequired(insertTodoSchema, 'The todo to add'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTodoSchema,
      'The added todo',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTodoSchema),
      'The validation error(s)',
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema('Internal server error'),
      'Internal server error',
    ),
  },
})

export type AddRoute = typeof add
