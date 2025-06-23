import { DataSource } from "typeorm";
import { Contract } from "../entities/Contract";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "contract_database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Contract],
  migrations: [],
  subscribers: [],
}); 