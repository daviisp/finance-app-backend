import { hashPassword } from "../../helpers/user.js";

export class CreateUserUseCase {
    constructor(getUserByEmailRepository, createUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.createUserRepository = createUserRepository;
    }
    async execute(createUserParams) {
        const userExists = await this.getUserByEmailRepository.execute(
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
