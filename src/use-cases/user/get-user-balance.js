import { UserNotFoundError } from "../../errors/user.js";

export class GetUserBalanceUseCase {
    constructor(getUserByIdRepository, getUserBalanceRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
        this.getUserBalanceRepository = getUserBalanceRepository;
    }
    async execute(userId, from, to) {
        const user = await this.getUserByIdRepository.execute(userId);

        if (!user) {
            throw new UserNotFoundError();
        }

        const transactions = await this.getUserBalanceRepository.execute(
            userId,
            from,
            to
        );

        return transactions;
    }
}
