import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8)
      .refine((pass) => {
        return (
          pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
          {
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
          }
        );
      }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Password and Confirm password not match",
      });
    }
  });

export { resetPasswordSchema };
