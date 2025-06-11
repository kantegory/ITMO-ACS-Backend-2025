import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import messageRouter from "./router/MessageRouter";


AppDataSource.initialize()
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
    app.use("/api", messageRouter);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.listen(5000);

    console.log("Express server has started on port 5000.");
  })
  .catch((error) => console.log(error));


