import { ZodError } from "zod";
import {
    badRequest,
    internalServerError,
    notFound,
    ok,
} from "../../helpers/http.js";

import { verifyIdSchema } from "../../schemas/id.js";
import { UserNotFoundError } from "../../errors/user.js";
import { getTransactionsByUserIdSchema } from "../../schemas/transaction.js";

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.userId;
            const { from, to } = httpRequest.query;

            verifyIdSchema.parse({ id: userId });
            getTransactionsByUserIdSchema.parse({ from, to });

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

            return internalServerError();
        }
    }
}
