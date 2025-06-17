"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_data_source_1 = require("./config/app-data-source");
const app_1 = __importDefault(require("./app"));
const PORT = 3000;
app_data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected successfully');
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error during Data Source initialization', error);
});
