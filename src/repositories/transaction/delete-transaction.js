import { prisma } from "../../lib/prisma.js";

export class DeleteTransactionRepository {
    async execute(transactionId) {
        const deletedTransaction = await prisma.transaction.delete({
            where: {
                id: transactionId,
            },
        });

        return deletedTransaction;
    }
}
