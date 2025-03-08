import "dotenv/config.js";
import express from "express";
import cors from "cors";
import {
    makeGetUserByIdController,
    makeUpdateUserController,
    makeCreateUserController,
    makeDeleteUserController,
} from "./factories/controllers/user.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/api/users/:id", async (request, response) => {
    const getUserByIdController = makeGetUserByIdController();
    const { statusCode, body } = await getUserByIdController.execute(request);

    return response.status(statusCode).json(body);
});

app.patch("/api/users/:id", async (request, response) => {
    const updateUserController = makeUpdateUserController();
    const { statusCode, body } = await updateUserController.execute(request);

    return response.status(statusCode).json(body);
});

app.post("/api/users", async (request, response) => {
    const createUserController = makeCreateUserController();
    const { statusCode, body } = await createUserController.execute(request);

    return response.status(statusCode).json(body);
});

app.delete("/api/users/:id", async (request, response) => {
    const deleteUserController = makeDeleteUserController();
    const { statusCode, body } = await deleteUserController.execute(request);

    return response.status(statusCode).json(body);
});

app.listen(PORT, () => {
    console.log(`Backend started at port ${PORT}`);
});
