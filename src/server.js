import "dotenv/config.js";
import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Backend started at port ${PORT}`);
});
