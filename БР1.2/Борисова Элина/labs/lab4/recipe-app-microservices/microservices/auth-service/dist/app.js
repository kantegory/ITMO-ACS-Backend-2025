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
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const roleRouter_1 = __importDefault(require("./routers/roleRouter"));
const initRoleService_1 = require("./services/initRoleService");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const errorHandler_1 = require("@recipe-app/common-service/src/middleware/errorHandler");
const app = (0, express_1.default)();
const PORT = 3000;
const swaggerSpec = (0, swagger_jsdoc_1.default)(swagger_1.swaggerOptions);
app.use(express_1.default.json());
const handler = (_request, response) => {
    response.status(200).send({
        message: 'Auth Service!',
    });
};
app.get('/', handler);
app.use(errorHandler_1.errorHandler);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use('/user', userRouter_1.default);
app.use('/auth', authRouter_1.default);
app.use('/role', roleRouter_1.default);
database_1.AppDataSource
    .initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Database connected');
    yield (0, initRoleService_1.initializeRoles)();
    app.listen(PORT, () => {
        console.log('Server is running on port: ' + PORT);
        console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
    });
}))
    .catch((error) => console.log(error));
