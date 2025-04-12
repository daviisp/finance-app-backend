import { prisma } from "../../lib/prisma.js";

export class GetTransactionsByUserIdRepository {
    async execute(userId, from, to) {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: from,
                    lte: to,
                },
            },
        });

        return transactions;
    }
}
