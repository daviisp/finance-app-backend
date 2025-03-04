import { GetUserByIdRepository } from "../repositories/get-user-by-id.js";

export class GetUSerByIdUseCase {
    async execute(id) {
        const getUserByIdRepository = new GetUserByIdRepository();

        const user = await getUserByIdRepository.execute(id);
        return user;
    }
}
