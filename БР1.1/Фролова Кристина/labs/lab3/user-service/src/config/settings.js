"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Settings {
    constructor() {
        // db connection settings
        this.DB_HOST = process.env.DB_HOST || 'localhost';
        this.DB_PORT = parseInt(process.env.DB_PORT || '15432');
        this.DB_NAME = process.env.DB_NAME || 'maindb';
        this.DB_USER = process.env.DB_USER || 'maindb';
        this.DB_PASSWORD = process.env.DB_PASSWORD || 'maindb';
        this.DB_ENTITIES = process.env.DB_ENTITIES || 'build/entities/*.entity.js';
        this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';
        this.JWT_TOKEN_TYPE = process.env.JWT_TOKEN_TYPE || 'Bearer';
        this.JWT_ACCESS_TOKEN_LIFETIME = parseInt(process.env.JWT_ACCESS_TOKEN_LIFETIME || '300');
    }
}
const SETTINGS = new Settings();
exports.default = SETTINGS;
//# sourceMappingURL=settings.js.map