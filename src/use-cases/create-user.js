import { GetUserByEmailRepository } from "../repositories/get-user-by-email.js";
import { hashPassword } from "../helpers/user.js";

export class CreateUserUseCase {
    constructor(createUserRepository) {
        this.createUserRepository = createUserRepository;
    }
    async execute(createUserParams) {
        const getUserByEmailRepository = new GetUserByEmailRepository();

        const userExists = await getUserByEmailRepository.execute(
            createUserParams.email
        );

        if (userExists) {
            return { errorMessage: "Email already in use" };
        }

        const hashedPassword = await hashPassword(createUserParams.password);

        const createdUser = await this.createUserRepository.execute({
            ...createUserParams,
            password: hashedPassword,
        });

        return createdUser;
    }
}
