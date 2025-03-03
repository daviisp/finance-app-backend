import bcrypt from "bcrypt";
import { CreateUserRepository } from "../repositories/create-user";

export class CreateUserUseCase {
    async execute(createUserParams) {
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        const createUserRepository = new CreateUserRepository();

        const createdUser = await createUserRepository.execute({
            ...createUserParams,
            password: hashedPassword,
        });

        return createdUser;
    }
}
