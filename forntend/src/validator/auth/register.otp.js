import { z } from 'zod'

const registerOTPSchema = z.object({
    otp: z.string().min(6, {
        message: 'OTP is required'
    })
})

export { registerOTPSchema }