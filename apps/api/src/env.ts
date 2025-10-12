/* eslint-disable node/no-process-env */
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod'

expand(config())

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(3000),
  API_URL: z.url(),
  DATABASE_URL: z.url(),
  POLAR_ACCESS_TOKEN: z.string().min(1),
  POLAR_SUCCESS_URL: z.url(),
  WEB_URL: z.url(),
})

export type env = z.infer<typeof EnvSchema>

// eslint-disable-next-line ts/no-redeclare
const { data: env, error } = EnvSchema.safeParse(process.env)

if (error) {
  console.error('👷 Invalid env:')
  console.error(z.treeifyError(error))
  process.exit(1)
}

export default env!
