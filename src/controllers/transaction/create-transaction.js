import {
    badRequest,
    created,
    internalServerError,
} from "../../helpers/http.js";
import { verifyIfIdIsUUID } from "../../helpers/user.js";
import validator from "validator";

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = ["userId", "name", "date", "amount", "type"];

            for (const field of requiredFields) {
                if (
                    !params[field] ||
                    (typeof params[field] === "string" &&
                        params[field].trim().length === 0)
                ) {
                    return badRequest({
                        errorMessage: `The '${field}' field is required.`,
                    });
                }
            }

            const checkIfIdIsValid = verifyIfIdIsUUID(params.userId);

            if (!checkIfIdIsValid) {
                return badRequest({
                    errorMessage:
                        "Invalid 'userId'. Please provide a valid UUID.",
                });
            }

            if (params.amount <= 0) {
                return badRequest({
                    errorMessage: "Amount must be greater than zero.",
                });
            }

            const amountString = params.amount.toFixed(2).toString();

            const amountIsValid = validator.isCurrency(amountString, {
                allow_decimal: true,
                decimal_separator: ".",
                digits_after_decimal: [2],
            });

            if (!amountIsValid) {
                return badRequest({
                    errorMessage:
                        "Invalid 'amount' format. It must be a number with up to two decimal places.",
                });
            }

            const type = params.type.trim().toUpperCase();

            const typeIsValid = ["EARNING", "EXPENSE", "INVESTMENT"].includes(
                type
            );

            if (!typeIsValid) {
                return badRequest({
                    errorMessage:
                        "Invalid 'type'. Allowed values: 'EARNING', 'EXPENSE', 'INVESTMENT'.",
                });
            }

            const result = await this.createTransactionUseCase.execute(params);

            if (result.errorMessage) {
                return badRequest({
                    errorMessage: result.errorMessage,
                });
            }

            return created(result);
        } catch (error) {
            console.error(error);
            return internalServerError();
        }
    }
}
