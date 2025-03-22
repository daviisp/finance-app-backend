import { GetUserByIdRepository } from "../../repositories/user/get-user-by-id.js";
import { GetTransactionByIdRepository } from "../../repositories/transaction/get-transaction-by-id.js";
import { CreateTransactionController } from "../../controllers/transaction/create-transaction.js";
import { CreateTransactionUseCase } from "../../use-cases/transaction/create-transaction.js";
import { CreateTransactionRepository } from "../../repositories/transaction/create-transaction.js";
import { UpdateTransactionController } from "../../controllers/transaction/update-transaction.js";
import { UpdateTransactionUseCase } from "../../use-cases/transaction/update-transaction.js";
import { UpdateTransactionRepository } from "../../repositories/transaction/update-transaction.js";

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
