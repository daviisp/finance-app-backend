import validator from "validator";
import {
    badRequest,
    internalServerError,
    updated,
} from "../../helpers/http.js";
import {
    verifyIfEmailIsValid,
    verifyIfPasswordIsValid,
} from "../../helpers/user.js";

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id;

            if (!userId || !validator.isUUID(userId)) {
                return badRequest({
                    errorMessage: "Missing or invalid id",
                });
            }

            const { firstName, lastName, email, password } = httpRequest.body;

            if (
                !firstName?.trim() &&
                !lastName?.trim() &&
                !email?.trim() &&
                !password?.trim()
            ) {
                return badRequest({
                    errorMessage: "At least one field must be provided",
                });
            }

            if ("firstName" in httpRequest.body && !firstName.trim()) {
                return badRequest({
                    errorMessage: "First name cannot be empty",
                });
            }

            if ("lastName" in httpRequest.body && !lastName.trim()) {
                return badRequest({
                    errorMessage: "Last name cannot be empty",
                });
            }

            if (
                "password" in httpRequest.body &&
                !verifyIfPasswordIsValid(password)
            ) {
                return badRequest({ errorMessage: "Invalid password" });
            }

            if ("email" in httpRequest.body && !verifyIfEmailIsValid(email)) {
                return badRequest({ errorMessage: "Invalid email" });
            }

            const userData = {
                firstName,
                lastName,
                email,
                password,
            };

            const result = await this.updateUserUseCase.execute(
                userId,
                userData
            );

            if (result.errorMessage) {
                return badRequest({
                    errorMessage: result.errorMessage,
                });
            }

            return updated(result);
        } catch (err) {
            console.error(err);
            return internalServerError({
                errorMessage: "Internal server error",
            });
        }
    }
}
