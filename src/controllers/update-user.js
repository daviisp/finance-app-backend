import validator from "validator";
import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { badRequest, internalServerError, updated } from "../helpers/http.js";
import {
    verifyIfEmailIsValid,
    verifyIfPasswordIsValid,
} from "../helpers/user.js";

export class UpdateUserController {
    async exeucte(httpRequest) {
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

            if (password) {
                const passwordIsValid = verifyIfPasswordIsValid(password);
                if (!passwordIsValid) {
                    return badRequest({
                        errorMessage: "Invalid password",
                    });
                }
            }

            if (email) {
                const emailIsValid = verifyIfEmailIsValid(email);
                if (!emailIsValid) {
                    return badRequest({
                        errorMessage: "Invalid email",
                    });
                }
            }
            const userData = {
                firstName,
                lastName,
                email,
                password,
            };

            const updateUserUseCase = new UpdateUserUseCase();

            const updatedUser = await updateUserUseCase.execute(
                userId,
                userData
            );

            return updated(updatedUser);
        } catch (err) {
            console.error(err);
            return internalServerError({
                errorMessage: "Internal server error",
            });
        }
    }
}
