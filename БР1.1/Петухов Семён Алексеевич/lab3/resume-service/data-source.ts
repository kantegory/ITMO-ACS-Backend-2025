import { DataSource } from "typeorm";
import { Resume } from "./models/resumeModel";
import { WorkExperience } from "./models/work_experienceModel";
import { ResumeSkills } from "./models/resume_skillsModel";
import { Education } from "./models/educationModel";

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
        Resume,
        WorkExperience,
        ResumeSkills,
        Education,
    ],
});
