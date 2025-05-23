import { DataSource } from "typeorm";
import { User } from "../models/userModel";
import { Resume } from "../models/resumeModel";
import { WorkExperience } from "../models/work_experienceModel";
import { Skill } from "../models/skillModel";
import { ResumeSkills } from "../models/resume_skillsModel";
import { Education } from "../models/educationModel";
import { Company } from "../models/companyModel";
import { Vacancy } from "../models/vacancyModel";
import { VacancySkills } from "../models/vacancy_skillsModel";
import { Application } from "../models/applicationModel";
import { MotivationLetter } from "../models/motivation_letterModel";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "resume_finder",
    synchronize: true,
    logging: false,
    entities: [
        User,
        Resume,
        WorkExperience,
        Skill,
        ResumeSkills,
        Education,
        Company,
        Vacancy,
        VacancySkills,
        Application,
        MotivationLetter,
    ],
});
