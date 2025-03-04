import { prisma } from "../lib/prisma.js";

export class UpdateUserRepository {
    async execute(userId, updateUserParams) {
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...updateUserParams,
            },
        });

        return updatedUser;
    }
}
