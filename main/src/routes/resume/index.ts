import Router from 'express'
const router = Router()

import resumeController from '../../controllers/resume'

router.post('/create', resumeController.create)
router.patch('/info', resumeController.info)
router.get('/info/:resumeId', resumeController.get)
router.put('/info', resumeController.update)
router.get('/list', resumeController.list)


export default router