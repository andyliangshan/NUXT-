import { Router } from 'express'

import users from './users'
import tools from './tools'
import classfiy from './classfiy'
import tweet from './tweet'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(tools)
router.use(classfiy)
router.use(tweet)

export default router
