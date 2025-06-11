import express from "express";
import userRoutes from "./routes/user.route";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use(errorMiddleware);

export default app;