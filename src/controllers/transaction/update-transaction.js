import { ZodError } from "zod";
import {
    badRequest,
    internalServerError,
    updated,
} from "../../helpers/http.js";
import { updateTransactionSchema } from "../../schemas/transaction.js";

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

            if (result.errorMessage) {
                return badRequest({
                    errorMessage: result.errorMessage,
                });
            }
            return updated(result);
        } catch (error) {
            console.error(error);
            if (error instanceof ZodError) {
                return badRequest({
                    errorMessage: error.errors[0].message,
                });
            }
            return internalServerError();
        }
    }
}
