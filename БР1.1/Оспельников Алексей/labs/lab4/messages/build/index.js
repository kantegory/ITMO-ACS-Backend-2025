"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const data_source_1 = require("./data-source");
const MessageRouter_1 = require("./router/MessageRouter");
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
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
    };
    const options = {
        swaggerDefinition,
        apis: [
            './build/router/MessageRouter.js'
        ],
    };
    const swaggerSpec = swaggerJSDoc(options);
    const app = express();
    app.use(bodyParser.json());
    app.use("/api", MessageRouter_1.default);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.listen(5000);
    console.log("Express server has started on port 5000.");
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map