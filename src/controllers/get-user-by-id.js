import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { found, internalServerError, notFound } from "../helpers/http.js";

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserByIdUseCase = new GetUserByIdUseCase();

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.id
            );

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
