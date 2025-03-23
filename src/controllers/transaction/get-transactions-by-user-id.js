import { badRequest, internalServerError, ok } from "../../helpers/http.js";
import validator from "validator";

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId;

            if (!userId || !validator.isUUID(userId)) {
                return badRequest({
                    errorMessage: "Missing or invalid userId",
                });
            }

            const transactions =
                await this.getTransactionsByUserIdUseCase.execute(userId);

            return ok(transactions);
        } catch (err) {
            console.error(err);
            return internalServerError();
        }
    }
}
