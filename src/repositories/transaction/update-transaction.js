import { prisma } from "../../lib/prisma.js";

export class UpdateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        const updatedTransaction = await prisma.transaction.update({
            where: {
                id: transactionId,
            },
            data: {
                ...updateTransactionParams,
            },
        });

        return updatedTransaction;
    }
}
