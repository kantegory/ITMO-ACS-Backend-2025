import { DataSource } from "typeorm";
import { Building } from "../entities/Building";
import { Apartment } from "../entities/Apartment";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "property_database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Building, Apartment],
  migrations: [],
  subscribers: [],
}); 