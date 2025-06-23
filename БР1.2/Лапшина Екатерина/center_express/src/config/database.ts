import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Apartment } from "../entities/Apartment";
import { Building } from "../entities/Building";
import { Contract } from "../entities/Contract";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DATABASE_PATH || "./database.sqlite",
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  entities: [User, Apartment, Building, Contract],
  subscribers: [],
  migrations: [],
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
}; 