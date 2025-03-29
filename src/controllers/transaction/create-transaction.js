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

            return created(result);
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    errorMessage: error.errors[0].message,
                });
            }

            console.error(error);
            return internalServerError();
        }
    }
}
