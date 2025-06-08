import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { swaggerUi, swaggerSpec } from './swagger';
import applicationRoutes from "./routes/applicationRoutes";
import companyRoutes from "./routes/companyRoutes";import motivation_letterRoutes from "./routes/motivation_letterRoutes";
import vacancy_skillsRoutes from "./routes/vacancy_skillsRoutes";
import vacancyRoutes from "./routes/vacancyRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/vacancy-service/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/vacancy-service/application", applicationRoutes);
app.use("/vacancy-service/company", companyRoutes);
app.use("/vacancy-service/motivation_letter", motivation_letterRoutes);
app.use("/vacancy-service/vacancy_skill", vacancy_skillsRoutes);
app.use("/vacancy-service/vacancy", vacancyRoutes);



AppDataSource.initialize()
    .then(() => {
        app.listen(3003, () => {
            console.log("User service running on port 3003");
        });
    })
    .catch(console.error);
