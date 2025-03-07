import { badRequest, internalServerError } from "../helpers/http";
import { verifyIfIdIsUUID } from "../helpers/user";
import { DeleteUserUseCase } from "../use-cases/delete-user";

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.id;

            if (!userId || !verifyIfIdIsUUID(userId)) {
                return badRequest({
                    errorMessage: "Missing or invalid id",
                });
            }

            const deleteUserUseCase = new DeleteUserUseCase();

            const result = await deleteUserUseCase.execute(userId);

            if (result.errorMessage) {
                return badRequest({
                    errorMessage: result.errorMessage,
                });
            }
        } catch (err) {
            console.error(err);
            return internalServerError({
                errorMessage: "Internal server error",
            });
        }
    }
}
