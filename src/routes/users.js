import { Router } from "express";
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserBalanceController,
    makeGetUserByIdController,
    makeLoginUserController,
    makeUpdateUserController,
} from "../factories/controllers/user.js";

export const userRouter = Router();

userRouter.post("/api/users", async (request, response) => {
    const createUserController = makeCreateUserController();
    const { statusCode, body } = await createUserController.execute(request);

    return response.status(statusCode).json(body);
});

userRouter.patch("/api/users/:id", async (request, response) => {
    const updateUserController = makeUpdateUserController();
    const { statusCode, body } = await updateUserController.execute(request);

    return response.status(statusCode).json(body);
});

userRouter.get("/api/users/:id", async (request, response) => {
    const getUserByIdController = makeGetUserByIdController();
    const { statusCode, body } = await getUserByIdController.execute(request);

    return response.status(statusCode).json(body);
});

userRouter.get("/api/users/:id/balance", async (request, response) => {
    const getUserBalanceController = makeGetUserBalanceController();
    const { statusCode, body } = await getUserBalanceController.execute(
        request
    );

    return response.status(statusCode).json(body);
});

userRouter.delete("/api/users/:id", async (request, response) => {
    const deleteUserController = makeDeleteUserController();
    const { statusCode, body } = await deleteUserController.execute(request);

    return response.status(statusCode).json(body);
});

userRouter.post("/api/login", async (request, response) => {
    const loginUserController = makeLoginUserController();
    const { statusCode, body } = await loginUserController.execute(request);

    return response.status(statusCode).json(body);
});
