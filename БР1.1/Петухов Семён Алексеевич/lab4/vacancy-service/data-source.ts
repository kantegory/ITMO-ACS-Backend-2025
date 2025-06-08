import { DataSource } from "typeorm";
import { Company } from "./models/companyModel";
import { Vacancy } from "./models/vacancyModel";
import { VacancySkills } from "./models/vacancy_skillsModel";
import { Application } from "./models/applicationModel";
import { MotivationLetter } from "./models/motivation_letterModel";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "resume_finder",
    synchronize: true,
    logging: false,
    entities: [
        Company,
        Vacancy,
        VacancySkills,
        Application,
        MotivationLetter,
    ],
});
