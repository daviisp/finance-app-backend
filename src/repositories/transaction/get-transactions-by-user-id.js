import { prisma } from "../../lib/prisma.js";

export class GetTransactionsByUserIdRepository {
    async execute(userId) {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
            },
        });

        return transactions;
    }
}
