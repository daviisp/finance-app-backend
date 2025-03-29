import { ZodError } from "zod";
import {
    badRequest,
    internalServerError,
    notFound,
    updated,
} from "../../helpers/http.js";
import { updateTransactionSchema } from "../../schemas/transaction.js";
import { TransactionNotFoundError } from "../../errors/transaction.js";

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.id;
            const params = httpRequest.body;

            updateTransactionSchema.parse({ transactionId, ...params });

            const result = await this.updateTransactionUseCase.execute(
                transactionId,
                params
            );

            return updated(result);
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    errorMessage: error.errors[0].message,
                });
            }

            if (error instanceof TransactionNotFoundError) {
                return notFound({
                    errorMessage: error.message,
                });
            }
            console.error(error);
            return internalServerError();
        }
    }
}
