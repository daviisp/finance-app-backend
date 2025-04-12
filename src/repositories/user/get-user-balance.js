import { prisma } from "../../lib/prisma.js";

export class GetUserBalanceRepository {
    async execute(userId, from, to) {
        const [earnings, expenses, investments] = await Promise.all([
            prisma.transaction.aggregate({
                where: {
                    userId,
                    type: "EARNING",
                    date: {
                        gte: from,
                        lte: to,
                    },
                },
                _sum: { amount: true },
            }),
            prisma.transaction.aggregate({
                where: {
                    userId,
                    type: "EXPENSE",
                    date: {
                        gte: from,
                        lte: to,
                    },
                },
                _sum: { amount: true },
            }),
            prisma.transaction.aggregate({
                where: {
                    userId,
                    type: "INVESTMENT",
                    date: {
                        gte: from,
                        lte: to,
                    },
                },
                _sum: { amount: true },
            }),
        ]);

        const totalEarnings = parseFloat(earnings._sum.amount) || 0;
        const totalExpenses = parseFloat(expenses._sum.amount) || 0;
        const totalInvestments = parseFloat(investments._sum.amount) || 0;

        const totalAmount = totalEarnings + totalExpenses + totalInvestments;
        const balance = totalEarnings - (totalExpenses + totalInvestments);

        const earningsPercentage =
            totalAmount > 0
                ? ((totalEarnings / totalAmount) * 100).toFixed(2)
                : "0";
        const expensesPercentage =
            totalAmount > 0
                ? ((totalExpenses / totalAmount) * 100).toFixed(2)
                : "0";
        const investmentsPercentage =
            totalAmount > 0
                ? ((totalInvestments / totalAmount) * 100).toFixed(2)
                : "0";

        return {
            earnings: {
                value: totalEarnings,
                percentage: `${earningsPercentage}%`,
            },
            expenses: {
                value: totalExpenses,
                percentage: `${expensesPercentage}%`,
            },
            investments: {
                value: totalInvestments,
                percentage: `${investmentsPercentage}%`,
            },
            balance: parseFloat(balance.toFixed(2)),
        };
    }
}
