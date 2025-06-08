"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const databaseConfig_1 = require("./config/databaseConfig");
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
databaseConfig_1.AppDataSource.initialize()
    .then(() => {
    console.log('🗄️  Data Source has been initialized!');
    app_1.default.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('❌ Error during Data Source initialization', err);
});
