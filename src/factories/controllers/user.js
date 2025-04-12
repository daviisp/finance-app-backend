import { CreateUserController } from "../../controllers/user/create-user.js";
import { DeleteUserController } from "../../controllers/user/delete-user.js";
import { GetUserByIdController } from "../../controllers/user/get-user-by-id.js";
import { UpdateUserController } from "../../controllers/user/update-user.js";
import { CreateUserUseCase } from "../../use-cases/user/create-user.js";
import { DeleteUserUseCase } from "../../use-cases/user/delete-user.js";
import { GetUserByIdUseCase } from "../../use-cases/user/get-user-by-id.js";
import { UpdateUserUseCase } from "../../use-cases/user/update-user.js";
import { CreateUserRepository } from "../../repositories/user/create-user.js";
import { DeleteUserRepository } from "../../repositories/user/delete-user.js";
import { GetUserByIdRepository } from "../../repositories/user/get-user-by-id.js";
import { GetUserByEmailRepository } from "../../repositories/user/get-user-by-email.js";
import { UpdateUserRepository } from "../../repositories/user/update-user.js";
import { GetUserBalanceController } from "../../controllers/user/get-user-balance.js";
import { GetUserBalanceUseCase } from "../../use-cases/user/get-user-balance.js";
import { GetUserBalanceRepository } from "../../repositories/user/get-user-balance.js";
import { LoginUserController } from "../../controllers/user/login-user.js";
import { LoginUserUseCase } from "../../use-cases/user/login-user.js";
import { PasswordHasherAdapter } from "../../adapters/password-hasher.js";
import { PasswordComparatorAdapter } from "../../adapters/password-comparator.js";
import { TokenGeneratorAdapter } from "../../adapters/token-generator.js";
import { RefreshTokenController } from "../../controllers/user/refresh-token.js";
import { RefreshTokenUseCase } from "../../use-cases/user/refresh-token.js";
import { TokenVerifierAdapter } from "../../adapters/token-verifier.js";

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new GetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    return getUserByIdController;
};

export const makeUpdateUserController = () => {
    const passwordHasherAdapter = new PasswordHasherAdapter();
    const getUserByIdRepository = new GetUserByIdRepository();
    const getUserByEmailRepository = new GetUserByEmailRepository();
    const updateUserRepository = new UpdateUserRepository();

    const updateUserUseCase = new UpdateUserUseCase(
        passwordHasherAdapter,
        getUserByIdRepository,
        getUserByEmailRepository,
        updateUserRepository
    );
    const updateUserController = new UpdateUserController(updateUserUseCase);

    return updateUserController;
};

export const makeCreateUserController = () => {
    const getUserByEmailRepository = new GetUserByEmailRepository();
    const passwordHasherAdapter = new PasswordHasherAdapter();
    const tokenGeneratorAdapter = new TokenGeneratorAdapter();
    const createUserRepository = new CreateUserRepository();
    const createUserUseCase = new CreateUserUseCase(
        passwordHasherAdapter,
        getUserByEmailRepository,
        createUserRepository,
        tokenGeneratorAdapter
    );
    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};

export const makeDeleteUserController = () => {
    const getUserByIdRepository = new GetUserByIdRepository();
    const deleteUserRepository = new DeleteUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(
        getUserByIdRepository,
        deleteUserRepository
    );
    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    return deleteUserController;
};

export const makeGetUserBalanceController = () => {
    const getUserByIdRepository = new GetUserByIdRepository();
    const getUserBalanceRepository = new GetUserBalanceRepository();
    const getUserBalanceUseCase = new GetUserBalanceUseCase(
        getUserByIdRepository,
        getUserBalanceRepository
    );

    const getUserBalanceController = new GetUserBalanceController(
        getUserBalanceUseCase
    );

    return getUserBalanceController;
};

export const makeLoginUserController = () => {
    const getUserByEmailRepository = new GetUserByEmailRepository();
    const passwordComparatorAdapter = new PasswordComparatorAdapter();
    const tokenGeneratorAdapter = new TokenGeneratorAdapter();
    const loginUserUseCase = new LoginUserUseCase(
        getUserByEmailRepository,
        passwordComparatorAdapter,
        tokenGeneratorAdapter
    );

    const loginUserController = new LoginUserController(loginUserUseCase);

    return loginUserController;
};

export const makeRefreshTokenController = () => {
    const tokenVerifierAdapter = new TokenVerifierAdapter();
    const tokenGeneratorAdapter = new TokenGeneratorAdapter();
    const refreshTokenUseCase = new RefreshTokenUseCase(
        tokenVerifierAdapter,
        tokenGeneratorAdapter
    );

    const refreshTokenController = new RefreshTokenController(
        refreshTokenUseCase
    );

    return refreshTokenController;
};
