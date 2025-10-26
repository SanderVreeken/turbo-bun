import { createRoute, z } from '@hono/zod-openapi'
import { insertTaskSchema, selectTaskSchema } from '@repo/db/schema'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import {
  createErrorSchema,
  createMessageObjectSchema,
} from 'stoker/openapi/schemas'

const tags = ['Tasks']

export const getAll = createRoute({
  path: '/tasks/getAll',
  method: 'get',
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(selectTaskSchema), 'The fetched tasks'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema('Internal server error'),
      'Internal server error',
    ),
  },
})

export const add = createRoute({
  path: '/tasks/add',
  method: 'post',
  request: {
    body: jsonContentRequired(insertTaskSchema, 'The task to add'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTaskSchema, 'The added task'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTaskSchema),
      'The validation error(s)',
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema('Internal server error'),
      'Internal server error',
    ),
  },
})

export type GetAllRoute = typeof getAll
export type AddRoute = typeof add
