import { ZodError } from "zod";
import {
    badRequest,
    internalServerError,
    notFound,
    ok,
} from "../../helpers/http.js";
import { loginUserSchema } from "../../schemas/user.js";
import { InvalidPasswordError, UserNotFoundError } from "../../errors/user.js";

export class LoginUserController {
    constructor(loginUserUseCase) {
        this.loginUserUseCase = loginUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            loginUserSchema.parse(params);

            const user = await this.loginUserUseCase.execute(
                params.email,
                params.password
            );

            return ok(user);
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    errorMessage: error.errors[0].message,
                });
            }

            if (error instanceof UserNotFoundError) {
                return notFound({
                    errorMessage: error.message,
                });
            }

            if (error instanceof InvalidPasswordError) {
                return badRequest({
                    errorMessage: error.message,
                });
            }

            console.error(error);
            return internalServerError();
        }
    }
}
