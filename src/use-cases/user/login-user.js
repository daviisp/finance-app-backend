import { InvalidPasswordError, UserNotFoundError } from "../../errors/user.js";

export class LoginUserUseCase {
    constructor(
        getUserByEmailRepository,
        passwordComparatorAdapter,
        tokenGeneratorAdapter
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.passwordComparatorAdapter = passwordComparatorAdapter;
        this.tokenGeneratorAdapter = tokenGeneratorAdapter;
    }
    async execute(email, password) {
        const user = await this.getUserByEmailRepository.execute(email);

        if (!user) {
            throw new UserNotFoundError();
        }

        const match = await this.passwordComparatorAdapter.execute(
            password,
            user.password
        );

        if (!match) {
            throw new InvalidPasswordError();
        }

        const tokens = await this.tokenGeneratorAdapter.execute(user.id);

        return {
            ...user,
            tokens,
        };
    }
}
