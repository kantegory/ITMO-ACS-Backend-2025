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
const ingredientRouter_1 = __importDefault(require("./routers/ingredientRouter"));
const dishTypeRouter_1 = __importDefault(require("./routers/dishTypeRouter"));
const recipeDifficultyRouter_1 = __importDefault(require("./routers/recipeDifficultyRouter"));
const recipeIngredientRouter_1 = __importDefault(require("./routers/recipeIngredientRouter"));
const recipeRouter_1 = __importDefault(require("./routers/recipeRouter"));
const recipeStepRouter_1 = __importDefault(require("./routers/recipeStepRouter"));
const initDishTypeService_1 = require("./services/initDishTypeService");
const initRecipeDifficultyService_1 = require("./services/initRecipeDifficultyService");
const initIngredientService_1 = require("./services/initIngredientService");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const errorHandler_1 = require("common-service/src/middleware/errorHandler");
const app = (0, express_1.default)();
const PORT = 3001;
const swaggerSpec = (0, swagger_jsdoc_1.default)(swagger_1.swaggerOptions);
app.use(express_1.default.json());
const handler = (_request, response) => {
    response.status(200).send({
        message: 'Recipe Service!',
    });
};
app.get('/', handler);
app.use(errorHandler_1.errorHandler);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use('/dish-type', dishTypeRouter_1.default);
app.use('/ingredient', ingredientRouter_1.default);
app.use('/recipe-difficulty', recipeDifficultyRouter_1.default);
app.use('/recipe-ingredient', recipeIngredientRouter_1.default);
app.use('/recipe', recipeRouter_1.default);
app.use('/recipe-step', recipeStepRouter_1.default);
database_1.AppDataSource
    .initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Database connected');
    yield (0, initDishTypeService_1.initializeDishTypes)();
    yield (0, initRecipeDifficultyService_1.initializeRecipeDifficulties)();
    yield (0, initIngredientService_1.initializeIngredients)();
    app.listen(PORT, () => {
        console.log('Server is running on port: ' + PORT);
        console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
    });
}))
    .catch((error) => console.log(error));
