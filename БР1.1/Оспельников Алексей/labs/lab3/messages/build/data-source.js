"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: !!process.env.POSTGRES_LOGGING,
    entities: ["build/entity/*.js", "build/entity/**/*.js"],
    migrations: ["build/migrations/*.js"],
    subscribers: ["build/subscriber/**/*.js"],
    ssl: !!process.env.POSTGRES_SSL,
});
//# sourceMappingURL=data-source.js.map