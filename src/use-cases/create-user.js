import { CreateUserRepository } from "../repositories/create-user.js";
import { GetUserByEmailRepository } from "../repositories/get-user-by-email.js";
import { hashPassword } from "../helpers/user.js";

export class CreateUserUseCase {
    async execute(createUserParams) {
        const getUserByEmailRepository = new GetUserByEmailRepository();

        const userExists = await getUserByEmailRepository.execute(
            createUserParams.email
        );

        if (userExists) {
            return { error: "Email already in use" };
        }

        const hashedPassword = await hashPassword(createUserParams.password);

        const createUserRepository = new CreateUserRepository();

        const createdUser = await createUserRepository.execute({
            ...createUserParams,
            password: hashedPassword,
        });

        return createdUser;
    }
}
