import express from "express";
import applicationRoutes from "./routes/application.routes";
import resumeRoutes from "./routes/resume.routes";

const app = express();
app.use(express.json());

app.use("/", applicationRoutes);
app.use("/", resumeRoutes);

export default app;
