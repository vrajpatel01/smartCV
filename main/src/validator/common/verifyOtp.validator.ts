import { z } from "zod";

export default z.object({
    otpToken: z.string({
        message: "OTP token must be a string"
    }),
    otp: z.number({
        message: "OTP must be a number"
    })
})