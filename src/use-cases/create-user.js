import bcrypt from "bcrypt";
import { CreateUserRepository } from "../repositories/create-user.js";
import { GetUserByEmailRepository } from "../repositories/get-user-by-email.js";

export class CreateUserUseCase {
    async execute(createUserParams) {
        const getUserByEmailRepository = new GetUserByEmailRepository();

        const userExists = await getUserByEmailRepository.execute(
            createUserParams.email
        );

        if (userExists) {
            throw new Error("Email already in use");
        }

        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        const createUserRepository = new CreateUserRepository();

        const createdUser = await createUserRepository.execute({
            ...createUserParams,
            password: hashedPassword,
        });

        return createdUser;
    }
}
