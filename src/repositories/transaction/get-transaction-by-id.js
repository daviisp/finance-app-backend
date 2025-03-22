import { prisma } from "../../lib/prisma.js";

export class GetTransactionByIdRepository {
    async execute(transactionId) {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: transactionId,
            },
        });

        return transaction;
    }
}
