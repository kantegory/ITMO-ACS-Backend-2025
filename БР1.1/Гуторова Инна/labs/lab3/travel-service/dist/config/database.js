"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Attraction_1 = __importDefault(require("../entities/Attraction"));
const Media_1 = __importDefault(require("../entities/Media"));
const Route_1 = __importDefault(require("../entities/Route"));
const TravelType_1 = __importDefault(require("../entities/TravelType"));
const Trip_1 = __importDefault(require("../entities/Trip"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    database: process.env.DB_NAME || "travel_service",
    synchronize: true,
    logging: false,
    entities: [Attraction_1.default, Media_1.default, Route_1.default, TravelType_1.default, Trip_1.default],
    migrations: [],
    subscribers: [],
});
