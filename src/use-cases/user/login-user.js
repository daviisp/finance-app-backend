import { InvalidPasswordError, UserNotFoundError } from "../../errors/user.js";
import jwt from "jsonwebtoken";

export class LoginUserUseCase {
    constructor(getUserByEmailRepository, passwordComparatorAdapter) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.passwordComparatorAdapter = passwordComparatorAdapter;
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

        const tokens = {
            accessToken: jwt.sign(
                { userId: user.id },
                process.env.JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            ),
            refreshToken: jwt.sign(
                {
                    userId: user.id,
                },
                process.env.JWT_REFRESH_TOKEN_SECRET,
                { expiresIn: "30d" }
            ),
        };

        return {
            ...user,
            tokens,
        };
    }
}
