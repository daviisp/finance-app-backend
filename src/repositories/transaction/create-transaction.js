import { prisma } from "../../lib/prisma.js";

export class CreateTransactionRepository {
    async execute(userId, createTransactionParams) {
        const createdTransaction = await prisma.transaction.create({
            data: {
                userId,
                ...createTransactionParams,
            },
        });

        return createdTransaction;
    }
}
