import { UserNotFoundError } from "../../errors/user.js";

export class DeleteUserUseCase {
    constructor(getUserByIdRepository, deleteUserRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.deleteUserRepository = deleteUserRepository;
    }
    async execute(userId) {
        const userExists = await this.getUserByIdRepository.execute(userId);

        if (!userExists) {
            throw new UserNotFoundError();
        }

        const deletedUser = await this.deleteUserRepository.execute(userId);

        return deletedUser;
    }
}
