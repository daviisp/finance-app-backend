import { UserNotFoundError } from "../../errors/user.js";

export class CreateTransactionUseCase {
    constructor(getUserByIdRepository, createTransactionRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.createTransactionRepository = createTransactionRepository;
    }
    async execute(userId, createTransactionParams) {
        const userExists = await this.getUserByIdRepository.execute(userId);

        if (!userExists) {
            throw new UserNotFoundError();
        }

        const createdTransaction =
            await this.createTransactionRepository.execute(
                userId,
                createTransactionParams
            );

        return createdTransaction;
    }
}
