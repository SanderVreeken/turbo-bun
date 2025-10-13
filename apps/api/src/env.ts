import { config } from 'dotenv'
import path from 'node:path'

// Load environment variables immediately when this module is imported
config({ path: path.resolve(__dirname, '../../../.env') })
config({ path: path.resolve(__dirname, '../.env') })

export {}
