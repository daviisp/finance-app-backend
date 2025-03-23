import { badRequest, internalServerError, ok } from "../../helpers/http.js";
import validator from "validator";

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id;

            if (!userId || !validator.isUUID(userId)) {
                return badRequest({
                    errorMessage: "Invalid or missing id",
                });
            }

            const transactions = await this.getUserBalanceUseCase.execute(
                userId
            );

            return ok(transactions);
        } catch (err) {
            console.error(err);
            return internalServerError();
        }
    }
}
