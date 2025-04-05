import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { userRouter } from "./routes/users.js";
import { transactionRouter } from "./routes/transactions.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(transactionRouter);

app.listen(PORT, () => {
    console.log(`Backend started at port ${PORT}`);
});
