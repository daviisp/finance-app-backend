export class DeleteUserUseCase {
    constructor(getUserByIdRepository, deleteUserRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.deleteUserRepository = deleteUserRepository;
    }
    async execute(userId) {
        const userExists = await this.getUserByIdRepository.execute(userId);
        if (!userExists) {
            return {
                errorMessage: "User not found",
            };
        }

        const deletedUser = await this.deleteUserRepository.execute(userId);

        return deletedUser;
    }
}
