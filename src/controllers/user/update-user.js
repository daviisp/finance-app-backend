import {
    badRequest,
    internalServerError,
    notFound,
    updated,
} from "../../helpers/http.js";
import { updateUserSchema } from "../../schemas/user.js";
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
            const userId = httpRequest.userId;
            const params = httpRequest.body;

            verifyIdSchema.parse({ id: userId });
            updateUserSchema.parse(params);

            const result = await this.updateUserUseCase.execute(userId, params);

            return updated(result);
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

            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({
                    errorMessage: error.message,
                });
            }

            console.error(error);
            return internalServerError();
        }
    }
}
