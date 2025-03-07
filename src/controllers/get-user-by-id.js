import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import {
    badRequest,
    found,
    internalServerError,
    notFound,
} from "../helpers/http.js";
import validator from "validator";

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id;

            if (!userId || !validator.isUUID(userId)) {
                return badRequest({
                    errorMessage: "Missing or invalid id",
                });
            }

            const getUserByIdUseCase = new GetUserByIdUseCase();

            const user = await getUserByIdUseCase.execute(userId);

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
