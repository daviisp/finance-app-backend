import { GetUserByEmailRepository } from "../repositories/get-user-by-email.js";
import { GetUserByIdRepository } from "../repositories/get-user-by-id.js";
import { UpdateUserRepository } from "../repositories/update-user.js";
import bcrypt from "bcrypt";

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        const getUserByIdRepository = new GetUserByIdRepository();

        const userExists = await getUserByIdRepository.execute(userId);
        if (!userExists) {
            throw new Error("User not found");
        }

        if (updateUserParams.email) {
            const getUserByEmailRepository = new GetUserByEmailRepository();

            const emailAlreadyInUse = await getUserByEmailRepository.execute(
                updateUserParams.email
            );

            if (emailAlreadyInUse) {
                throw new Error("Email already in use");
            }
        }

        const userData = {
            ...updateUserParams,
        };

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10
            );
            userData.password = hashedPassword;
        }

        const updateUserRepository = new UpdateUserRepository();

        const updatedUser = await updateUserRepository.execute(
            userId,
            userData
        );

        return updatedUser;
    }
}
