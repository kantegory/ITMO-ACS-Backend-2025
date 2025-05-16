import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import { swaggerSpec, swaggerUi } from './swagger';

// Импорт роутов
import userRoutes from "./routes/userRoutes";
import resumeRoutes from "./routes/resumeRoutes"; // Подключение других маршрутов
import workExperienceRoutes from "./routes/work_experienceRoutes";
import skillRoutes from "./routes/skillRoutes";
import resumeSkillsRoutes from "./routes/resume_skillsRoutes";
import educationRoutes from "./routes/educationRoutes";
import companyRoutes from "./routes/companyRoutes";
import vacancyRoutes from "./routes/vacancyRoutes";
import vacancySkillsRoutes from "./routes/vacancy_skillsRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import motivationLetterRoutes from "./routes/motivation_letterRoutes";

const app = express();
app.use(express.json());

// Подключаем Swagger UI с префиксом /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Подключаем остальные роуты
app.use("/api/users", userRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/work-experiences", workExperienceRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/resume-skills", resumeSkillsRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/vacancies", vacancyRoutes);
app.use("/api/vacancy-skills", vacancySkillsRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/motivation-letters", motivationLetterRoutes);

const PORT = 3000;

AppDataSource.initialize()
    .then(() => {
        console.log("📦 Data Source has been initialized!");
        app.listen(PORT, () => {
            console.log(`🚀 Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Error during Data Source initialization:", err);
    });
