import { z } from "zod";

export const createUserSchema = z.object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    email: z.string().email(),
    password: z.string().trim().min(6),
});

export const updateUserSchema = z
    .object({
        firstName: z.string().trim().min(1).optional(),
        lastName: z.string().trim().min(1).optional(),
        email: z.string().email().optional(),
        password: z.string().trim().min(6).optional(),
    })
    .refine(
        (data) => {
            return (
                data.firstName || data.lastName || data.email || data.password
            );
        },
        {
            message: "At least one field must be provided",
        }
    );

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().trim().min(6),
});
