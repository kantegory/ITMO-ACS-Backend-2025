"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const application_1 = require("./entity/application");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Fib235813213455!",
    database: "find_job",
    synchronize: false,
    logging: true,
    entities: [application_1.Application],
    migrations: ["migration/**/*.ts"],
    subscribers: []
});
