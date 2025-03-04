import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { CreateUserController } from "./controllers/create-user.js";
import { GetUserByIdController } from "./controllers/get-user-by-id.js";
import { UpdateUserController } from "./controllers/update-user.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/api/users/:id", async (request, response) => {
    const getUserByIdController = new GetUserByIdController();
    const { statusCode, body } = await getUserByIdController.execute(request);

    return response.status(statusCode).json(body);
});

app.patch("/api/users/:id", async (request, response) => {
    const updateUserController = new UpdateUserController();
    const { statusCode, body } = await updateUserController.exeucte(request);

    return response.status(statusCode).json(body);
});

app.post("/api/users", async (request, response) => {
    const createUserController = new CreateUserController();
    const { statusCode, body } = await createUserController.execute(request);

    return response.status(statusCode).json(body);
});

app.listen(PORT, () => {
    console.log(`Backend started at port ${PORT}`);
});
