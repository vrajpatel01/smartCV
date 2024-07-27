import { z } from "zod";

export default z.object({
    name: z.string({
        message: "Name is must be string"
    }).min(3).max(60).trim(),
    registerToken: z.string({
        message: "RegisterToken is must be string"
    }),
    role: z.string({
        message: "Role is must be string"
    }).refine((data: string) => ['admin', 'supporter'].includes(data), {
        message: "Role must be either admin or supporter"
    }),
    password: z.string({
        message: "Password is must be string"
    }).min(8).max(60)
        .refine((data: string) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(data), {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        }),
})