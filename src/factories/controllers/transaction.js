import { CreateTransactionController } from "../../controllers/transaction/create-transaction.js";
import { GetUserByIdRepository } from "../../repositories/user/get-user-by-id.js";
import { CreateTransactionUseCase } from "../../use-cases/transaction/create-transaction.js";
import { CreateTransactionRepository } from "../../repositories/transaction/create-transaction.js";

export const makeCreateTransactionController = () => {
    const getUserByIdRepository = new GetUserByIdRepository();
    const createTransactionRepository = new CreateTransactionRepository();
    const createTransactionUseCase = new CreateTransactionUseCase(
        getUserByIdRepository,
        createTransactionRepository
    );
    const createdTransactionController = new CreateTransactionController(
        createTransactionUseCase
    );

    return createdTransactionController;
};
