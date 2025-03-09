import { prisma } from "../../lib/prisma.js";

export class CreateTransactionRepository {
    async execute(createTransactionParams) {
        const createdTransaction = await prisma.transaction.create({
            data: {
                ...createTransactionParams,
            },
        });

        return createdTransaction;
    }
}
