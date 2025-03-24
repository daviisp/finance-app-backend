import validator from "validator";
import {
    badRequest,
    internalServerError,
    updated,
} from "../../helpers/http.js";
import { createOrUpdateUserSchema } from "../../schemas/user.js";
import { ZodError } from "zod";

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id;
            const params = httpRequest.body;

            if (!userId || !validator.isUUID(userId)) {
                return badRequest({
                    errorMessage: "Missing or invalid id",
                });
            }

            createOrUpdateUserSchema.parse(params);

            const result = await this.updateUserUseCase.execute(userId, params);

            if (result.errorMessage) {
                return badRequest({
                    errorMessage: result.errorMessage,
                });
            }

            return updated(result);
        } catch (err) {
            console.error(err);
            if (err instanceof ZodError) {
                return badRequest({
                    errorMessage: err.errors[0].message,
                });
            }
            return internalServerError();
        }
    }
}
