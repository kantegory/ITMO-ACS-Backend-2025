import express from "express";
import jobRoutes from "./routes/job.routes";
import industryRoutes from "./routes/industry.routes";
import employerRoutes from "./routes/employer.routes";

const app = express();
app.use(express.json());

app.use("/", jobRoutes);
app.use("/", industryRoutes);
app.use("/", employerRoutes);

export default app;
