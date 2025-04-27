import express from "express";
import basicRoutes from "./routes/basic.routes";

const app = express();

app.use(express.json());
app.use("/api", basicRoutes); // Роуты будут доступны по /api/basic

export default app;