import { config } from 'dotenv';
config(); // Загружает переменные из .env файла в process.env

import express from "express";
import userRoutes from "./routes/user.routes";
import { AppDataSource } from "./data-source";

const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.use("/", userRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));