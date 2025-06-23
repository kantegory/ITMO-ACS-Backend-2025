"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Apartment_1 = require("../entities/Apartment");
const Building_1 = require("../entities/Building");
const Contract_1 = require("../entities/Contract");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: process.env.DATABASE_PATH || "./database.sqlite",
    synchronize: true,
    logging: process.env.NODE_ENV === "development",
    entities: [User_1.User, Apartment_1.Apartment, Building_1.Building, Contract_1.Contract],
    subscribers: [],
    migrations: [],
});
const initializeDatabase = async () => {
    try {
        await exports.AppDataSource.initialize();
        console.log("Database connection established");
    }
    catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
};
exports.initializeDatabase = initializeDatabase;
//# sourceMappingURL=database.js.map