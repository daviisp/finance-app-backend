export class DeleteTransactionUseCase {
    constructor(getTransactionByIdRepository, deleteTransactionRepository) {
        this.getTransactionByIdRepository = getTransactionByIdRepository;
        this.deleteTransactionRepository = deleteTransactionRepository;
    }
    async execute(transactionId) {
        const transaction = await this.getTransactionByIdRepository.execute(
            transactionId
        );

        if (!transaction) {
            return {
                errorMessage: "Transaction not found",
            };
        }

        const deletedTransaction =
            await this.deleteTransactionRepository.execute(transactionId);

        return deletedTransaction;
    }
}
