import { z } from "zod";
import validator from "validator";

export const createTransactionSchema = z.object({
    name: z.string().trim().min(1, {
        message: "Transaction name is required.",
    }),
    date: z.coerce.date({
        message: "Invalid date format.",
    }),
    type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"], {
        message: "Type must be 'EARNING', 'EXPENSE', or 'INVESTMENT'.",
    }),
    amount: z
        .number()
        .positive({
            message: "Amount must be greater than 0.",
        })
        .refine(
            (value) => {
                return validator.isCurrency(value.toFixed(2), {
                    allow_decimal: true,
                    decimal_separator: ".",
                    digits_after_decimal: [2],
                });
            },
            { message: "Invalid currency format." }
        ),
});

export const updateTransactionSchema = z
    .object({
        transactionId: z.string().uuid(),
        name: z.string().trim().min(1).optional(),
        date: z.coerce.date().optional(),
        type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"]).optional(),
        amount: z
            .number()
            .positive()
            .refine(
                (value) => {
                    return validator.isCurrency(value.toFixed(2), {
                        allow_decimal: true,
                        decimal_separator: ".",
                        digits_after_decimal: [2],
                    });
                },
                {
                    message: "Invalid currency format.",
                }
            )
            .optional(),
    })
    .refine(
        (data) =>
            data.name || data.date || data.type || data.amount !== undefined,
        {
            message: "At least one field must be provided.",
        }
    );
