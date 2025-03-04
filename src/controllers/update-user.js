import validator from "validator";
import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { badRequest, updated } from "../helpers/http.js";

export class UpdateUserController {
    async exeucte(httpRequest) {
        try {
            const userId = httpRequest.params.id;

            if (!userId || !validator.isUUID(userId)) {
                return badRequest("Missing or invalid id");
            }

            const { firstName, lastName, email, password } = httpRequest.body;

            if (
                !firstName?.trim() &&
                !lastName?.trim() &&
                !email?.trim() &&
                !password?.trim()
            ) {
                return badRequest("At least one field must be provided");
            }

            if (email && !validator.isEmail(email)) {
                return badRequest("Invalid email format");
            }

            if (password && password.trim().length < 6) {
                return badRequest(
                    "Password must be at least 6 characters long"
                );
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
            return {
                statusCode: 500,
                body: {
                    errorMessage: "Internal server error",
                },
            };
        }
    }
}
