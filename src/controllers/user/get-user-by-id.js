import { ZodError } from "zod";
import {
    badRequest,
    found,
    internalServerError,
    notFound,
} from "../../helpers/http.js";
import { verifyIdSchema } from "../../schemas/id.js";
import { UserNotFoundError } from "../../errors/user.js";

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.userId;

            verifyIdSchema.parse({ id: userId });

            const user = await this.getUserByIdUseCase.execute(userId);

            return found(user);
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
