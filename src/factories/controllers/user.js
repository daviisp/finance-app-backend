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

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new GetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    return getUserByIdController;
};

export const makeUpdateUserController = () => {
    const getUserByIdRepository = new GetUserByIdRepository();
    const getUserByEmailRepository = new GetUserByEmailRepository();
    const updateUserRepository = new UpdateUserRepository();

    const updateUserUseCase = new UpdateUserUseCase(
        getUserByIdRepository,
        getUserByEmailRepository,
        updateUserRepository
    );
    const updateUserController = new UpdateUserController(updateUserUseCase);

    return updateUserController;
};

export const makeCreateUserController = () => {
    const getUserByEmailRepository = new GetUserByEmailRepository();
    const createUserRepository = new CreateUserRepository();
    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository
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
