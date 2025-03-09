export class CreateTransactionUseCase {
    constructor(getUserByIdRepository, createTransactionRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.createTransactionRepository = createTransactionRepository;
    }
    async execute(createTransactionParams) {
        const userExists = await this.getUserByIdRepository.execute(
            createTransactionParams.userId
        );

        if (!userExists) {
            return {
                errorMessage: "User not found",
            };
        }

        const createdTransaction =
            await this.createTransactionRepository.execute(
                createTransactionParams
            );

        return createdTransaction;
    }
}
