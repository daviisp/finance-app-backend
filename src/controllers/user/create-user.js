import {
    badRequest,
    internalServerError,
    created,
} from "../../helpers/http.js";
import {
    verifyIfEmailIsValid,
    verifyIfPasswordIsValid,
} from "../../helpers/user.js";

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            const requiredFields = [
                "firstName",
                "lastName",
                "email",
                "password",
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({
                        errorMessage: `Missing param: ${field}`,
                    });
                }
            }

            const passwordIsValid = verifyIfPasswordIsValid(params.password);

            if (!passwordIsValid) {
                return badRequest({
                    errorMessage: "Password must be at least 6 characters long",
                });
            }

            const emailIsValid = verifyIfEmailIsValid(params.email);

            if (!emailIsValid) {
                return badRequest({
                    errorMessage: "Invalid email",
                });
            }

            const result = await this.createUserUseCase.execute(params);

            if (result.errorMessage) {
                return badRequest({
                    errorMessage: result.errorMessage,
                });
            }

            return created(result);
        } catch (err) {
            console.error(err);
            return internalServerError({
                errorMessage: "Internal server error",
            });
        }
    }
}
