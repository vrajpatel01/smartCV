import { z } from "zod";

const registerEmailSchema = z.object({
  email: z.string().email(),
});

export { registerEmailSchema };
