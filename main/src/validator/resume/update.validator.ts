import { z } from "zod";

export default z.object({
    name: z.string().min(3).max(255).optional(),
    title: z.string().min(3).max(255).optional(),
    resumeId: z.string()
}).superRefine((data, ctx) => {
    if (data.name === undefined && data.title === undefined) {
        return ctx.addIssue({
            path: ["name", "title"],
            code: z.ZodIssueCode.custom,
            message: 'At least one of the fields is required',
        })
    }
})