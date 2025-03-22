import {
    badRequest,
    internalServerError,
    updated,
} from "../../helpers/http.js";
import { verifyIfIdIsUUID } from "../../helpers/user.js";
import validator from "validator";

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.id;
            if (!transactionId || !verifyIfIdIsUUID(transactionId)) {
                return badRequest({
                    errorMessage: "Missing or invalid id",
                });
            }

            const params = httpRequest.body;

            if (
                (!params.name || !params.name.trim()) &&
                (!params.type || !params.type.trim()) &&
                !params.amount &&
                (!params.date || !params.date.trim())
            ) {
                return badRequest({
                    errorMessage: "At least one field must be provided",
                });
            }

            if (params.type) {
                const typeValid = ["EARNING", "EXPENSE", "INVESTMENT"].includes(
                    params.type.toUpperCase()
                );

                if (!typeValid) {
                    return badRequest({
                        errorMessage: "Invalid type",
                    });
                }
            }

            console.log(params.amount);

            if (params.amount !== undefined && params.amount !== null) {
                if (params.amount === 0) {
                    return badRequest({
                        errorMessage: "Amount must be greater than zero.",
                    });
                }
                const amountToString = params.amount.toFixed(2).toString();
                const amountIsValid = validator.isCurrency(amountToString, {
                    allow_decimal: true,
                    decimal_separator: ".",
                    digits_after_decimal: [2],
                });

                if (!amountIsValid) {
                    return badRequest({
                        errorMessage: "Invalid amount",
                    });
                }
            }

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
            return internalServerError();
        }
    }
}
