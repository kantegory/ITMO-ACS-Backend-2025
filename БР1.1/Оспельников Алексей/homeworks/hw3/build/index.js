"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const data_source_1 = require("./data-source");
const UserRouter_1 = require("./router/UserRouter");
const RentRouter_1 = require("./router/RentRouter");
const MessageRouter_1 = require("./router/MessageRouter");
const ReviewRouter_1 = require("./router/ReviewRouter");
const PropertyRouter_1 = require("./router/PropertyRouter");
data_source_1.AppDataSource.initialize()
    .then(async () => {
    const swaggerJSDoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'Express API for JSONPlaceholder',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    };
    const options = {
        swaggerDefinition,
        // Paths to files containing OpenAPI definitions
        apis: [
            './build/router/PropertyRouter.js',
            './build/router/UserRouter.js',
            './build/router/ReviewRouter.js',
            './build/router/RentRouter.js',
            './build/router/MessageRouter.js'
        ],
    };
    const swaggerSpec = swaggerJSDoc(options);
    const app = express();
    app.use(bodyParser.json());
    app.use("/api", UserRouter_1.default);
    app.use("/api", RentRouter_1.default);
    app.use("/api", MessageRouter_1.default);
    app.use("/api", ReviewRouter_1.default);
    app.use("/api", PropertyRouter_1.default);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.listen(3000);
    console.log("Express server has started on port 3000.");
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map