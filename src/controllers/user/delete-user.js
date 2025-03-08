import {
    badRequest,
    internalServerError,
    okEmpty,
} from "../../helpers/http.js";
import { verifyIfIdIsUUID } from "../../helpers/user.js";

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id;

            if (!userId || !verifyIfIdIsUUID(userId)) {
                return badRequest({
                    errorMessage: "Missing or invalid id",
                });
            }

            const result = await this.deleteUserUseCase.execute(userId);

            if (result.errorMessage) {
                return badRequest({
                    errorMessage: result.errorMessage,
                });
            }

            return okEmpty();
        } catch (err) {
            console.error(err);
            return internalServerError({
                errorMessage: "Internal server error",
            });
        }
    }
}
