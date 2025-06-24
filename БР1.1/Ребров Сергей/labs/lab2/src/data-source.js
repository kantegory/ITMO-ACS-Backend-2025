"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const role_1 = require("./entity/role");
const resume_1 = require("./entity/resume");
const job_1 = require("./entity/job");
const application_1 = require("./entity/application");
const education_1 = require("./entity/education");
const experience_1 = require("./entity/experience");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Fib235813213455!",
    database: "find_job",
    synchronize: false,
    logging: true,
    entities: [user_1.User, role_1.Role, resume_1.Resume, job_1.Job, application_1.Application, education_1.Education, experience_1.Experience],
    migrations: ["src/migration/**/*.ts"],
    subscribers: []
});
