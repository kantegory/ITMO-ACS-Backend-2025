import 'reflect-metadata';
import express, { Request, Response } from "express"

import swaggerUi from 'swagger-ui-express';

import { useExpressServer } from 'routing-controllers';
    
// create and setup express app
let app = express()
app.use(express.json())

const options = {
    routePrefix: "/battle/api",
    controllers: [
        __dirname + "/controllers/*.ts"
    ],
    validation: true,
    classTransformer: true,
    defaultErrorHandler: true,
};

app = useExpressServer(app, options)


const swaggerDoc = require('./swagger.json')
app.use('/battle/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.listen(3002, () => console.log("Server started on http://localhost:3002"));