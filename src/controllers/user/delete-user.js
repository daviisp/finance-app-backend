import { ZodError } from "zod";
import { UserNotFoundError } from "../../errors/user.js";
import {
    badRequest,
    internalServerError,
    notFound,
    okEmpty,
} from "../../helpers/http.js";
import { verifyIdSchema } from "../../schemas/id.js";

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.userId;

            verifyIdSchema.parse({ id: userId });

            await this.deleteUserUseCase.execute(userId);

            return okEmpty();
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

            console.error(error);
            return internalServerError();
        }
    }
}
