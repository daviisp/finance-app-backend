import { prisma } from "../lib/prisma.js";

export class GetUserByEmailRepository {
    async execute(userEmail) {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
        });

        return user;
    }
}
