import Router from 'express';
const router = Router();

import { adminController } from '../../controllers';

router.post('/register-otp', adminController.getRegisterOTPController)
router.post('/verify-otp', adminController.verifyRegisterOTPController)
router.post('/register', adminController.registerController)
router.post('/login', adminController.loginController)
router.post('/forgot-password', adminController.forgotPasswordController)
router.patch('/reset-password', adminController.resetPasswordController)

export default router;