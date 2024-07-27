import Router from 'express';
const router = Router()

import adminAuthRouter from './auth.router'

router.use('/auth', adminAuthRouter)

export default router;