import "dotenv/config.js";
import express from "express";
import cors from "cors";
import {
    makeGetUserByIdController,
    makeUpdateUserController,
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserBalanceController,
} from "./factories/controllers/user.js";
import {
    makeCreateTransactionController,
    makeGetTransactionsByUserIdController,
    makeUpdateTransactionController,
} from "./factories/controllers/transaction.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post("/api/users", async (request, response) => {
    const createUserController = makeCreateUserController();
    const { statusCode, body } = await createUserController.execute(request);

    return response.status(statusCode).json(body);
});

app.patch("/api/users/:id", async (request, response) => {
    const updateUserController = makeUpdateUserController();
    const { statusCode, body } = await updateUserController.execute(request);

    return response.status(statusCode).json(body);
});

app.get("/api/users/:id", async (request, response) => {
    const getUserByIdController = makeGetUserByIdController();
    const { statusCode, body } = await getUserByIdController.execute(request);

    return response.status(statusCode).json(body);
});

app.get("/api/users/:id/balance", async (request, response) => {
    const getUserBalanceController = makeGetUserBalanceController();
    const { statusCode, body } = await getUserBalanceController.execute(
        request
    );

    return response.status(statusCode).json(body);
});

app.delete("/api/users/:id", async (request, response) => {
    const deleteUserController = makeDeleteUserController();
    const { statusCode, body } = await deleteUserController.execute(request);

    return response.status(statusCode).json(body);
});

app.post("/api/transactions", async (request, response) => {
    const createTransactionController = makeCreateTransactionController();
    const { statusCode, body } = await createTransactionController.execute(
        request
    );

    return response.status(statusCode).json(body);
});

app.patch("/api/transactions/:id", async (request, response) => {
    const updateTransactionController = makeUpdateTransactionController();

    const { statusCode, body } = await updateTransactionController.execute(
        request
    );

    return response.status(statusCode).json(body);
});

app.get("/api/transactions", async (request, response) => {
    const getTransactionsByUserIdController =
        makeGetTransactionsByUserIdController();
    const { statusCode, body } =
        await getTransactionsByUserIdController.execute(request);

    return response.status(statusCode).json(body);
});

app.listen(PORT, () => {
    console.log(`Backend started at port ${PORT}`);
});
