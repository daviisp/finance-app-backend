import {
    badRequest,
    found,
    internalServerError,
    notFound,
} from "../../helpers/http.js";
import validator from "validator";

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id;

            if (!userId || !validator.isUUID(userId)) {
                return badRequest({
                    errorMessage: "Missing or invalid id",
                });
            }

            const user = await this.getUserByIdUseCase.execute(userId);

            if (!user) {
                return notFound({
                    errorMessage: "User not found",
                });
            }

            return found(user);
        } catch (err) {
            console.error(err);
            return internalServerError({
                errorMessage: "Internal server error",
            });
        }
    }
}
