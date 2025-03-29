import {
    badRequest,
    internalServerError,
    notFound,
    updated,
} from "../../helpers/http.js";
import { createOrUpdateUserSchema } from "../../schemas/user.js";
import { ZodError } from "zod";
import { verifyIdSchema } from "../../schemas/id.js";
import {
    EmailAlreadyInUseError,
    UserNotFoundError,
} from "../../errors/user.js";

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id;
            const params = httpRequest.body;

            verifyIdSchema.parse({ id: userId });
            createOrUpdateUserSchema.parse(params);

            const result = await this.updateUserUseCase.execute(userId, params);

            return updated(result);
        } catch (err) {
            if (err instanceof ZodError) {
                return badRequest({
                    errorMessage: err.errors[0].message,
                });
            }

            if (err instanceof UserNotFoundError) {
                return notFound({
                    errorMessage: err.message,
                });
            }

            if (err instanceof EmailAlreadyInUseError) {
                return badRequest({
                    errorMessage: err.message,
                });
            }

            console.error(err);
            return internalServerError();
        }
    }
}
