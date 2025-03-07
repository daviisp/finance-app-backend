import { prisma } from "../lib/prisma";

export class DeleteUserRepository {
    async execute(userId) {
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        return deletedUser;
    }
}
