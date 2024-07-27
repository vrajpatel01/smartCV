import registerController from "./auth/register.controller"
import loginController from "./auth/login.controller"
import getRegisterOTPController from "./auth/getRegisterOTP.controller"
import verifyRegisterOTPController from "./auth/verifyRegisterOTP.controller"
import forgotPasswordController from "./auth/forgot-password.controller"
import resetPasswordController from "./auth/reset-password.controller"

export default {
    registerController,
    loginController,
    getRegisterOTPController,
    verifyRegisterOTPController,
    forgotPasswordController,
    resetPasswordController
}