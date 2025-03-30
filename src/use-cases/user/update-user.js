import {
    EmailAlreadyInUseError,
    UserNotFoundError,
} from "../../errors/user.js";

export class UpdateUserUseCase {
    constructor(
        passwordHasherAdapter,
        getUserByIdRepository,
        getUserByEmailRepository,
        updateUserRepository
    ) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.updateUserRepository = updateUserRepository;
        this.passwordHasherAdapter = passwordHasherAdapter;
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
            const hashedPassword = await this.passwordHasherAdapter.execute(
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
