import { ZodError } from "zod";
import {
    badRequest,
    created,
    internalServerError,
    notFound,
} from "../../helpers/http.js";
import { createTransactionSchema } from "../../schemas/transaction.js";
import { UserNotFoundError } from "../../errors/user.js";

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.userId;
            const params = httpRequest.body;

            createTransactionSchema.parse({
                userId,
                ...params,
            });

            const result = await this.createTransactionUseCase.execute(
                userId,
                params
            );

            console.log(userId, ...params);

            return created(result);
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
