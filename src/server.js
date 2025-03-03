import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { CreateUserController } from "./controllers/create-user.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post("/api/users", (request, response) => {
    const createUserController = new CreateUserController();
    const { statusCode, body } = createUserController.execute(request);

    return response.status(statusCode).json(body);
});

app.listen(PORT, () => {
    console.log(`Backend started at port ${PORT}`);
});
