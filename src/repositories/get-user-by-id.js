import { prisma } from "../lib/prisma.js";

export class GetUserByIdRepository {
    async execute(id) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    }
}
