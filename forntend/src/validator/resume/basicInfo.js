import { z } from 'zod';

export default z.object({
    name: z.string(),
    email: z.string().email(),
    headLine: z.string(),
    website: z.string(),
    phone: z.string(),
    location: z.string(),
    summary: z.string(),
    custom: z.array(z.object({
        name: z.string(),
        value: z.string()
    })).optional()
})