import * as HttpStatusPhrases from 'stoker/http-status-phrases'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'

export const ZOD_ERROR_MESSAGES = {
  REQUIRED: 'Required',
  EXPECTED_NUMBER: 'Invalid Input: Expected type Number, received NaN',
  NO_UPDATES: 'No Updates Provided',
  EXPECTED_STRING: 'Invalid Input: Expected type String, received undefined',
}

export const ZOD_ERROR_CODES = {
  INVALID_UPDATES: 'invalid_updates',
}

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND)
