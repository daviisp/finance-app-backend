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
        } catch (err) {
            console.error(err);
            if (err instanceof ZodError) {
                return badRequest({
                    errorMessage: err.errors[0].message,
                });
            }
            return internalServerError();
        }
    }
}
