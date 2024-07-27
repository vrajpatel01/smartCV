import { z } from "zod";

export default z.object({
    token: z.string({
        message: 'Token must be string'
    }),
    password: z.string({
        message: "Password is must be string"
    }).min(8).max(60)
        .refine((data: string) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(data), {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        }),
})