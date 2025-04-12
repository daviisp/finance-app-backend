import { UnauthorizedError } from "../../errors/user.js";
import { ok, unauthorized, internalServerError } from "../../helpers/http.js";

export class RefreshTokenController {
    constructor(refreshTokenUseCase) {
        this.refreshTokenUseCase = refreshTokenUseCase;
    }
    execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const response = this.refreshTokenUseCase.execute(
                params.refreshToken
            );

            return ok(response);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                return unauthorized();
            }
            return internalServerError();
        }
    }
}
