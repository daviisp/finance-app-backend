export class GetTransactionsByUserIdUseCase {
    constructor(getUserByIdRepository, getTransactionsByUserIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository;
    }
    async execute(userId) {
        const user = await this.getUserByIdRepository.execute(userId);
        if (!user) {
            return {
                errorMessage: "User not found",
            };
        }

        const transactions =
            await this.getTransactionsByUserIdRepository.execute(userId);

        return transactions;
    }
}
