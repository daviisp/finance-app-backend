import { CreateUserController } from "../../controllers/create-user.js";
import { DeleteUserController } from "../../controllers/delete-user.js";
import { GetUserByIdController } from "../../controllers/get-user-by-id.js";
import { UpdateUserController } from "../../controllers/update-user.js";
import { CreateUserRepository } from "../../repositories/create-user.js";
import { DeleteUserRepository } from "../../repositories/delete-user.js";
import { GetUserByEmailRepository } from "../../repositories/get-user-by-email.js";
import { GetUserByIdRepository } from "../../repositories/get-user-by-id.js";
import { UpdateUserRepository } from "../../repositories/update-user.js";
import { CreateUserUseCase } from "../../use-cases/create-user.js";
import { DeleteUserUseCase } from "../../use-cases/delete-user.js";
import { GetUserByIdUseCase } from "../../use-cases/get-user-by-id.js";
import { UpdateUserUseCase } from "../../use-cases/update-user.js";

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
    const createUserRepository = new CreateUserRepository();
    const createUserUseCase = new CreateUserUseCase(createUserRepository);
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
