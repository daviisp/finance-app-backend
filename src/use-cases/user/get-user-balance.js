export class GetUserBalanceUseCase {
    constructor(getUserByIdRepository, getUserBalanceRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.getUserBalanceRepository = getUserBalanceRepository;
    }
    async execute(userId) {
        const user = await this.getUserByIdRepository.execute(userId);

        if (!user) {
            return {
                errorMessage: "User not found",
            };
        }

        const transactions = await this.getUserBalanceRepository.execute(
            userId
        );

        return transactions;
    }
}
