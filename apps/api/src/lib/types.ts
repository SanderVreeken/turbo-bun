import type { Logger } from 'pino'

export interface AppBindings {
  Bindings: {
    incoming: any
    outgoing: any
  }
  Variables: {
    logger: Logger
  }
}
