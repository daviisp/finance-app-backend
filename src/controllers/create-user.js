import { badRequest, internalServerError } from "../helpers/http.js";
import { CreateUserUseCase } from "../use-cases/create-user.js";
import { created } from "../helpers/http.js";
import {
    verifyIfEmailIsValid,
    verifyIfPasswordIsValid,
} from "../helpers/user.js";

export class CreateUserController {
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

            const createUserUseCase = new CreateUserUseCase();

            const result = await createUserUseCase.execute(params);

            if (result.error) {
                return badRequest({
                    errorMessage: "Email already in use",
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
