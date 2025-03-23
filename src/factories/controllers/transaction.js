import { GetUserByIdRepository } from "../../repositories/user/get-user-by-id.js";
import { GetTransactionByIdRepository } from "../../repositories/transaction/get-transaction-by-id.js";
import { CreateTransactionController } from "../../controllers/transaction/create-transaction.js";
import { CreateTransactionUseCase } from "../../use-cases/transaction/create-transaction.js";
import { CreateTransactionRepository } from "../../repositories/transaction/create-transaction.js";
import { UpdateTransactionController } from "../../controllers/transaction/update-transaction.js";
import { UpdateTransactionUseCase } from "../../use-cases/transaction/update-transaction.js";
import { UpdateTransactionRepository } from "../../repositories/transaction/update-transaction.js";
import { GetTransactionsByUserIdController } from "../../controllers/transaction/get-transactions-by-user-id.js";
import { GetTransactionsByUserIdUseCase } from "../../use-cases/transaction/get-transactions-by-user-id.js";
import { GetTransactionsByUserIdRepository } from "../../repositories/transaction/get-transactions-by-user-id.js";
import { DeleteTransactionController } from "../../controllers/transaction/delete-transaction.js";
import { DeleteTransactionUseCase } from "../../use-cases/transaction/delete-transaction.js";
import { DeleteTransactionRepository } from "../../repositories/transaction/delete-transaction.js";

export const makeCreateTransactionController = () => {
    const getUserByIdRepository = new GetUserByIdRepository();
    const createTransactionRepository = new CreateTransactionRepository();
    const createTransactionUseCase = new CreateTransactionUseCase(
        getUserByIdRepository,
        createTransactionRepository
    );
    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase
    );

    return createTransactionController;
};

export const makeUpdateTransactionController = () => {
    const getTransactionByIdRepository = new GetTransactionByIdRepository();
    const updateTransactionRepository = new UpdateTransactionRepository();

    const updateTransactionUseCase = new UpdateTransactionUseCase(
        getTransactionByIdRepository,
        updateTransactionRepository
    );
    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase
    );

    return updateTransactionController;
};

export const makeGetTransactionsByUserIdController = () => {
    const getUserByIdRepository = new GetUserByIdRepository();
    const getTransactionsByUserIdRepository =
        new GetTransactionsByUserIdRepository();
    const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
        getUserByIdRepository,
        getTransactionsByUserIdRepository
    );

    const getTransactionsByUserIdController =
        new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase);

    return getTransactionsByUserIdController;
};

export const makeDeleteTransactionController = () => {
    const getTransactionByIdRepository = new GetTransactionByIdRepository();
    const deleteTransactionRepository = new DeleteTransactionRepository();
    const deleteTransactionUseCase = new DeleteTransactionUseCase(
        getTransactionByIdRepository,
        deleteTransactionRepository
    );

    const deleteTransactionController = new DeleteTransactionController(
        deleteTransactionUseCase
    );

    return deleteTransactionController;
};
