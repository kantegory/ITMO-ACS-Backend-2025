import { DataSource } from "typeorm";

import { User } from "./entity/user";
import { Role } from "./entity/role";
import { Resume } from "./entity/resume";
import { Job } from "./entity/job";
import { Application } from "./entity/application";
import { Education } from "./entity/education";
import { Experience } from "./entity/experience";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Fib235813213455!",
  database: "find_job",
  synchronize: false,
  logging: true,
  entities: [User, Role, Resume, Job, Application, Education, Experience],
  migrations: ["src/migration/**/*.ts"],
  subscribers: []
});
