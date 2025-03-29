import { ZodError } from "zod";
import {
    badRequest,
    internalServerError,
    notFound,
    ok,
} from "../../helpers/http.js";

import { verifyIdSchema } from "../../schemas/id.js";
import { UserNotFoundError } from "../../errors/user.js";

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id;

            verifyIdSchema.parse({ id: userId });

            const transactions = await this.getUserBalanceUseCase.execute(
                userId
            );

            return ok(transactions);
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
