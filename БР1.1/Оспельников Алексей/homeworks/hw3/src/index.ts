import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import userRouter from "./router/UserRouter";
import rentRouter from "./router/RentRouter";
import messageRouter from "./router/MessageRouter";
import reviewRouter from "./router/ReviewRouter";
import propertyRouter from "./router/PropertyRouter";

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

    app.use("/api", userRouter);
    app.use("/api", rentRouter);
    app.use("/api", messageRouter);
    app.use("/api", reviewRouter);

    app.use("/api", propertyRouter);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.listen(3000);

    console.log("Express server has started on port 3000.");
  })
  .catch((error) => console.log(error));


