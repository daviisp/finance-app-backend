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
            const userId = httpRequest.params.id;

            verifyIdSchema.parse({ id: userId });

            const user = await this.getUserByIdUseCase.execute(userId);

            return found(user);
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
