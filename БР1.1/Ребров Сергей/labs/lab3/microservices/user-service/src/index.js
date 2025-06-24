"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./data-source");
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./route/user.route"));
const role_route_1 = __importDefault(require("./route/role.route"));
const resume_route_1 = __importDefault(require("./route/resume.route"));
const experience_route_1 = __importDefault(require("./route/experience.route"));
const education_route_1 = __importDefault(require("./route/education.route"));
const cors_1 = __importDefault(require("cors"));
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", user_route_1.default);
app.use("/api", role_route_1.default);
app.use("/api", resume_route_1.default);
app.use("/api", experience_route_1.default);
app.use("/api", education_route_1.default);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_1.AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        app.listen(5002, () => {
            console.log("Server running on port 5002");
        });
    }
    catch (error) {
        console.error("Error during Data Source initialization:", error);
    }
});
startServer();
