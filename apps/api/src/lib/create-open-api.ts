import { Scalar } from '@scalar/hono-api-reference'

import type { AppOpenAPI } from './types'

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      title: 'Turbo Bun API',
      version: '1.0.0',
      description: 'Turbo Bun API',
    },
    servers: [
      {
        url: process.env.BETTER_AUTH_URL!,
        description: 'Production Server',
      },
    ],
  })

  app.get(
    '/reference',
    Scalar({
      url: '/doc',
      layout: 'modern',
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch',
      },
    }),
  )
}
