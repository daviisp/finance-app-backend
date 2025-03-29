import {
    badRequest,
    internalServerError,
    okEmpty,
} from "../../helpers/http.js";
import validator from "validator";

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.id;

            if (!transactionId || !validator.isUUID(transactionId)) {
                return badRequest({
                    errorMessage: "Missing or invalid id",
                });
            }

            await this.deleteTransactionUseCase.execute(transactionId);

            return okEmpty();
        } catch (error) {
            console.error(error);
            return internalServerError();
        }
    }
}
