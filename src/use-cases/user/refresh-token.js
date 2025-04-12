import { UnauthorizedError } from "../../errors/user.js";

export class RefreshTokenUseCase {
    constructor(tokenVerifierAdapter, tokenGeneratorAdapter) {
        this.tokenVerifierAdapter = tokenVerifierAdapter;
        this.tokenGeneratorAdapter = tokenGeneratorAdapter;
    }

    execute(refreshToken) {
        const decodedToken = this.tokenVerifierAdapter.execute(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET
        );

        if (!decodedToken) {
            throw new UnauthorizedError();
        }

        const newTokens = this.tokenGeneratorAdapter.execute(
            decodedToken.userId
        );

        return newTokens;
    }
}
