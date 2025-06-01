import 'reflect-metadata';
import express, { Request, Response } from "express"
import dataSource from "./config/data-source"
import { useSwagger } from './swagger';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import {
    Param,
    Body,
    Get,
    Post,
    Patch,
    UseBefore,
    Req,
    Res,
} from 'routing-controllers';
import { useExpressServer } from 'routing-controllers';
import { UsersController } from './controllers/user';
import { AuthorizationController } from './controllers/authorization';
import { BattleController } from './controllers/battle';

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
    routePrefix: "/api",
    controllers: [
        __dirname + "/controllers/*.ts"
    ],
    validation: true,
    classTransformer: true,
    defaultErrorHandler: true,
};

app = useExpressServer(app, options)



// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerDoc = require('./swagger.json')
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.listen(3000, () => console.log("Server started on http://localhost:3000"));