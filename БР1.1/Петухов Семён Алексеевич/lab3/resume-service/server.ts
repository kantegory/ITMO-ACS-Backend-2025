import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { swaggerUi, swaggerSpec } from './swagger';
import educationRoutes from "./routes/educationRoutes";
import resume_skillsRoutes from "./routes/resume_skillsRoutes";
import resumeRoutes from "./routes/resumeRoutes";
import work_experienceRoutes from "./routes/work_experienceRoutes";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use('/resume-service/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/resume-service/education", educationRoutes);
app.use("/resume-service/resume_skill", resume_skillsRoutes);
app.use("/resume-service/resume", resumeRoutes);
app.use("/resume-service/work_exp", work_experienceRoutes);


AppDataSource.initialize()
    .then(() => {
        app.listen(3002, () => {
            console.log("User service running on port 3002");
        });
    })
    .catch(console.error);
