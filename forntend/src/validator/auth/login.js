import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: 'Password is required'
    })
})

export default loginSchema;