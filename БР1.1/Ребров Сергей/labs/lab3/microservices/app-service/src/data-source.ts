import { DataSource } from "typeorm";

import { Application } from "./entity/application";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Fib235813213455!",
  database: "find_job",
  synchronize: false,
  logging: true,
  entities: [Application],
  migrations: ["migration/**/*.ts"],
  subscribers: []
});
