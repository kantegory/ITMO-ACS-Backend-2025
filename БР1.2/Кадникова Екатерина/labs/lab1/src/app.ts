import express from "express";
import { logRequestMiddleware } from "./middlewares/logMiddleware";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { checkEnvVariables } from "./middlewares/envMiddleware";
import * as dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(checkEnvVariables);
app.use(logRequestMiddleware);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);

export default app;