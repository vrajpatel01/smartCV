import { date, z } from "zod";

export default z.object({
    data: z.object({
        basic: z.object({
            name: z.string(),
            email: z.string().email(),
            headline: z.string(),
            website: z.string(),
            phone: z.string(),
            location: z.string(),
            custom: z.array(z.object({
                name: z.string(),
                value: z.string()
            })).optional()
        }).optional(),
        profile: z.object({
            social: z.array(z.object({
                username: z.string(),
                url: z.string(),
            })),
        }).optional(),
        experiences: z.array(z.object({
            title: z.string(),
            company: z.string(),
            location: z.string(),
            date: z.string(),
            description: z.string(),
        })).optional(),
        education: z.array(z.object({
            institute: z.string(),
            course: z.string(),
            typeOfStudy: z.string(),
            date: z.string(),
            score: z.string(),
            summary: z.string()
        })).optional(),
        skills: z.array(z.string()).optional(),
        projects: z.array(z.object({
            title: z.string(),
            date: z.string(),
            summary: z.string()
        })).optional(),
        awards: z.array(z.object({
            title: z.string(),
            date: z.string(),
            awarder: z.string(),
            summary: z.string().min(3)
        })).optional(),
    }),
    resumeId: z.string()
})