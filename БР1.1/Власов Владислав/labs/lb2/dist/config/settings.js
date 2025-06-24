"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Settings {
    constructor() {
        // db connection settings
        this.DB_HOST = process_1.env.DB_HOST;
        this.DB_PORT = parseInt(process_1.env.DB_PORT);
        this.DB_NAME = process_1.env.DB_NAME;
        this.DB_USER = process_1.env.DB_USER;
        this.DB_PASSWORD = process_1.env.DB_PASSWORD;
        this.DB_ENTITIES = 'src/models/*.ts';
        this.DB_MIGRATION = 'src/migration/*.ts';
        this.JWT_SECRET_KEY = process_1.env.JWT_SECRET_KEY;
        this.JWT_ACCESS_TOKEN_LIFETIME = parseInt(process_1.env.JWT_ACCESS_TOKEN_LIFETIME);
    }
}
const SETTINGS = new Settings();
exports.default = SETTINGS;
