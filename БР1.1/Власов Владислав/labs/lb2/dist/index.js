"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = __importDefault(require("./config/data-source"));
const swagger_1 = require("./swagger");
const routing_controllers_1 = require("routing-controllers");
data_source_1.default
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
// create and setup express app
let app = (0, express_1.default)();
app.use(express_1.default.json());
const options = {
    routePrefix: "/api",
    controllers: [
        __dirname + "/controllers/*.ts"
    ],
    validation: true,
    classTransformer: true,
    defaultErrorHandler: true,
};
app = (0, routing_controllers_1.useExpressServer)(app, options);
app = (0, swagger_1.useSwagger)(app, options);
app.listen(3000, () => console.log("Server started on http://localhost:3000"));
