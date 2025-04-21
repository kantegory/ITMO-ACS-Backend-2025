import { DataSource } from "typeorm"
import * as entities from "../models/entities"

export const dataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5435,
	username: "postgres",
	password: "postgres",
	database: "work_db",
	entities: entities,
	logging: true,
	synchronize: true,
})
