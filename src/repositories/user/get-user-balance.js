import { prisma } from "../../lib/prisma.js";

export class GetUserBalanceRepository {
    async execute(userId) {
        const [earnings, expenses, investments] = await Promise.all([
            prisma.transaction.aggregate({
                where: { userId, type: "EARNING" },
                _sum: { amount: true },
            }),
            prisma.transaction.aggregate({
                where: { userId, type: "EXPENSE" },
                _sum: { amount: true },
            }),
            prisma.transaction.aggregate({
                where: { userId, type: "INVESTMENT" },
                _sum: { amount: true },
            }),
        ]);

        const totalEarnings = parseFloat(earnings._sum.amount) || 0;
        const totalExpenses = parseFloat(expenses._sum.amount) || 0;
        const totalInvestments = parseFloat(investments._sum.amount) || 0;

        const balance = totalEarnings - (totalExpenses + totalInvestments);

        return {
            earnings: totalEarnings,
            expenses: totalExpenses,
            investments: totalInvestments,
            balance: parseFloat(balance.toFixed(2)),
        };
    }
}
