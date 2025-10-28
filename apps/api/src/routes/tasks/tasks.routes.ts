import { createRoute, z } from '@hono/zod-openapi'
import { insertTaskSchema, patchTasksSchema, selectTaskSchema } from '@repo/db/schema'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import {
  createErrorSchema,
  createMessageObjectSchema,
} from 'stoker/openapi/schemas'

import { notFoundSchema } from '@/lib/constants'

const tags = ['Tasks']

// Custom params schema for string IDs (since task.id is text, not numeric)
const TaskIdParamsSchema = z.object({
  id: z.string().min(1, 'Task ID is required'),
})

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

export const update = createRoute({
  path: '/tasks/{id}',
  method: 'patch',
  request: {
    params: TaskIdParamsSchema,
    body: jsonContentRequired(patchTasksSchema, 'The task to update'),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectTaskSchema, 'The updated task'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Task not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchTasksSchema)
        .or(createErrorSchema(TaskIdParamsSchema)),
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
export type UpdateRoute = typeof update
