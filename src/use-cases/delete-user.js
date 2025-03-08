import { DeleteUserRepository } from "../repositories/delete-user.js";
import { GetUserByIdRepository } from "../repositories/get-user-by-id.js";

export class DeleteUserUseCase {
    async execute(userId) {
        const getUserByIdRepository = new GetUserByIdRepository();

        const userExists = await getUserByIdRepository.execute(userId);
        if (!userExists) {
            return {
                errorMessage: "User not found",
            };
        }

        const deleteUserRepository = new DeleteUserRepository();

        const deletedUser = await deleteUserRepository.execute(userId);

        return deletedUser;
    }
}
