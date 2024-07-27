import { z } from "zod";

export default z.object({
    email: z.string({
        message: "Email address must be string"
    }).email({
        message: "Invalid email address"
    }),
    password: z.string({
        message: "Password must be string"
    })
})