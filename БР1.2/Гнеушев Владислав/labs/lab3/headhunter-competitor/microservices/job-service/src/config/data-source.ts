import { DataSource } from "typeorm"
import { settings } from "./settings"
import { Company } from "../models/Company"
import { JobOffer } from "../models/JobOffer"
import { JobCategory } from "../models/JobCategory"
import { Skill } from "../models/Skill"
import { JobOfferRequiredSkill } from "../models/JobOfferRequiredSkill"

export const jobDataSource = new DataSource({
    type: "mysql",
    host: settings.db.HOST,
    port: settings.db.PORT,
    username: settings.db.USER,
    password: settings.db.PASSWORD,
    database: settings.db.NAME,
    entities: [Company, JobOffer, JobCategory, Skill, JobOfferRequiredSkill],
    logging: process.env.NODE_ENV === 'development',
    synchronize: process.env.NODE_ENV === 'development',
}) 