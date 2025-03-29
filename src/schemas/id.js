import { z } from "zod";

export const verifyIdSchema = z.object({
    id: z.string().uuid(),
});
