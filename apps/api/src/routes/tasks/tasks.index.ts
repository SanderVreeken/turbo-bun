import { createRouter } from '@/lib/create-app'
import { authMiddleware } from '@/middlewares/auth'

import * as handlers from './tasks.handlers'
import * as routes from './tasks.routes'

const router = createRouter()

router.use(authMiddleware)

router.openapi(routes.getAll, handlers.getAll)
router.openapi(routes.add, handlers.add)

export default router
