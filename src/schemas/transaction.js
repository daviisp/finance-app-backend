import { z } from "zod";
import validator from "validator";

export const createTransactionSchema = z.object({
    userId: z.string().uuid(),
    name: z.string().trim().min(1),
    date: z.coerce.date(),
    type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"]),
    amount: z.number().refine((value) => {
        return validator.isCurrency(value.toFixed(2), {
            allow_decimal: true,
            decimal_separator: ".",
            digits_after_decimal: [2],
        });
    }),
});

export const updateTransactionSchema = z.object({
    transactionId: z.string().uuid(),
    name: z.string().trim().min(1).optional(),
    date: z.coerce.date().optional(),
    type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"]).optional(),
    amount: z
        .number()
        .positive()
        .refine((value) => {
            return validator.isCurrency(value.toFixed(2), {
                allow_decimal: true,
                decimal_separator: ".",
                digits_after_decimal: [2],
            });
        })
        .optional(),
});
