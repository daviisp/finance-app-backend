import { ZodError } from "zod";
import {
    badRequest,
    internalServerError,
    notFound,
    okEmpty,
} from "../../helpers/http.js";
import { verifyIdSchema } from "../../schemas/id.js";
import { TransactionNotFoundError } from "../../errors/transaction.js";

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.id;

            verifyIdSchema.parse({ id: transactionId });

            await this.deleteTransactionUseCase.execute(transactionId);

            return okEmpty();
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

            return internalServerError();
        }
    }
}
