import 'reflect-metadata';
import express, { Request, Response } from "express"
import dataSource from "./config/data-source"

import swaggerUi from 'swagger-ui-express';

import { useExpressServer } from 'routing-controllers';

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

    
// create and setup express app
let app = express()
app.use(express.json())

const options = {
    routePrefix: "/chat/api",
    controllers: [
        __dirname + "/controllers/*.ts"
    ],
    validation: true,
    classTransformer: true,
    defaultErrorHandler: true,
};

app = useExpressServer(app, options)


const swaggerDoc = require('./swagger.json')
app.use('/chat/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.listen(3004, () => console.log("Server started on http://localhost:3004"));