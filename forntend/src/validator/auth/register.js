import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .refine((pass) => {
      return (
        pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        }
      );
    }),
});

export { registerSchema };
