import { z } from "zod";

export default z.object({
    email: z.string({
        message: 'Email must be string'
    }).email({
        message: 'Email address is not valid'
    })
})