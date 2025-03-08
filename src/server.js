import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { CreateUserController } from "./controllers/create-user.js";
import { CreateUserUseCase } from "./use-cases/create-user.js";
import { CreateUserRepository } from "./repositories/create-user.js";
import { GetUserByIdController } from "./controllers/get-user-by-id.js";
import { GetUserByIdUseCase } from "./use-cases/get-user-by-id.js";
import { GetUserByIdRepository } from "./repositories/get-user-by-id.js";
import { GetUserByEmailRepository } from "./repositories/get-user-by-email.js";
import { UpdateUserController } from "./controllers/update-user.js";
import { UpdateUserUseCase } from "./use-cases/update-user.js";
import { UpdateUserRepository } from "./repositories/update-user.js";
import { DeleteUserController } from "./controllers/delete-user.js";
import { DeleteUserUseCase } from "./use-cases/delete-user.js";
import { DeleteUserRepository } from "./repositories/delete-user.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/api/users/:id", async (request, response) => {
    const getUserByIdRepository = new GetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
    const { statusCode, body } = await getUserByIdController.execute(request);

    return response.status(statusCode).json(body);
});

app.patch("/api/users/:id", async (request, response) => {
    const getUserByIdRepository = new GetUserByIdRepository();
    const getUserByEmailRepository = new GetUserByEmailRepository();
    const updateUserRepository = new UpdateUserRepository();

    const updateUserUseCase = new UpdateUserUseCase(
        getUserByIdRepository,
        getUserByEmailRepository,
        updateUserRepository
    );

    const updateUserController = new UpdateUserController(updateUserUseCase);
    const { statusCode, body } = await updateUserController.exeucte(request);

    return response.status(statusCode).json(body);
});

app.post("/api/users", async (request, response) => {
    const createUserRepository = new CreateUserRepository();
    const createUserUseCase = new CreateUserUseCase(createUserRepository);

    const createUserController = new CreateUserController(createUserUseCase);
    const { statusCode, body } = await createUserController.execute(request);

    return response.status(statusCode).json(body);
});

app.delete("/api/users/:id", async (request, response) => {
    const getUserByIdRepository = new GetUserByIdRepository();
    const deleteUserRepository = new DeleteUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(
        getUserByIdRepository,
        deleteUserRepository
    );

    const deleteUserController = new DeleteUserController(deleteUserUseCase);
    const { statusCode, body } = await deleteUserController.execute(request);

    return response.status(statusCode).json(body);
});

app.listen(PORT, () => {
    console.log(`Backend started at port ${PORT}`);
});
