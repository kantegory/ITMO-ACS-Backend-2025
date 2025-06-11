import express from "express";
import messageRoutes from "./routes/message.route";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use("/messages", messageRoutes);
app.use(errorMiddleware);

export default app;