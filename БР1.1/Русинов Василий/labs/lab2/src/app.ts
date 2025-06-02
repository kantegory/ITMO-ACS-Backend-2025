import express from "express";
import userRoutes from "./routes/user.routes";
import resumeRoutes from "./routes/resume.routes";
import employerRoutes from "./routes/employer.routes";
import jobRoutes from "./routes/job.routes";
import industryRoutes from "./routes/industry.routes";
import applicationRoutes from "./routes/application.routes";
import authRoutes from "./routes/auth.routes";


const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/resumes", resumeRoutes);
app.use("/employers", employerRoutes);
app.use("/jobs", jobRoutes);
app.use("/industries", industryRoutes);
app.use("/applications", applicationRoutes);
app.use("/auth", authRoutes);
export default app;
