import { Router } from "express";
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserBalanceController,
    makeGetUserByIdController,
    makeLoginUserController,
    makeRefreshTokenController,
    makeUpdateUserController,
} from "../factories/controllers/user.js";
import { auth } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.post("/users", async (request, response) => {
    const createUserController = makeCreateUserController();
    const { statusCode, body } = await createUserController.execute(request);

    return response.status(statusCode).json(body);
});

userRouter.patch("/me", auth, async (request, response) => {
    const updateUserController = makeUpdateUserController();
    const { statusCode, body } = await updateUserController.execute(request);

    return response.status(statusCode).json(body);
});

userRouter.get("/me", auth, async (request, response) => {
    const getUserByIdController = makeGetUserByIdController();
    const { statusCode, body } = await getUserByIdController.execute(request);

    return response.status(statusCode).json(body);
});

userRouter.get("/me/balance", auth, async (request, response) => {
    const getUserBalanceController = makeGetUserBalanceController();
    const { statusCode, body } = await getUserBalanceController.execute(
        request
    );

    return response.status(statusCode).json(body);
});

userRouter.delete("/me", auth, async (request, response) => {
    const deleteUserController = makeDeleteUserController();
    const { statusCode, body } = await deleteUserController.execute(request);

    return response.status(statusCode).json(body);
});

userRouter.post("/auth/login", async (request, response) => {
    const loginUserController = makeLoginUserController();
    const { statusCode, body } = await loginUserController.execute(request);

    return response.status(statusCode).json(body);
});

userRouter.post("/refresh-token", (request, response) => {
    const refreshTokenController = makeRefreshTokenController();
    const { statusCode, body } = refreshTokenController.execute(request);

    return response.status(statusCode).json(body);
});
