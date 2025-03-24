import { ZodError } from "zod";
import {
    badRequest,
    created,
    internalServerError,
} from "../../helpers/http.js";
import { createTransactionSchema } from "../../schemas/transaction.js";

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            createTransactionSchema.parse(params);

            const result = await this.createTransactionUseCase.execute(params);

            if (result.errorMessage) {
                return badRequest({
                    errorMessage: result.errorMessage,
                });
            }

            return created(result);
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
