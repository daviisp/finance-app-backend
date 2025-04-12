import { UserNotFoundError } from "../../errors/user.js";

export class GetTransactionsByUserIdUseCase {
    constructor(getUserByIdRepository, getTransactionsByUserIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository;
    }
    async execute(userId, from, to) {
        const user = await this.getUserByIdRepository.execute(userId, from, to);

        if (!user) {
            throw new UserNotFoundError();
        }

        const transactions =
            await this.getTransactionsByUserIdRepository.execute(
                userId,
                from,
                to
            );

        return transactions;
    }
}
