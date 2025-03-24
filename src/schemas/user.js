import { z } from "zod";

export const createOrUpdateUserSchema = z.object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    email: z.string().email(),
    password: z.string().trim().min(6),
});
