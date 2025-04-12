import { Router } from "express";
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionsByUserIdController,
    makeUpdateTransactionController,
} from "../factories/controllers/transaction.js";
import { auth } from "../middlewares/auth.js";

export const transactionRouter = Router();

transactionRouter.post("/transactions", auth, async (request, response) => {
    const createTransactionController = makeCreateTransactionController();
    const { statusCode, body } = await createTransactionController.execute(
        request
    );

    return response.status(statusCode).json(body);
});

transactionRouter.patch(
    "/transactions/:id",
    auth,
    async (request, response) => {
        const updateTransactionController = makeUpdateTransactionController();
        const { statusCode, body } = await updateTransactionController.execute(
            request
        );

        return response.status(statusCode).json(body);
    }
);

transactionRouter.delete(
    "/transactions/:id",
    auth,
    async (request, response) => {
        const deleteTransactionController = makeDeleteTransactionController();
        const { statusCode, body } = await deleteTransactionController.execute(
            request
        );

        return response.status(statusCode).json(body);
    }
);

transactionRouter.get("/transactions", auth, async (request, response) => {
    const getTransactionsByUserIdController =
        makeGetTransactionsByUserIdController();
    const { statusCode, body } =
        await getTransactionsByUserIdController.execute(request);

    return response.status(statusCode).json(body);
});
