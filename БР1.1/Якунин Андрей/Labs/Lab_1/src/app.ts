import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./config/AppDataSource";
import authRoutes from "./routers/authRoute";
import userRoutes from "./routers/userRouter";
import express, { Request, Response } from "express";
import { setupSwagger } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;


const handler = (request: Request, response: Response) => {
    response.status(200).send({
        message: "Hello world!",
    });
};

app.use(express.json());
app.get("/", handler);

AppDataSource.initialize()
    .then(() => console.log("Database connected!"))
    .catch(err => console.error("Database connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

setupSwagger(app);