import express from "express";
import authRoutes from "./routes/auth.route";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use(errorMiddleware);

export default app;