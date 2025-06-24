import { DataSource } from "typeorm";

import { Job } from "./entity/job";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Fib235813213455!",
  database: "find_job",
  synchronize: false,
  logging: true,
  entities: [Job],
  migrations: ["src/migration/**/*.ts"],
  subscribers: []
});
