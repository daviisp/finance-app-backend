import { prisma } from "../lib/prisma";

export class CreateUserRepository {
    async execute(createUserParams) {
        const createdUser = await prisma.user.create({
            data: createUserParams,
        });

        return createdUser;
    }
}
