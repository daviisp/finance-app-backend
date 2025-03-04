import { prisma } from "../lib/prisma.js";

export class GetUserByEmailRepository {
    async execute(email) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
}
