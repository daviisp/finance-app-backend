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
            const userId = httpRequest.params.id;

            verifyIdSchema.parse({ id: userId });

            await this.deleteUserUseCase.execute(userId);

            return okEmpty();
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

            console.error(err);
            return internalServerError();
        }
    }
}
