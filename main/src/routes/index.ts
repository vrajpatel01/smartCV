import { Router } from 'express'
const router = Router();

import { welcomeRoute } from '../controllers';
import adminRouter from './user/user.router'
import resumeRouter from './resume'

import authToken from '../middleware/authToken'

router.get('/welcome', welcomeRoute);
router.use('/admin', adminRouter)
router.use('/resume', [authToken], resumeRouter)

export default router;