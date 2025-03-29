import {
    EmailAlreadyInUseError,
    UserNotFoundError,
} from "../../errors/user.js";
import { hashPassword } from "../../helpers/user.js";

export class UpdateUserUseCase {
    constructor(
        getUserByIdRepository,
        getUserByEmailRepository,
        updateUserRepository
    ) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.updateUserRepository = updateUserRepository;
    }
    async execute(userId, updateUserParams) {
        const userExists = await this.getUserByIdRepository.execute(userId);

        if (!userExists) {
            throw new UserNotFoundError();
        }

        if (updateUserParams.email) {
            const emailAlreadyInUse =
                await this.getUserByEmailRepository.execute(
                    updateUserParams.email
                );

            if (emailAlreadyInUse) {
                throw new EmailAlreadyInUseError();
            }
        }

        const userData = {
            ...updateUserParams,
        };

        if (updateUserParams.password) {
            const hashedPassword = await hashPassword(
                updateUserParams.password
            );
            userData.password = hashedPassword;
        }

        const updatedUser = await this.updateUserRepository.execute(
            userId,
            userData
        );

        return updatedUser;
    }
}
