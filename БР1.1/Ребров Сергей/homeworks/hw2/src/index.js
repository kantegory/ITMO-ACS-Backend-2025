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
const user_1 = require("./entity/user");
const role_1 = require("./entity/role");
const resume_1 = require("./entity/resume");
const job_1 = require("./entity/job");
const application_1 = require("./entity/application");
const experience_1 = require("./entity/experience");
const education_1 = require("./entity/education");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", user_1.router);
app.use("/api", role_1.router);
app.use("/api", resume_1.router);
app.use("/api", job_1.router);
app.use("/api", application_1.router);
app.use("/api", experience_1.router);
app.use("/api", education_1.router);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_1.AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    }
    catch (error) {
        console.error("Error during Data Source initialization:", error);
    }
});
startServer();
