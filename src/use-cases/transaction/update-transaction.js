import { TransactionNotFoundError } from "../../errors/transaction.js";

export class UpdateTransactionUseCase {
    constructor(getTransactionByIdRepository, updateTransactionRepository) {
        this.getTransactionByIdRepository = getTransactionByIdRepository;
        this.updateTransactionRepository = updateTransactionRepository;
    }
    async execute(transactionId, updateTransactionParams) {
        const transaction = await this.getTransactionByIdRepository.execute(
            transactionId
        );

        if (!transaction) {
            throw new TransactionNotFoundError();
        }

        const updatedTransaction =
            await this.updateTransactionRepository.execute(
                transactionId,
                updateTransactionParams
            );

        return updatedTransaction;
    }
}
