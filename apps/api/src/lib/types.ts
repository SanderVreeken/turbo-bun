import type { Logger } from 'pino'

export interface AppBindings {
  Bindings: {
    incoming?: Request
    outgoing?: Response
  }
  Variables: {
    logger: Logger
    requestId: string
  }
}
