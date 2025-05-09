import express from "express";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/userRoutes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        app.use("/api/users", userRouter);

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
