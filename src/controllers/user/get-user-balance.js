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
