import { EmailAlreadyInUseError } from "../../errors/user.js";

export class CreateUserUseCase {
    constructor(
        passwordHasherAdapter,
        getUserByEmailRepository,
        createUserRepository,
        tokenGeneratorAdapter
    ) {
        this.passwordHasherAdapter = passwordHasherAdapter;
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.createUserRepository = createUserRepository;
        this.tokenGeneratorAdapter = tokenGeneratorAdapter;
    }
    async execute(createUserParams) {
        const userExists = await this.getUserByEmailRepository.execute(
            createUserParams.email
        );

        if (userExists) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const hashedPassword = await this.passwordHasherAdapter.execute(
            createUserParams.password
        );

        const createdUser = await this.createUserRepository.execute({
            ...createUserParams,
            password: hashedPassword,
        });

        const tokens = this.tokenGeneratorAdapter.execute(createdUser.id);

        return {
            ...createdUser,
            tokens,
        };
    }
}
