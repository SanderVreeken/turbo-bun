import { createRouter } from '@/lib/create-app'

import * as handlers from './todos.handlers'
import * as routes from './todos.routes'

const router = createRouter()

router.openapi(routes.getAll, handlers.getAll)
router.openapi(routes.add, handlers.add)

export default router
